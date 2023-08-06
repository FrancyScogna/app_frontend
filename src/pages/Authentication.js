import "./Authentication.css";
import Logo from "../images/logo.png"
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DiscoverAuth from "../components/authComponents/DiscoverAuth";
import { Divider } from "@mui/material";
import AboutUsAuth from "../components/authComponents/AboutUsAuth";
import { useTranslation } from "react-i18next";

function Authentication(){
    const theme = useTheme();

    return(
        <div className="container">
            <div className="forms-container">
                <div className="left-container" 
                style={{
                    backgroundColor: theme.palette.background.paper, 
                    borderBottom: `1px solid ${theme.palette.primary.main}`
                }}>
                    <img className="logo" alt="logo" src={Logo}/>
                </div>
                <div className="right-container">
                    <div className="form-container">
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