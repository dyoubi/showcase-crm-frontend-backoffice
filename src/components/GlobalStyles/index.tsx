import { Global, useTheme } from '@emotion/react';

import { fontsFaces, globalStyles } from './styles.helper';

export const GlobalStyles = () => {
  const theme = useTheme();
  return <Global styles={[fontsFaces, globalStyles(theme)]} />;
};
