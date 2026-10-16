import React, { memo } from 'react';

import * as S from './styles';

interface BreadcrumbItemProps {
  content?: React.ReactNode;
  link?: string;
  isLast?: boolean;
}

export const BreadcrumbItem = memo(({ content, link, isLast }: BreadcrumbItemProps) => {
  if (isLast) {
    return <S.LastBreadcrumb>{content}</S.LastBreadcrumb>;
  }

  return (
    <>
      <S.Link to={link || '.'}>
        <span>{content}</span>
      </S.Link>
      <S.Arrow>&gt;</S.Arrow>
    </>
  );
});
