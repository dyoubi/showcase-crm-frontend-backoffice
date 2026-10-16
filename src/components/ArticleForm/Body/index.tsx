import { getControlledInputProps } from '@/libs/react-hook-form/utils';

import { Flex } from '@/shared/Flex';
import { RichTextRHF } from '../../RHF/RichTextRHF';

import * as t from '../types';
import { useArticleForm } from '../hooks';
import { FlagIcon } from '../../FlagIcon';

interface BodyProps {
  lang: t.Lang;
}

export const Body = ({ lang }: BodyProps) => {
  const articleForm = useArticleForm();
  return (
    <Flex flexDirection="column" gap={18}>
      <span style={{ fontSize: 18 }}>
        <Flex gap={8}>
          <span>Content</span>

          <FlagIcon isoCode={lang} width={20} />
        </Flex>
      </span>

      <RichTextRHF {...getControlledInputProps(articleForm, `data.${lang}.body.content`)} />
    </Flex>
  );
};
