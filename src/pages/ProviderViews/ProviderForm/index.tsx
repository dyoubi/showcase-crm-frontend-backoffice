import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { MediaPickerRHF } from '@/components/RHF/MediaPicker';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';
import { GetProvidersResponse } from '@/domains/casino/provider';

import { Button } from '@/shared/Button';
import { Spacer } from '@/shared/Spacer';
import { Input } from '@/shared/Input';
import { Checkbox } from '@/shared/Checkbox';
import { Flex } from '@/shared/Flex';

import * as t from './types';
import { useHandleProviderFormSubmit } from './hooks';
import { validationSchema } from './validationSchema';

interface ProviderFormProps {
  onFormSubmitted?: () => void;
  editProvider: GetProvidersResponse[number];
}

export const ProviderForm = ({ onFormSubmitted, editProvider }: ProviderFormProps) => {
  const formData = useForm<t.ProviderFormType>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: editProvider?.name,
      position: editProvider?.position?.toString(),
      image: editProvider?.image?.desktop?.url,
      isActive: editProvider?.activate,
    },
  });
  const { handleSubmit } = formData;
  const { onSubmit } = useHandleProviderFormSubmit({
    provider: editProvider,
    onFormSubmitted,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...getInputProps(formData, 'name')} />
      <Spacer />
      <Input label="Position" type="number" {...getInputProps(formData, 'position')} />
      <Spacer />
      <MediaPickerRHF {...getControlledInputProps(formData, 'image')} />
      <Spacer />
      <Flex>
        <Checkbox {...getInputProps(formData, 'isActive')} />
        <Spacer size="xs" />
        <span>Active provider on my casino</span>
      </Flex>
      <Spacer />
      <Flex justifyContent="center">
        <Button type="submit">Edit provider</Button>
      </Flex>
    </form>
  );
};
