import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@/shared/Button';
import { Spacer } from '@/shared/Spacer';
import { Input } from '@/shared/Input';
import { Checkbox } from '@/shared/Checkbox';
import { Flex } from '@/shared/Flex';
import { RichTextRHF } from '@/components/RHF/RichTextRHF';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';

import * as S from './styles';
import * as t from './types';
import { useOnFormSubmit } from './hooks';
import { useStandardFormValidationSchema } from './validationSchema';

interface StandardFormProps {
  onFormSubmitted?: () => void;
}

export const StandardForm = ({ onFormSubmitted }: StandardFormProps) => {
  const formData = useForm<t.CategoryForm>({
    resolver: yupResolver(useStandardFormValidationSchema()),
  });
  const { handleSubmit } = formData;
  const { onSubmit } = useOnFormSubmit({
    onFormSubmitted,
  });

  // for custom RHF's inputs we must use the getControlledInputProps helper
  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      {/* we must use the getInputProps helper for being more the typescript safe & increase DevX */}
      <Input label="Name" {...getInputProps(formData, 'name')} />
      <Spacer />
      <Input label="Slug" type="number" {...getInputProps(formData, 'slug')} />
      <Spacer />
      <Flex>
        <Checkbox {...getInputProps(formData, 'isActive')} />
        <Spacer size="xs" />
      </Flex>
      <Spacer />
      {/* for custom RHF's inputs we must use the getControlledInputProps helper */}
      <RichTextRHF {...getControlledInputProps(formData, 'isActive')} />
      <Spacer />
      <Flex justifyContent="center">
        <Button type="submit">Save</Button>
      </Flex>
    </S.Form>
  );
};
