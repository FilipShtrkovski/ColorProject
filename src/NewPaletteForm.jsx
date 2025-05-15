import { Component } from 'react';
import DraggableColorList from './DraggableColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import { styled} from '@mui/material/styles';
import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
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
      colors: this.props.palettes[0].colors
    }

  }
  
  handleDrawerOpen = () => {
    this.setState({ open: true });
  }; 

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  addColor = (newColor) => {
    this.setState({
      colors:[ ...this.state.colors, newColor ]
    })
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit = (newPaletteName) => {
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
  const { open, colors} = this.state
  const { maxColors,palettes } = this.props
  let disabled = colors.length >= maxColors
  return (
    
    <Box sx={{ display: 'flex'}}>
      <PaletteFormNav 
        handleDrawerOpen={this.handleDrawerOpen}
        open={open}
        palettes={palettes}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleChange}
      />
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
        <ColorPickerForm 
          disabled={disabled} 
          addColor={this.addColor}
          colors={this.state.colors}
        />
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

