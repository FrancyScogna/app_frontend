import { lightenHexColor } from "../../libs/utilFunctions"

export const customStyles = (theme, downIpad) => {
    return{
        auth_main_div: {
            display: "flex",
            flexDirection: "column"
        },
        auth_forms_div: {
            display: "flex",
            paddingBottom: "20px",
            flexDirection: downIpad ? "column" : "row"
        },
        auth_left_div: {
            flex: "0.9",
            backgroundColor: "violet",
            justifyContent: "flex-end",
            alignItems: "center",
            backgroundColor: theme.palette.background.paper, 
            borderBottom: `1px solid ${theme.palette.primary.main}`,
            display: downIpad ? "none" : "flex"
        },
        auth_logo: {
            width: "60%"
        },
        auth_right_div: {
            display: "flex",
            alignItems: "center",
            justifyContent: downIpad ? "center" : "flex-start", 
            flex: downIpad ? "none" : "1", 
            backgroundColor: downIpad && lightenHexColor(theme.palette.background.paper, 50)
        },
        auth_logo_mobile: {
            position: "absolute", 
            width: "90%", 
            top: "20%", 
            display: !downIpad && "none"
        },
        auth_form_div: {
            paddingBottom: "40px",  
            paddingLeft: downIpad ? "0px" : "5%", 
            paddingTop: downIpad ? "15px" : "2%"
        },
        auth_bottom_div: {
            display: "flex",
            justifyContent: "center",
            flexDirection: "column"
        },
        auth_discover_div: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        auth_divider_div: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
            marginBottom: "50px"
        },
        auth_divider: {
            width: "80%"
        },
        auth_aboutus_div: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        }
    }
}