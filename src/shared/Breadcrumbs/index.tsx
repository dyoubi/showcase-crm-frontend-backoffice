import React, { memo, useMemo } from 'react';

import { generateId } from '@/utils';
import { BreadcrumbItem } from './BreadcrumbItem';
import * as S from './styles';

interface BreadcrumbsProps {
  breadcrumbs?: ReadonlyArray<{ content?: React.ReactNode; link?: string }>;
  className?: string;
}

export const Breadcrumbs = memo(({ breadcrumbs = [], className }: BreadcrumbsProps) => {
  // hooks
  const itemsWithId = useMemo(
    () => breadcrumbs?.map((item) => ({ ...item, id: generateId() })),
    [breadcrumbs],
  );

  return (
    <S.Container className={className} flexDirection="row" alignItems="center">
      {itemsWithId.map((item, index) => (
        <BreadcrumbItem
          key={item.id}
          content={item.content}
          link={item.link}
          isLast={index + 1 === breadcrumbs?.length}
        />
      ))}
    </S.Container>
  );
});
