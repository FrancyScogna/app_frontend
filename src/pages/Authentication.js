import "./Authentication.css";
import Logo from "../images/logo.png"
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DiscoverAuth from "../components/authComponents/DiscoverAuth";
import { Divider, useMediaQuery } from "@mui/material";
import AboutUsAuth from "../components/authComponents/AboutUsAuth";
import { lightenHexColor } from "../libs/utilFunctions";

function Authentication(){
    const theme = useTheme();
    const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));

    return(
        <div className="container">
            <div className="forms-container" style={{flexDirection: downIpad ? "column" : "row"}}>
                <div className="left-container" 
                style={{
                    backgroundColor: theme.palette.background.paper, 
                    borderBottom: `1px solid ${theme.palette.primary.main}`,
                    display: downIpad && "none"
                }}>
                    <img className="logo" alt="logo" src={Logo}/>
                </div>
                <div className="right-container"
                style={{justifyContent: downIpad && "center", flex: downIpad && "none", backgroundColor: downIpad && lightenHexColor(theme.palette.background.paper, 50) }}
                >
                    <img alt="logo" src={Logo} style={{position: "absolute", width: "90%", top: "20%", display: !downIpad && "none"}}/>
                    <div className="form-container" style={{paddingLeft: downIpad && "0px", paddingTop: downIpad && "15px"}}>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="bottom-container">
                <div className="auth-discover-container">
                    <DiscoverAuth />
                </div>
                <div className="divider-container">
                    <Divider style={{width: "80%"}} />
                </div>
                <div className="auth-aboutus-container">
                    <AboutUsAuth />
                </div>
            </div>
        </div>
    )
}

export default Authentication;