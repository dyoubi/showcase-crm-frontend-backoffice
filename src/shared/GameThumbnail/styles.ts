import styled from '@emotion/styled';

export const Container = styled.div<{ image?: string }>(({ image }) => ({
  height: 250,
  width: 185,
  backgroundImage: `url(${image})`,
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  backgroundSize: 'cover',
  overflow: 'hidden',
  display: 'inline-block',
}));

export const Name = styled.span({
  display: 'block',
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: 23,
});

export const Bottom = styled.div({
  position: 'absolute',
  left: 0,
  bottom: 0,
  right: 0,
  background: 'linear-gradient(180deg, rgba(20, 25, 35, 0) 0%, #0A0E16 56.46%)',
});

export const LogoContainer = styled.div({
  height: 42,
  width: 110,
  margin: '0 auto',
  boxShadow: '0px -5px 25px 10px rgba(62, 89, 176, 0.5)',
  borderRadius: '6px 6px 0px 0px',
  marginTop: '8px',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
});
