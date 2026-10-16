import { memo, ReactNode } from 'react';

import { generateId } from '@/utils';
import * as S from './styles';

interface TimeLineProps {
  items?: Array<{ title?: ReactNode; date?: string; content?: ReactNode }>;
}

export const TimeLine = memo(({ items }: TimeLineProps) => (
  <S.Container>
    <S.ListContainer>
      {items?.map((item) => (
        <S.Timeline key={generateId()}>
          {item.date && <S.Date>{item.date}</S.Date>}
          <S.Content>
            {item.title && <S.Title>{item.title}</S.Title>}
            {item.content}
          </S.Content>
        </S.Timeline>
      ))}
    </S.ListContainer>
  </S.Container>
));
