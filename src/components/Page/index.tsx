import React, { memo } from 'react';
import { routes } from '@/libs/router/constants';

import { Breadcrumbs } from '@/shared/Breadcrumbs';
import { Spacer } from '@/shared/Spacer';
import { HeadTitle } from '../HeadTitle';
import * as S from './styles';

type NativeDivProps = Omit<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  'ref'
>;

interface PageProps extends NativeDivProps {
  breadcrumbs?: ReadonlyArray<{ content?: React.ReactNode; link?: string }>;
  headTitle?: string;
}

export const Page = memo(({ breadcrumbs, children, headTitle, ...props }: PageProps) => (
  <S.Container {...props}>
    {headTitle && <HeadTitle>{headTitle}</HeadTitle>}

    {breadcrumbs?.length && (
      <>
        <Breadcrumbs
          breadcrumbs={[{ content: 'Dashboard', link: routes.DASHBOARD }, ...breadcrumbs]}
        />
        <Spacer size="m" />
      </>
    )}
    {children}
  </S.Container>
));
