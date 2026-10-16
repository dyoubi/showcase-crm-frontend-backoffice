import { FC, MemoExoticComponent } from 'react';

import { IconCircleCheck, IconDanger, IconInfoCircle } from '../Icons';
import { StyledFeedbackMessage } from './FeedbackMessage.styles';
import { FeedbackMessageProps } from './FeedbackMessage.types';
import { IconProps } from '../Icons/types';

const DEFAULT_ICON_PROPS = {
  size: 18,
  style: { flexShrink: 0 },
};

const FEEDBACK_ICONS: Record<string, MemoExoticComponent<({ color, size, ...rest }: IconProps) => JSX.Element>> = {
  success: IconCircleCheck,
  danger: IconDanger,
};

export const FeedbackMessage: FC<FeedbackMessageProps> = ({ children, color = 'primary' }) => {
  const FeedbackIcon = FEEDBACK_ICONS[color] || IconInfoCircle;

  return (
    <StyledFeedbackMessage color={color}>
      <FeedbackIcon color={color} {...DEFAULT_ICON_PROPS} />

      <span>{children}</span>
    </StyledFeedbackMessage>
  );
};

FeedbackMessage.displayName = 'FeedbackMessage';
