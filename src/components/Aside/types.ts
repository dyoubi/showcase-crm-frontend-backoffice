import { DetailedHTMLProps, ReactNode } from 'react';

type DivProps = DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export type AsideProps = DivProps & {
  children: ReactNode;
  fullHeight?: boolean;
  fullWidth?: boolean;
  sticky?: boolean;
  width?: number;
};
