import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/system";
import { lightenHexColor } from "../../libs/utilFunctions"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { lightTheme, darkTheme } from "../../libs/theme";

function ThemeButton({setThemeMode, variant}) {

    const theme = useTheme();
    var themeMode = localStorage.getItem("themeMode");

    const onClickCambia = () => {
        themeMode = localStorage.getItem("themeMode");
        if(themeMode){
            if(themeMode === "light"){
                setThemeMode(darkTheme);
                themeMode = "dark";
                window.localStorage.setItem("themeMode", "dark");
            }else{
                setThemeMode(lightTheme);
                themeMode = "light";
                window.localStorage.setItem("themeMode", "light");
            }
        }else{
            setThemeMode(darkTheme);
            themeMode = "dark"
            window.localStorage.setItem("themeMode", "dark");
        }
    }

    return(
            <>
            { variant === "desktop" ? (
                    <IconButton
                    variant="contained"
                    onClick={onClickCambia}
                    >
                        {themeMode === "dark" ?
                            (<LightMode style={{color: lightenHexColor(theme.palette.primary.light, 40)}}/>)
                            :
                            (<DarkMode style={{color: lightenHexColor(theme.palette.primary.light, 40)}}/>)
                        }
                    </IconButton>
                )
                : 
                (<div></div>)
            }
        </>
    )
}

export default ThemeButton;