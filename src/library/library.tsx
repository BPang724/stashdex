import React from 'react';
import { createRoot } from 'react-dom/client';

import './library.css';

function LibraryApp() {
  return (
    <main className="library">
      <h1>Stashdex Library</h1>

      <p>Your saved items will appear here.</p>
    </main>
  );
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Library root element not found');
}

createRoot(rootElement).render(
  <React.StrictMode>
    <LibraryApp />
  </React.StrictMode>,
);