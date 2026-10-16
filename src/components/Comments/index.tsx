import { useEffect, useRef } from 'react';

import { useAuth } from 'react-oidc-context';
import { useAppDateFormat } from '@/hooks';

import { Comment } from '@/shared/Comment';
import { CommentType } from '@/shared/Comment/types';

import * as S from './styles';


interface CommentsProps {
  comments?: CommentType[] | [],
  fullHeight?: boolean,
  fullWidth?: boolean,
}

export const Comments = (props: CommentsProps) => {
  const {
    comments = [],
    fullHeight = false,
    fullWidth = false,
  } = props;

  const { user } = useAuth();
  const { formatDate } = useAppDateFormat();
  const containerRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  });

  // TODO: This should be defined during the Comments section implementation
  // TODO:  Should use the userId, id, or the issuedBy
  const currentAgentId = user?.profile?.userId;

  return (
    <S.Container
      ref={containerRef}
      fullHeight={fullHeight}
      fullWidth={fullWidth}
    >
      {comments.map((comment) => (
        <Comment
          {...comment}
          key={comment.id}
          align={(comment.authorId === currentAgentId) ? 'right' : 'left'}
          color={(comment.authorId === currentAgentId) ? 'primary' : undefined}
          date={formatDate(comment.date, { displayFullDate: true })}
          // TODO: Define how we would store the reports and mark them as a comment within the conversation
          // TODO:    We would need to define a systemId or leave it empty.
          isSystem={(comment.isSystem || !comment.authorId)}
        />
      ))}
    </S.Container>
  );
};
