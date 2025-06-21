import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    /* Primary Colors */
    --primary-text: #2c3e50;
    --secondary-text: #7f8c8d;
    --accent-color: #3498db;
    --accent-hover: #2980b9;

    /* Background Colors */
    --bg-primary: #ffffff;
    --bg-secondary: #f8f9fa;
    --bg-tertiary: #ecf0f1;

    /* Interactive States */
    --highlight-text: #e74c3c;
    --highlight-zone: rgba(52, 152, 219, 0.2);
    --success-color: #27ae60;
    --border-color: #bdc3c7;

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

    /* Spacing System */
    --space-1: 0.25rem;
    --space-2: 0.5rem;
    --space-3: 0.75rem;
    --space-4: 1rem;
    --space-6: 1.5rem;
    --space-8: 2rem;
    --space-12: 3rem;
    --space-16: 4rem;
  }

  :root.dark {
    /* Primary Colors */
    --primary-text: #ecf0f1;
    --secondary-text: #95a5a6;
    --accent-color: #2980b9;
    --accent-hover: #1abc9c;

    /* Background Colors */
    --bg-primary: #2c3e50;
    --bg-secondary: #34495e;
    --bg-tertiary: #22313f;

    /* Interactive States */
    --highlight-text: #e74c3c;
    --highlight-zone: rgba(41, 128, 185, 0.2);
    --success-color: #27ae60;
    --border-color: #7f8c8d;
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
    font-family: 'Inter', 'SF Pro Display', system-ui, sans-serif;
    color: var(--primary-text);
    background-color: var(--bg-primary);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 var(--space-4) 0;
    font-weight: 600;
    line-height: var(--leading-tight);
  }

  h1 { font-size: var(--text-3xl); }
  h2 { font-size: var(--text-2xl); }
  h3 { font-size: var(--text-xl); }
  h4 { font-size: var(--text-lg); }
  h5 { font-size: var(--text-base); }
  h6 { font-size: var(--text-sm); }

  p {
    margin: 0 0 var(--space-4) 0;
    line-height: var(--leading-relaxed);
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