import { Button, IconButton, AppBar, InputBase, Grid, useMediaQuery, Skeleton, Avatar, Badge } from "@mui/material";
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import Logo from "../../images/logo.png"
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { lightenHexColor, navigateFun } from "../../libs/utilFunctions"
import LanguageButton from "../topbarComponents/LanguageButton";
import ThemeButton from "../topbarComponents/ThemeButton";
import TopBarRightMenu from "../topbarComponents/TopBarRightMenu";
import { customStyles } from "./styles/TopBar";
import { useEffect, useMemo, useState } from "react";
import { Message, Notifications } from "@mui/icons-material";
import NotificationsButton from "../topbarComponents/NotificationsButton";

function TopBar({setThemeMode, authUser, loading}){

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: lightenHexColor(theme.palette.primary.light, 40), 
        paddingInline: "10px",
        width: 'calc(100% - 48px)',
        flex:'1',
        '& .MuiInputBase-input': {
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '32ch',
            },
            },
        },
    }));

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 20,
          color: lightenHexColor(theme.palette.primary.light, 40),
          backgroundColor: theme.palette.primary.dark
        },
      }));

    const theme = useTheme()
    const isDesktopDown = useMediaQuery(theme.breakpoints.down('desktop'));
    const styles = customStyles(theme, isDesktopDown);

    const navigate = useNavigate()

    const [authMode, setAuthMode] = useState(false);
    const [buttons, setButtons] = useState([]);

    const unauthButtons = useMemo(() => [
        {key: "discover", text:"Discover", path: "/discover"},
        {key: "aboutus", text:"About Us", path: "/aboutus"},
        {key: "signin", text:"Log in", path: "/"},
        {key: "signup", text:"Sign up", path: "/signup"}
    ],[]);

    const authButtons = useMemo(() => [
        {key: "feeds", text: "Feeds", path: "/"},
        {key: "discover", text:"Discover", path: "/discover"},
        {key: "aboutus", text:"About Us", path: "/aboutus"}
    ],[]);

    useEffect(() => {
        if(authUser){
            setAuthMode(true);
            setButtons(authButtons);
        }else{
            setAuthMode(false);
            setButtons(unauthButtons);
        }
    },[authUser, authButtons, unauthButtons]);

    return(
        <AppBar style={styles.topbar_appbar}>
            <div style={styles.topbar_toolbar_div}>
                <div style={styles.topbar_logo_div}
                onClick={() => navigateFun(navigate, "/", true)}
                >
                    <img style={styles.topbar_logo} alt="logo" src={Logo}/>
                </div>
                <div style={styles.topbar_items_div}>
                    <div style={styles.topbar_search_div}>
                        <StyledInputBase
                        placeholder="Cerca..."
                        inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton
                        type="button"
                        style={styles.topbar_search_iconbutton}
                        aria-label="search"
                        >
                            <SearchIcon 
                            style={styles.topbar_search_iconbutton_icon}/>
                        </IconButton>
                    </div>
                    <div style={styles.topbar_items}>
                        <Grid container columnSpacing={1} style={styles.topbar_items_grid_container_desktop}>
                            {!loading ?
                            <>
                            {buttons.map((button) => (
                                <Grid key={button.key} item>
                                    <Button 
                                    variant="contained"
                                    style={styles.topbar_items_grid_desktop_button}
                                    onClick={() => navigateFun(navigate, button.path, false)}
                                    >
                                        {button.text}
                                    </Button>
                                </Grid>
                            ))}
                            {authMode &&
                            <>
                            <Grid item>
                                <Divider
                                orientation="vertical"/>
                            </Grid>
                            <Grid item>
                                <NotificationsButton />
                            </Grid>
                            <Grid item>
                                <IconButton style={{color: lightenHexColor(theme.palette.primary.light, 40)}}>
                                    <StyledBadge badgeContent={3} style={{}}>
                                        <Message />
                                    </StyledBadge>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <Avatar style={{border: `1px solid ${theme.palette.primary.dark}`, marginLeft: "10px"}}/>  
                            </Grid>
                            </>
                            }</>
                            :
                            <>
                            <Grid item >
                                <Skeleton variant="rounded" height={40} width={100}/>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rounded" height={40} width={100}/>
                            </Grid>
                            <Grid item>
                                <Skeleton variant="rounded" height={40} width={70}/>
                            </Grid>
                            </>
                            }
                            <Grid item>
                                <Divider 
                                orientation="vertical" 
                                style={styles.topbar_items_grid_divider}/>
                            </Grid>
                            <Grid item>
                                <LanguageButton variant={"desktop"}/>
                            </Grid>
                            <Grid item>
                                <ThemeButton setThemeMode={setThemeMode} variant={"desktop"}/>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={1} style={styles.topbar_items_grid_container_mobile}>
                            <TopBarRightMenu setThemeMode={setThemeMode} />
                        </Grid>
                    </div>
                </div>
            </div>
        </AppBar>
    )
}

export default TopBar;