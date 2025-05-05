import { Component } from 'react'
import ColorBox from './ColorBox'
import Navbar from './Navbar'
import PaletteFooter from './PaletteFooter'
import { withStyles } from '@mui/styles'
import styles from './styles/PaletteStyles'

class Palette extends Component {
  constructor(props){
    super(props)
    this.state = {
      level: 500,
      format: 'hex'
    }
    this.changeLevel = this.changeLevel.bind(this)
    this.changeFormat = this.changeFormat.bind(this)
  }
  
  changeLevel(level){
    this.setState({level})
  }

  changeFormat(value){
    this.setState({format: value})
  }

  render(){
    const { colors, paletteName, emoji, id } = this.props.palette
    const { classes } = this.props
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
      <div className={classes.palette}>
        <Navbar level={level} changeLevel={this.changeLevel} handleChange={this.changeFormat} showingAllColors={true}/>
        <div className={classes.paletteColors}>{colorBoxes}</div>
        <PaletteFooter paletteName={paletteName} emoji={emoji}/>
      </div>
      )
  }
}

export default withStyles(styles)(Palette)
