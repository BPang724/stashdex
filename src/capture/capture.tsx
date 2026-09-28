import React, {
  type FormEvent,
  useEffect,
  useState,
} from 'react';
import { createRoot } from 'react-dom/client';

import './capture.css';
type CaptureItemType = 'url' | 'text';

const detectCaptureType = (value: string): CaptureItemType => {
  try {
    const url = new URL(value);

    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return 'url';
    }
  } catch {
    // The value is not a valid URL, so treat it as plain text.
  }

  return 'text';
};

function CaptureApp() {
  const [side, setSide] = useState<CaptureSide>('right');
  const [expanded, setExpanded] = useState(
    () => window.innerWidth > 100,
  );

  const [value, setValue] = useState('');
  const [status, setStatus] = useState<string | null>(null);

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

  const trimmedValue = value.trim();

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>,
  ): void => {
    event.preventDefault();

    if (!trimmedValue) {
      setStatus('Enter a URL or text first.');
      return;
    }

    const type = detectCaptureType(trimmedValue);

    console.log('Temporary capture:', {
      type,
      content: trimmedValue,
    });

    setValue('');

    setStatus(
      type === 'url'
        ? 'URL saved temporarily.'
        : 'Text saved temporarily.',
    );
  };

  return (
    <main className={`capture capture--${side}`}>
      <div className="capture-icon" aria-label="Drag Stashdex">
        <span>S</span>
      </div>

      {expanded && (
        <div className="capture-panel">
          <h1>Stashdex</h1>

          <form
            className="capture-form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Paste a URL or text..."
              aria-label="URL or text"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
                setStatus(null);
              }}
              autoFocus
            />

            <button
              type="submit"
              disabled={!trimmedValue}
            >
              Save
            </button>
          </form>

          <button
            type="button"
            onClick={() => window.stashdex.openLibrary()}
          >
            Open Library
          </button>

          {status && (
            <p
              className="capture-status"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
          )}
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