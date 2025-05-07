import { Component } from 'react';
import { ChromePicker } from 'react-color';
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
      colors: ['purple','#e15764']
    }

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
    this.setState({
      colors:[...this.state.colors, this.state.currentColor]
    })
  }

render(){
  const {open, currentColor, colors} = this.state
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
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
        <Button
         variant='contained' 
         color='primary' 
         style={{backgroundColor: currentColor}}
         onClick={this.addColor}
         >Add Color</Button>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <ul>
          {colors.map(color=>(
            <li style={{backgroundColor:color}}>{color}</li>
          ))}
        </ul>
      </Main>
    </Box>
  );
}
}

export default withStyles(styled, { withTheme: true })(NewPaletteForm);

