import { Component } from "react";
import Slider from 'rc-slider';
import {Link} from 'react-router-dom'

import { withStyles } from '@mui/styles'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import 'rc-slider/assets/index.css';
import { NavbarContent, Logo, SliderContent, SelectContainer, styled } from './styles/NavbarStyles';


class Navbar extends Component{
    constructor(props){
        super(props)
        this.state = {format: 'hex', open: false}
    }

    handleFormatChange = (evt) => {
        this.setState({format: evt.target.value, open: true})
        this.props.handleChange(evt.target.value)
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            this.setState({open:false})
        }
        this.setState({open:false});
    }
    
    handleClick = () => {
        this.setState({open:true});
      };
    
    render(){
        const {level, changeLevel, showingAllColors} = this.props
        const {format} = this.state
        return(
            <NavbarContent>
                <Logo>
                    <Link to="/">ColorPicker</Link>
                </Logo>
                {showingAllColors && 
                    <Box>
                        <span>Level: {level}</span>
                        <SliderContent>
                            <Slider 
                            defaultValue={level} 
                            min={100} max={900} 
                            onChangeComplete={changeLevel} 
                            onClose={this.handleClose}
                            step={100}/>
                        </SliderContent>   
                    </Box>
                }
                <SelectContainer>
                    <Select value={format} onChange={this.handleFormatChange}>
                        <MenuItem value='hex'>HEX - #ffffff</MenuItem>
                        <MenuItem value='rgb'>RGB - rgb(255, 255, 255)</MenuItem>
                        <MenuItem value='rgba'>RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
                    </Select>
                </SelectContainer>
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
            </NavbarContent>
        )
    }
}

export default withStyles(styled)(Navbar)

