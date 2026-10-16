import styled from '@emotion/styled';

import * as t from './types';

export const TextArea = styled.textarea<t.TextAreaPropsType>(
  ({ theme, color = 'primary', resize = 'vertical', minHeight }) => ({
    width: '100%',
    flex: 1,
    boxSizing: 'border-box',
    border: `1px solid ${theme.colors[color].main}`,
    borderRadius: 6,
    backgroundColor: 'transparent',
    fontSize: 14,
    color: theme.typography.colors.primary,
    padding: theme.spaces.margin.xxs,
    '&:focus': {
      outline: 'none',
    },
    resize,
    minHeight: minHeight || 80,
  }),
);
