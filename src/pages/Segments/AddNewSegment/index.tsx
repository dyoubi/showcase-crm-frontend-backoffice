import { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { usePostSegment } from '@/domains/casino/segmentation';
import { replaceUrlParameters } from '@/utils';
import { Modal } from '@/shared/Modal';
import { Input } from '@/shared/Input';
import { Button } from '@/shared/Button';

import { getInputProps } from '@/libs/react-hook-form/utils';
import { routes } from '@/libs/router/constants';
import { Spacer } from '@/shared/Spacer';

import * as t from './types';

export const AddNewSegment = memo(() => {
  // hooks
  const formData = useForm<t.FormType>();
  const { mutateAsync: postSegment } = usePostSegment();
  const navigate = useNavigate();

  // constants
  const { handleSubmit } = formData;

  const onSubmit = handleSubmit(async ({ name }) => {
    const newSegment = await postSegment({ name, query: { data: [] } });
    navigate(replaceUrlParameters(routes.SEGMENT_EDIT, { segmentId: newSegment.id }));
  });

  return (
    <Modal show>
      <form onSubmit={onSubmit}>
        <Input label="Name" {...getInputProps(formData, 'name')} />
        <Spacer size="m" />
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </Modal>
  );
});
