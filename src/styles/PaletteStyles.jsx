import { styled } from '@mui/material/styles';

const PaletteContainer = styled('div')(()=> ({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column'   
}))

const PaletteColors = styled('div')(()=> ({
  height: '90%'  
}))

export { PaletteContainer, PaletteColors, styled }