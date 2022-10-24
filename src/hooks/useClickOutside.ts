import { useEffect } from 'react';

export const useClickOutside = <Element extends HTMLElement>(
  refs: any[],
  handler: () => void
) => {
  useEffect(() => {
    const onClick = (event: any) => {
      const isClickedOutside = refs.map((ref) => {
        if (ref.current && !ref.current.contains(event.target)) {
          return true;
        }
      });

      if (isClickedOutside.every((el) => el === true)) {
        handler();
      }
    };

    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('mousedown', onClick);
    };
  });
};
