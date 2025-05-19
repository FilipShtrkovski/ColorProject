

export default {
    root:{
        backgroundColor: "#394bad",
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        overflow: "scroll"
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "flex-start",
        flexDirection: "column",
        flexWrap: "wrap"
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
        gridTemplateColumns: "repeat(3, 1fr)",
        gridGap: "2.5rem"
    }
}
