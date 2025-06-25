# TEI Book Viewer

An elegant, academic-focused web application for viewing digitized books encoded in the Text Encoding Initiative (TEI) format. The viewer provides a sophisticated dual-pane interface that synchronizes transcribed text with original page facsimiles, designed specifically for scholarly research and academic study.

## Features

### Core Functionality
- **Dual-Pane Interface**: Synchronized side-by-side view of transcribed text and high-resolution page images
- **Interactive Text-Image Linking**: Click text segments to highlight corresponding zones on page images
- **Advanced Image Viewer**: OpenSeadragon-powered deep zoom with smooth scroll-based navigation
- **Comprehensive Page Navigation**: Intuitive controls for seamless page browsing
- **Metadata Sidebar**: Detailed book information including publication details, statistics, and technical metadata

### User Experience
- **Academic Design System**: Elegant typography using EB Garamond and Crimson Pro fonts
- **Sophisticated Color Palette**: Warm, paper-like backgrounds with academic navy and burgundy accents
- **Dual Theme Support**: Professional light and dark modes optimized for extended reading
- **Responsive Layout**: Adaptive design for desktop, tablet, and mobile devices
- **Accessibility**: WCAG-compliant focus management and screen reader support

### Technical Capabilities
- **TEI XML Processing**: Robust parser for complex TEI document structures
- **Zone-Based Highlighting**: Precise text-to-image coordinate mapping
- **Real-time Statistics**: Dynamic page counts and text zone analytics
- **Performance Optimized**: Lazy loading and efficient state management

## Technology Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Styled Components with CSS-in-JS architecture
- **State Management**: Zustand for lightweight, scalable state handling
- **Image Viewer**: OpenSeadragon for high-performance image manipulation
- **XML Processing**: fast-xml-parser for efficient TEI document parsing
- **Development**: ESLint, TypeScript strict mode, hot module replacement

## Architecture

### Component Structure
```
src/
├── components/           # React UI components
│   ├── Header.tsx       # Navigation bar with title and controls
│   ├── Viewer.tsx       # Main container with split-pane layout
│   ├── TextPane.tsx     # Transcribed text display and interaction
│   ├── ImagePane.tsx    # OpenSeadragon image viewer with overlays
│   ├── MetadataSidebar.tsx # Book information and statistics panel
│   ├── PageNav.tsx      # Page navigation controls
│   └── SplitPane.tsx    # Resizable dual-pane layout manager
├── hooks/               # Custom React hooks
│   ├── useBookData.ts   # TEI data loading and error handling
│   └── useDarkMode.ts   # Theme persistence and management
├── store/               # Zustand state management
│   └── viewerStore.ts   # Application state and actions
├── utils/               # Core utilities
│   └── teiParser.ts     # TEI XML parsing and data transformation
├── types/               # TypeScript definitions
│   └── book.ts          # Data structure interfaces
└── styles/              # Design system
    └── GlobalStyles.ts  # Theme variables and global styles
```

### Data Flow
1. **TEI Loading**: `useBookData` hook fetches and parses TEI XML via `teiParser`
2. **State Management**: Zustand store manages book data, page navigation, and UI state
3. **Component Sync**: Text and image panes communicate through shared store for highlighting
4. **User Interaction**: Click events trigger zone highlighting and page navigation updates

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation
```bash
# Clone repository and navigate to project
cd tei-book-viewer

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev        # Start development server (http://localhost:5173)
npm run build      # Create production build
npm run preview    # Preview production build locally
npm run lint       # Run ESLint code quality checks
```

### Project Configuration
- **Base Path**: Configured for GitHub Pages deployment (`/tei_book/`)
- **TypeScript**: Strict mode with separate configs for app and build tools
- **Linting**: ESLint with TypeScript and React hooks rules
- **Styling**: CSS custom properties with comprehensive design tokens

## TEI Document Requirements

### Supported TEI Structure
```xml
<TEI xmlns="http://www.tei-c.org/ns/1.0">
  <teiHeader>
    <fileDesc>
      <titleStmt><title>Book Title</title></titleStmt>
      <publicationStmt><p>Publication information</p></publicationStmt>
      <sourceDesc><p>Source description</p></sourceDesc>
    </fileDesc>
  </teiHeader>
  <facsimile>
    <surface xml:id="page_1" source="page_1.jpg">
      <graphic url="page_1.jpg" width="1500" height="2800" />
      <zone xml:id="zone_1" type="textline" ulx="100" uly="200" lrx="400" lry="250" />
    </surface>
  </facsimile>
  <text>
    <body>
      <pb facs="#page_1"/>
      <seg facs="#zone_1">Transcribed text content</seg>
    </body>
  </text>
</TEI>
```

### File Organization
```
public/book_data/
├── book.xml              # Main TEI document
└── images/               # Page image directory
    ├── page_1.jpg
    ├── page_2.jpg
    └── ...
```

## Academic Use Cases

- **Digital Humanities Research**: Text analysis with visual manuscript context
- **Paleography Studies**: Character and handwriting analysis with zoom capabilities
- **Literary Scholarship**: Close reading with facsimile reference
- **Historical Document Analysis**: Primary source examination with metadata context
- **Teaching and Pedagogy**: Classroom presentation of historical texts

## Contributing

This project follows academic software development best practices:

1. **Code Quality**: ESLint rules enforce consistent TypeScript patterns
2. **Component Architecture**: Modular, reusable components with clear interfaces  
3. **Type Safety**: Comprehensive TypeScript coverage with strict mode
4. **Performance**: Optimized rendering and efficient state updates
5. **Accessibility**: WCAG compliance and semantic HTML structure

## License

Open source project designed for academic and educational use.