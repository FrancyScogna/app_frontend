import { ArrowBack, Explore, Login, Menu, Person, QuestionMark } from "@mui/icons-material";
import { Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { navigateFun } from "../../libs/utilFunctions";
import { useTheme } from "@mui/system";
import { useState } from "react";
import LanguageButton from "./LanguageButton";
import ThemeButton from "./ThemeButton";
import { useNavigate } from "react-router-dom";
import { customStyles } from "./styles/TopBarRightMenu";

function TopBarRightMenu({setThemeMode}){

    const theme = useTheme();
    const styles = customStyles(theme);
    const isIpadDown = useMediaQuery(theme.breakpoints.down('ipad'))

    const navigate = useNavigate();

    const onClickMenu = () => {
        setOpen(true);
    }

    const [open, setOpen] = useState(false);
    const toggleDrawer = (open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
        setOpen(open);
    };

    const listItems = [
        {key: "1", text: "", icon: (<ArrowBack />), path: ""},
        {key: "2", text: "Sign Up", icon: (<Person />), path: "/signup"},
        {key: "3", text: "Log In", icon: (<Login />), path: "/"},
        {key: "4", text: "Discover", icon: (<Explore />), path: "/discover"},
        {key: "5", text: "About Us", icon: (<QuestionMark />), path: "/aboutus"},
    ]

    return(
        <>
        <IconButton
        onClick={onClickMenu}
        >
            <Menu style={styles.topbarrightmenu_iconbutton_icon} />
        </IconButton>
        <Drawer 
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        >
            <div style={{width: isIpadDown ? "100vw" : "40vw"}}>
                <List>
                    {listItems.map((listItem) => (
                        <ListItemButton key={listItem.key} onClick={() => {setOpen(false); navigateFun(navigate, listItem.path, false)}}>
                            <ListItemIcon style={styles.topbarrightmenu_listitem_icon}>
                                {listItem.icon}
                            </ListItemIcon>
                            <ListItemText 
                            style={styles.topbarrightmenu_listitem_text}>
                                {listItem.text}
                            </ListItemText>
                        </ListItemButton>
                    ))
                    }
                </List>
                <Divider />
                <LanguageButton variant={"mobile"} />
                <ThemeButton variant={"mobile"} setThemeMode={setThemeMode}/>
            </div>
        </Drawer>
        </>
    )
}

export default TopBarRightMenu;