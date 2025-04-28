import ColorBox from "./ColorBox";
import { Component } from "react";

class SingleColorPalette extends Component{
    constructor(props){
        super(props)
        this._shades = this.gatherColor(this.props.palette, this.props.colorId)
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

    render(){
        const colorBoxes = this._shades.map(color => (
            <ColorBox key={color.id} name={color.name} background={color.hex} showLink={false}/>
        ))

        return(
            <div className="Palette">
                <h1>Single Color Palette</h1>
                <div className="Palette-colors">{colorBoxes}</div>
               
            </div>
        ) 
    }
}
export default SingleColorPalette