import { PostPromotionPayload } from '@/domains/casino/promotion';
import { buildTitleContentVariants } from './buildTitleContentVariants';
import { buildBodyContentVariants } from './buildBodyContentVariants';
import { buildTermsContentVariants } from './buildTermsContentVariants';
import { buildThumbnailContentVariants } from './buildThumbnailContentVariants';
import { buildBannerVariants } from './buildBannerVariants';
import { buildHeaderVariants } from './buildHeaderVariants';
import * as t from '../../types';

export const buildPostPayloadFromForm = (
  casinoId: string,
  formValues: t.PromotionForm,
): PostPromotionPayload => {

  const missingFields: string[] = [];
  if (!formValues.startDate) { missingFields.push('startDate'); }
  if (!formValues.endDate) { missingFields.push('endDate'); }
  if (!formValues.slug) { missingFields.push('slug'); }
  if (!formValues.name) { missingFields.push('name'); }

  if (missingFields.length) {
    throw new Error(`missing fields, ${missingFields.join(',')}`)
  }

  return {
    startDate: formValues.startDate ? new Date(formValues.startDate) : undefined,
    endDate: formValues.endDate ? new Date(formValues.endDate) : undefined,
    key: formValues.slug,
    name: formValues.name, // TODO backend must accept name on post
    title: buildTitleContentVariants(formValues, casinoId),
    body: buildBodyContentVariants(formValues, casinoId),
    terms: buildTermsContentVariants(formValues, casinoId),
    thumbnail: buildThumbnailContentVariants(formValues, casinoId),
    banner: buildBannerVariants(formValues, casinoId),
    header: buildHeaderVariants(formValues, casinoId),
  }
};
