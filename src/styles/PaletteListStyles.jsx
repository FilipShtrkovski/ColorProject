import sizes from './sizes';
import { styled } from '@mui/material/styles';
import img from './confetti-doodles.png'

const Root = styled('div')(()=> ({
    backgroundColor: "#394bad",
    backgroundImage: `url(${img})`,
    height: "100vh",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    overflow: "scroll"
}))

const Header = styled('h1')(()=> ({
    fontSeize: '2rem'   
}))

const Container = styled('div')(()=> ({
    width: "50%",
    display: "flex",
    alignItems: "flex-start",
    flexDirection: "column",
    flexWrap: "wrap",  
}))

const Navbar = styled('nav')(()=> ({
    width: '100%',
    display: "flex",     
    justifyContent: "space-between",
    alignItems: 'center',
    color: "white",
    '& a': {
        color: 'white'
    }
}))

const Palettes = styled('nav')(()=> ({
    boxSizing: "border-box",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 30%)",
    gridGap: "2.5rem",
    [sizes.down('lg')]: {
        gridGap: "1.5rem",
    },
    [sizes.down('md')]: {
        gridTemplateColumns: "repeat(2, 50%)",
    },
    [sizes.down('xs')]: {
        gridTemplateColumns: "repeat(1, 100%)",
    }
}))

export { Root, Header, Container, Navbar, Palettes, styled }
