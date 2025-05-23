import { Component } from "react"
import {Link} from 'react-router-dom'
import MiniPalette from "./MiniPalette"
import { withStyles } from '@mui/styles'

import Dialog from '@mui/material/Dialog';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import DialogTitle from '@mui/material/DialogTitle';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { blue, red } from '@mui/material/colors'
import {Root, Header, Navbar, Container, Palettes, styled} from './styles/PaletteListStyles'

class PaletteList extends Component{
    constructor(props){
        super(props)
        this.state = {
            openDeleteDialog: false,
            deleteingId: ''
        }
    }

    openDialog = (id) => {
        this.setState({openDeleteDialog: true, deleteingId: id})
    }
    
    closeDialog = () => {
        this.setState({openDeleteDialog: false, deleteingId: ''})
    }

    handleDelete = () => {
        this.props.deletePalette(this.state.deleteingId)
        this.closeDialog()
    }
    
    goToPalette = (id) => {
        this.props.history.push(`/palette/${id}`)
    }
    
    render(){
        const {palettes} = this.props
        const {openDeleteDialog } = this.state
        return(
            <Root>
                <Container>
                    <Navbar>
                        <Header>ColorPalette</Header>
                        <Link to='/palette/new'>Create Palette</Link>
                    </Navbar>
                    <Palettes>
                        {palettes.map(palette => (
                            <MiniPalette 
                                key={palette.id}
                                id={palette.id}
                                {...palette} 
                                handleClick={this.goToPalette}
                                openDialog={this.openDialog}
                            />
                        ))}
                    </Palettes>
                </Container>
                <Dialog 
                    aria-labelledby="delete-dialog-title"
                    open={openDeleteDialog} 
                    onClose={this.closeDialog}
                    >
                    <DialogTitle id="delete-dialog-title">
                        Delete Palette ?
                    </DialogTitle>
                    <List>
                        <ListItem >
                            <ListItemButton onClick={this.handleDelete}>
                                <ListItemAvatar>
                                    <Avatar sx={{backgroundColor: red[100], color:red[500]}}>
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Delete'/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    <List>
                        <ListItem >
                            <ListItemButton onClick={this.closeDialog}>
                                <ListItemAvatar>
                                    <Avatar sx={{backgroundColor: blue[100], color:blue[500]}}>
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Close'/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                    
                </Dialog>
            </Root>
        )
    }
}

export default withStyles(styled)(PaletteList)