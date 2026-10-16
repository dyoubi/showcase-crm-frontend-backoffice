import { useController } from 'react-hook-form';
import { Descendant } from 'slate';

import { RichText, VoidValue } from '../../RichText';
import { ControlledInputProps } from '../types';

interface ControlledRichTextProps extends ControlledInputProps {
  defaultValue?: Descendant[];
}

export const RichTextRHF = ({ name, control, defaultValue }: ControlledRichTextProps) => {
  const { field } = useController({
    name,
    control,
    defaultValue,
  });
  const { onChange, value } = field;

  return <RichText value={value || VoidValue} onChange={onChange} />;
};
