import { Spacer } from '@/shared/Spacer';

import { Input } from '@/shared/Input';
import { Tabs, useTabStateNew } from '@/shared/Tabs';
import { IconDesktop, IconMobile } from '@/shared/Icons';

import { getInputProps, getControlledInputProps } from '@/libs/react-hook-form/utils';

import { Flex } from '@/shared/Flex';
import { RichTextRHF } from '../../RHF/RichTextRHF';

import { PromotionsImagesEditor } from './PromotionsImagesEditor';

import { usePromotionForm } from '../hooks';
import * as t from '../types';

interface BodyProps {
  lang: t.Lang;
}

export const Body = ({ lang }: BodyProps) => {
  const formData = usePromotionForm();
  const state = useTabStateNew('desktop');
  return (
    <>
      <Input
        label="Title"
        width="50%"
        {...getInputProps(formData, `data.${lang}.title.contentText`)}
      />
      <Spacer size="l" />
      <span style={{ fontSize: 18 }}>Content :</span>
      <Spacer size="xxs" />
      <RichTextRHF {...getControlledInputProps(formData, `data.${lang}.body.content`)} />
      <Spacer size="l" />
      <span style={{ fontSize: 18 }}>Terms and conditions agreement :</span>
      <Spacer size="xxs" />
      <RichTextRHF
        {...getControlledInputProps(formData, `data.${lang}.termsAndConditions.content`)}
      />
      <Spacer size="m" />
      <Flex flex={1} flexDirection="column">
        <span style={{ fontSize: 18 }}>Images :</span>
        <Spacer size="xs" />
        <Tabs
          {...state}
          tabs={[
            {
              tabId: 'desktop',
              title: 'Desktop',
              icon: IconDesktop,
              content: <PromotionsImagesEditor lang={lang} device="desktop" />,
            },
            {
              tabId: 'mobile',
              title: 'Mobile',
              icon: IconMobile,
              content: <PromotionsImagesEditor lang={lang} device="mobile" />,
            },
          ]}
        />
      </Flex>
    </>
  );
};
