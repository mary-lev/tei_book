import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Primary Colors */
    --primary-text: #1a365d;
    --secondary-text: #4a5568;
    --accent-color: #8b1538;
    --accent-hover: #701434;

    /* Fonts */
    --font-primary: 'EB Garamond', 'Libre Baskerville', 'Georgia', serif;
    --font-text: 'Crimson Pro', 'EB Garamond', 'Times New Roman', serif;
    --font-ui: 'Inter', 'SF Pro Display', system-ui, sans-serif;

    /* Background Colors */
    --bg-primary: #fdfdf8;
    --bg-secondary: #f7f7f0;
    --bg-tertiary: #ede8d3;

    /* Interactive States */
    --highlight-text: #8b1538;
    --highlight-zone: rgba(139, 21, 56, 0.15);
    --success-color: #2d5016;
    --border-color: #c5c1aa;

    /* Typography Scale */
    --text-xs: 0.75rem;
    --text-sm: 0.875rem;
    --text-base: 1rem;
    --text-lg: 1.125rem;
    --text-xl: 1.25rem;
    --text-2xl: 1.5rem;
    --text-3xl: 1.875rem;

    /* Line Heights */
    --leading-tight: 1.25;
    --leading-normal: 1.5;
    --leading-relaxed: 1.75;
    --leading-loose: 2.0;

    /* Spacing System */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-5: 1.25rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-10: 2.5rem;
    --space-12: 3rem;
    --space-16: 4rem;
    --space-20: 5rem;
    --space-24: 6rem;
  }

  :root.dark {
    /* Primary Colors */
    --primary-text: #f7f5f0;
    --secondary-text: #a69b85;
    --accent-color: #c97064;
    --accent-hover: #b85c4f;

    /* Fonts */
    --font-primary: 'EB Garamond', 'Libre Baskerville', 'Georgia', serif;
    --font-text: 'Crimson Pro', 'EB Garamond', 'Times New Roman', serif;
    --font-ui: 'Inter', 'SF Pro Display', system-ui, sans-serif;

    /* Background Colors */
    --bg-primary: #2d2520;
    --bg-secondary: #3a322b;
    --bg-tertiary: #4a3f35;

    /* Interactive States */
    --highlight-text: #c97064;
    --highlight-zone: rgba(201, 112, 100, 0.15);
    --success-color: #7d9c65;
    --border-color: #6b5b4a;
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    line-height: var(--leading-normal);
  }

  body {
    margin: 0;
    padding: 0;
    font-family: var(--font-primary);
    color: var(--primary-text);
    background-color: var(--bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-feature-settings: 'liga', 'kern';
    text-rendering: optimizeLegibility;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 var(--space-6) 0;
    font-weight: 400;
    line-height: var(--leading-tight);
    font-family: var(--font-primary);
  }

  h1 { font-size: var(--text-3xl); }
  h2 { font-size: var(--text-2xl); }
  h3 { font-size: var(--text-xl); }
  h4 { font-size: var(--text-lg); }
  h5 { font-size: var(--text-base); }
  h6 { font-size: var(--text-sm); }

  p {
    margin: 0 0 var(--space-5) 0;
    line-height: var(--leading-loose);
    font-family: var(--font-text);
  }

  /* Links */
  a {
    color: var(--accent-color);
    text-decoration: none;
    transition: color 0.15s ease;

    &:hover {
      color: var(--accent-hover);
    }
  }

  /* Buttons */
  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
  }

  /* Focus styles for accessibility */
  *:focus {
    outline: 2px solid var(--accent-color);
    outline-offset: 2px;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--bg-secondary);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--border-color);
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: var(--secondary-text);
  }

  /* Utility classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`; 