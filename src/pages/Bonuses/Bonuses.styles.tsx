import styled from '@emotion/styled';
import { Card } from '@/shared/Card';

export const StyledCard = styled(Card)<{
  isEmpty?: boolean;
  marginBottom?: number;
  titleMarginLeft?: number;
}>(({ isEmpty, marginBottom, titleMarginLeft }) => ({
  marginBottom,
  ...(isEmpty && {
    '& > div': {
      marginBottom: 0,
    },
  }),
  h2: {
    marginLeft: titleMarginLeft,
  },
}));
