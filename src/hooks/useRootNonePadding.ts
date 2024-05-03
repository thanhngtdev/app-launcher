import { useLayoutEffect } from 'react';

const useRootNonePadding = () => {
  useLayoutEffect(() => {
    const mainRoot = document.querySelector('main');
    if (mainRoot) {
      mainRoot.classList.add('p-0');
    }

    return () => {
      if (mainRoot) {
        mainRoot.classList.remove('p-0');
      }
    };
  }, []);
};

export default useRootNonePadding;
