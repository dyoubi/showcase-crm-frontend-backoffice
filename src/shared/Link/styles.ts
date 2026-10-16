import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const StyledLink = styled(Link,{
    shouldForwardProp: (propName: string) =>  !propName.startsWith('$'),
})<{
    $isDarkMode: boolean,
}>(({
    theme,
    $isDarkMode = true,
}) => ({
    color: ($isDarkMode) ? theme.colors.primary.contrastText : theme.colors.primary.main,
    fontWeight: 'bold',
    textDecoration: 'none',

    '&:hover': {
      textDecoration: 'underline',
    },
}));
