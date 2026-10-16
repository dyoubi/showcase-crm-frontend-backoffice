import { memo, ReactNode, useState } from 'react';

import { Button } from '@/shared/Button';
import { IconMedia } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';
import { StoreMedia } from '@/domains/casino/media';
import { useToggle } from '../../hooks';

import * as S from './styles';
import { MediaManager } from '../MediaManager';

interface MediaPickerProps {
  mediaUrl?: string;
  onSelect: (media: StoreMedia) => void;
  title?: ReactNode;
  className?: string;
}

export const MediaPicker = memo(({ mediaUrl, onSelect, title, className }: MediaPickerProps) => {
  const [display, toggle] = useToggle();

  return (
    <>
      <MediaManager
        displayType="modal"
        showModal={display}
        onClose={toggle}
        onChooseFile={onSelect}
      />
      <Flex display="inline-flex" flexDirection="row" alignItems="center" className={className}>
        <S.ImagePreview imageUrl={mediaUrl} onClick={toggle} />
        <Spacer size="xs" />
        <Flex flexDirection="column" justifyContent="center" className={className}>
          <S.ImageTitle>{title}</S.ImageTitle>
          <Spacer size="xs" />
          <Button leftIcon={IconMedia} color="primary" onClick={toggle}>
            Select Media
          </Button>
        </Flex>
      </Flex>
    </>
  );
});

export const useMediaPickerState = (defaultValue?: StoreMedia) =>
  useState<StoreMedia | undefined>(defaultValue);
