import { forwardRef } from 'react';

import * as S from './styles';
import * as t from './types';

export const Comment = forwardRef<HTMLLIElement, t.CommentPropsType>((props, ref) => {
  const {
    author,
    comment,
    date,
    isSystem = false,
    ...rest
  } = props;

  return (
    <S.StyledRoot ref={ref} isSystem={isSystem} {...rest}>
      <S.StyledContent color={rest.color === 'primary' ? 'validated' : undefined}>
        <S.StyledHeader>
          <S.StyledAuthor
            align={rest.align}
            color={rest.color}
            isSystem={isSystem}
          >
            {author}
          </S.StyledAuthor>

          <S.StyledDate align={rest.align}>@ {date}</S.StyledDate>
        </S.StyledHeader>

        <p>{comment}</p>
      </S.StyledContent>
    </S.StyledRoot>
  );
});
