import { ArrowBack, Language } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { lightenHexColor } from "../../libs/utilFunctions"
import { useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18next from "i18next";

function LanguageButton({variant}) {

    const theme = useTheme();
    const isIpadDown = useMediaQuery(theme.breakpoints.down("ipad"));

    const localStorageLang = window.localStorage.getItem("lang");
    const [selectedLanguage, setSelectedLanguage] = useState(localStorageLang ? JSON.parse(localStorageLang) : {key: "en", text: "English"});

    const languages = [
        {key: "en", text: "English", icon: (<span className="fi fi-gb" style={{borderRadius: "10px"}}></span>)},
        {key: "it", text: "Italiano", icon: (<span className="fi fi-it" style={{borderRadius: "10px"}}></span>)},
        {key: "es", text: "Español", icon: (<span className="fi fi-es" style={{borderRadius: "10px"}}></span>)}
    ]

    //Desktop mode
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const setLanguage = (language) => {
        window.localStorage.setItem("lang",JSON.stringify({key: language.key, text: language.text}));
        setSelectedLanguage(language);
        i18next.changeLanguage(language.key);
        handleClose();
    }

    //Mobile mode
    const [openDrawer, setOpenDrawer] = useState(false);

    const onClickLanguage = () => {
        setOpenDrawer(true);
    }

    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpenDrawer(open);
    };

    const selectLanguage = (language) => {
        window.localStorage.setItem("lang",JSON.stringify({key: language.key, text: language.text}));
        i18next.changeLanguage(language.key);
        setSelectedLanguage(language);
        setOpenDrawer(false);
    }


    return(
        <>
        { variant === "desktop" ? (
            <div>
                <IconButton
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
                        {selectedLanguage.key}
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
                        onClick={() => setLanguage(language)}
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
            (
            <div>
                <ListItemButton onClick={onClickLanguage}>
                    <ListItemIcon style={{color: lightenHexColor(theme.palette.primary.dark, 30)}}>
                        <Language />
                    </ListItemIcon>
                    <ListItemText 
                    style={{
                        color: lightenHexColor(theme.palette.primary.dark, 0),
                    }}>
                        {selectedLanguage.text}
                    </ListItemText>
                </ListItemButton>
                <Drawer
                anchor="right"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                >
                    <div style={{width: isIpadDown ? "100vw" : "40vw"}}>
                        <List>
                            <ListItemButton onClick={() => setOpenDrawer(false)}>
                                <ListItemIcon style={{color: lightenHexColor(theme.palette.primary.dark, 30)}}>
                                    <ArrowBack />
                                </ListItemIcon>
                            </ListItemButton>
                            {languages.map((language) => (
                                <ListItemButton key={language.key} onClick={() => selectLanguage(language)}>
                                    <ListItemIcon style={{color: lightenHexColor(theme.palette.primary.dark, 30)}}>
                                        {language.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                    style={{
                                        color: lightenHexColor(theme.palette.primary.dark, 0),
                                    }}>
                                        {language.text}
                                    </ListItemText>
                                </ListItemButton>
                            ))
                            }
                        </List>
                    </div>
                </Drawer>
            </div>
        )}
        </>
    )
}

export default LanguageButton;