# TEI Book Viewer Frontend

This is a minimal React + TypeScript project configured with Vite. It uses
OpenSeadragon for viewing high resolution images and Redux Toolkit for state
management.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run start
```

This will launch the application at `http://localhost:3000`.

The viewer expects TEI book images to be located under
`/book_data/images/page_*.jpg` relative to the project root. A simple navigation
interface allows moving between pages.
