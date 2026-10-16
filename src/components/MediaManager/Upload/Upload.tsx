import { Spacer } from '@/shared/Spacer';
import { Flex } from '@/shared/Flex';

import { useUploadFiles } from '../hooks/useUploadFiles';
import { useStoreContext } from '../hooks/useStoreContext';
import { UploadDropZone } from './styles';

const acceptedFiles = { 'image/*': ['.jpeg', '.png'], 'video/*': ['.mp4', '.mpeg'] };

export const UploadTab = () => {
  const { selectedStoreId } = useStoreContext();

  const { uploadFiles, isUploading, setAcceptedFiles, ...rest } = useUploadFiles();

  if (!selectedStoreId) {
    return <div>Select a store</div>;
  }

  return (
    <div>
      <Spacer size="l" />
      <Flex justifyContent="center">
        <UploadDropZone
          accept={acceptedFiles}
          disabled={isUploading}
          {...rest}
          setAcceptedFiles={(newState, actionMeta) => {
            if (actionMeta?.filesAdded) {
              uploadFiles(actionMeta?.filesAdded, selectedStoreId);
              return;
            }
            setAcceptedFiles(newState);
          }}
        />
      </Flex>
    </div>
  );
};
