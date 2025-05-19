import { Component } from 'react';
import {Link} from 'react-router-dom'
import PaletteMetaForm from './PaletteMetaForm';
import { Root, BoxBts, AppBar, styled} from './styles/PaletteFormNavStyles'

import { withStyles } from '@mui/styles'
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import PaletteIcon from '@mui/icons-material/Palette';
import { Button } from '@mui/material';


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
   
  hideForm = () => {
    this.setState({formShowing: false})
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
            <PaletteIcon color="primary" fontSize='large'/>
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Make A Custom Palette
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
          {
            this.state.formShowing && 
            (<PaletteMetaForm handleSubmit={handleSubmit} hideForm={this.hideForm} palettes={palettes}/>)
          }
        </Root>
      )
    }
}
export default withStyles(styled)(PaletteFormNav)