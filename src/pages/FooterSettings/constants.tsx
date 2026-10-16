import { BUILT_IN_ARTICLES_SLUGS } from '@/domains/casino/article/constants';
import { PageEditor } from './PageEditor';

const TabsId = {
  PRIVACY_POLICY: BUILT_IN_ARTICLES_SLUGS.PRIVACY_POLICY,
  AML_POLICY: BUILT_IN_ARTICLES_SLUGS.AML_POLICY,
  TERMS_OF_SERVICE: BUILT_IN_ARTICLES_SLUGS.TERM_OF_SERVICE,
} as const;

export const tabs = [
  {
    title: 'Privacy policy',
    tabId: TabsId.PRIVACY_POLICY,
    content: <PageEditor articleSlug={BUILT_IN_ARTICLES_SLUGS.PRIVACY_POLICY} />,
  },
  {
    title: 'AML Policy',
    tabId: TabsId.AML_POLICY,
    content: <PageEditor articleSlug={BUILT_IN_ARTICLES_SLUGS.AML_POLICY} />,
  },
  {
    title: 'Terms of Service',
    tabId: TabsId.TERMS_OF_SERVICE,
    content: <PageEditor articleSlug={BUILT_IN_ARTICLES_SLUGS.TERM_OF_SERVICE} />,
  },
] as const;
