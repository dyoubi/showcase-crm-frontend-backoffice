import { findVariants, useGetContent } from '@/domains/casino/content';

import * as S from './styles';

interface BannerItemProps {
  contentId: string;
}

export const BannerItem = ({ contentId }: BannerItemProps) => {
  const { data } = useGetContent(contentId);
  const [thumbnail] = findVariants(data?.variants, {
    lang: 'fr',
    default: false,
    device: 'desktop',
  });

  return <S.Image alt="" src={thumbnail?.data?.contentURL} />;
};
