import { useNavigate } from 'react-router-dom';
import { findVariants, useGetContent } from '@/domains/casino/content';
import { routes } from '@/libs/router/constants';
import { replaceUrlParameters } from '@/utils';

interface PromotionThumbnailProps {
  bannerId: string;
  promotionId: string; 
}

export const PromotionThumbnail = ({ bannerId, promotionId }: PromotionThumbnailProps) => {
  const { data } = useGetContent(bannerId);
  const [thumbnail] = findVariants(data?.variants, {
    lang: 'fr',
    default: false,
    device: 'desktop',
  });
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(replaceUrlParameters(routes.PROMOTION, { promotionId }));
  };

  return (
    <div onClick={handleClick} style={{ cursor: 'pointer' }}>
      <img 
      alt="" 
      src={thumbnail?.data?.contentURL} 
      width="100%" 
      height={120}    
      />
    </div>

  )

};
