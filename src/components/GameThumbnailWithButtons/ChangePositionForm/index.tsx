import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/shared/Input';
import { IconShuffle } from '@/shared/Icons';

import { DATA_TEST_IDS } from '@/constants';
import { validationSchema } from './validationSchema';
import * as t from './types';

interface ChangePositionFromProps {
  onSwapPositionIndex: (newPosition: number) => void;
}

export const ChangePositionForm = memo(({ onSwapPositionIndex }: ChangePositionFromProps) => {
  const form = useForm<t.ChangePositionForm>({
    resolver: yupResolver(validationSchema),
  });

  const {
    register,
    setFocus,
    handleSubmit,
    formState: { errors },
  } = form;

  useEffect(() => {
    setFocus('newPosition');
  }, [setFocus]);

  const errorMessage = errors?.newPosition?.message;

  const onSubmit = handleSubmit((values) => {
    const newPositionIndex = parseInt(values?.newPosition || '1', 10);

    onSwapPositionIndex(newPositionIndex);
  });
  return (
    <form onSubmit={onSubmit}>
      <Input
        data-testid={DATA_TEST_IDS.CHANGE_GAME_POSITION_INPUT}
        label="New position"
        type="text"
        rightIcon={IconShuffle}
        autoFocus
        width={230}
        color={errorMessage ? 'danger' : 'primary'}
        caption={errorMessage}
        {...register('newPosition')}
      />
    </form>
  );
});
