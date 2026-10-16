import { DetailedHTMLProps, ButtonHTMLAttributes, memo } from 'react';

import { Flex } from '@/shared/Flex';
import * as S from './styles';

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

interface ToolButtonProps extends NativeButtonProps {
  isActive?: boolean;
}

export const ToolButton = memo(({ isActive, children, ...restProps }: ToolButtonProps) => {
  return (
    <S.Button {...restProps} isActive={isActive} type="button">
      <Flex alignItems="center" justifyContent="center">
        {children}
      </Flex>
    </S.Button>
  );
});
