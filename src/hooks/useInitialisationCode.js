import { useState } from 'react';

export const useInit = (initCallback) => {
  const [initialized, setInitialized] = useState(false);

  if (!initialized) {
    initCallback();
    setInitialized(true);
  }
};

// simple hook to avoid useEffect dependency array probs with code that needs to run only once
// usage
// useInit(() => {
//   // Your code here will be run only once
// });
