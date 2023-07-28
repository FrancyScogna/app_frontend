import "./Authentication.css";
import Logo from "../images/logo.png"
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";

function Authentication(){
    const theme = useTheme();
    return(
        <div className="container">
            <div className="forms-container">
                <div className="left-container" style={{backgroundColor: theme.palette.background.paper}}>
                    <img className="logo" src={Logo} />
                </div>
                <div className="right-container">
                    <div className="form-container">
                        <Outlet />
                    </div>
                </div>
            </div>
            <h1>Bottom</h1>
        </div>
    )
}

export default Authentication;