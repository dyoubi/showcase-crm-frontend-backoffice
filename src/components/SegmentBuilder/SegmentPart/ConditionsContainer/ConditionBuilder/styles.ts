import styled from '@emotion/styled';
import { Select as SelectRaw } from '@/shared/Select';

export const Select = styled(SelectRaw)<{ size?: 'm' | 'l' | 'xl' }>(({ size = 'm' }) => ({
  width: { m: 200, l: 230, xl: 350 }[size],
}));

export const ValueEditorContainer = styled.div({
  width: 230,
});
