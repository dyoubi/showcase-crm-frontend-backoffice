import { memo } from 'react';

import * as t from './types';
import * as c from './constants';
import * as S from './styles';

export interface TabsProps {
  tabs: t.TabItem[] | readonly t.TabItem[];
  selectedTabId?: string;
  onSelect?: (tabIndex: string) => void;
  className?: string;
}

export const Tabs = memo(({ tabs, selectedTabId, onSelect, className }: TabsProps) => {
  const { content } = tabs.find((tab) => tab.tabId === selectedTabId) || {};
  return (
    <S.Container className={className}>
      <S.TabsContainer>
        {tabs?.map(({ tabId, title, icon: Icon }) => (
          <S.Tab
            data-testid={tabId}
            key={tabId}
            status={selectedTabId === tabId ? 'ACTIVE' : 'INACTIVE'}
            onClick={onSelect && (() => onSelect(tabId))}
          >
            {Icon && <Icon className={c.ICON_CLASSNAME} size="m" color="currentColor" />}
            {title && <S.Title hasIcon={!!Icon}>{title}</S.Title>}
          </S.Tab>
        ))}
        <S.VoidTab status="INACTIVE" />
      </S.TabsContainer>
      <S.Content key={selectedTabId}>{content}</S.Content>
    </S.Container>
  );
});

export { useTabState, useTabStateNew } from './hooks';
