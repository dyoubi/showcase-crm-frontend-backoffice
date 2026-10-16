import { StoreMedia } from '@/domains/casino/media';
import { Flex } from '@/shared/Flex';
import { IconList, IconUpload } from '@/shared/Icons';
import { Modal } from '@/shared/Modal';
import { Tabs } from '@/shared/Tabs';
import { memo, useState, useMemo } from 'react';
import { Spacer } from '@/shared/Spacer';
import { UploadTab } from './Upload/Upload';
import { StoreContextProvider } from './context';
import { FilesListTab } from './Files';
import { StoreSelector } from './StoreSelect';

interface MediaManagerProps {
  displayType?: 'page' | 'modal';
  showModal?: boolean;
  onClose?: () => void;
  onChooseFile?: (file: StoreMedia) => void;
}

export const MediaManager = memo(
  ({ displayType = 'page', showModal = false, onClose, onChooseFile }: MediaManagerProps) => {
    const [tabId, setTab] = useState('files-list');

    const tabs = useMemo(
      () => [
        {
          tabId: 'files-list',
          title: 'Files list',
          icon: IconList,
          content: <FilesListTab />,
        },
        {
          tabId: 'upload',
          title: 'Upload',
          icon: IconUpload,
          content: <UploadTab />,
        },
      ],
      [],
    );

    const content = (
      <StoreContextProvider
        show={displayType === 'modal'}
        onClose={onClose}
        onChooseFile={onChooseFile}
      >
        <Flex flexDirection="column" style={{ position: 'relative', height: '100%' }}>
          <Flex alignItems="center" justifyContent="space-between">
            <StoreSelector />
          </Flex>
          <Spacer size="s" />
          <Tabs tabs={tabs} selectedTabId={tabId} onSelect={setTab} />
        </Flex>
      </StoreContextProvider>
    );

    if (displayType === 'modal') {
      return (
        <Modal
          title="Media Manager"
          show={showModal}
          maxWidth={1400}
          height="80%"
          onHide={onClose}
          width="95%"
        >
          {content}
        </Modal>
      );
    }

    return content;
  },
);
