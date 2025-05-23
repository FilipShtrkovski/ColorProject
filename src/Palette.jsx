import { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'

import { withStyles } from '@mui/styles'
import { PaletteContainer, PaletteColors, styled } from './styles/PaletteStyles'

class Palette extends Component {
  constructor(props){
    super(props)
    this.state = {
      level: 500,
      format: 'hex'
    }
  }
  
  changeLevel = (level) => {
    this.setState({level})
  }

  changeFormat = (value) => {
    this.setState({format: value})
  }

  render(){
    const { colors, paletteName, emoji, id } = this.props.palette
    const { level, format } = this.state
    const colorBoxes = colors[level].map(color => (
      <ColorBox 
        key={color.id} 
        background={color[format]} 
        name={color.name} 
        colorId={color.id} 
        paletteId={id}
        showingFillPalette={true}
      />
    ))
    return (
      <PaletteContainer>
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors={true}/>
        <PaletteColors>{colorBoxes}</PaletteColors>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </PaletteContainer>
      )
  }
}

export default withStyles(styled)(Palette)
