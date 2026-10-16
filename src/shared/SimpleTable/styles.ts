import styled from '@emotion/styled';

import * as t from './types';

export const StyledSimpleTable = styled.table<t.SimpleTablePropsType>(({
    theme,
    size = 'xxs',
}) => ({
    td: {
        textAlign: 'start',
        verticalAlign: 'top',
    },

    th: {
        paddingRight: theme.spaces.padding.xxs,
        textAlign: 'start',
    },

    'td, th': {
        paddingBottom: theme.spaces.padding[size],
    },

    'tr:last-child td, tr:last-child th': {
        paddingBottom: 0,
    },
}));
