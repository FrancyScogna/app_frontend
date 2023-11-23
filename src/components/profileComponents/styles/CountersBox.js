import { lightenHexColor } from "../../../libs/utilFunctions";

export const customStyles = (theme) => {
    return{
        counterbox_main_div: {
            display: "flex",
            margin: "10px"
        },
        counterbox_grid_container: {
            justifyContent: "center"
        },
        counterbox_grid_item: {
            display: "flex",
            alignItems: "center"
        },
        counterbox_grid_item_icon: {
            marginRight: "3px",
            fontSize: "16px",
            color: theme.palette.primary.dark
        },
        counterbox_grid_item_text: {
            fontSize: "13px",
            fontWeight: "bold",
            color: lightenHexColor(theme.palette.primary.dark, 50)
        }
    }
}