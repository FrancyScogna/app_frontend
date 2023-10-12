import { Backdrop } from "@mui/material";
import  Logo from "../../images/logo.png";

function LoadingPage({loading}){
    return (
        <div className="">
            <Backdrop open={true}>
                <img alt="loading" className="pulsating-image" src={Logo} style={{width: "20%"}}/>
            </Backdrop>
        </div>
    )
}

export default LoadingPage;