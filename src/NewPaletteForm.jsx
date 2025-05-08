import { Component } from 'react';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import { styled} from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Button } from '@mui/material';



const drawerWidth = 450;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    height: 'calc(100vh - 45px)',
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    variants: [
      {
        props: ({ open }) => open,
        style: {
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
          }),
          marginLeft: 0,
        },
      },
    ],
  }),
);

const AppBar = styled(MuiAppBar, {
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

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

class NewPaletteForm extends Component {
  constructor(props){
    super(props)
    this.state = {
      open:false,
      currentColor: 'teal',
      colors: [],
      newName: ''
    }

  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
        this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule('isColorUnique', () => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
  );
}
  
  handleChangeComplete = (color) => {
    this.setState({ currentColor: color.hex });
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  }; 

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addColor = () => {
    const newColor = {name: this.state.newName, color: this.state.currentColor}
    this.setState({
      colors:[ ...this.state.colors, newColor ],newName:''
    })
  }

  handleChange = (evt) => {
    this.setState({
      newName: evt.target.value
    })
  }

  handleSubmit = () => {
    let newName = 'New Test Palette'
    let id = newName.toLowerCase().replace(/ /g, '-') 
    const newPalette = {
      paletteName: newName,
      id: id,
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }

render(){
  const {open, currentColor, colors, newName} = this.state
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={this.handleDrawerOpen}
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
            Persistent drawer
          </Typography>

          <Button variant='contained' color='primary' onClick={this.handleSubmit}
          >Save Palette</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={this.handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Typography variant='h4'>
          Design Your Palette
        </Typography>
        <div>
          <Button variant='contained' color='secondary' >Clear Palette</Button>
          <Button variant='contained' color='primary' >Random Color</Button>
        </div>
        <ChromePicker color={ currentColor }
        onChangeComplete={ this.handleChangeComplete }/>
        <ValidatorForm onSubmit={this.addColor} onError={errors => console.log(errors)}>
          <TextValidator 
            value={newName} 
            onChange={this.handleChange}
            validators={['required', 'isColorNameUnique', 'isColorUnique']}
            errorMessages={['enter a color name', 'name already exists', 'color already used']}/>
          <Button
            variant='contained' 
            color='primary' 
            style={{backgroundColor: currentColor}}
            type='submit'
          >Add Color</Button>
        </ValidatorForm>
        
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          {colors.map(color=>(
            <DraggableColorBox color={color.color} name={color.name}/>
          ))}
      </Main>
    </Box>
  );
}
}

export default withStyles(styled, { withTheme: true })(NewPaletteForm);

