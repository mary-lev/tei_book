// TEI Book Data Types

export interface Point {
  x: number;
  y: number;
}

export interface Zone {
  id: string;
  type: 'textblock' | 'textline';
  ulx: number; // upper left x
  uly: number; // upper left y
  lrx: number; // lower right x
  lry: number; // lower right y
  points?: string; // polygon points
  baseline?: string; // baseline coordinates
}

export interface Surface {
  id: string;
  source: string; // image filename
  width: number;
  height: number;
  zones: Zone[];
}

export interface TextSegment {
  id: string;
  text: string;
  facs?: string; // reference to zone ID
  type?: 'seg' | 'lb' | 'pb'; // segment, line break, page break
}

export interface Page {
  number: number;
  surface: Surface;
  textSegments: TextSegment[];
}

export interface Book {
  title: string;
  totalPages: number;
  pages: Page[];
  metadata: {
    source: string;
    publicationInfo: string;
  };
}

export interface ViewerState {
  currentPage: number;
  activeZoneId: string | null;
  zoom: number;
  pan: { x: number; y: number };
  showThumbnails: boolean;
} 