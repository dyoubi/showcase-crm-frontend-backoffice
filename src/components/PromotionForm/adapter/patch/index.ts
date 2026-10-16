import * as t from '../../types';

const buildPatchPayloadFromLang = ({ data }: t.PromotionForm, lang: t.Lang) => {
  return [
    /** Title, Body & Terms * */
    {
      id: data?.[lang]?.title?.id,
      contentId: data?.[lang]?.title?.contentId,
      data: { contentText: data?.[lang]?.title?.contentText },
    },
    {
      id: data?.[lang]?.body?.id,
      contentId: data?.[lang]?.body?.contentId,
      data: { content: data?.[lang]?.body?.content },
    },
    {
      id: data?.[lang]?.termsAndConditions?.id,
      contentId: data?.[lang]?.termsAndConditions?.contentId,
      data: { content: data?.[lang]?.termsAndConditions?.content },
    },
    /** END Title, Body & Terms * */

    /** Medias desktop * */
    {
      id: data?.[lang]?.medias?.desktop?.thumbnail?.id,
      contentId: data?.[lang]?.medias?.desktop?.thumbnail?.contentId,
      data: { contentURL: data?.[lang]?.medias?.desktop?.thumbnail?.contentURL },
    },
    {
      id: data?.[lang]?.medias?.desktop?.banner?.id,
      contentId: data?.[lang]?.medias?.desktop?.banner?.contentId,
      data: { contentURL: data?.[lang]?.medias?.desktop?.banner?.contentURL },
    },
    {
      id: data?.[lang]?.medias?.desktop?.header?.id,
      contentId: data?.[lang]?.medias?.desktop?.header?.contentId,
      data: { contentURL: data?.[lang]?.medias?.desktop?.header?.contentURL },
    },
    /** Medias desktop * */

    /** Medias mobile * */
    {
      id: data?.[lang]?.medias?.mobile?.thumbnail?.id,
      contentId: data?.[lang]?.medias?.mobile?.thumbnail?.contentId,
      data: { contentURL: data?.[lang]?.medias?.mobile?.thumbnail?.contentURL },
    },
    {
      id: data?.[lang]?.medias?.mobile?.banner?.id,
      contentId: data?.[lang]?.medias?.mobile?.banner?.contentId,
      data: { contentURL: data?.[lang]?.medias?.mobile?.banner?.contentURL },
    },
    {
      id: data?.[lang]?.medias?.mobile?.header?.id,
      contentId: data?.[lang]?.medias?.mobile?.header?.contentId,
      data: { contentURL: data?.[lang]?.medias?.mobile?.header?.contentURL },
    },
    /** Medias desktop * */
  ] as const;
};

export const buildPatchPayloadFromForm = (values: t.PromotionForm) =>
  [...buildPatchPayloadFromLang(values, 'fr'), ...buildPatchPayloadFromLang(values, 'en')] as const;
