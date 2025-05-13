import { Component } from 'react';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Link} from 'react-router-dom'

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MiniAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const drawerWidth = 450;

const AppBar = styled(MiniAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          width: `calc(100% - ${drawerWidth}px)`,
          marginLeft: `${drawerWidth}px`,
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      },
    ],
  }));

class PaletteFormNav extends Component {
    constructor(props){
        super(props)
        this.state = {
            newPaletteName: ''
        }
    }
    

    componentDidMount(){
        ValidatorForm.addValidationRule('paletteNameUnique', (value) => 
            this.props.palettes.every(
              ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
            )
          );
    }

    handleChange = (evt) => {
        this.setState({
          [evt.target.name]: evt.target.value
        })
      }
    
  render() {
    const {handleDrawerOpen, open, handleSubmit} = this.props
    const {newPaletteName} = this.state
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" color="default" open={open}>
                <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={[
                    {
                        mr: 2,
                    },
                    open && { display: 'none' },
                    ]}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    Color Palette
                </Typography>
                <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                    <TextValidator 
                    name='newPaletteName'
                    label='Palette Name'
                    onChange={this.handleChange}
                    value={newPaletteName}
                    validators={['required', 'paletteNameUnique']}
                    errorMessages={['Enter Palette Name', 'Palette Name Already Exists']}/>
                    <Button 
                    variant='contained' 
                    color='primary' 
                    type='submit'
                    >
                    Save Palette
                    </Button>
                    <Link to='/'>
                        <Button variant='contained' color='secondary'>Go Back</Button>
                    </Link>
                </ValidatorForm>
                </Toolbar>
        </AppBar>
        </Box>
        )
    }
}
export default PaletteFormNav