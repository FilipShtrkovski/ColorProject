import React, { Component } from 'react'
import { ChromePicker } from 'react-color';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';

export default class ColorPickerForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentColor: 'teal',
            newColorName: ''
        }
    }

    componentDidMount() {
        ValidatorForm.addValidationRule('colorNameUnique', (value) => 
            this.props.colors.every(
              ({name}) => name.toLowerCase() !== value.toLowerCase()
            )
        );
        ValidatorForm.addValidationRule('colorUnique', () => 
          this.props.colors.every(
            ({color}) => color !== this.state.currentColor
          )
        );
    }

    handleChangeComplete = (color) => {
        this.setState({ currentColor: color.hex });
    };
    
    handleChange = (evt) => {
        this.setState({
            [evt.target.name]: evt.target.value
        })
    }      

    handleSubmit = () => {
        const newColor = {name: this.state.newColorName, color: this.state.currentColor}
        this.props.addColor(newColor)
        this.setState({newColorName: ''})
    }
    
  render() {
    const {disabled} = this.props
    const {currentColor, newColorName} = this.state
    
    return (
        <Box >
            <ChromePicker 
            color={ currentColor }
            onChangeComplete={ this.handleChangeComplete }/>
        <ValidatorForm onSubmit={this.handleSubmit} onError={errors => console.log(errors)}>
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
      </Box>
    )
  }
}
