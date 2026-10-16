import styled from '@emotion/styled';

export const Container = styled.ul<{ fullHeight: boolean, fullWidth: boolean }>(({
    theme,
    fullHeight,
    fullWidth,
}) => ({
    maxHeight: (fullHeight) ? '100%' : '15em',
    maxWidth: (fullWidth) ? '100%' : '50em',
    overflowY: 'scroll',
    paddingRight: (fullWidth) ? undefined : theme.spaces.padding.s,
    paddingLeft: 0,
    margin: 0,
    marginBottom: theme.spaces.margin.s,

    'li:last-child': {
        margin: 0,
    }
}));
