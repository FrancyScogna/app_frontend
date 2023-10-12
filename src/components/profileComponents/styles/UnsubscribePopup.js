export const customStyles = (theme) => {
    return{
        unsubscribepopup_grid_container: {
            padding: "15px",
            marginBottom: "20px"
        },
        unsubscribepopup_grid_item_close: {
            display: "flex",
            justifyContent: "end",
            padding: "0px"
        },
        unsubscribepopup_iconbutton_close: {
            padding: "0px"
        },
        unsubscribepopup_title_text: {
            fontWeight: "bold", 
            color: theme.palette.primary.dark
        },
        unsubscribepopup_grid_item_description: {
            marginInline: "10px"
        },
        unsubscribepopup_description_text: {
            color: theme.palette.primary.dark
        },
        unsubscribepopup_grid_item_removesub: {
            marginInline: "10px",
            display: "flex",
            justifyContent: "center"
        },
        unsubscribepopup_button_removesub: {
            fontWeight: "bold"
        },
        unsubscribepopup_grid_item_divider: {
            marginInline: "10px"
        },
        unsubscribepopup_divider_text: {
            color: theme.palette.primary.dark
        },
        unsubscribepopup_grid_item_unsubbutton: {
            marginInline: "10px"
        },
        unsubscribepopup_button_unsubbutton: {
            fontWeight: "bold"
        }
    }
}