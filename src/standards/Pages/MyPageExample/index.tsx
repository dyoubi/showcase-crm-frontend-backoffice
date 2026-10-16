import { memo } from 'react';

import { Page } from '@/components/Page';

import { Flex } from '@/shared/Flex';
import { Card } from '@/shared/Card';
import { SectionTitle } from '@/shared/SectionTitle';

import { SubComponent } from './SubComponent';

export const MyPageExample = memo(() => {
  return (
    <Page breadcrumbs={[{ content: 'My page' }]} headTitle="My page">
      <SectionTitle>My page :</SectionTitle>
      <Card>
        <Flex flexDirection="row" width="100%">
          My page
        </Flex>
      </Card>
      <SubComponent />
    </Page>
  );
});

MyPageExample.displayName = 'MyPageExample';
