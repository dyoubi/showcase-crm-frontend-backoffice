import { useState } from 'react';

import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { Modal } from '@/shared/Modal';
import { Spacer } from '@/shared/Spacer';

import { CommentSection } from '@/components/CommentSection';
import { Title } from '@/components/Title';

interface CommentsTabsProps {
  contextId: string,
}

export const CommentsTab = (props: CommentsTabsProps) => {
  const { contextId } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Modal
        minHeight="70%"
        onHide={() => setIsModalOpen(false)}
        show={isModalOpen}
        title="Comments"
      >
        <CommentSection
          contextId={contextId}
          fullHeight
          fullWidth
        />
      </Modal>

      <Flex justifyContent="space-between" alignItems="center">
        <Title>Comments</Title>

        <Button
          color="secondary"
          onClick={() => setIsModalOpen(true)}
        >
          Expand
        </Button>
      </Flex>
      <Spacer size="s" />

      <CommentSection contextId={contextId} />
    </>
  );
};
