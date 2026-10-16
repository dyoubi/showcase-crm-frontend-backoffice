import { memo, useState } from 'react';

import { Page } from '@/components/Page';
import { Tag } from '@/domains/casino/tag';
import { SectionTitle } from '@/shared/SectionTitle';
import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

import { TagsList } from './TagsList';
import { TagForm } from './TagForm';

export const Tags = memo(() => {
  const [tagToEdit, setTagToEdit] = useState<Tag>();

  return (
    <Page breadcrumbs={[{ content: 'Tags' }]} headTitle="Tags">
      <SectionTitle>Tags list :</SectionTitle>
      <Flex flexDirection="row">
        <TagsList setTagEdit={setTagToEdit} />
        <Spacer size="xs" />
        <TagForm key={tagToEdit?.id || ''} tagToEdit={tagToEdit} setTagEdit={setTagToEdit} />
      </Flex>
    </Page>
  );
});
