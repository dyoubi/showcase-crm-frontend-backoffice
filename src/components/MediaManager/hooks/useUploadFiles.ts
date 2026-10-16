import { useState } from 'react';

import { replaceItemFromId } from '@/utils';
import { useUploadFileInStore } from '@/domains/casino/media';
import { FilesAccepted, useDropZoneState } from '@/shared/UploadDropZone';
import { useHandleError } from '@/hooks';

export const useUploadFiles = () => {
  const { acceptedFiles, setAcceptedFiles, ...restDropZoneState } = useDropZoneState();
  const handleError = useHandleError();
  const [isUploading, setIsUploading] = useState(false);
  const { mutateAsync } = useUploadFileInStore();

  const updateFileInList = (fileId: string, file: FilesAccepted[number]) =>
    setAcceptedFiles((state) =>
      replaceItemFromId(state, fileId, {
        ...file,
      }),
    );

  const uploadFiles = async (filesDropped: FilesAccepted, storeId: string) => {
    setIsUploading(true);

    const newStateWithLoading = [
      ...acceptedFiles,
      ...filesDropped.map((file) => ({
        ...file,
        status: 'primary' as const,
        isLoading: true,
      })),
    ];

    setAcceptedFiles(newStateWithLoading);

    // eslint-disable-next-line no-restricted-syntax
    for (const file of filesDropped) {
      try {
        // eslint-disable-next-line no-await-in-loop
        await mutateAsync({ media: file.file, storeId });
        updateFileInList(file.id, {
          ...file,
          status: 'success' as const,
          isLoading: false,
        });
      } catch (ex) {
        handleError(ex);
        updateFileInList(file.id, {
          ...file,
          status: 'danger' as const,
          isLoading: false,
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  return {
    isUploading,
    uploadFiles,
    acceptedFiles,
    setAcceptedFiles,
    ...restDropZoneState,
  };
};
