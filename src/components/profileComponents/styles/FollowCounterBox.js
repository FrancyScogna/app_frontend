import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        followcounterbox_main_div: {
            display: "flex",
            marginLeft: "15%",
            width: "fit-content",
            height: "fit-content"
        },
        followcounterbox_grid_item: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer"
        },
        followcounterbox_item_count: {
            color: theme.palette.primary.dark,
            fontWeight: "bold",
            fontSize: "17px",
            marginRight: "3px"
        },
        followcounterbox_item_text: {
            color: lightenHexColor(theme.palette.primary.dark, 50),
            fontWeight: "bold"
        }
    }
}