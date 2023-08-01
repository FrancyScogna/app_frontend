import { Language } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { lightenHexColor } from "../../libs/utilFunctions"
import { useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";

function LanguageButton({variant}) {

    const theme = useTheme();
    const [selectedLanguage, setSelectedLanguage] = useState("en");

    const languages = [
        {key: "en", text: "English", icon: (<span className="fi fi-gb" style={{borderRadius: "10px"}}></span>)},
        {key: "it", text: "Italiano", icon: (<span className="fi fi-it" style={{borderRadius: "10px"}}></span>)},
        {key: "es", text: "Español", icon: (<span className="fi fi-es" style={{borderRadius: "10px"}}></span>)}
    ]

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const setLanguage = (language) => {
        setSelectedLanguage(language);
        handleClose();
    }

    return(
        <>
        { variant === "desktop" ? (
            <div>
                <IconButton
                variant="contained"
                onClick={handleClick}
                >
                    <Language style={{color: lightenHexColor(theme.palette.primary.light, 40)}}/>
                    <Typography
                    align="left"
                    style={{
                        position: "absolute", 
                        zIndex: 10, 
                        bottom: "0px", 
                        right: "0px", 
                        color: lightenHexColor(theme.palette.primary.light, 40), 
                        fontSize: "9px",
                        textTransform: "uppercase"
                        }}>
                        {selectedLanguage}
                    </Typography>
                </IconButton>
                <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                    {languages.map((language) => (
                        <MenuItem 
                        key={language.key}
                        onClick={() => setLanguage(language.key)}
                        >
                            {language.icon}
                            <div style={{marginLeft: "5px"}}/>
                            <Typography
                            variant="button"
                            style={{color: theme.palette.primary.dark}}>
                                {language.text}
                            </Typography>
                        </MenuItem>
                    ))}
                </Menu>
            </div>
            )
            : 
            (<div></div>)
        }
        </>
    )
}

export default LanguageButton;