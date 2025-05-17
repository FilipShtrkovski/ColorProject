import React, { Component } from 'react'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

class PaletteMetaForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            open: true,
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

    handleClose = () => {
        this.setState({open: false});
    };
    render() {
        const {handleSubmit} = this.props
        const {open, newPaletteName} = this.state
        return (

        <Dialog
            open={open}
            onClose={this.handleClose}
            // slotProps={{
            //     paper: {
            //     component: 'form',
            //     onSubmit: (event) => {
            //         event.preventDefault();
            //         const formData = new FormData(event.currentTarget);
            //         const formJson = Object.fromEntries(formData.entries());
            //         const email = formJson.email;
            //         console.log(email);
            //         this.handleClose();
            //     },
            //     },
            // }}
            >
            <DialogTitle>Choose a Palette Name</DialogTitle>
            <ValidatorForm onSubmit={() => handleSubmit(newPaletteName)}>
                <DialogContent>
                    <DialogContentText>
                        Please enter a name for your new beautiful palette. Make sure
                        it's unique!
                    </DialogContentText>
                    <TextValidator 
                        margin='normal'
                        fullWidth
                        name='newPaletteName'
                        label='Palette Name'
                        onChange={ this.handleChange }
                        value={ newPaletteName }
                        validators={ ['required', 'paletteNameUnique'] }
                        errorMessages={ ['Enter Palette Name', 'Palette Name Already Exists'] }
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose}>Cancel</Button>
                    <Button variant='contained' color='primary' type='submit'>
                        Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
        )
    }
}
export default PaletteMetaForm