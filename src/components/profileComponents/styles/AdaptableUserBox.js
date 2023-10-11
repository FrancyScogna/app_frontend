import { lightenHexColor } from "../../../libs/utilFunctions";

export const customStyles = (theme) => {
    return{
        adaptableuserbox_main_div: {
            height: "fit-content",
            width: "100%",
            display: "flex",
            padding: "5px",
            flexDirection: "row",
            borderRadius: "10px",
            backgroundColor: lightenHexColor(theme.palette.background.paper, 10)
        },
        adaptableuserbox_avatar_div: {
            display: "flex",
            width: "20%"
        },
        adaptableuserbox_avatar: {
            width: "100%", 
            height: "fit-content", 
            border: `2px solid ${theme.palette.primary.dark}`
        },
        adaptableuserbox_content_div: {
            display: "flex",
            width: "100%",
            alignItems: "center",
            paddingInline: "15px"
        },
        adaptableuserbox_typography_div: {
            cursor: "pointer", 
            display: "flex", 
            flexDirection: "column", 
            overflow: "hidden"
        },
        adaptableuserbox_username: {
            fontWeight: "bold",
            whiteSpace: "nowrap",
            fontSize: "20px",
            textOverflow: "ellipsis",
            width: "200px",
            color: theme.palette.primary.dark
        },
        adaptableuserbox_nickname: {
            fontWeight: "bold",
            marginLeft: "2px",
            color: lightenHexColor(theme.palette.primary.dark, 50)
        },
        adaptableuserbox_button: {
            position: "relative",
            right: "-10px"
        }
    }
}