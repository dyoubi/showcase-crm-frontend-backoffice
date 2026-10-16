import styled from '@emotion/styled';

import * as t from './types';

export const StyledStack = styled.table<t.StackPropsType>(({
    theme,
}) => ({
    tbody: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        flexWrap: 'wrap',
    },

    tr: {
        borderRight: `2px solid ${theme.colors.secondary.main}`,
        marginBottom: theme.spaces.margin.m,
    },

    td: {
        padding: 0,
    },

    'tr:last-child': {
        marginRight: 0,
    },
}));

export const StyledStackItem = styled.tr<Omit<t.StackItemPropsType, 'label' | 'value'>>(({
    theme,
}) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingRight: theme.spaces.padding.m,
    marginRight: theme.spaces.padding.m,

    td: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'start',
        verticalAlign: 'top',
    },

    th: {
        textAlign: 'start',
    },
}));
