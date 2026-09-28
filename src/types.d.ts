type CaptureSide = 'left' | 'right';

interface Window {
  stashdex: {
    openLibrary: () => void;

    getCaptureSide: () => Promise<CaptureSide>;

    onCaptureSideChanged: (
      callback: (side: CaptureSide) => void,
    ) => () => void;
  };
}