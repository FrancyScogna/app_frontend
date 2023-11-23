import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        followcounterbox_main_div: {
            display: "flex",
            width: "fit-content",
            height: "fit-content",
            marginTop: "10px",
            marginBottom: "5px",
            marginLeft: "5px"
        },
        followcounterbox_grid_item: {
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
        },
        followcounterbox_item_count: {
            color: theme.palette.primary.dark,
            fontWeight: "bold",
            fontSize: "15px",
            marginRight: "3px"
        },
        followcounterbox_item_text: {
            fontSize: "15px",
            color: lightenHexColor(theme.palette.primary.dark, 50),
            fontWeight: "bold"
        }
    }
}