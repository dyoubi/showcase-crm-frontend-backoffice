import React, { useEffect, useRef, useState } from 'react';

/**
 * Determines whether the element is currently hovered
 *
 * Taken from https://usehooks.com/useHover/
 * with some types and renaming
 *
 * @returns [ref, isHovered]
 */
export function useHover<T extends HTMLElement>(): [React.RefObject<T>, boolean] {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const ref = useRef<T>(null);

  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return () => undefined;
    }

    node.addEventListener('mouseenter', handleMouseOver);
    node.addEventListener('mouseleave', handleMouseOut);

    return () => {
      node.removeEventListener('mouseenter', handleMouseOver);
      node.removeEventListener('mouseleave', handleMouseOut);
    };
  }, [ref]);

  return [ref, isHovered];
}
