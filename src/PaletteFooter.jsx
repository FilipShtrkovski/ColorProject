import { Component } from "react";
import { withStyles } from '@mui/styles'

const styles ={
    paletteFooter: {
        backgroundColor: 'white',
        height: '5vh',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        fontWeight: 'bold'
    },
    emoji: {
        fontSize: '1.5rem',
        margin: '0 1rem'
    }
}
    

class PaletteFooter extends Component{
    render(){
        const {paletteName, emoji, classes} = this.props
        return(
            <footer className={classes.paletteFooter}>
                {paletteName}
                <span className={classes.emoji}>{emoji}</span>
            </footer>
        )
    }
}

export default withStyles(styles)(PaletteFooter)