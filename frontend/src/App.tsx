import React from 'react';
import Viewer from './Viewer';

export default function App() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <h1>TEI Book Viewer</h1>
      <Viewer />
    </div>
  );
}
