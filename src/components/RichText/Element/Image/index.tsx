import {
  RenderElementProps,
  useSlateStatic,
  ReactEditor,
  useSelected,
  useFocused,
} from 'slate-react';
import { Transforms } from 'slate';

import { Button } from '@/shared/Button';
import { IconTrash } from '@/shared/Icons';
import { Spacer } from '@/shared/Spacer';

import * as S from './styles';

export const Image = ({ attributes, children, element }: RenderElementProps) => {
  const editor = useSlateStatic();
  const selected = useSelected();
  const focused = useFocused();

  const path = ReactEditor.findPath(editor, element);
  return (
    <S.Container {...attributes}>
      {children}
      <S.ImageContainer align={element.align} contentEditable={false}>
        <div style={{ position: 'relative' }}>
          <S.ButtonsContainer>
            <Spacer size="xs" />
            <Button color="danger" onClick={() => Transforms.removeNodes(editor, { at: path })}>
              <IconTrash size="m" />
            </Button>
          </S.ButtonsContainer>
          <S.Img selected={selected} focused={focused} src={element.url} alt={element.url} />
        </div>
      </S.ImageContainer>
    </S.Container>
  );
};
