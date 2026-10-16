import { DevTool } from '@hookform/devtools';
import { yupResolver } from '@hookform/resolvers/yup';
import cap from 'lodash/capitalize';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { SelectRHF } from '@/components/RHF/Select';
import { Title } from '@/components/Title';
import { Tag, TagTypeEnums } from '@/domains/casino/tag';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { Badge } from '@/shared/Badge';
import { Button } from '@/shared/Button';
import { Card } from '@/shared/Card';
import { IconArrowLeft, IconPalette } from '@/shared/Icons';
import { Input } from '@/shared/Input';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';

import { useTagColor } from '../hooks';
import { useHandleFormSubmit } from './hooks';
import * as t from './types';
import { validationSchema } from './validationSchema';

const tagOptions = Object.values(TagTypeEnums).map((v) => ({ label: cap(v), value: v }));

interface TagFormProps {
  tagToEdit?: Tag;
  setTagEdit: (tag: Tag | undefined) => void;
}

export const TagForm = memo(({ tagToEdit, setTagEdit }: TagFormProps) => {
  const formData = useForm<t.TagForm>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: tagToEdit?.name,
      color: tagToEdit?.color,
      type: tagToEdit?.type,
      slug: tagToEdit?.key,
    },
  });

  const { control, handleSubmit } = formData;
  const isEditMode = !!tagToEdit?.id;
  const onSubmit = handleSubmit(useHandleFormSubmit(tagToEdit?.id));

  const tagColor = useTagColor(formData.watch('name') || '');

  return (
    <form onSubmit={onSubmit}>
      <DevTool control={control} />
      <Card width={360} style={{ position: 'sticky', top: 12 }}>
        <Flex flexDirection="row">
          {isEditMode && (
            <>
              <IconArrowLeft style={{ cursor: 'pointer' }} onClick={() => setTagEdit(undefined)} />
              <Spacer size="xs" />
            </>
          )}
          <Title>{isEditMode ? 'Edit tag :' : 'New tag'}</Title>
          {isEditMode && (
            <>
              <Spacer size="xs" />
              <Badge color={tagToEdit?.color}>{tagToEdit?.name}</Badge>
            </>
          )}
        </Flex>
        <Spacer size="m" />
        <Input
          {...getInputProps(formData, 'name')}
          label="Name"
          onChangeCapture={() => {
            formData.setValue('color', tagColor);
          }}
        />
        <Spacer size="m" />
        <SelectRHF
          label="Type"
          options={tagOptions}
          {...getControlledInputProps(formData, 'type')}
        />
        <Spacer size="m" />
        <Input
          {...getInputProps(formData, 'color')}
          leftIcon={IconPalette}
          label="Color"
          type="color"
        />
        <Spacer size="m" />
        <Input {...getInputProps(formData, 'slug')} label="Slug" type="text" />
        <Spacer size="m" />
        <Flex justifyContent="center">
          <Button type="submit">Save</Button>
        </Flex>
      </Card>
    </form>
  );
});
