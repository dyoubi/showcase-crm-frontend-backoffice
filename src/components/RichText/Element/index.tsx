import { RenderElementProps } from 'slate-react';

import { Image } from './Image';
import { ButtonElement } from './Button';
import * as S from './styles';

export const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: element.align };
  switch (element.type) {
    case 'block-quote':
      return (
        <S.Blockquote style={style} {...attributes}>
          {children}
        </S.Blockquote>
      );
    case 'bulleted-list':
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case 'heading-one':
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case 'heading-two':
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case 'heading-three':
      return (
        <h3 style={style} {...attributes}>
          {children}
        </h3>
      );
    case 'heading-four':
      return (
        <h4 style={style} {...attributes}>
          {children}
        </h4>
      );
    case 'heading-five':
      return (
        <h5 style={style} {...attributes}>
          {children}
        </h5>
      );
    case 'heading-six':
      return (
        <h6 style={style} {...attributes}>
          {children}
        </h6>
      );
    case 'list-item':
      return (
        <li style={style} {...attributes}>
          {children}
        </li>
      );
    case 'numbered-list':
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case 'image':
      return (
        <Image attributes={attributes} element={element}>
          {children}
        </Image>
      );
    case 'button':
      return (
        <ButtonElement attributes={attributes} element={element}>
          {children}
        </ButtonElement>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};
