import { createContext, Dispatch } from 'react';
import { Descendant } from 'slate';

interface RichTextContextType {
  value: Descendant[];
  setValue: Dispatch<Descendant[]>;
}

export const RichTextContext = createContext<RichTextContextType | undefined>(undefined);
