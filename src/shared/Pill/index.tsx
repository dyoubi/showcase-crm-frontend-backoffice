import * as S from './styles';
import * as t from './types';

export const Pill = (props: t.PillPropsType) => {
  const {
    children,
    color = 'primary',
  } = props;

  return (
    <S.StyledPill color={color}>
      {children}
    </S.StyledPill>
  );
};
