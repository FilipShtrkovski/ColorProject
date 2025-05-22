import ColorBox from "./ColorBox";
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import PaletteFooter from "./PaletteFooter";
import { Component } from "react";
import { withStyles } from '@mui/styles'
import { PaletteContainer, PaletteColors, GoBack, styled } from './styles/SingleColorPalette'

class SingleColorPalette extends Component{
    constructor(props){
        super(props)
        this.state = {format: 'hex'}
        this._shades = this.gatherColor(this.props.palette, this.props.colorId)
        this.changeFormat = this.changeFormat.bind(this)
    }
    gatherColor(palette, colorToFilterBy){
        let shades = []
        let allColors = palette.colors
        for(let key in allColors){
            shades = shades.concat(
                allColors[key].filter(color => color.id === colorToFilterBy)
            )
        }
        return shades.slice(1)
    }

    changeFormat(value){
        this.setState({format: value})
      }

    render(){
        const {format} = this.state
        const {paletteName, emoji, id} = this.props.palette
        const {classes} = this.props
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.name} name={color.name} background={color[format]} showingFillPalette={false}/>
        ))

        return(
            <PaletteContainer>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <PaletteColors>
                    {colorBoxes}
                    <GoBack>
                        <Link to={`/palette/${id}`}>go back</Link>    
                    </GoBack>    
                </PaletteColors>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </PaletteContainer>
        ) 
    }
}
export default withStyles(styled)(SingleColorPalette)