import { Component } from 'react';
import {Link} from 'react-router-dom'
import PaletteMetaForm from './PaletteMetaForm';

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { styled } from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import MiniAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@mui/material';

const drawerWidth = 450;

const Root = styled(Box)(()=> ({
  display: 'flex',
}))

const BoxBts = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection:'row',
  marginRight: '1.5rem'
}));

const AppBar = styled(MiniAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    justifyContent:'space-between',
    flexDirection: 'row',
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
    ]
  }
));

class PaletteFormNav extends Component {
  constructor(props){
      super(props)
      this.state = {
          newPaletteName: '',
          formShowing: false
      }
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  showForm = () => {
    this.setState({formShowing: true})
  }
    
  render() {
    const {handleDrawerOpen, open, handleSubmit, palettes} = this.props
    return (
      <Root>
        <CssBaseline />
        <AppBar position="fixed" color="default" open={open}>
          <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx = { [ { mr: 2, }, open && { display: 'none' } ] }
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Color Palette
          </Typography>
          </Toolbar>
          <BoxBts>
              <Button sx={{margin: '0 0.5rem'}} variant="contained" onClick={this.showForm}>
                Save Palette
              </Button> 
              <Link to='/'>
                <Button sx={{margin: '0 0.5rem'}} variant='contained' color='error'>Go Back</Button>
              </Link>
          </BoxBts>
          </AppBar>
          {this.state.formShowing && (<PaletteMetaForm handleSubmit={handleSubmit} palettes={palettes}/>)}
        </Root>
      )
    }
}
export default withStyles(styled)(PaletteFormNav)