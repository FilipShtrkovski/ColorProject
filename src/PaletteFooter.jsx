import { Component } from "react";
import { withStyles } from '@mui/styles'
import { PaletteFooterContent, Emoji, styled } from './styles/PaletteFooterStyles'

class PaletteFooter extends Component{
    render(){
        const {paletteName, emoji} = this.props
        return(
            <PaletteFooterContent>
                {paletteName}
                <Emoji>{emoji}</Emoji>
            </PaletteFooterContent>
        )
    }
}

export default withStyles(styled)(PaletteFooter)