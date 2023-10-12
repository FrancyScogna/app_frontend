import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        topbarrightmenu_iconbutton_icon: {
            color: lightenHexColor(theme.palette.primary.light, 40)
        },
        topbarrightmenu_listitem_icon: {
            color: lightenHexColor(theme.palette.primary.dark, 30)
        },
        topbarrightmenu_listitem_text: {
                color: lightenHexColor(theme.palette.primary.dark, 0)
        }
    }
}