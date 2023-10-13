import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme, isDesktopDown) => {
    return{
        topbar_appbar: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            height: "65px",
            paddingInline: "3%"
        },
        topbar_toolbar_div: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            flex: 1,
            height: "100%",
            width: "100%"
        },
        topbar_logo_div: {
            display: "flex",
            height: "60px",
            width: "140px",
            cursor: "pointer"
        },
        topbar_logo: {
            width: "100%"
        },
        topbar_items_div: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            flex: 1
        },
        topbar_search_div: {
            display: "flex",
            margin: "auto",
            backgroundColor: lightenHexColor(theme.palette.primary.dark, 30),
            borderRadius: "10px"
        },
        topbar_search_iconbutton: {
            padding: "10px", 
            width: "48px" 
        },
        topbar_search_iconbutton_icon: {
            color: lightenHexColor(theme.palette.primary.light, -40)
        },
        topbar_items: {
            paddingInline: "10px",
            display: "flex",
            marginLeft: "auto"
        },
        topbar_items_grid_container_desktop: {
            display: isDesktopDown && "none"
        },
        topbar_items_grid_desktop_button: {
            fontSize: '16px', 
            backgroundColor: theme.palette.primary.dark, 
            textTransform: "none"
        },
        topbar_items_grid_divider: {
            paddingInline: "5px"
        },
        topbar_items_grid_container_mobile: {
            display: !isDesktopDown && "none"
        }
    }
}