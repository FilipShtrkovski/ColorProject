import { PureComponent } from "react";
import { withStyles } from '@mui/styles'
import { FaTrashCan } from "react-icons/fa6";
import {Colors, Root, Title, Emoji, MiniColor, styled } from './styles/MiniPaletteStyles'

class MiniPalette extends PureComponent{
    constructor(props){
        super(props) 
    }

    handleDelete = (evt) => {
        evt.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    
    render(){
        const {classes, paletteName, emoji, handleClick, colors, id} = this.props;
        const miniColorBoxes = colors.map(color => (
        <MiniColor 
            key={color.name} 
            sx={{backgroundColor: color.color}}
        />))
        return(
            <Root onClick={()=>handleClick(id)}>
                <FaTrashCan 
                    onClick={this.handleDelete} 
                    className={classes.deleteIcon} 
                    style={{transition: 'all 0.3s ease-in-out'}}/>
                <Colors>{miniColorBoxes}</Colors>
                <Title>{paletteName} <Emoji>{emoji}</Emoji></Title>
            </Root>
        
        )
    }
}
export default withStyles(styled)(MiniPalette)