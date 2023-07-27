import "./Authentication.css";
import Logo from "../images/logo.png"
import LoginForm from "../components/authComponents/LoginForm";
import SignupForm from "../components/authComponents/SignupForm";
import { useTheme } from "@mui/material/styles";

function Authentication({route}){
    const theme = useTheme();
    return(
        <div className="container">
            <div className="forms-container">
                <div className="left-container" style={{backgroundColor: theme.palette.background.paper}}>
                    <img className="logo" src={Logo} />
                </div>
                <div className="right-container">
                    <div className="form-container">
                        <SignupForm />
                    </div>
                </div>
            </div>
            <h1>Bottom</h1>
        </div>
    )
}

export default Authentication;