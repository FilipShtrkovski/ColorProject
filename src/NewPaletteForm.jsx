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
import CloseIcon from '@mui/icons-material/Close';
import { Button } from '@mui/material';
import seedColors from './seedColors'

class NewPaletteForm extends Component {
  
  static defaultProps = {
    maxColors: 20
  }

  constructor(props){
    super(props)
    this.state = {
      open:false,
      colors: seedColors[0].colors
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
    let rand
    let randomColor
    let duplicateColor = true 
    while(duplicateColor){
      rand = Math.floor(Math.random() * allColors.length)
      randomColor = allColors[rand]
      duplicateColor = this.state.colors.some(
        color => color.name === randomColor.name
      )
    }
    this.setState({
      colors: [...this.state.colors, randomColor]
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
            <CloseIcon color='primary' fontSize='large'/>
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
            colors={colors}
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

