import { lightenHexColor } from "../../../libs/utilFunctions";

export const customStylesDesktop = (theme) => {
    return{
        themebutton_icon: {
            color: lightenHexColor(theme.palette.primary.light, 40)
        }
    }
}

export const customStylesMobile = (theme) => {
    return{
        themebutton_listitem_icon: {
            color: lightenHexColor(theme.palette.primary.dark, 30)
        },
        themebutton_listitem_text: {
            color: lightenHexColor(theme.palette.primary.dark, 0),
        }
    }
}