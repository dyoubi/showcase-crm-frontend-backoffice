import React from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { useForm, UseFormReturn, FieldValues, DefaultValues } from 'react-hook-form';

import { Providers } from '@/components/Providers';

interface WrapperRenderOptions {
  renderOptions?: RenderOptions;
}

export const wrappedRenderWithRHF = <TFormType extends FieldValues,>(
  Component: React.FunctionComponent<{ formData: UseFormReturn<TFormType> }>,
  defaultValues?: DefaultValues<TFormType>,
  options: WrapperRenderOptions = {},
) => {
  let formData: UseFormReturn<TFormType> | undefined;

  const Wrapper = () => {
    const form = useForm<TFormType>({ defaultValues });
    formData = form;
    return <Component formData={form} />;
  };

  return { ...wrappedRender(<Wrapper />, options), formData };
};

export const wrappedRender = (children: React.ReactNode, options: WrapperRenderOptions = {}) =>
  render(<Providers>{children}</Providers>, options?.renderOptions);
