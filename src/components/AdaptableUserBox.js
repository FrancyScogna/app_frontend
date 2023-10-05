import { borderRadius } from "@mui/system";
import profileImage from "../images/avatar-400x400.png";
import { lightenHexColor } from "../libs/utilFunctions";
import { Avatar, Button, Typography, useTheme } from "@mui/material";

function AdaptableUserBox({user}){

    const theme = useTheme();

    return(
        <div style={{height: "fit-content", width: "100%", display: "flex", padding: "5px", flexDirection: "row", backgroundColor: lightenHexColor(theme.palette.background.paper, 10), borderRadius: "10px"}}>
            <div style={{display: "flex", width: "20%"}}>
                <Avatar style={{width: "100%", height: "fit-content", border: `2px solid ${theme.palette.primary.dark}`}} src={profileImage}/>
            </div>
            <div style={{display: "flex", flex: 1, alignItems: "center", paddingInline: "15px"}}>
                <div style={{display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <Typography fontWeight="bold" whiteSpace="nowrap" fontSize="20px" color={theme.palette.primary.dark} style={{textOverflow: "ellipsis", width: "200px"}}>
                        Nome Utente
                    </Typography>
                    <Typography fontWeight="bold" marginLeft="2px" color={lightenHexColor(theme.palette.primary.dark, 50)}>
                        @nickname
                    </Typography>
                </div>
                <div style={{display: "flex", position: "relative", marginLeft: "20px"}}>
                    <Button variant="contained">Follow</Button>
                </div>
            </div>
        </div>
    )
}

export default AdaptableUserBox;