import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        subsbox_main_div: {
            display: "flex", 
            flex: 1, 
            alignContent: "center", 
            justifyContent: "center", 
            backgroundColor: lightenHexColor(theme.palette.primary.light, 50), 
            borderRadius: "10px", 
            marginInline: "20px", 
            marginTop: "10px"
        },
        subsbox_grid_container: {
            margin: "10px", 
            marginBottom: "20px"
        },
        subsbox_grid_item_title: {
            display: "flex", 
            justifyContent: "center", 
            alignItems: "center"
        },
        subsbox_title_text: {
            fontWeight: "bold", 
            fontSize: "25px", 
            color: theme.palette.primary.dark
        },
        subsbox_grid_item_listitem: {
            marginInline: "10%"
        },
        subsbox_button: {
            fontWeight: "bold", 
            borderRadius: "30px"
        },
        subsbox_loading_div: {
            display: "flex", 
            flex: 1, 
            justifyContent: "center", 
            alignItems: "center", 
            marginTop: "10px"
        }
    }
}