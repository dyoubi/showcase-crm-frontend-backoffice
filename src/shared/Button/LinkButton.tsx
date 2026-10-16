import { memo, forwardRef } from 'react';

import { Spacer } from '../Spacer';

import * as S from './styles';
import * as t from './types';

export type LinkButtonPropsType = t.LinkButtonType;

export const LinkButton = memo(forwardRef<HTMLAnchorElement, t.LinkButtonType>((
  {
    children,
    color = 'primary',
    disabled = false,
    href = '',
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    rel = '',
    size = 'l',
    target,
    ...restProps
  },
  ref,
) => {
  const isExternalLink = /^([^#/]|http|mailto|sms|tel)/g.test(href);

  const additionalProps = {
    rel: (isExternalLink) ? `${rel} noopener noreferrer` : rel,
    target: (isExternalLink) ? '_blank' : target,
  };

  return (
    <S.StyledLink
      ref={ref}
      to={href}
      disabled={disabled}
      color={color}
      style={{ height: 8, textDecoration: 'none' }}
      size={size}
      {...additionalProps}
      {...restProps}
    >
      {(LeftIcon) ? (
        <>
          <LeftIcon color="white" size="l" />
          <Spacer size="xxs" />
        </>
      ) : null}

      {children}

      {(RightIcon) ? (
        <>
          <Spacer size="xxs" />
          <RightIcon color="white" size="l" />
        </>
      ) : null}
    </S.StyledLink>
  );
}));

LinkButton.displayName = 'LinkButton';
