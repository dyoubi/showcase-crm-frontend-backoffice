import { ReactNode } from 'react';
import { FieldPath, FieldValues, useController } from 'react-hook-form';

import { getMediaUrl } from '@/domains/casino/media';
import { MediaPicker } from '../../MediaPicker';
import { ControlledInputProps } from '../types';

export interface MediaPickerRHFProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> extends ControlledInputProps<TFieldValues, TFieldName> {
  title?: ReactNode;
  className?: string;
}

export const MediaPickerRHF = ({ name, control, title, className }: MediaPickerRHFProps) => {
  const { field } = useController({ name, control });

  return (
    <MediaPicker
      title={title}
      mediaUrl={field.value}
      onSelect={(file) => field.onChange(getMediaUrl(file.file_id, file.revision))}
      className={className}
    />
  );
};
