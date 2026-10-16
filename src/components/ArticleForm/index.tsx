import { memo } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';

import { GetArticleResponse, isBuiltInArticle } from '@/domains/casino/article';

import { Input } from '@/shared/Input';
import { IconInfoCircle } from '@/shared/Icons';
import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';

import { getInputProps } from '@/libs/react-hook-form/utils';

import { Spacer } from '@/shared/Spacer';
import { Tooltip } from '@/shared/Tooltip';
import { Body } from './Body';
import * as t from './types';
import { useSyncFormWithArticle } from './hooks';
import { FlagIcon } from '../FlagIcon';
import { GroupInputs } from '../GroupInputs';

interface ArticleFormProps {
  lang: 'fr' | 'en';
  displayNameInput?: boolean;
  article?: GetArticleResponse;
  onSubmit: (values: t.ArticleForm) => void;
  defaultValues?: t.ArticleForm;
}

export const ArticleForm = memo(
  ({ lang, article, displayNameInput, onSubmit, defaultValues }: ArticleFormProps) => {
    // hooks
    const articleForm = useForm<t.ArticleForm>({
      shouldUnregister: false,
      defaultValues,
    });

    useSyncFormWithArticle(articleForm, article);

    const isBuiltIn = isBuiltInArticle(article?.key);

    return (
      <FormProvider {...articleForm}>
        <form onSubmit={articleForm.handleSubmit(onSubmit)}>
          <Flex flexDirection="column" gap={22}>
            <DevTool control={articleForm.control} />

            <GroupInputs>
              <Input
                label={
                  <Flex flexDirection="row" alignItems="center" gap={8}>
                    <span>Slug</span>

                    {isBuiltIn && (
                      <Tooltip
                        placement="right"
                        message="This is an built-in article you cannot edit the slug"
                      >
                        <IconInfoCircle size="xs" color="warning" />
                      </Tooltip>
                    )}
                  </Flex>
                }
                {...getInputProps(articleForm, 'slug')}
                disabled={isBuiltIn}
              />

              {displayNameInput && <Input label="Name" {...getInputProps(articleForm, 'name')} />}

              <Input
                key={lang}
                label={
                  <Flex>
                    <span>Title</span>
                    <Spacer size="xs" />
                    <FlagIcon isoCode={lang} width={20} />
                  </Flex>
                }
                {...getInputProps(articleForm, `data.${lang}.title.contentText`)}
              />
            </GroupInputs>

            <Body key={lang} lang={lang} />

            <div>
              <Button type="submit" color="primary">
                Save
              </Button>
            </div>
          </Flex>
        </form>
      </FormProvider>
    );
  },
);

export type ArticleForm = t.ArticleForm;
