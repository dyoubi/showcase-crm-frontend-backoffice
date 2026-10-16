import { Helmet } from 'react-helmet';
import { useCurrentCasino } from '@/domains/casino/hooks';

interface HeadTitleProps {
  children?: string;
}

export const HeadTitle = ({ children }: HeadTitleProps) => {
  const currentCasino = useCurrentCasino();
  return (
    <Helmet>
      <title>
        {currentCasino?.name || ''} ~ {children}
      </title>
    </Helmet>
  );
};
