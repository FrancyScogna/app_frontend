import { Button, IconButton, AppBar, InputBase, Grid, useMediaQuery } from "@mui/material";
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

function TopBar({setThemeMode}){

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

    const theme = useTheme()

    const isDesktopDown = useMediaQuery(theme.breakpoints.down('desktop'));

    const navigate = useNavigate()

    const unauthButtons = [
        {key: "discover", text:"Discover", path: "/discover"},
        {key: "aboutus", text:"About Us", path: "/aboutus"},
        {key: "signin", text:"Log in", path: "/"},
        {key: "signup", text:"Sign up", path: "/signup"}
    ]

    return(
        <AppBar className="topbar-appbar">
            <div className="topbar-toolbar">
                <div className="topbar-logo-container"
                onClick={() => navigateFun(navigate, "/", true)}
                >
                    <img className="topbar-logo" alt="logo" src={Logo}/>
                </div>
                <div className="topbar-items-container">
                    <div className="topbar-search-container" 
                    style={{
                        backgroundColor: lightenHexColor(theme.palette.primary.dark, 30),
                        borderRadius: "10px"
                    }}
                    >
                        <StyledInputBase
                        placeholder="Cerca..."
                        inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton
                        type="button"
                        style={{ 
                            p: "10px", 
                            width: "48px" 
                        }}
                        aria-label="search"
                        >
                            <SearchIcon 
                            style={{
                                color: lightenHexColor(theme.palette.primary.light, -40)
                            }}/>
                        </IconButton>
                    </div>
                    <div className={"topbar-items"}>
                        <Grid container columnSpacing={1} style={{display: isDesktopDown && "none"}}>
                            {unauthButtons.map((button) => (
                                <Grid key={button.key} item>
                                    <Button 
                                    variant="contained"
                                    style={{ 
                                        fontSize: '16px', 
                                        backgroundColor: theme.palette.primary.dark, 
                                        textTransform: "none"
                                    }}
                                    onClick={() => navigateFun(navigate, button.path, false)}
                                    >
                                        {button.text}
                                    </Button>
                                </Grid>
                            ))}
                            <Grid item>
                                <Divider 
                                orientation="vertical" 
                                style={{paddingInline: "5px"}}/>
                            </Grid>
                            <Grid item>
                                <LanguageButton variant={"desktop"}/>
                            </Grid>
                            <Grid item>
                                <ThemeButton setThemeMode={setThemeMode} variant={"desktop"}/>
                            </Grid>
                        </Grid>
                        <Grid container columnSpacing={1} style={{display: !isDesktopDown && "none"}}>
                            <TopBarRightMenu setThemeMode={setThemeMode} />
                        </Grid>
                    </div>
                </div>
            </div>
        </AppBar>
    )
}

export default TopBar;