import { lightenHexColor } from "../../../libs/utilFunctions"

export const customStyles = (theme) => {
    return{
        profilecard_card: {
            maxWidth: 450,
            backgroundColor: lightenHexColor(theme.palette.background.paper, 40),
            display: "block",
            flexDirection: "column",
            height: "280px"
        },
        profilecard_cardmedia: {
            height: 140,
            borderBottom: `1px solid ${theme.palette.background.paper}`
        },
        profilecard_skeleton_cover: {
            width: "450px",
            height: "140px",
            borderBottom: `1px solid ${theme.palette.background.paper}`
        },
        profilecard_avatar_div: {
            position: "relative",
            bottom: "37px",
            height: "fit-content",
            width: "25%",
            left: "15px"
        },
        profilecard_skeleton_avatar: {
            height: "100px",
            width: "100px",
            border: `3px solid ${theme.palette.background.paper}`
        },
        profilecard_avatar: {
            height: "100%",
            width: "100%",
            border: `3px solid ${theme.palette.background.paper}`
        },
        profilecard_anagraphic_div: {
            position: "relative",
            display: "block",
            width: "fit-content",
            height: "fit-content",
            bottom: "95px",
            left: "145px"
        },
        profilecard_username_text: {
            fontWeight: "bold",
            fontSize: "22px",
            color: theme.palette.primary.dark
        },
        profilecard_skeleton_username: {
            width: "150px",
            height: "25px"
        },
        profilecard_nickname_text: {
            fontWeight: "bold",
            fontSize: "17px",
            marginTop: "-5px",
            color: lightenHexColor(theme.palette.primary.dark, 80)
        },
        profilecard_skeleton_nickname: {
            width: "120px",
            height: "20px",
            marginTop: "10px"
        },
        profilecard_countersbox_div: {
            position: "relative",
            bottom: "75px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
        },
        profilecard_skeleton_countersbox: {
            width: "420px",
            height: "30px"
        }
    }
}