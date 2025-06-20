# TEI Book Viewer

This project is a web-based viewer for digitized books encoded in the Text Encoding Initiative (TEI) format. It provides a synchronized, dual-pane interface for exploring the transcribed text alongside the original page facsimiles.

The viewer is built as a modern, responsive single-page application, designed for both scholarly research and general reading.

## Features

-   **Dual-Pane Interface**: Synchronized side-by-side view of the book's text and page images.
-   **Interactive Highlighting**: Clicking on a line of text highlights the corresponding region on the page image, and vice-versa.
-   **Page Navigation**: Easy-to-use controls for turning pages.
-   **Responsive Design**: The layout automatically adjusts for optimal viewing on desktops, tablets, and mobile devices.
-   **TEI Parser**: A custom parser processes the TEI XML to extract page, text, and coordinate data.

## Tech Stack

-   **Framework**: [React](https://reactjs.org/) (with [Vite](https://vitejs.dev/))
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Styling**: [Styled Components](https://styled-components.com/)
-   **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
-   **XML Parsing**: [fast-xml-parser](https://github.com/NaturalIntelligence/fast-xml-parser)

## Project Structure

The project follows a standard Vite + React setup. Key directories include:

-   `public/book_data/`: Contains the TEI XML file (`book.xml`) and the directory of page images.
-   `src/components/`: Contains all the reusable React components that make up the user interface (e.g., `Header`, `Viewer`, `TextPane`, `ImagePane`).
-   `src/hooks/`: Custom React hooks, such as `useBookData` for loading and managing the book data.
-   `src/store/`: State management logic using Zustand. `viewerStore.ts` defines the central application state.
-   `src/styles/`: Global styles and theme variables.
-   `src/types/`: TypeScript type definitions for the book data structures.
-   `src/utils/`: Utility functions, most notably the `teiParser.ts` which handles the TEI XML parsing.

## Getting Started

### Prerequisites

-   Node.js (v18 or later recommended)
-   npm

### Installation

1.  Clone the repository.
2.  Navigate to the `tei-book-viewer` directory:
    ```sh
    cd tei-book-viewer
    ```
3.  Install the dependencies:
    ```sh
    npm install
    ```

### Running the Development Server

To run the app in development mode, use the following command. This will start a local server, typically on `http://localhost:5173`.

```sh
npm run dev
```

### Building for Production

To create an optimized production build, run:

```sh
npm run build
```

The build artifacts will be stored in the `dist/` directory.
