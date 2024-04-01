import { useEffect } from 'react';

const useDetectOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  handler: (value: boolean) => void,
) => {
  const listener = (e: MouseEvent) => {
    if (!ref.current || ref.current.contains(e.target as Node)) {
      return;
    }
    e.stopPropagation();
    handler(false);
  };

  useEffect(() => {
    window.addEventListener('click', listener);
    return () => {
      window.removeEventListener('click', listener);
    };
  });
};
export default useDetectOutsideClick;
