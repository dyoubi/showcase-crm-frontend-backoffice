import { useAppTheme } from '@/hooks';

import * as S from './styles';
import * as t from './types';

export const Link = (props: t.LinkPropsType) => {
  const {
    children,
    className,
    href,
    rel = '',
    target,
  } = props;

  const { isDarkMode } = useAppTheme();

  const isExternalLink = /^([^#/]|http|mailto|sms|tel)/g.test(href);

  const additionalProps = {
    $isDarkMode: isDarkMode,
    rel: (isExternalLink) ? `${rel} noopener noreferrer` : rel,
    target: (isExternalLink) ? '_blank' : target,
  };

  return (
    <S.StyledLink
      className={className}
      to={href}
      {...additionalProps}
    >
      {children}
    </S.StyledLink>
  );
};
