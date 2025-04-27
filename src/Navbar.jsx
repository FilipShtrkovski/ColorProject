import { Component } from "react";
import Slider from 'rc-slider';
import {Link} from 'react-router-dom'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import 'rc-slider/assets/index.css';
import './Navbar.css'

class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {format: 'hex', open: false}
        this.handleFormatChange = this.handleFormatChange.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    handleFormatChange(evt){
        this.setState({format: evt.target.value, open: true})
        this.props.handleChange(evt.target.value)
    }

    handleClose(event, reason){
        if (reason === 'clickaway') {
            this.setState({open:false})
        }
        this.setState({open:false});
    }
    
    handleClick(){
        this.setState({open:true});
      };
    
    render(){
        
        const {level, changeLevel} = this.props
        const {format} = this.state
        return(
            <nav className="Navbar">
                <div className="logo">
                    <Link to="/">ColorPicker</Link>
                </div>
                <div className="slider-container">
                    <span>Level: {level}</span>
                    <div className="slider">
                        <Slider 
                        defaultValue={level} 
                        min={100} max={900} 
                        onChangeComplete={changeLevel} 
                        onClose={this.handleClose}
                        step={100}/>
                    </div>   
                </div>
                <div className="select-container">
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </div>
                <Snackbar 
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                open={this.state.open}
                autoHideDuration={6000}
                message={<span id="message-id">Format Changed to {format.toUpperCase()}!</span>}
                slotProps = {{
                    "aria-describedby": "message-id"
                }}
                action={[
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={this.handleClose}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                ]}
                onClose={this.handleClose}/>
            </nav>
        )
    }
}

export default Navbar