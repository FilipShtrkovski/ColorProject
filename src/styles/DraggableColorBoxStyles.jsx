import chroma from 'chroma-js';
import { styled } from '@mui/material/styles';
import sizes from './sizes';

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
    },
    [sizes.down('lg')]: {
      width: '25%',
      height: '20%',
    },
    [sizes.down('md')]: {
      width: '50%',
      height: '10%',
    },
    [sizes.down('sm')]: {
      width: '100%',
      height: '5%',
    }    
}))

const BoxContent = styled('div')((props)=>({
  display: 'flex',
  position: 'absolute',
  width: '100%',
  left: '0px',
  color: chroma.contrast(props.color, 'black') < 6 ? 'white' : 'rgba(0,0,0, 0.6)', 
  bottom: '0px',
  padding: '10px',
  letterSpacing: '1px',
  textTransform: 'uppercase',
  fontSize: '12px',
  justifyContent: 'space-between',
}))

export { BoxContent, Root, styled }