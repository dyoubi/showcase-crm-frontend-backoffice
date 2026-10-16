import { Page } from '@/components/Page';
import { Spacer } from '@/shared/Spacer';
import { Tabs, useTabStateNew } from '@/shared/Tabs';

import { routes } from '@/libs/router/constants';
import { FooterSettings } from '../FooterSettings';
import { CurrencySettings } from '../CurrencySettings';

const breadcrumbs = [
  {
    content: 'Casino settings',
    link: routes.CASINO_SETTINGS_ROOT,
  },
  {
    content: 'Footer customization',
    link: routes.CASINO_SETTINGS_FOOTER,
  },
  {
    content: 'Privacy policy',
  },
] as const;

const tabs = [
  {
    tabId: 'footer',
    title: 'Footer',
    content: (
      <>
        <Spacer size="xs" />
        <FooterSettings />
      </>
    ),
  },
  {
    tabId: 'currencySettings',
    title: 'Currency Settings',
    content: (
      <>
        <Spacer size="xs" />
        <CurrencySettings />
      </>
    )
  }
] as const;

export const CasinoSettings = () => {
  const tabState = useTabStateNew(tabs[0].tabId);
  return (
    <Page breadcrumbs={breadcrumbs} headTitle="Footer settings">
      <Tabs {...tabState} tabs={tabs} />
    </Page>
  )
}
  