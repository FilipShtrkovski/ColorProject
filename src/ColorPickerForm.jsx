import React, { Component } from 'react'
import { ChromePicker } from 'react-color';
import {AddColor, styles, styled} from './styles/ColorPickerFormStyles'

import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';



class ColorPickerForm extends Component {
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
    const {disabled, classes} = this.props
    const {currentColor, newColorName} = this.state
    return (
        <Box sx={{width: '100%'}} >
          <ChromePicker 
            className={classes.picker}
            color={ currentColor }
            onChangeComplete={ this.handleChangeComplete }/>
        <ValidatorForm onSubmit={this.handleSubmit}>
          <TextValidator 
            sx={{
              width: '100%',
              height: '4rem'
            }}
            placeholder='Color Name'
            name='newColorName'
            value={newColorName} 
            margin='normal'
            variant="filled"
            onChange={this.handleChange}
            validators={['required', 'colorNameUnique', 'colorUnique']}
            errorMessages={['Enter Color Name', 'Name Already Exists', 'Color Already Used']}/>
          <AddColor
            variant='contained' 
            color='primary' 
            style={{backgroundColor: currentColor}}
            type='submit'
            disabled={disabled}
          >Add Color</AddColor>
        </ValidatorForm>
      </Box>
    )
  }
}
export default withStyles( styles, styled )(ColorPickerForm);