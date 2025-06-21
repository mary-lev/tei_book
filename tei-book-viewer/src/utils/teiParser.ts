import { XMLParser } from 'fast-xml-parser';
import type { Book, Page, Surface, Zone, TextSegment } from '../types/book';

export class TEIParser {
  private parser: XMLParser;
  private debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
    this.parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '',
      textNodeName: '_text',
      parseAttributeValue: true,
    });
  }

  private log(...args: unknown[]): void {
    if (this.debug) {
      // eslint-disable-next-line no-console
      console.log(...args);
    }
  }

  async parseBook(xmlUrl: string): Promise<Book> {
    this.log('=== TEI PARSER STARTED ==='); // DEBUG LOG
    this.log('Loading book from', xmlUrl); // DEBUG LOG
    try {
      const response = await fetch(xmlUrl);
      const xmlText = await response.text();
      const parsed = this.parser.parse(xmlText);
      this.log('TEI parsed:', parsed); // DEBUG LOG
      this.log('TEI structure:', {
        hasTEI: !!parsed.TEI,
        hasHeader: !!parsed.TEI?.teiHeader,
        hasFacsimile: !!parsed.TEI?.facsimile,
        hasText: !!parsed.TEI?.text,
        surfaces: parsed.TEI?.facsimile?.surface?.length || 'no surfaces',
        textBody: parsed.TEI?.text?.body
      }); // DEBUG LOG

      const tei = parsed.TEI;
      const header = tei.teiHeader;
      const facsimile = tei.facsimile;
      const text = tei.text;

      // Extract metadata
      const title = header.fileDesc.titleStmt.title._text || 'Untitled Book';
      const source = header.fileDesc.sourceDesc.p._text || '';
      const publicationInfo = header.fileDesc.publicationStmt.p._text || '';

      this.log('Extracted metadata:', { title, source, publicationInfo }); // DEBUG LOG

      // Parse surfaces (pages with zones)
      const surfaces = this.parseSurfaces(facsimile.surface);
      this.log('Parsed surfaces:', surfaces); // DEBUG LOG
      this.log('Surfaces map size:', surfaces.size); // DEBUG LOG
      this.log('Surface keys:', Array.from(surfaces.keys())); // DEBUG LOG

      // Parse text content
      const pages = this.parseTextContent(text.body, surfaces);
      this.log('Parsed pages:', pages); // DEBUG LOG
      this.log('Pages array length:', pages.length); // DEBUG LOG
      this.log('First few pages:', pages.slice(0, 3).map(p => ({ number: p.number, zones: p.surface.zones.length }))); // DEBUG LOG

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
    this.log('parseSurfaces input:', surfaceData); // DEBUG LOG
    const surfaces = new Map<string, Surface>();

    // Handle single surface case
    const surfaceArray = Array.isArray(surfaceData) ? surfaceData : [surfaceData];
    this.log('Surface array length:', surfaceArray.length); // DEBUG LOG

    surfaceArray.forEach((surface, index) => {
      this.log(`Processing surface ${index}:`, surface); // DEBUG LOG
      
      const zones: Zone[] = [];
      
      // Parse zones if they exist
      if (surface.zone) {
        const zoneArray = Array.isArray(surface.zone) ? surface.zone : [surface.zone];
        this.log(`Surface ${index} has ${zoneArray.length} zones`); // DEBUG LOG
        
        zoneArray.forEach((zone: any, zoneIndex: number) => {
          this.log(`Zone ${zoneIndex} raw data:`, JSON.stringify(zone, null, 2)); // DEBUG LOG
          this.log(`Zone ${zoneIndex}:`, zone); // DEBUG LOG
          this.log(`Zone ${zoneIndex} xml:id:`, zone.xmlid); // DEBUG LOG
          this.log(`Zone ${zoneIndex} id:`, zone.id); // DEBUG LOG
          this.log(`Zone ${zoneIndex} type:`, zone.type); // DEBUG LOG
          
          // Check all possible property names for the ID
          const zoneId = zone.xmlid || zone.id || zone['xml:id'] || `zone_${index}_${zoneIndex}`;
          this.log(`Zone ${zoneIndex} final ID: ${zoneId}`); // DEBUG LOG
          
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
        this.log(`Surface ${index} has no zones`); // DEBUG LOG
      }

      const surfaceId = surface.xmlid || surface.id || `facs_page_${index + 1}`;
      this.log(`Surface ${index} ID:`, surfaceId); // DEBUG LOG
      
      surfaces.set(surfaceId, {
        id: surfaceId,
        source: surface.source,
        width: surface.graphic?.width || 1500,
        height: surface.graphic?.height || 2800,
        zones,
      });
    });

    this.log('Final surfaces map:', surfaces); // DEBUG LOG
    return surfaces;
  }

  private parseTextContent(body: any, surfaces: Map<string, Surface>): Page[] {
    this.log('parseTextContent input - body:', body); // DEBUG LOG
    this.log('parseTextContent input - surfaces:', surfaces); // DEBUG LOG
    this.log('Surfaces map size in parseTextContent:', surfaces.size); // DEBUG LOG
    
    const pages: Page[] = [];
    let currentPageNumber = 1;
    let segmentCounter = 0; // For generating unique IDs

    // First, create pages for all surfaces (even if no text)
    this.log('Creating pages from surfaces...'); // DEBUG LOG
    surfaces.forEach((surface, surfaceId) => {
      this.log(`Processing surface ${surfaceId}:`, surface); // DEBUG LOG
      const pageNumber = parseInt(surfaceId.replace('facs_page_', '')) || currentPageNumber;
      this.log(`Creating page ${pageNumber} from surface ${surfaceId}`); // DEBUG LOG
      pages.push({
        number: pageNumber,
        surface,
        textSegments: [],
      });
      currentPageNumber = Math.max(currentPageNumber, pageNumber + 1);
    });

    this.log('Pages created:', pages.length); // DEBUG LOG
    this.log('Page numbers:', pages.map(p => p.number)); // DEBUG LOG

    // Sort pages by number
    pages.sort((a, b) => a.number - b.number);

    // Create a mapping from line zones to page numbers
    const lineToPageMap = new Map<string, number>();
    this.log('Creating line-to-page mapping...'); // DEBUG LOG
    this.log('Total pages:', pages.length); // DEBUG LOG
    
    // Test: Check if any pages have zones at all
    let totalZones = 0;
    pages.forEach(page => {
      totalZones += page.surface.zones.length;
      this.log(`Page ${page.number} has ${page.surface.zones.length} zones`); // DEBUG LOG
      if (page.surface.zones.length > 0) {
        this.log(`Page ${page.number} zone IDs:`, page.surface.zones.map(z => z.id)); // DEBUG LOG
      }
    });
    this.log(`Total zones across all pages: ${totalZones}`); // DEBUG LOG
    
    pages.forEach(page => {
      this.log(`Processing page ${page.number}, zones:`, page.surface.zones.map(z => z.id)); // DEBUG LOG
      this.log(`Page ${page.number} has ${page.surface.zones.length} zones`); // DEBUG LOG
      
      page.surface.zones.forEach(zone => {
        this.log(`Checking zone: ${zone.id}, includes 'facs_line_': ${zone.id.includes('facs_line_')}`); // DEBUG LOG
        if (zone.id.includes('facs_line_')) {
          lineToPageMap.set(zone.id, page.number);
          this.log(`Mapped ${zone.id} to page ${page.number}`); // DEBUG LOG
        }
      });
    });

    this.log('Line to page mapping:', lineToPageMap); // DEBUG LOG
    this.log('Line to page mapping size:', lineToPageMap.size); // DEBUG LOG
    this.log('Sample mapping entries:', Array.from(lineToPageMap.entries()).slice(0, 5)); // DEBUG LOG

    // Extract page breaks and text content
    const processElement = (element: any): TextSegment[] => {
      const segments: TextSegment[] = [];

      if (element.pb) {
        // Page break - find the corresponding page
        const pageBreak = element.pb;
        const pageNumber = pageBreak.n || currentPageNumber;
        const surfaceId = pageBreak.facs?.replace('#', '') || `facs_page_${pageNumber}`;
        
        this.log(`Page break found: page ${pageNumber}, surface ${surfaceId}`); // DEBUG LOG
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
    this.log('All segments extracted:', allSegments.length); // DEBUG LOG
    
    // Distribute segments to pages based on facs attributes
    allSegments.forEach((segment) => {
      this.log(`Processing segment: ${segment.id}, facs: ${segment.facs}, text: "${segment.text}"`); // DEBUG LOG
      if (segment.facs) {
        // Find the page using the line-to-page mapping
        const targetPage = lineToPageMap.get(segment.facs);
        if (targetPage) {
          const page = pages.find(p => p.number === targetPage);
          if (page) {
            page.textSegments.push(segment);
            this.log(`Added segment ${segment.id} to page ${targetPage}`); // DEBUG LOG
          }
        } else {
          this.log(`No page found for segment with facs: ${segment.facs}`); // DEBUG LOG
        }
      }
    });

    this.log('Final pages:', pages.map(p => ({ number: p.number, segments: p.textSegments.length }))); // DEBUG LOG
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