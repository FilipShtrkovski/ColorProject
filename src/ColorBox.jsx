import { Component } from 'react'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom' 

import { withStyles } from '@mui/styles'
import Box from '@mui/material/Box';
import { SingleColorBox, Heading, Span, ColorName, BoxContent, CopyButton, styled} from './styles/ColorBoxStyles'
import styles from './styles/ColorBoxStyles'

class ColorBox extends Component {
    constructor(props){
        super(props)
        this.state = {
            copied: false
        }
    }

    changeCopyState = () => {
        this.setState({copied: true},()=>{
        setTimeout(() => {
            this.setState({copied: false})
        }, 1500)
    })
    }

  render(){
    const {name, background, colorId, paletteId, showingFillPalette, classes } = this.props
    const {copied} = this.state
    return (
        <CopyToClipboard text={background} onCopy={this.changeCopyState}>
            <SingleColorBox sx={{ background }} showingFillPalette={showingFillPalette} >
                <Box style={{background}} className={`${classes.copyOverlay} ${copied && classes.showOverlay}`} />
                <Box className={`${classes.copyMsg} ${copied && classes.showMsg} ${classes.colorText}`}>
                    <Heading>copied!</Heading>
                    <ColorName>{background}</ColorName>
                </Box>
                <Box>
                    <BoxContent >
                        <span className={classes.colorText}>{name}</span>
                    </BoxContent>
                    <CopyButton background={background}>Copy</CopyButton>
                </Box>
                {showingFillPalette && (
                    <Link to={`/palette/${paletteId}/${colorId}`} onClick={e=> e.stopPropagation()}>
                        <Span background={background}>MORE</Span>
                    </Link>)
                }
            </SingleColorBox>
        </CopyToClipboard>
      )
  }
}

export default withStyles(styles, styled)(ColorBox)
