import React, { memo, useState } from 'react';
import { DropzoneOptions, useDropzone, Accept, FileError } from 'react-dropzone';

import { generateId, removeItemFromId } from '@/utils';
import { Flex } from '../Flex';
import { Spacer } from '../Spacer';
import { Button } from '../Button';


import { CSVIllustration } from './CSVIllustration';
import { FileChip } from './FileChip';
import * as S from './styles';
import * as t from './types';

export interface ActionMeta {
  filesAdded?: t.FilesAccepted;
  filesRemoved?: t.FilesAccepted;
}

export interface UploadDropZoneProps {
  acceptedFiles: t.FilesAccepted;
  setAcceptedFiles: (newState: t.FilesAccepted, actionMeta: ActionMeta) => void;

  rejectedFiles: t.FilesRejected;
  setRejectedFiles: (state: t.FilesRejected) => void;

  accept?: Accept;
  minSize?: number;
  maxSize?: number;
  maxFiles?: number;
  validator?: DropzoneOptions['validator'];
  image?: React.ReactNode;
  disabled?: boolean;
  ['data-testid']?: string;
  className?: string;
}

export const UploadDropZone = memo(
  ({
    acceptedFiles,
    rejectedFiles,
    setAcceptedFiles,
    setRejectedFiles,
    image = <CSVIllustration />,
    'data-testid': dataTestId,
    className,
    ...restProps
  }: UploadDropZoneProps) => {
    // hooks
    const { getRootProps, getInputProps } = useDropzone({
      ...restProps,
      onDropAccepted: (files) => {
        const status = 'success' as const;
        const newFilesAccepted = files.map((file) => ({
          file,
          id: generateId(),
          status,
        }));
        setAcceptedFiles([...acceptedFiles, ...newFilesAccepted], { filesAdded: newFilesAccepted });
      },
      onDropRejected: (files) => {
        setRejectedFiles(
          files.map((file) => ({
            ...file,
            id: generateId(),
          })),
        );
      },
    });

    return (
      <S.Container data-testid={dataTestId} className={className}>
        <S.Content {...getRootProps()}>
          {image}
          <input {...getInputProps()} />
          <S.TitleContainer>
            <S.Title>Drag n drop</S.Title>
            <Spacer size="xxs" />
            <Flex flexDirection="row" alignItems="center">
              <span>your file or</span>
              <Spacer size="xxs" />
              <Button type="button">Select a file</Button>
            </Flex>
          </S.TitleContainer>
        </S.Content>
        <S.FilesList>
          {acceptedFiles?.map((file) => (
            <FileChip
              key={file.id}
              variant={file.status}
              fileName={file.file?.name}
              isLoading={file.isLoading}
              onRemove={() =>
                setAcceptedFiles(removeItemFromId(acceptedFiles, file.id), { filesRemoved: [file] })
              }
            />
          ))}
          {rejectedFiles?.map(({ id, file, errors }) => (
            <FileChip
              key={id}
              variant="danger"
              fileName={file?.name}
              errors={errors as FileError[]}
              onRemove={() => setRejectedFiles(removeItemFromId(rejectedFiles, id))}
            />
          ))}
        </S.FilesList>
      </S.Container>
    );
  },
);

export * from './types';

export const useDropZoneState = () => {
  const [acceptedFiles, setAcceptedFiles] = useState<t.FilesAccepted>([]);
  const [rejectedFiles, setRejectedFiles] = useState<t.FilesRejected>([]);

  return {
    acceptedFiles,
    rejectedFiles,
    setAcceptedFiles,
    setRejectedFiles,
  };
};
