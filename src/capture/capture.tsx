import React from 'react';
import { createRoot } from 'react-dom/client';

import './capture.css';

function CaptureApp() {
  return (
    <main className="capture">
      <h1>Stashdex</h1>

      <input
        type="text"
        placeholder="URL / Text"
        aria-label="URL or text"
      />

      <button type="button">Save</button>
      <button
        type="button"
        onClick={() => window.stashdex.openLibrary()}
      >
        Open Library
      </button>
    </main>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Capture root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <CaptureApp />
  </React.StrictMode>,
);