import { memo, RefObject } from 'react';
import { useOnClickOutside } from '../../hooks';

interface OnClickOutsideProps {
  containerRef: RefObject<HTMLDivElement>;
  onClose: () => void;
}

export const OnClickOutside = memo(({ containerRef, onClose }: OnClickOutsideProps) => {
  useOnClickOutside(containerRef, onClose);
  return null;
});
