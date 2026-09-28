import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import './capture.css';

function CaptureApp() {
  const [side, setSide] = useState<CaptureSide>('right');

  const [expanded, setExpanded] = useState(
    () => window.innerWidth > 100,
  );

  useEffect(() => {
    let mounted = true;

    void window.stashdex.getCaptureSide().then((currentSide) => {
      if (mounted) {
        setSide(currentSide);
      }
    });

    const unsubscribe = window.stashdex.onCaptureSideChanged((newSide) => {
      setSide(newSide);
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const handleResize = (): void => {
      setExpanded(window.innerWidth > 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <main className={`capture capture--${side}`}>
      <div className="capture-icon" aria-label="Drag Stashdex">
        <span>S</span>
      </div>

      {expanded && (
        <div className="capture-panel">
          <h1>Stashdex</h1>

          <input
            type="text"
            placeholder="URL / Text"
            aria-label="URL or text"
          />

          <button type="button">
            Save
          </button>

          <button
            type="button"
            onClick={() => window.stashdex.openLibrary()}
          >
            Open Library
          </button>
        </div>
      )}
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