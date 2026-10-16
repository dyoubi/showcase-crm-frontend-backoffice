import { forwardRef, isValidElement } from 'react';

import { Flex } from '@/shared/Flex';
import { IconFC } from '@/shared/Icons/types';
import { LoadingOverlay } from '@/shared/LoadingOverlay';
import { Spacer } from '@/shared/Spacer';

import { Title } from '@/components/Title';

import * as S from './styles';
import * as t from './types';

export const Card = forwardRef<HTMLDivElement | null, t.CardProps>((
  {
    children,
    icon,
    leftContent,
    loadingOverlay,
    loadingOverlayDataTestId,
    rightContent,
    title,
    topContent,
    width,
    ...restProps
  }: t.CardProps,
  ref,
) => {
  const renderIcon = () => {
    if (isValidElement(icon)) {
      return icon;
    };

    const Icon = icon as IconFC;

    return <Icon color="currentColor" size="l" />;
  };

  return (
    <S.Card ref={ref} {...restProps} width={width}>
      {(loadingOverlay) ? <LoadingOverlay dataTestId={loadingOverlayDataTestId} /> : null}

      {(icon || title || topContent) ? (
        <S.TitleContainer>
          {(icon) ? (
            <>
              {renderIcon()}
              <Spacer size="xs" />
            </>
          ) : null}

          {(title) ? <Title>{title}</Title> : null}

          <Flex flex={1} />

          {topContent}
        </S.TitleContainer>
      ) : null}

      <S.ContentContainer>
        <S.SideContent>
          {leftContent}
        </S.SideContent>

        <S.SideContent>
          {rightContent}
        </S.SideContent>
      </S.ContentContainer>

      {children}
    </S.Card>
  );
});

Card.displayName = 'Card';

export * from './types';
