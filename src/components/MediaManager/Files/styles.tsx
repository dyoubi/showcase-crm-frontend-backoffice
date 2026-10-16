import styled from '@emotion/styled';

import { Flex } from '@/shared/Flex';

export const ListContainer = styled(Flex)(({ theme }) => ({
  paddingTop: theme.spaces.padding.m,
}));

export const Ul = styled.ul({ width: '100%', listStyle: 'none', margin: 0, padding: 0 });

export const Li = styled.li({
  float: 'left',
  margin: 0,
  padding: '0 8px',
  '@media only screen and (min-width: 995px)': {
    width: '22%',
  },
  '@media only screen and (max-width: 995px)': {
    width: '30%',
  },
  '@media only screen and (max-width: 913px)': {
    width: '28%',
  },
  '@media only screen and (max-width: 792px)': {
    width: '45%',
  },
  '@media only screen and (max-width: 700px)': {
    width: '90%',
  },
});

export const ItemContainer = styled(Flex)<{ selected: boolean; imageUrl?: string }>(
  ({ theme, selected, imageUrl }) => ({
    height: 200,
    width: '100%',
    padding: '0',
    backgroundColor: theme.colors.tertiary.main,
    marginRight: 8,
    marginBottom: 18,
    position: 'relative',
    borderRadius: 4,
    cursor: 'pointer',
    'file-toolbar': {
      transition: 'opacity 350ms ease-in-out',
      opacity: '0',
    },
    '&:hover': {
      'file-toolbar': {
        opacity: '1',
      },
    },
    boxShadow: selected ? '0px -5px 25px 10px rgba(62, 89, 176, 0.5)' : undefined,
    backgroundImage: `url(${imageUrl})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 100%',
  }),
);

export const ItemToolbar = styled(Flex)({
  position: 'absolute',
  top: 12,
  right: 12,
});

export const EditContainer = styled(Flex)(({ theme }) => ({
  backgroundColor: theme.colors.tertiary.main,
  padding: theme.spaces.padding.l,
  width: 300,
  borderRadius: 4,
}));
