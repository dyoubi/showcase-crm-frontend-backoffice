import { Editor, Element } from 'slate';

// taken from : https://github.com/ianstormtaylor/slate/blob/8eb1972b5b2f9489936b1759afb76574040af5a0/site/examples/images.tsx#L39
export const withImages = (editor: Editor) => {
  const { isVoid } = editor;

  editor.isVoid = (element: Element) => {
    return element.type === 'image' ? true : isVoid(element);
  };

  return editor;
};
