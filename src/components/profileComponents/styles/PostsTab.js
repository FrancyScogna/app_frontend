export const customStyles = (theme) => {
    return{
        poststab_main_div: {
            margin: "10px"
        },
        poststab_tab_text: {
            fontWeight: "bold",
            borderTopLeftRadius: "20px",
            borderTopRightRadius: "20px"
        },
        poststab_swiper_main: {
            marginTop: "10px"
        },
        poststab_viewport_div: {
            display: "flex",
            width: "100%",
            margin: "20px",
            display: "flex", 
            justifyContent: "center"
        },
        poststab_viewport_circularprogress: {
            size: "50px",
            color: theme.palette.primary.dark,
            marginTop: "3px"
        }
    }
}