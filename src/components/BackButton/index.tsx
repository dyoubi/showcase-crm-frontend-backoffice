import React from 'react';

import { IconArrowLeft } from '@/shared/Icons';

import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

interface BackButtonProps {
  onClick?: () => void;
}

export const BackButton = ({ onClick }: BackButtonProps) => {
  return (
    <Flex flexDirection="row" alignItems="center" onClick={onClick} style={{ cursor: 'pointer' }}>
      <IconArrowLeft />
      <Spacer size="xs" />
      <span style={{ fontSize: 20 }}>Back</span>
    </Flex>
  );
};
