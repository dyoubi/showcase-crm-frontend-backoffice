import { Flex } from '@/shared/Flex';
import { Spacer } from '@/shared/Spacer';

export const optionsList = [
  {
    value: 'fr',
    label: (
      <Flex alignItems="center">
        <img alt="French flag" width={28} src="https://flagicons.lipis.dev/flags/4x3/fr.svg" />
        <Spacer size="xs" />
        <span>French</span>
      </Flex>
    ),
  },
  {
    value: 'en',
    label: (
      <Flex alignItems="center">
        <img alt="English flag" width={28} src="https://flagicons.lipis.dev/flags/4x3/gb.svg" />
        <Spacer size="xs" />
        <span>English</span>
      </Flex>
    ),
  },
];
