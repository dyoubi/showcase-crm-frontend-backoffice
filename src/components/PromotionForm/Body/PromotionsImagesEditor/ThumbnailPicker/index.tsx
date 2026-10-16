import { Path } from 'react-hook-form';
import capitalize from 'lodash/capitalize';

import { Spacer } from '@/shared/Spacer';
import { MediaPickerRHF } from '../../../../RHF/MediaPicker';

import { usePromotionForm } from '../../../hooks';
import * as t from '../../../types';

interface ThumbnailPickerProps {
  lang: t.Lang;
  device: 'desktop' | 'mobile';
  imageName: 'banner' | 'header' | 'thumbnail';
}

export const ThumbnailPicker = ({ lang, device, imageName }: ThumbnailPickerProps) => {
  const { control, register } = usePromotionForm();
  const name: Path<t.PromotionForm> =
    `data.${lang}.medias.${device}.${imageName}.contentURL` as const;
  const variantId: Path<t.PromotionForm> = `data.${lang}.medias.${device}.${imageName}.id` as const;
  const contentId: Path<t.PromotionForm> =
    `data.${lang}.medias.${device}.${imageName}.contentId` as const;
  const defaultVariantId: Path<t.PromotionForm> =
    `data.${lang}.medias.${device}.${imageName}.defaultVariantId` as const;

  return (
    <>
      <input type="hidden" {...register(contentId)} />
      <input type="hidden" {...register(defaultVariantId)} />
      <input type="hidden" {...register(variantId)} />
      <MediaPickerRHF title={`${capitalize(imageName)}`} control={control} name={name} />
      <Spacer size="m" />
    </>
  );
};
