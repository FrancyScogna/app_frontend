import Logo from "../images/logo.png"
import { useTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import DiscoverAuth from "../components/authComponents/DiscoverAuth";
import { Divider, useMediaQuery } from "@mui/material";
import AboutUsAuth from "../components/authComponents/AboutUsAuth";
import { customStyles } from "./styles/Authentication";

function Authentication(){
    const theme = useTheme();
    const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));
    const styles = customStyles(theme, downIpad);

    return(
        <div style={styles.auth_main_div}>
            <div style={styles.auth_forms_div}>
                <div style={styles.auth_left_div}>
                    <img style={styles.auth_logo} alt="logo" src={Logo}/>
                </div>
                <div style={styles.auth_right_div}>
                    <img alt="logo" src={Logo} style={styles.auth_logo_mobile}/>
                    <div style={styles.auth_form_div}>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div style={styles.auth_bottom_div}>
                <div style={styles.auth_discover_div}>
                    <DiscoverAuth />
                </div>
                <div style={styles.auth_divider_div}>
                    <Divider style={styles.auth_divider} />
                </div>
                <div style={styles.auth_aboutus_div}>
                    <AboutUsAuth />
                </div>
            </div>
        </div>
    )
}

export default Authentication;