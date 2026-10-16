import { memo, ReactNode } from 'react';
import * as S from './styles';

interface StickyProps {
  children: ReactNode;
  top?: number;
  className?: string;
}
export const Sticky = memo(({ top, children, className }: StickyProps) => {
  return (
    <S.Container top={top} className={className}>
      {children}
    </S.Container>
  );
});
