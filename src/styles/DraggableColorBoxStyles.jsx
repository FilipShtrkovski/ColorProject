import { styled } from '@mui/material/styles';

const Root = styled('div')(()=> ({
    width: '20%',
    height: '25%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-7px',
    '&:hover svg': {
      color: 'white',
      transform: 'scale(2.0)'
    } 
}))

const BoxContent = styled('div')(()=> ({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  left: '0px',
  color: 'rgba(0,0,0,0.5)',
  bottom: '0px',
  padding: '10px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontSize: '12px',
  justifyContent: 'space-between',
}))

export { BoxContent, Root, styled }