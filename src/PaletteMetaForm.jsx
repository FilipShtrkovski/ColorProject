import { Component } from 'react'
import Picker from '@emoji-mart/react'

import Box from '@mui/material/Box';
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
            stage: 'form',
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
    
    showEmojiPicker = () => {
        this.setState({stage: 'emoji'})
    }

    savePalette = (emoji) => {
        const newPalette = {paletteName: this.state.newPaletteName, emoji: emoji.native}
        this.props.handleSubmit(newPalette)
    }

    render() {
        const { hideForm } = this.props
        const { stage, newPaletteName } = this.state
        return (
        <Box>
            <Dialog open={stage === 'emoji'}>
                <Picker  onEmojiSelect={this.savePalette} />
            </Dialog>
            <Dialog
                open={stage === 'form'}
                onClose={hideForm}
                >
                <DialogTitle>Choose a Palette Name</DialogTitle>
                <ValidatorForm onSubmit={this.showEmojiPicker}>
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
                        <Button onClick={hideForm}>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit'>
                            Save Palette
                        </Button>
                    </DialogActions>
                </ValidatorForm>
            </Dialog>
        </Box>
        )
    }
}
export default PaletteMetaForm