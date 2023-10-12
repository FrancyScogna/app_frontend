import { lightenHexColor } from "../../../libs/utilFunctions";

export const customStylesDesktop = (theme) => {
    return{
        languagebutton_icon: {
            color: lightenHexColor(theme.palette.primary.light, 40)
        },
        languagebutton_bottom_left_text: {
            position: "absolute", 
            zIndex: 10, 
            bottom: "0px", 
            right: "0px", 
            color: lightenHexColor(theme.palette.primary.light, 40), 
            fontSize: "9px",
            textTransform: "uppercase"
        },
        languagebutton_menuitem_text: {
            color: theme.palette.primary.dark
        },
        languagebutton_menuitem_icon: {
            borderRadius: "10px"
        }
    }
}

export const customStylesMobile = (theme) => {
    return{
        languagebutton_listitem_icon: {
            color: lightenHexColor(theme.palette.primary.dark, 30)
        },
        languagebutton_main_listitem_text: {
            color: lightenHexColor(theme.palette.primary.dark, 30)
        },
        languagebutton_listitem_text: {
            color: lightenHexColor(theme.palette.primary.dark, 30),
            paddingLeft: "20px"
        },
        languagebutton_listitem_typography: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    }
}