import styled from '@emotion/styled';

import { Card } from '@/shared/Card';
import { Input } from '@/shared/Input';
import { TagInput } from '@/components/TagInput';
import { DateInputRHF } from '@/components/RHF/DateInputRHF';
import { Button } from '@/shared/Button';
import { Flex } from '@/shared/Flex';

type StatusContainerProps = {
  color?: string;
};

export const FormContainer = styled(Card)({
  flex: 1,
  height: '100%',
});

export const StatusContainer = styled.div<StatusContainerProps>(({ color }) => ({
  '& input': {
    backgroundColor: color ? `${color}80` : 'transparent',
    borderRadius: 8,
  },
  '@media only screen and  (max-width: 1120px)': {
    width: '100%',
  },
}));

export const PlayerInfoInput = styled(Input)<{
  disabled?: boolean;
  customFlex?: number;
}>(({ theme, disabled, customFlex }) => ({
  width: '100%',
  [`.container`]: {
    height: theme.components.formGroup.input.height,
    width: '100%',
  },
  [`.input-container`]: {
    borderColor: theme.components.formGroup.border.default,
    ...(disabled && {
      borderColor: theme.components.formGroup.border.disabled,
    }),
    '& input': {
      fontWeight: 'bold',
      width: '100%',
    },
  },
  '@media only screen and  (min-width: 1120px)': {
    flex: customFlex,
  },
}));

export const PlayerInfoTagInput = styled(TagInput)(() => ({
  width: '100%',
}));

export const PlayerInfoDateInputRHF = styled(DateInputRHF)<{ disabled?: boolean }>(
  () => ({
    fontWeight: 'block',
  }),
);

export const StyledForm = styled.form({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateAreas: `
    "player-details player-details"
    "player-information contact-information"
    "settings account-information"
    "action-container action-container"
  `,
  width: '100%',
  gap: 20,
  '@media only screen and  (max-width: 970px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
    gridTemplateAreas: `
      "player-details"
      "player-information"
      "contact-information"
      "settings"
      "account-information"
      "action-container"
    `,
  },
});

export const EditButton = styled(Button)({
  marginLeft: 'auto',
});

export const ActionContainer = styled(Flex)({
  gridArea: 'action-container',
  justifyContent: 'center',
});

export const FormRow = styled(Flex)({
  gap: 10,
  width: '100%',
  '@media only screen and  (min-width: 1350px)': {
    flexWrap: 'nowrap',
  },
});
