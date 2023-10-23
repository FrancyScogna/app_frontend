import { Backdrop } from "@mui/material";
import  Logo from "../../images/logo.png";
import "./styles/LoadingPage.css";

function LoadingPage({loading}){

    return(
        <div style={{height: "100vh"}}>
            <Backdrop open={true}>
                <img alt="loading" src={Logo} className="pulsating-image"/>
            </Backdrop>
        </div>
    )
}

export default LoadingPage;