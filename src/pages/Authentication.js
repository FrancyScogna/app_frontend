import "./Authentication.css";
import Logo from "../images/logo.png"
import LoginForm from "../components/authComponents/LoginForm";

function Authentication({route}){

    return(
        <div className="container">
            <div className="forms-container">
                <div className="left-container">
                    <img className="logo" src={Logo} />
                </div>
                <div className="right-container">
                    <div className="form-container">
                        <LoginForm />
                    </div>
                </div>
            </div>
            <h1>Bottom</h1>
        </div>
    )
}

export default Authentication;