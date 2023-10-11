export const customStyles = (theme) => {
    return{
        followlistpopup_main_div: {
            width: "500px",
            maxHeight: "500px",
            overflowY: "auto" 
        },
        followlistpopup_grid_sticky: {
            padding: "15px",
            position: "sticky", 
            top: 0, 
            zIndex: 3,
            backgroundColor: theme.palette.background.paper
        },
        followlistpopup_grid: {
            padding: "15px"
        },
        followlistpopup_grid_item_closebutton: {
            display: "flex",
            justifyContent: "end",
            padding: "0px"
        },
        followlistpopup_grid_item_title_text: {
            fontWeight: "bold",
            alignItems: "center",
            color: theme.palette.primary.dark
        },
        followlistpopup_grid_item_searchbar: {
            display: "flex", 
            justifyContent: "center"
        },
        followlistpopup_searchbar: {
            width: "90%"
        },
        followlistpopup_grid_item_userbox: {
            marginInline: "10px"
        },
        followlistpopup_viewportblock: {
            display: "flex",
            width: "100%",
            margin: "20px",
            display: "flex", 
            justifyContent: "center"
        },
        followlistpopup_viewportblock_icon: {
            size: "50px",
            color: theme.palette.primary.dark,
            marginTop: "3px"
        }
    }
}