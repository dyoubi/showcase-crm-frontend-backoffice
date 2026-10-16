import { Flex } from '@/shared/Flex';
import * as t from '../../types';
import { ThumbnailPicker } from './ThumbnailPicker';

interface PromotionsImagesEditorProps {
  lang: t.Lang;
  device: 'desktop' | 'mobile';
}

export const PromotionsImagesEditor = ({ lang, device }: PromotionsImagesEditorProps) => {
  const pickerProps = {
    lang,
    device,
  } as const;

  return (
    <Flex flexDirection="column">
      <ThumbnailPicker {...pickerProps} imageName="banner" />
      <ThumbnailPicker {...pickerProps} imageName="header" />
      <ThumbnailPicker {...pickerProps} imageName="thumbnail" />
    </Flex>
  );
};
