import { Component } from "react";
import { withStyles } from '@mui/styles'
import { FaTrashCan } from "react-icons/fa6";
import styles from './styles/MiniPalleteStyles'


class MiniPalette extends Component{
    constructor(props){
        super(props) 
    }

    handleDelete = (evt) => {
        evt.stopPropagation()
        this.props.openDialog(this.props.id)
    }
    
    render(){
        const {classes, paletteName, emoji, handleClick, colors} = this.props;
        const miniColorBoxes = colors.map(color => (
        <div key={color.name} className={classes.miniColor} style={{backgroundColor: color.color}}/>))
        return(
            <div className={classes.root} onClick={handleClick}>
                <FaTrashCan onClick={this.handleDelete} className={classes.deleteIcon} 
                style={{transition: 'all 0.3s ease-in-out'}}/>
                <div className={classes.colors}>{miniColorBoxes}</div>
                <h5 className={classes.title}>{paletteName} <span className={classes.emoji}>{emoji}</span></h5>
            </div>
        
        )
    }
}
export default withStyles(styles)(MiniPalette)