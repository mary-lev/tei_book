# Frontend Application Requirements: TEI Book Viewer with Facsimile Support

## Project Overview

Develop a web application to display digitized historical books converted from ALTO XML to TEI format, providing synchronized text-image navigation with precise spatial alignment. The application should enable scholarly exploration of historical texts with click-to-navigate functionality between transcribed text and original page images.

## Core Functionality

### 1. Dual-Pane Interface

**Layout Requirements:**
- Split-screen layout with resizable panes
- Left pane: TEI text display
- Right pane: Facsimile image viewer
- Responsive design for desktop, tablet, and mobile
- Toggle between side-by-side and stacked layouts

**Text Pane Features:**
- Clean, readable typography optimized for historical texts
- Support for Cyrillic and Latin characters
- Configurable font size and line spacing
- Text selection and copy functionality
- Search within text content

**Image Pane Features:**
- Zoomable, pannable image viewer
- Fit-to-width, fit-to-height, and custom zoom controls
- Image quality optimization for different zoom levels
- Overlay zones for text regions (optional toggle)

### 2. Navigation System

**Page Navigation:**
- Page number input field
- Previous/next page buttons
- Page thumbnails sidebar (collapsible)
- Progress indicator showing current position
- Keyboard shortcuts (arrow keys, Page Up/Down)

**Text-Image Synchronization:**
- Click on text → highlight corresponding region on image
- Click on image region → scroll to corresponding text
- Visual indicators showing active text-image pairs
- Automatic centering of target regions

### 3. Interactive Features

**Text Interaction:**
- Clickable text segments with visual feedback
- Hover effects showing associated image zones
- Line-by-line highlighting
- Paragraph-level and line-level navigation

**Image Interaction:**
- Clickable zones overlaid on images
- Hover effects highlighting zone boundaries
- Visual feedback for interactive regions
- Zoom-to-region functionality

## Design Philosophy & Visual Style

### 1. Core Design Principles

**Lightweight & Minimal:**
- Clean, uncluttered interface with generous white space
- Minimal UI chrome - focus on content, not decorative elements
- Essential controls only - hide advanced features until needed
- Fast loading with no unnecessary animations or heavy graphics

**Modern & Contemporary:**
- Flat design with subtle depth using shadows and elevation
- Contemporary typography with excellent readability
- Responsive grid system for perfect scaling
- Touch-friendly interactions for mobile devices

**Simple & Intuitive:**
- Self-explanatory interface requiring no learning curve
- Consistent interaction patterns throughout the application
- Clear visual hierarchy guiding user attention
- Progressive disclosure - simple by default, powerful when needed

**Elegant & Scholarly:**
- Sophisticated color palette appropriate for academic use
- High-quality typography respecting the historical nature of content
- Refined details in spacing, alignment, and proportions
- Professional appearance suitable for research institutions

### 2. Visual Design Specifications

**Color Palette:**
```css
/* Primary Colors */
--primary-text: #2c3e50;           /* Dark blue-gray for main text */
--secondary-text: #7f8c8d;         /* Lighter gray for metadata */
--accent-color: #3498db;           /* Clear blue for interactive elements */
--accent-hover: #2980b9;           /* Darker blue for hover states */

/* Background Colors */
--bg-primary: #ffffff;             /* Pure white for main content */
--bg-secondary: #f8f9fa;           /* Light gray for panels/sidebars */
--bg-tertiary: #ecf0f1;            /* Slightly darker for borders/dividers */

/* Interactive States */
--highlight-text: #e74c3c;         /* Warm red for active text selections */
--highlight-zone: rgba(52, 152, 219, 0.2);  /* Translucent blue for image zones */
--success-color: #27ae60;          /* Green for confirmations */
--border-color: #bdc3c7;           /* Neutral gray for borders */
```

**Typography Scale:**
```css
/* Font Family */
--font-primary: 'Inter', 'SF Pro Display', system-ui, sans-serif;
--font-text: 'Crimson Text', 'Times New Roman', serif;  /* For historical text */
--font-mono: 'JetBrains Mono', 'SF Mono', monospace;    /* For metadata */

/* Font Sizes */
--text-xs: 0.75rem;     /* 12px - Small metadata */
--text-sm: 0.875rem;    /* 14px - Secondary text */
--text-base: 1rem;      /* 16px - Body text */
--text-lg: 1.125rem;    /* 18px - Historical text content */
--text-xl: 1.25rem;     /* 20px - Section headers */
--text-2xl: 1.5rem;     /* 24px - Page titles */
--text-3xl: 1.875rem;   /* 30px - Main headings */

/* Line Heights */
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;  /* For historical text readability */
```

**Spacing System:**
```css
/* Consistent spacing scale based on 8px units */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### 3. Layout & Component Design

**Header Design:**
```
┌─────────────────────────────────────────────────────────────┐
│ [Book Title]                    [Search] [Settings] [Help] │
│                                                             │
│ Page: [12] of 21  [◀] [▶]      View: [Toggle] Zoom: [- 100% +] │
└─────────────────────────────────────────────────────────────┘
```
- Minimal toolbar with essential controls only
- Clean typography hierarchy
- Subtle borders, no heavy visual elements
- Consistent icon language throughout

**Main Content Layout:**
```
┌─────────────────┬───────────────────────────────────────────┐
│ Text Pane       │ Image Pane                                │
│                 │                                           │
│ [Historical     │ [Zoomable page image with                 │
│  text content   │  subtle zone overlays]                   │
│  with subtle    │                                           │
│  highlighting]  │                                           │
│                 │                                           │
│ Clean serif     │ Minimal zoom/pan controls                 │
│ typography      │ appearing on hover                        │
│                 │                                           │
└─────────────────┴───────────────────────────────────────────┘
```

**Interactive Elements:**
- **Text Segments:** Subtle underline on hover, highlight on click
- **Image Zones:** Translucent overlay, border intensifies on hover
- **Navigation:** Ghost buttons that become solid on interaction
- **Controls:** Minimal iconography with clear tooltips

### 4. Interaction Design Patterns

**Hover States:**
- Text segments: Gentle underline with fade-in transition
- Image zones: Subtle border glow and opacity change
- Buttons: Smooth color transitions (150ms ease)
- Navigation elements: Scale slightly (1.02x) with shadow

**Active States:**
- Selected text: Highlighted background with rounded corners
- Active image zone: Distinct border color and increased opacity
- Current page indicator: Clear visual distinction

**Transitions:**
- Page changes: Smooth fade (300ms)
- Zoom operations: Fluid scaling with easing
- Text-image synchronization: Quick highlight pulse (200ms)
- UI state changes: Consistent timing across all elements

### 5. Responsive Design Strategy

**Desktop (1200px+):**
- Side-by-side panes with adjustable divider
- Full feature set visible
- Hover states and keyboard shortcuts

**Tablet (768px - 1199px):**
- Stacked layout or tabbed interface
- Larger touch targets (minimum 44px)
- Swipe gestures for navigation

**Mobile (< 768px):**
- Single-pane view with tab switching
- Bottom navigation bar
- Touch-optimized zoom and pan
- Simplified toolbar with dropdown menus

### 6. Accessibility & Inclusive Design

**Visual Accessibility:**
- WCAG 2.1 AA contrast ratios (4.5:1 minimum)
- High contrast mode option
- Scalable text up to 200% without horizontal scrolling
- Clear focus indicators for keyboard navigation

**Interaction Accessibility:**
- All functionality available via keyboard
- Screen reader compatible with proper ARIA labels
- Alternative text for all images and icons
- Clear error messages and user guidance

### 7. Brand & Academic Tone

**Visual Language:**
- Scholarly and authoritative without being intimidating
- Refined details showing attention to quality
- Timeless design that won't feel dated
- International appeal with cultural sensitivity

**Content Presentation:**
- Respect for historical material through careful typography
- Clear separation between original text and interface elements
- Professional metadata display
- Citation-ready formatting options

### 8. Performance-Focused Design

**Optimization Principles:**
- Minimal CSS payload with efficient selectors
- SVG icons for crisp display at any size
- Progressive enhancement for non-essential features
- Efficient animations using transform and opacity only

**Loading States:**
- Skeleton screens for content areas
- Progressive image loading with blur-up effect
- Smooth transitions between loading and loaded states
- Clear progress indicators for long operations

This design specification ensures your frontend developer creates an interface that truly embodies lightweight, modern, simple, and elegant principles while providing a sophisticated tool for exploring historical documents.

## Technical Requirements

### 1. Input Data Structure

**TEI XML Format:**
```xml
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <!-- Book metadata -->
  </teiHeader>
  
  <facsimile>
    <surface xml:id="facs_page_1" source="page_5.jpg">
      <graphic url="page_5.jpg" width="1500" height="2800"/>
      
      <!-- Text block zones -->
      <zone xml:id="facs_block_1_1" ulx="197" uly="310" lrx="1320" lry="2392" 
            type="textblock" points="197 310 1265 310 1320 2392 231 2389"/>
      
      <!-- Text line zones -->
      <zone xml:id="facs_line_1_1_1" ulx="416" uly="376" lrx="1056" lry="462" 
            type="textline" baseline="416 462 1056 462" 
            points="416 376 1056 376 1056 462 416 462"/>
    </surface>
  </facsimile>
  
  <text>
    <body>
      <div type="book">
        <!-- Page breaks with facsimile references -->
        <pb n="1" facs="#facs_page_1"/>
        
        <!-- Paragraphs with block-level facsimile -->
        <p facs="#facs_block_1_1">
          <!-- Lines with segment-level facsimile -->
          <seg facs="#facs_line_1_1_1">ПРИМТРЪ</seg>
          <lb facs="#facs_line_1_1_2"/>
          <seg facs="#facs_line_1_1_2">Добродѣтельныя</seg>
        </p>
      </div>
    </body>
  </text>
</TEI>
```

**Image Files:**
- Format: JPEG, PNG, or TIFF
- Resolution: High-resolution originals (typically 1500x2800px or higher)
- Naming convention: Matches `source` attributes in TEI facsimile
- Multiple resolutions for responsive loading (optional)

### 2. Data Processing

**TEI Parsing Requirements:**
- Parse facsimile zones and extract coordinate data
- Build mapping between text elements and image zones
- Extract page structure and reading order
- Handle various TEI elements: `<p>`, `<seg>`, `<lb>`, `<pb>`, `<fw>`, `<head>`

**Coordinate System:**
- Origin: Upper-left corner (0,0)
- Units: Pixels as specified in TEI
- Support for both rectangular zones (ulx, uly, lrx, lry) and polygon shapes
- Coordinate scaling for different image resolutions

### 3. Performance Requirements

**Loading Performance:**
- Initial page load: < 3 seconds
- Page navigation: < 1 second
- Image zoom response: < 500ms
- Progressive loading for large books

**Memory Management:**
- Lazy loading of images (load current page + 1-2 adjacent pages)
- Efficient DOM management for large documents
- Image caching strategy
- Text search indexing

## User Interface Specifications

### 1. Header/Navigation Bar

**Elements:**
- Book title and metadata display
- Page navigation controls (input field, prev/next)
- View options (layout toggle, zoom controls)
- Search functionality
- Settings/preferences menu

**Features:**
- Sticky header that remains visible during scrolling
- Responsive collapse for mobile devices
- Keyboard shortcuts display (help tooltip)

### 2. Main Content Area

**Text Pane:**
```
┌─────────────────────────────────┐
│ Page 1                          │
│                                 │
│ [Clickable Text Segment]        │ ← Highlights on hover
│ [Another Text Segment]          │ ← Clicking scrolls image
│                                 │
│ Line break indicators           │
│ Paragraph structures preserved  │
│                                 │
│ Page break: "Page 2"           │
└─────────────────────────────────┘
```

**Image Pane:**
```
┌─────────────────────────────────┐
│ [Image with overlay zones]      │ ← Zones highlight on hover
│                                 │ ← Clicking scrolls text
│ ┌─────────────────────────┐     │
│ │ Highlighted text region │     │ ← Active zone indicator
│ └─────────────────────────┘     │
│                                 │
│ Zoom controls: [- 100% +]       │
└─────────────────────────────────┘
```

### 3. Sidebar Components

**Page Thumbnails:**
- Small preview images of each page
- Current page indicator
- Click to navigate
- Collapsible/expandable

**Table of Contents:**
- Extracted from TEI structure
- Chapter/section navigation
- Auto-generated from headers

**Search Results:**
- Text search with highlighting
- Results with page context
- Click to navigate to result

### 4. Mobile Responsive Design

**Breakpoints:**
- Desktop: > 1024px (side-by-side panes)
- Tablet: 768px - 1024px (stacked or tabbed view)
- Mobile: < 768px (single pane with tab switching)

**Mobile Features:**
- Touch gestures for image zoom/pan
- Swipe navigation between pages
- Tap targets optimized for touch
- Collapsible UI elements

## Technical Implementation

### 1. Frontend Framework Recommendations

**React.js with TypeScript:**
- Component-based architecture
- Strong typing for TEI data structures
- Rich ecosystem for image viewers and XML parsing

**Key Libraries:**
- **Image Viewer:** OpenSeadragon or react-image-gallery
- **XML Parsing:** xml2js or DOMParser
- **Styling:** Styled-components or CSS modules
- **State Management:** Redux Toolkit or Zustand
- **Router:** React Router for deep linking

### 2. Data Architecture

**State Management:**
```typescript
interface BookState {
  metadata: BookMetadata;
  pages: Page[];
  currentPage: number;
  facsimileZones: Map<string, Zone>;
  textElements: Map<string, TextElement>;
  activeZone?: string;
  searchResults: SearchResult[];
}

interface Page {
  number: number;
  imageUrl: string;
  imageDimensions: { width: number; height: number };
  textContent: TEIElement[];
  zones: Zone[];
}

interface Zone {
  id: string;
  coordinates: { ulx: number; uly: number; lrx: number; lry: number };
  polygon?: string;
  type: 'textblock' | 'textline';
  linkedTextId?: string;
}
```

### 3. API Endpoints (if backend required)

**Book Data:**
- `GET /api/books/:bookId` - Get book metadata and structure
- `GET /api/books/:bookId/pages/:pageNumber` - Get page content
- `GET /api/books/:bookId/search?q={query}` - Search within book

**Static Assets:**
- `GET /images/:bookId/:filename` - Serve page images
- `GET /tei/:bookId.xml` - Serve TEI file

## User Experience Features

### 1. Interactive Feedback

**Visual Indicators:**
- Hover effects on clickable text segments
- Active zone highlighting on images
- Smooth transitions between states
- Loading indicators for image changes

**User Guidance:**
- Tutorial/onboarding for first-time users
- Tooltips explaining interactive features
- Keyboard shortcut help overlay

### 2. Accessibility

**Standards Compliance:**
- WCAG 2.1 AA compliance
- Screen reader compatibility
- Keyboard navigation support
- High contrast mode option

**Features:**
- Alt text for images
- Semantic HTML structure
- Focus management
- Text scaling support

### 3. Advanced Features

**Annotation System (Optional):**
- User-created annotations linked to text regions
- Highlight and note functionality
- Export annotations

**Citation Tools:**
- Generate citations for specific pages/passages
- Permalink generation for deep linking
- Print-friendly formatting

**Comparison Mode:**
- Side-by-side view of different editions
- Synchronized scrolling between versions

## Development Phases

### Phase 1: Core Viewer (MVP)
- Basic dual-pane layout
- Page navigation
- Simple text-image synchronization
- Responsive design

### Phase 2: Enhanced Interaction
- Advanced zone highlighting
- Search functionality
- Mobile optimization
- Performance optimization

### Phase 3: Advanced Features
- Annotation system
- Citation tools
- Advanced navigation aids
- User preferences

## Testing Requirements

**Functional Testing:**
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Mobile device testing (iOS Safari, Chrome Mobile)
- Keyboard navigation testing
- Screen reader testing

**Performance Testing:**
- Large book handling (100+ pages)
- Image loading optimization
- Memory usage monitoring
- Network performance on slow connections

**User Testing:**
- Usability testing with humanities scholars
- Accessibility testing with disabled users
- Mobile user experience testing

## Deployment Considerations

**Hosting Requirements:**
- Static site hosting (Netlify, Vercel, or AWS S3)
- CDN for image delivery
- HTTPS support for secure access

**Content Management:**
- Easy upload system for new TEI books
- Image optimization pipeline
- Metadata extraction and indexing

**Analytics:**
- User interaction tracking
- Performance monitoring
- Error logging and reporting

## Success Metrics

**User Engagement:**
- Time spent per session
- Pages viewed per visit
- Feature usage statistics
- User return rate

**Technical Performance:**
- Page load times
- Image render speed
- Error rates
- Mobile performance scores

**Scholarly Value:**
- Citation usage
- Deep linking effectiveness
- Search query success rate
- User feedback scores

This application will serve as a modern, scholarly-grade digital edition platform that preserves the spatial relationships between historical text and images while providing an intuitive, responsive user experience for researchers, students, and general audiences interested in historical documents.