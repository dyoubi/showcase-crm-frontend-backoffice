import styled from '@emotion/styled';

export const ImagePreview = styled.div<{ imageUrl?: string }>(({ theme, imageUrl }) => ({
  height: 120,
  width: 120,
  backgroundColor: theme.colors.tertiary.main,
  borderRadius: 4,
  cursor: 'pointer',
  backgroundImage: `url(${imageUrl})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
}));

export const ImageTitle = styled.span({ fontWeight: 'bold', fontSize: 17 });
