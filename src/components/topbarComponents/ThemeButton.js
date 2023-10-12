import { DarkMode, LightMode } from "@mui/icons-material";
import { IconButton, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useTheme } from "@mui/system";
import { lightenHexColor } from "../../libs/utilFunctions"
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { lightTheme, darkTheme } from "../../libs/theme";
import { customStylesDesktop, customStylesMobile } from "./styles/ThemeButton";

function ThemeButton({setThemeMode, variant}) {

    const theme = useTheme();
    const stylesDesktop = customStylesDesktop(theme);
    const stylesMobile = customStylesMobile(theme);

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
                    onClick={onClickCambia}
                    >
                        {themeMode === "dark" ?
                            (<LightMode style={stylesDesktop.themebutton_icon}/>)
                            :
                            (<DarkMode style={stylesDesktop.themebutton_icon}/>)
                        }
                    </IconButton>
                )
                : 
                (<div>
                    <ListItemButton onClick={onClickCambia}>
                        <ListItemIcon style={stylesMobile.themebutton_listitem_icon}>
                            {themeMode === "dark" ?
                                (<LightMode/>)
                                :
                                (<DarkMode/>)
                            }
                        </ListItemIcon>
                        <ListItemText 
                        style={stylesMobile.themebutton_listitem_text}>
                            {themeMode === "dark" ?
                                "Tema chiaro"
                                :
                                "Tema scuro"
                            }
                        </ListItemText>
                    </ListItemButton>
                </div>)
            }
        </>
    )
}

export default ThemeButton;