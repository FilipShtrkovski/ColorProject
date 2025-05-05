import ColorBox from "./ColorBox";
import Navbar from './Navbar'
import {Link} from 'react-router-dom'
import PaletteFooter from "./PaletteFooter";
import { Component } from "react";
import { withStyles } from '@mui/styles'
import styles from './styles/SingleColorPalette'

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
            <div className={classes.palette}>
                <Navbar handleChange={this.changeFormat} showingAllColors={false}/>
                <div className={classes.paletteColors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to={`/palette/${id}`}>go back</Link>    
                    </div>    
                </div>
                <PaletteFooter paletteName={paletteName} emoji={emoji}/>
            </div>
        ) 
    }
}
export default withStyles(styles)(SingleColorPalette)