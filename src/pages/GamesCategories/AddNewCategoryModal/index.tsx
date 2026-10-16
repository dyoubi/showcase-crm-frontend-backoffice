import { yupResolver } from '@hookform/resolvers/yup';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';

import { MediaPickerRHF } from '@/components/RHF/MediaPicker';
import { Modal } from '@/shared/Modal';
import { IconAbacus } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { TextArea } from '@/shared/TextArea';
import { Input } from '@/shared/Input';

import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';

import { getControlledInputProps, getInputProps } from '@/libs/react-hook-form/utils';
import { useHandleFormSubmit, useValidationSchema } from './hooks';

import * as t from './types';

interface AddNewCategoryModalProps {
  show: boolean;
  onHide: () => void;
  onCasinoAdd: () => void;
}

export const AddNewCategoryModal = ({ show, onHide, onCasinoAdd }: AddNewCategoryModalProps) => {
  const formData = useForm<t.AddCategoryForm>({
    resolver: yupResolver(useValidationSchema()),
  });

  const { control, handleSubmit } = formData;
  const { onSubmit, isLoading } = useHandleFormSubmit(onCasinoAdd, formData.setValue);

  const onSubmitCallback = handleSubmit(onSubmit);

  return (
    <Modal
      minHeight="60%"
      icon={IconAbacus}
      show={show}
      loadingOverlay={isLoading}
      title="Add new category"
      onHide={onHide}
    >
      <form onSubmit={onSubmitCallback}>
        <DevTool control={control} />
        <Spacer size="m" />
        <Input {...getInputProps(formData, 'name')} label="Name" />
        <Spacer size="m" />
        <Input {...getInputProps(formData, 'slug')} label="Slug" />
        <Spacer size="m" />
        <TextArea
          {...getInputProps(formData, 'description')}
          label="Description"
          resize="vertical"
        />
        <Spacer size="m" />
        <MediaPickerRHF {...getControlledInputProps(formData, 'image.url')} />
        <Flex justifyContent="center">
          <Button type="submit">Save</Button>
        </Flex>
      </form>
    </Modal>
  );
};
