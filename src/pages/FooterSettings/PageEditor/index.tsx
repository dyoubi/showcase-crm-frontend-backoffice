import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { ArticleForm } from '@/components/ArticleForm';
import { BuildInArticleSlugType, useGetArticleFromSlug } from '@/domains/casino/article';
import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';
import { IconLoader } from '@/shared/Icons';
import { Button } from '@/shared/Button';

import { routes } from '@/libs/router/constants';
import { useFooterSettingsContext } from '../hooks';
import { useOnFormSubmit } from './hooks';

interface PageEditorProps {
  articleSlug: BuildInArticleSlugType;
}

export const PageEditor = memo(({ articleSlug }: PageEditorProps) => {
  const { lang } = useFooterSettingsContext();
  const { data: article, isFetching } = useGetArticleFromSlug(articleSlug);
  const navigate = useNavigate();
  const { save } = useOnFormSubmit({ article });

  if (isFetching) {
    return (
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Spacer size="xl" />
        <IconLoader size="xxl" />
        <Spacer size="xl" />
      </Flex>
    );
  }

  if (!isFetching && !article) {
    return (
      <Flex justifyContent="center" alignItems="center" flexDirection="column">
        <Spacer size="m" />
        <p>
          Article not found please create an article with the slug <b>{articleSlug}</b>
        </p>
        <Spacer size="m" />
        <Button
          onClick={() =>
            navigate({ pathname: routes.CREATE_ARTICLE, search: `?slug=${articleSlug}` })
          }
        >
          Create corresponding article
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <Spacer size="m" />
      <ArticleForm
        key={article?.id}
        article={article}
        lang={lang}
        onSubmit={(values) => save(values)}
      />
    </>
  );
});
