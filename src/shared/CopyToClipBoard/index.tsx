import { memo, useCallback  } from 'react';
import { useAppTheme, useToaster } from '@/hooks';

import { IconDocumentCopy } from '../Icons';

import * as S from './style';

interface CopyToClipboardProps {
  text: string;
}

export const CopyToClipboard = memo(({ text }: CopyToClipboardProps) => {
  const { isDarkMode } = useAppTheme();
  const toast = useToaster();

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);

    toast({ content: 'Copied to clipboard' });
  }, [text]);

  return (
    <S.StyledButton
      isDarkMode={isDarkMode}
      onClick={handleCopy}
      type="button"
    >
      <IconDocumentCopy size={18} color="primary" />
    </S.StyledButton>
  );
});
