import { Component } from 'react';
import {DrawerHeader, DrawerContainer, Main, styled} from './styles/NewPaletteFormStyles'
import { DRAWR_WIDTH } from './constants';

import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';

import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';

class NewPaletteForm extends Component {
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props)
    this.state = {
      open:false,
      colors: this.props.palettes[0].colors
    }

  }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  }; 

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addColor = (newColor) => {
    this.setState({
      colors:[ ...this.state.colors, newColor ]
    })
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (newPalette) => {
    const {paletteName, emoji} = newPalette
    let id = paletteName.toLowerCase().replace(/ /g, '-') 
    const palette = {
      paletteName: paletteName,
      emoji: emoji,
      id: id,
      colors: this.state.colors
    }
    this.props.savePalette(palette)
    this.props.history.push('/')
  }
  
  

  handleDelete = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  handleRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat()
    const rand  = Math.floor(Math.random() * allColors.length)
    this.setState({
      colors: [...this.state.colors, allColors[rand]]
    })
  }

  sortedColors = (colors) => {
    this.setState({
      colors
    })
  }

  clearPalette = () => {
    this.setState({
      colors: []
    })
  }

render(){
  const { open, colors} = this.state
  const { maxColors,palettes } = this.props
  let disabled = colors.length >= maxColors
  return (
    
    <Box sx={{ display: 'flex'}}>
      <PaletteFormNav 
        handleDrawerOpen={this.handleDrawerOpen}
        open={open}
        palettes={palettes}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
      <Drawer
        sx={{
          width: DRAWR_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWR_WIDTH,
            boxSizing: 'border-box',
            dispaly: 'flex',
            alignItems: 'center'
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <DrawerContainer >
          <Typography variant='h4' gutterBottom>
            Design Your Palette
          </Typography>
          <Box sx={{width: '100%'}}>
            <Button 
              sx={{width: '50%'}}
              onClick={this.clearPalette}
              variant='contained' 
              color='error' 
            >Clear Palette</Button>
            <Button 
              sx={{width: '50%'}}
              onClick={this.handleRandomColor}
              variant='contained'
              color='primary'
              disabled={disabled}
            >Random Color</Button>
          </Box>
          <ColorPickerForm 
            disabled={disabled} 
            addColor={this.addColor}
            colors={this.state.colors}
          />
        </DrawerContainer>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <DraggableColorList sortedColors={this.sortedColors} 
          colors={colors} handleDelete={this.handleDelete} />
      </Main>
    </Box>
  )};

}


export default withStyles(styled, { withTheme: true })(NewPaletteForm);

