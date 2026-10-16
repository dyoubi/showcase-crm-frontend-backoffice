import { memo, ReactNode, ComponentType, CSSProperties } from 'react';

import { NativeDivProps } from '@/utils/typescript.helpers';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import Yggdrasil from './providersLogo/yggdrasil.svg?component';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import NoLimit from './providersLogo/no-limit.svg?component';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import Pragmatic from './providersLogo/pragmatic-play.svg?component';

import * as S from './styles';

export interface GameThumbnailProps extends NativeDivProps {
  provider?: string;
  title?: string;
  image?: string;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const logos: Record<string, ComponentType<{ style: CSSProperties }>> = {
  yggdrasil: Yggdrasil,
  'no-limit': NoLimit,
  'pragmatic-play': Pragmatic,
};

export const GameThumbnail = memo(
  ({ provider = '', title, image, onClick, children, className, ...rest }: GameThumbnailProps) => {
    const Logo = logos?.[provider];
    return (
      <S.Container image={image} className={className} onClick={onClick} {...rest}>
        {children}
        <S.Bottom>
          <S.Name>{title}</S.Name>
          <S.LogoContainer>{Logo && <Logo style={{ width: 90 }} />}</S.LogoContainer>
        </S.Bottom>
      </S.Container>
    );
  },
);
