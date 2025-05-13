import { Component } from 'react';
import { ChromePicker } from 'react-color';
import DraggableColorBox from './DraggableColorBox';
import DraggableColorList from './DraggableColorList';
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
  static defaultProps = {
    maxColors: 20
  }
  constructor(props){
    super(props)
    this.state = {
      open:false,
      currentColor: 'teal',
      colors: this.props.palettes[0].colors,
      newColorName: '',
      newPaletteName: ''
    }

  }

  componentDidMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('colorNameUnique', (value) => 
        this.state.colors.every(
          ({name}) => name.toLowerCase() !== value.toLowerCase()
        )
    );
    ValidatorForm.addValidationRule('colorUnique', () => 
      this.state.colors.every(
        ({color}) => color !== this.state.currentColor
      )
    );
    ValidatorForm.addValidationRule('paletteNameUnique', (value) => 
      this.props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
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
    const newColor = {name: this.state.newColorName, color: this.state.currentColor}
    this.setState({
      colors:[ ...this.state.colors, newColor ],newColorName:''
    })
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = () => {
    let newPaletteName = this.state.newPaletteName
    let id = newPaletteName.toLowerCase().replace(/ /g, '-') 
    const newPalette = {
      paletteName: newPaletteName,
      id: id,
      colors: this.state.colors
    }
    this.props.savePalette(newPalette)
    this.props.history.push('/')
  }
  
  

  handleDelete = (colorName) => {
    this.setState({
      colors: this.state.colors.filter(color => color.name !== colorName)
    })
  }

  handleRandomColor = () => {
    const allColors = this.props.palettes.map(p => p.colors).flat()
    const rand  = Math.floor(Math.random() * allColors.length)
    this.setState({
      colors: [...this.state.colors, allColors[rand]]
    })
  }

  sortedColors = (colors) => {
    this.setState({
      colors
    })
  }

  clearPalette = () => {
    this.setState({
      colors: []
    })
  }

render(){
  const {open, currentColor, colors, newColorName, newPaletteName} = this.state
  const {maxColors} = this.props
  let disabled = colors.length >= maxColors
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
          <ValidatorForm onSubmit={this.handleSubmit}>
            <TextValidator 
              name='newPaletteName'
              label='Palette Name'
              onChange={this.handleChange}
              value={newPaletteName}
              validators={['required', 'paletteNameUnique']}
              errorMessages={['Enter Palette Name', 'Palette Name Already Exists']}/>
            <Button variant='contained' color='primary' type='submit'
            >Save Palette</Button>
          </ValidatorForm>
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
          <Button 
            onClick={this.clearPalette}
            variant='contained' 
            color='secondary' 
          >Clear Palette</Button>
          <Button 
            onClick={this.handleRandomColor}
            variant='contained'
            color='primary'
            disabled={disabled}
          >Random Color</Button>
        </div>
        <ChromePicker 
          color={ currentColor }
          onChangeComplete={ this.handleChangeComplete }/>
        <ValidatorForm onSubmit={this.addColor} onError={errors => console.log(errors)}>
          <TextValidator 
            name='newColorName'
            value={newColorName} 
            onChange={this.handleChange}
            validators={['required', 'colorNameUnique', 'colorUnique']}
            errorMessages={['Enter Color Name', 'Name Already Exists', 'Color Already Used']}/>
          <Button
            variant='contained' 
            color='primary' 
            style={{backgroundColor: currentColor}}
            type='submit'
            disabled={disabled}
          >Add Color</Button>
        </ValidatorForm>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
          <DraggableColorList sortedColors={this.sortedColors} 
          colors={colors} handleDelete={this.handleDelete} />
      </Main>
    </Box>
  )};

}


export default withStyles(styled, { withTheme: true })(NewPaletteForm);

