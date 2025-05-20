import sizes from './sizes';
import img from './confetti-doodles.png'

export default {
    root:{
        backgroundColor: "#394bad",
        backgroundImage: `url(${img})`,
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll",
    },
    heading: {
        fontSeize: '2rem'
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap",
    },
    nav: {
        width: '100%',
        display: "flex",     
        justifyContent: "space-between",
        alignItems: 'center',
        color: "white",
        '& a': {
            color: 'white'
        }

    },
    palettes: {
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
    }
}
