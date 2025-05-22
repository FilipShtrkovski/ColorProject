import { styled } from '@mui/material/styles';

const Colors = styled('div')(() => ({
    backgroundColor: "#dae1e4",
    height: "150px",
    borderRadius: "5px",
    overflow: "hidden"
}));

const Root = styled('div')(() => ({
    backgroundColor: "white",
    border: "1px solid black",
    borderRadius: "5px",
    padding: "0.5rem",
    position: "relative",
    cursor: "pointer",
    overflow: "hidden",
    "svg": {
        color: 'white',
        backgroundColor: '#eb3d30',
        width: '20px',
        height: '20px',
        position: 'absolute',
        top: '0px',
        right: '0px',
        padding: '10px',
        zIndex: 10,
        opacity: 0,
    },
    "&:hover svg": {
        opacity: 1
    },

}));

const Title = styled('h5')(() => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0",
    color: "black",
    paddingTop: "0.5rem",
    fontSize: "1rem",
    postiton: "relative"
}));

const Emoji = styled('span')(() => ({
    marginLeft: "0.5rem",
    fontSize: "1.5rem"
}));

const MiniColor = styled('div')(() => ({
    height: "25%",
    width: "20%",
    display: "inline-block",
    margin: "0 auto",
    positions: "relative",
    marginBottom: "-3.5px"
}));

export{Colors, Root, Title, Emoji, MiniColor, styled}

