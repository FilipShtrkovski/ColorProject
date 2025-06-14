import chroma from 'chroma-js';
import { styled } from '@mui/material/styles';
import sizes from './sizes';


const SingleColorBox = styled('div')((props) => ({
    width: '20%',
    height: props.showingFillPalette ? '25%' : '50%',
    margin: '0 auto',
    display: 'inline-block',
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '-7px',
    '&:hover button': {
        opacity: 1,
        transition: '0.5s'
    },
    [sizes.down('lg')]: {
        width:'25%',
        height: props.showingFillPalette ? '20%' : '33.3333%',
    },
    [sizes.down('md')]: {
        width:'50%',
        height: props.showingFillPalette ? '10%' : '20%',
    },
    [sizes.down('xs')]: {
        width:'100%',
        height: props.showingFillPalette ? '5.1%' : '10%',
    }
}));

const Heading = styled('h1')(() => ({
    fontWeight: 400,
    textShadow: '1px 2px black',
    background: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    marginBottom: 0,
    padding: '1rem',
    textTransform: 'uppercase',
    [sizes.down('xs')]: {
        fontSize: '4rem'
    }
}));

const ColorName = styled('p')(() => ({
    fontSize: '2rem',
    fontWeight: 100
}));

const CopyButton = styled('button')((props) => ({
    color: chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0, 0.6)', 
    width: '100px',
    height: '30px',
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '50%',
    marginLeft: '-50px',
    marginTop: '-15px',
    textAlign: 'center',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.3)',
    fontSize: '1rem',
    lineHeight: '30px',
    textTransform: 'uppercase',
    border: 'none',
    textDecoration: 'none',
    opacity: 0
}));

const Span = styled('div')((props) => ({
    color: chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0, 0.6)',
    background: 'rgba(255, 255, 255, 0.246)',
    position: 'absolute',
    border: 'none',
    right: '0px',
    bottom: '0px',
    width: '60px',
    height: '30px',
    textAlign: 'center',
    lineHeight: '30px',
    textTransform: 'uppercase'
}));

const BoxContent = styled('div')(() => ({
    position: 'absolute',
    width: '100%',
    left: '0px',
    bottom: '0px',
    padding: '10px',
    color: "black",
    letterSpacing: '1px',
    textTransform: 'uppercase',
    fontSize: '12px'
}));

export default {
    colorText: {
        color: props => chroma.contrast(props.background, 'black') < 6 ? 'white' : 'rgba(0,0,0, 0.6)'
    },
    copyOverlay: {
        opacity: 0,
        zIndex: 0,
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s ease-in-out',
        transform: 'scale(0.1)'
    },
    showOverlay: {
        opacity: 1,
        transform: 'scale(50)',
        zIndex: 10,
        position: 'absolute'
    },
    copyMsg: {
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '2rem',
        transform: 'scale(0.1)',
        opacity: 0,
    },
    showMsg: {
        opacity: 1,
        transform: 'scale(1)',
        zIndex: 25,
        transition: 'all 0.4s ease-in-out',
        transitionDelay: '0.3s',
        textAlign: 'center',
    }
}

export {SingleColorBox, Heading, ColorName, Span, CopyButton, BoxContent, styled}