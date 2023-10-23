export const customStyles = (theme, downIpad) => {
    return{
        footer_main_div: {
            display: "flex",
            flex: 1,
            paddingTop: downIpad ? "10px" : "20px",
            paddingBottom: downIpad ? "10px" : "20px",
            paddingLeft: downIpad ? "10px" : "10vw",
            paddingRight: downIpad ? "10px" : "10vw",
            flexDirection: "column",
            marginTop: "auto",
            backgroundColor: theme.palette.primary.main,
            borderTop: `1px solid ${theme.palette.primary.dark}`
        },
        footer_top_div: {
            display: "flex",
            flexDirection: downIpad ? "column":"row"
        },
        footer_left_div: {
            display: "flex",
            flex: 1,
            marginLeft: "20px",
            marginBottom: downIpad && "20px"
        },
        footer_link_text: {
            color: theme.palette.primary.light,
            fontWeight: "bold"
        },
        footer_right_div: {
            display: "flex",
            flex: 1,
            marginRight: "20px"
        },
        footer_right_div_grid_item_title: {
            marginBottom: "-8px"
        },
        footer_right_div_title_text: {
            fontSize: "15px",
            color: theme.palette.primary.light
        },
        footer_right_div_socialicons: {
            color: theme.palette.primary.light,
            fontSize: "35px"
        },
        footer_bottom_div: {
            display: "flex",
            marginTop: "10px",
            marginLeft: "20px",
            marginRight: "20px"
        },
        footer_bottom_div_text: {
            color: "#c9a0dc"
        }
    }
}