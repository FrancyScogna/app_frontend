import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        buttonsgrid_main_grid: {
            marginTop: "5px",
            display: "flex",
            justifyContent: "center"
        },
        buttonsgrid_button: {
            borderRadius: "30px",
            fontWeight: "bold"
        },
        buttonsgrid_iconbutton_share: {
            
        },
        buttonsgrid_iconbutton_icon_share: {
            color: theme.palette.primary.dark
        },
        buttonsgrid_iconbutton_icon_morevert: {
            color: lightenHexColor( theme.palette.primary.dark, 70)
        },
        buttonsgrid_listitem_icon: {
            color: theme.palette.primary.dark
        },
        buttonsgrid_listitem_text: {
            fontWeight: "bold",
            color: theme.palette.primary.dark
        }
    }
}