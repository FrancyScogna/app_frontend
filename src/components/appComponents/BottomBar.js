import { BottomNavigation, BottomNavigationAction, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/system";
import { Explore, Login, Person, QuestionMark } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { navigateFun } from "../../libs/utilFunctions";

function BottomBar(){
    const [value, setValue] = useState(0);

    const theme = useTheme();
    const downDesktop = useMediaQuery(theme.breakpoints.down("desktop"))
    const navigate = useNavigate();

    const body = document.body;

    useEffect(() => {
        if(downDesktop){
            body.style.paddingBottom = "55px";
        }else{
            body.style.paddingBottom = "0px";
        }
    }, [downDesktop, body])

    function onChangeMenu(newValue){
        setValue(newValue);
        switch(newValue){
            case 0:
                navigateFun(navigate, "/", false);
                break;
            case 1:
                navigateFun(navigate, "/signup", false);
                break;
            case 2:
                navigateFun(navigate, "/discover", false);
                break;
            case 3:
                navigateFun(navigate, "/aboutus", false);
                break;
            default:
                navigateFun(navigate, "/", false);
                break;
        }
    }

    return (
        <div className="bottombar-container" style={{display: !downDesktop && "none"}}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                onChangeMenu(newValue)
                }}
            >
                <BottomNavigationAction label="Login" icon={<Login />} />
                <BottomNavigationAction label="Signup" icon={<Person />} />
                <BottomNavigationAction label="Discover" icon={<Explore />} />
                <BottomNavigationAction label="About Us" icon={<QuestionMark />} />
            </BottomNavigation>
        </div>
    );
}

export default BottomBar;