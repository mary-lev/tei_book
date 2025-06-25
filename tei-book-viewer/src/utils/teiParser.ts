import { XMLParser } from 'fast-xml-parser';
import type { Book, Page, Surface, Zone, TextSegment } from '../types/book';

export class TEIParser {
  private parser: XMLParser;

  constructor() {
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      textNodeName: '_text',
      parseAttributeValue: true,
    });
  }

  async parseBook(xmlUrl: string): Promise<Book> {
    try {
      const response = await fetch(xmlUrl);
      const xmlText = await response.text();
      const parsed = this.parser.parse(xmlText);
      const tei = parsed.TEI;
      const header = tei.teiHeader;
      const facsimile = tei.facsimile;
      const text = tei.text;

      // Extract metadata
      const title = header.fileDesc.titleStmt.title._text || header.fileDesc.titleStmt.title || 'Untitled Book';
      const source = header.fileDesc.sourceDesc.p._text || '';
      const publicationInfo = header.fileDesc.publicationStmt.p._text || '';


      // Parse surfaces (pages with zones)
      const surfaces = this.parseSurfaces(facsimile.surface);

      // Parse text content
      const pages = this.parseTextContent(text.body, surfaces);

      return {
        title,
        totalPages: pages.length,
        pages,
        metadata: {
          source,
          publicationInfo,
        },
      };
    } catch (error) {
      console.error('Error in parseBook:', error);
      throw error;
    }
  }

  private parseSurfaces(surfaceData: any[]): Map<string, Surface> {
    const surfaces = new Map<string, Surface>();

    // Handle single surface case
    const surfaceArray = Array.isArray(surfaceData) ? surfaceData : [surfaceData];

    surfaceArray.forEach((surface, index) => {
      
      const zones: Zone[] = [];
      
      // Parse zones if they exist
      if (surface.zone) {
        const zoneArray = Array.isArray(surface.zone) ? surface.zone : [surface.zone];
        
        zoneArray.forEach((zone: any, zoneIndex: number) => {
          
          // Check all possible property names for the ID
          const zoneId = zone.xmlid || zone.id || zone['xml:id'] || `zone_${index}_${zoneIndex}`;
          
          zones.push({
            id: zoneId,
            type: zone.type,
            ulx: zone.ulx,
            uly: zone.uly,
            lrx: zone.lrx,
            lry: zone.lry,
            points: zone.points,
            baseline: zone.baseline,
          });
        });
      } else {
      }

      const surfaceId = surface.xmlid || surface.id || `facs_page_${index + 1}`;
      
      surfaces.set(surfaceId, {
        id: surfaceId,
        source: surface.source,
        width: surface.graphic?.width || 1500,
        height: surface.graphic?.height || 2800,
        zones,
      });
    });

    return surfaces;
  }

  private parseTextContent(body: any, surfaces: Map<string, Surface>): Page[] {
    
    const pages: Page[] = [];
    let currentPageNumber = 1;
    let segmentCounter = 0; // For generating unique IDs

    // First, create pages for all surfaces (even if no text)
    surfaces.forEach((surface, surfaceId) => {
      const pageNumber = parseInt(surfaceId.replace('facs_page_', '')) || currentPageNumber;
      pages.push({
        number: pageNumber,
        surface,
        textSegments: [],
      });
      currentPageNumber = Math.max(currentPageNumber, pageNumber + 1);
    });


    // Sort pages by number
    pages.sort((a, b) => a.number - b.number);

    // Create a mapping from line zones to page numbers
    const lineToPageMap = new Map<string, number>();
    
    // Test: Check if any pages have zones at all
    let totalZones = 0;
    pages.forEach(page => {
      totalZones += page.surface.zones.length;
      if (page.surface.zones.length > 0) {
      }
    });
    
    pages.forEach(page => {
      
      page.surface.zones.forEach(zone => {
        if (zone.id.includes('facs_line_')) {
          lineToPageMap.set(zone.id, page.number);
        }
      });
    });


    // Extract page breaks and text content
    const processElement = (element: any): TextSegment[] => {
      const segments: TextSegment[] = [];

      if (element.pb) {
        // Page break - find the corresponding page
        const pageBreak = element.pb;
        const pageNumber = pageBreak.n || currentPageNumber;
        const surfaceId = pageBreak.facs?.replace('#', '') || `facs_page_${pageNumber}`;
        
        currentPageNumber = pageNumber + 1;
      }

      if (element.p) {
        // Paragraph
        const paragraphSegments = this.extractTextSegments(element.p, segmentCounter);
        segments.push(...paragraphSegments);
        segmentCounter += paragraphSegments.length;
      }

      if (element.seg) {
        // Text segment
        const segArray = Array.isArray(element.seg) ? element.seg : [element.seg];
        segArray.forEach((seg: any) => {
          segments.push({
            id: seg.xmlid || seg.id || `seg_${segmentCounter++}`,
            text: seg._text || '',
            facs: seg.facs?.replace('#', ''),
            type: 'seg',
          });
        });
      }

      if (element.lb) {
        // Line break
        segments.push({
          id: `lb_${segmentCounter++}`,
          text: '\n',
          facs: element.lb.facs?.replace('#', ''),
          type: 'lb',
        });
      }

      // Recursively process child elements
      Object.keys(element).forEach((key) => {
        if (key !== '_text' && key !== 'xmlid' && key !== 'id' && key !== 'facs' && key !== 'type') {
          const child = element[key];
          if (Array.isArray(child)) {
            child.forEach((item: any) => {
              segments.push(...processElement(item));
            });
          } else if (typeof child === 'object') {
            segments.push(...processElement(child));
          }
        }
      });

      return segments;
    };

    const allSegments = processElement(body);
    
    // Distribute segments to pages based on facs attributes
    allSegments.forEach((segment) => {
      if (segment.facs) {
        // Find the page using the line-to-page mapping
        const targetPage = lineToPageMap.get(segment.facs);
        if (targetPage) {
          const page = pages.find(p => p.number === targetPage);
          if (page) {
            page.textSegments.push(segment);
          }
        } else {
        }
      }
    });

    return pages;
  }

  private extractTextSegments(element: any, startCounter: number): TextSegment[] {
    const segments: TextSegment[] = [];
    let counter = startCounter;

    if (element.seg) {
      const segArray = Array.isArray(element.seg) ? element.seg : [element.seg];
      segArray.forEach((seg: any) => {
        segments.push({
          id: seg.xmlid || seg.id || `seg_${counter++}`,
          text: seg._text || '',
          facs: seg.facs?.replace('#', ''),
          type: 'seg',
        });
      });
    }

    if (element.lb) {
      segments.push({
        id: `lb_${counter++}`,
        text: '\n',
        facs: element.lb.facs?.replace('#', ''),
        type: 'lb',
      });
    }

    return segments;
  }
} 