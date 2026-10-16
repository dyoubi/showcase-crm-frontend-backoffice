import styled from '@emotion/styled';

export const VisuallyHidden = styled.div({
  position: 'absolute',
  overflow: 'hidden',
  clip: 'rect(0 0 0 0)',
  opacity: 0,
  width: 1,
  height: 1,
  margin: -1,
  padding: 0,
  border: 0,
});
