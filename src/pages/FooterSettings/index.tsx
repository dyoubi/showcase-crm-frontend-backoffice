import { useMemo } from 'react';

import { SelectLang, useLangState } from '@/components/SelectLang';
import { Tabs, useTabStateNew } from '@/shared/Tabs';
import { Card } from '@/shared/Card';
import { IconEdit } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';

import { useToggle } from '../../hooks';
import { tabs } from './constants';
import { FooterSettingsContext } from './context';

export const FooterSettings = () => {
  const tabState = useTabStateNew(tabs[0].tabId);
  const langState = useLangState('fr');
  const currentTab = tabs.find((tab) => tab.tabId === tabState.selectedTabId);
  const [loading, toggleLoading] = useToggle();
  const { lang } = langState;

  const contextValue = useMemo(
    () => ({
      lang,
      tabTitle: currentTab?.title,
      toggleLoading,
    }),
    [lang, currentTab, toggleLoading],
  );

  return (
    <FooterSettingsContext.Provider value={contextValue}>
      <Flex justifyContent="center">
        <Card
          icon={IconEdit}
          loadingOverlay={loading}
          title="Edit footer pages"
          width="90%"
          topContent={<SelectLang {...langState} />}
        >
          <Tabs {...tabState} tabs={tabs} />
        </Card>
      </Flex>
    </FooterSettingsContext.Provider>
  );
};
