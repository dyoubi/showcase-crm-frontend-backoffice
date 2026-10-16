import { getMediaUrl } from '@/domains/casino/media';
import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';
import { Input } from '@/shared/Input';
import { Spacer } from '@/shared/Spacer';
import { TextArea } from '@/shared/TextArea';
import { useRef } from 'react';

import { useToaster } from '@/hooks';
import { useStoreContext } from '../hooks/useStoreContext';
import { EditContainer } from './styles';

export const SelectedFile = () => {
  const { onChooseFile, selectedMedia, setSelectedMedia } = useStoreContext();

  const toaster = useToaster();

  const descref = useRef<HTMLTextAreaElement>(null);

  if (!selectedMedia) {
    return null;
  }

  const handleSave = () => {
    toaster({ color: 'warning', content: 'Feature not implemented' });
  };

  return (
    <EditContainer flexDirection="column" flexShrink={0} key={selectedMedia.guid}>
      <Input label="Title" disabled value={selectedMedia.file_name} />
      <Spacer size="m" />
      <TextArea label="Description" value={selectedMedia?.description} ref={descref} />
      <Spacer size="m" />
      <Input
        label="File URL"
        disabled
        value={getMediaUrl(selectedMedia.file_id, selectedMedia?.revision)}
      />
      <Spacer size="m" />
      {onChooseFile && selectedMedia && (
        <Flex flexDirection="row">
          <Button color="primary" onClick={() => onChooseFile(selectedMedia)}>
            Choose this file
          </Button>
        </Flex>
      )}
      {selectedMedia && !onChooseFile && (
        <Flex flexDirection="row">
          <Button color="primary" onClick={() => handleSave()}>
            Save changes
          </Button>
          <Spacer size="xs" />
          <Button color="secondary" onClick={() => setSelectedMedia(undefined)}>
            Cancel
          </Button>
        </Flex>
      )}
    </EditContainer>
  );
};
