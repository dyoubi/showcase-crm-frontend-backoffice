import { Colors } from "@emotion/react";

export type NativeDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

export interface CommentType {
  id?: string,
  authorId?: string,
  author: string,
  comment: string,
  isSystem?: boolean,
  date: string,
}

export interface CommentPropsType extends CommentType, NativeDivProps {
  align?: 'left' | 'right',
  color?: Colors,
}
