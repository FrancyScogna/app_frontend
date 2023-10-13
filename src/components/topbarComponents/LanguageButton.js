import { ArrowBack, Language } from "@mui/icons-material";
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { useState } from "react";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import i18next from "i18next";
import { customStylesDesktop, customStylesMobile } from "./styles/LanguageButton";

function LanguageButton({variant}) {

    const theme = useTheme();
    const stylesDesktop = customStylesDesktop(theme);
    const stylesMobile = customStylesMobile(theme);

    const isIpadDown = useMediaQuery(theme.breakpoints.down("ipad"));

    const localStorageLang = window.localStorage.getItem("lang");
    const [selectedLanguage, setSelectedLanguage] = useState(localStorageLang ? JSON.parse(localStorageLang) : {key: "en", text: "English"});

    const languages = [
        {key: "en", text: "English", icon: (<span className="fi fi-gb" style={stylesDesktop.languagebutton_menuitem_icon}></span>)},
        {key: "it", text: "Italiano", icon: (<span className="fi fi-it" style={stylesDesktop.languagebutton_menuitem_icon}></span>)},
        {key: "es", text: "Español", icon: (<span className="fi fi-es" style={stylesDesktop.languagebutton_menuitem_icon}></span>)}
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
                    <Language style={stylesDesktop.languagebutton_icon}/>
                    <Typography
                    align="left"
                    style={stylesDesktop.languagebutton_bottom_left_text}>
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
                            style={stylesDesktop.languagebutton_menuitem_text}>
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
                    <ListItemIcon style={stylesMobile.languagebutton_listitem_icon}>
                        <Language />
                    </ListItemIcon>
                    <ListItemText 
                    style={stylesMobile.languagebutton_main_listitem_text}>
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
                                <ListItemIcon style={stylesMobile.languagebutton_listitem_icon}>
                                    <ArrowBack />
                                </ListItemIcon>
                            </ListItemButton>
                            <ListItemText 
                            style={stylesMobile.languagebutton_listitem_text}>
                                <Typography style={stylesMobile.languagebutton_listitem_typography}>
                                    Seleziona la lingua
                                </Typography>
                            </ListItemText>
                            {languages.map((language) => (
                                <ListItemButton key={language.key} onClick={() => selectLanguage(language)}>
                                    <ListItemIcon style={stylesMobile.languagebutton_listitem_icon}>
                                        {language.icon}
                                    </ListItemIcon>
                                    <ListItemText 
                                    style={stylesMobile.languagebutton_listitem_text}>
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