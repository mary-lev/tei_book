# TEI Book Viewer: Development Plan

This document outlines the development plan for the TEI Book Viewer application.

## 1. Project Overview

The goal is to build a web application for displaying digitized historical books. The application will feature a dual-pane interface with synchronized TEI-encoded text and facsimile page images, allowing for rich scholarly interaction.

## 2. Analysis Summary

### Requirements (`FRONTEND_REQUIREMENTS.md`)

- **UI:** Responsive, dual-pane layout (Text/Image) with resizable panes.
- **Functionality:**
    - Synchronized navigation: clicking text highlights the corresponding image area, and vice-versa.
    - Standard viewer features: zooming, panning, page navigation, text search.
- **Design:** A modern, minimalist, and scholarly aesthetic with a provided design system (colors, fonts, spacing).
- **Accessibility:** WCAG 2.1 AA compliance is required.

### Data (`FRONTEND_DATA_PACKAGE.md` & `book_data/`)

- **Source:** A single TEI XML file (`book.xml`) contains all text and facsimile data.
- **Structure:**
    - `<facsimile>` section maps image zones (lines, blocks) to coordinates.
    - `<text>` section contains the transcribed text.
    - `facs` attributes link text segments to their corresponding image zones.
- **Assets:** Page images are provided as JPEGs in the `book_data/images/` directory.

## 3. Proposed Technology Stack

- **Framework:** React with Vite (for a fast development experience).
- **Language:** TypeScript (for type safety with complex data).
- **Styling:** A CSS-in-JS library like `Styled-components` or `Emotion` to easily work with the provided design tokens.
- **XML Parsing:** A browser-based XML parser like `fast-xml-parser`.
- **Image Viewer:** `OpenSeadragon` for its powerful handling of high-resolution, zoomable images.

## 4. Development Phases

Here is a visual representation of the development plan:

![Development Plan Diagram](https://mermaid.ink/svg/eyJjb2RlIjoiZ3JhcGggVERcbiAgICBzdWJncmFwaCBQaGFzZSAxOiBTZXR1cCAmIERhdGFcbiAgICAgICAgQVtQcm9qZWN0IFNjYWZmb2xkaW5nOiBWaXRlICsgUmVhY3QgKyBUU10gLS0-IEJ7RGF0YSBNb2RlbH07XG4gICAgICAgIENVWE1MIFBhcnNpbmcgTGlicmFyeV0gLS0-IEI7XG4gICAgICAgIEIgLS0-IEROUEFyc2UgYm9vay54bWxdO1xuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggUGhhc2UgMjogVUEgRGV2ZWxvcG1lbnRcbiAgICAgICAgRVtDcmVhdGUgVUEgQ29tcG9uZW50c10gLS0-IEZbRHVhbC1QYW5lIFZpZXdlcl07XG4gICAgICAgIEYgLS0-IEdcIlRleHQgUGFuZVwiO1xuICAgICAgICBGIC0tPiBHW0ltYWdlIFBhbmUgd2l0aCBPcGVuU2VhZHJhZ29uXTtcbiAgICAgICAgSVtTdGF0ZSBNYW5hZ2VtZW50XSAtLT4gRjtcbiAgICBfZW5kXG5cbiAgICBzdWJncmFwaCBQaGFzZSAzOiBJbnRlcmFjdGl2aXR5XG4gICAgICAgIEpbVGV4dC10by1JbWFnZSBTeW5jXSAtLT4gS3tTeW5jIExvZ2ljfTtcbiAgICAgICAgTFtJbWFnZS10by1UZXh0IFN5bmNdIC0tPiBLO1xuICAgICAgICBHIC0tPiBKO1xuICAgICAgICBIIC0tPiBMO1xuICAgICAgICBJIC0tPiBLO1xuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggUGhhc2UgNDogU3R5bGluZyAmIFBvbGlzaFxuICAgICAgICBNW0ltcGxlbWVudCBEZXNpZ24gU3lzdGVtXSAtLT4gTltSZXNwb25zaXZlIExheW91dHNdO1xuICAgICAgICBPW0FjY2Vzc2liaWxpdHldIC0tPiBOO1xuICAgIGVuZFxuXG4gICAgc3ViZ3JhcGggUGhhc2UgNTogRGVwbG95bWVudFxuICAgICAgICBRW0J1aWxkIGZvciBQcm9kdWN0aW9uXSAtLT4gUltEZXBsb3kgU3RhdGljIFNpdGVdO1xuICAgIGVuZFxuXG4gICAgRCAtLT4gRTtcbiAgICBLIC0tPiBNO1xuICAgIE4gLS0-IFE7XG4iLCJtZXJtYWlkIjp7InRoZW1lIjoiZGVmYXVsdCJ9fQ)

### Phase 1: Project Setup & Data Model
- Initialize the Vite + React + TypeScript project.
- Set up the core data structures (TypeScript types) for the book, pages, text segments, and zones.
- Implement the logic to fetch and parse the `book.xml` file into this data structure.

### Phase 2: UI Development
- Build the main UI components: `Header`, `Viewer`, `TextPane`, `ImagePane`.
- Integrate `OpenSeadragon` into the `ImagePane`.
- Set up a state management solution (e.g., React Context or Zustand) to handle application state like the current page and active zone.

### Phase 3: Interactivity & Synchronization
- Implement the core text-to-image and image-to-text highlighting and navigation logic.
- Wire up the UI components to the state management to ensure they react to changes.

### Phase 4: Styling & Finishing Touches
- Apply the provided design system (colors, fonts, spacing) using a CSS-in-JS solution.
- Ensure the layout is fully responsive for desktop, tablet, and mobile.
- Perform an accessibility audit and implement necessary improvements (ARIA attributes, keyboard navigation).

### Phase 5: Build and Deployment
- Configure the build process to generate optimized static assets.
- The repository now contains a GitHub Actions workflow that builds the viewer
  and publishes the `tei-book-viewer/dist` directory to GitHub Pages. After the
  workflow runs on `main`, the site will be served from
  `https://<username>.github.io/tei_book/`.

## 5. Next Steps
The immediate next step is to begin Phase 1: **Project Setup**. This involves creating the initial project structure and starting the data parsing implementation. 