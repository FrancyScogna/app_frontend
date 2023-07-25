import { Button, IconButton, Toolbar, Box, TextField, AppBar, alpha, InputBase } from "@mui/material";
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search'; // Importa l'icona di ricerca
import NotificationsIcon from '@mui/icons-material/Notifications'; // Importa l'icona per le notifiche
import MessageIcon from '@mui/icons-material/Message'; // Importa l'icona per i messaggi
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importa l'icona per l'account
import Logo from "../images/logo.png"
import { useTheme } from "styled-components";
import styled from "@mui/material/styles/styled";

function TopBar(){

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        }));
        
    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));
        
    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '40ch',
            },
            },
        },
    }));



    const theme = useTheme()
    return(
        <AppBar>
            <Toolbar style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", maxWidth:'100%',paddingRight:'16px', // Aggiungi il colore di sfondo desiderato
            }}>
                <Box style={{display:"flex",alignItems:"center",minwidth:'300px'}}>
                    <img alt="" src={Logo} style={{ height:"58px",position:"relative"}}/>
                </Box>
                <Box style={{position:"relative",minWidth: "100px",paddingTop:'0px',paddingBottom:'0px',paddingLeft:'8px',paddingRight:'8px'}}>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>

                <Box style={{alignItems:"center",  display: 'flex'}}>
                    <Button variant="contained" sx={{ flex: 1,marginRight: 1.5,fontSize: '16px' }} style={{  color: 'white'}}>DISCOVER</Button>
                    <Button variant="contained" sx={{ flex: 1,fontSize: '16px'}} style={{ color: 'white'}}>FEEDS</Button>
                    <Button variant="contained" sx={{ flex: 1,fontSize: '16px'}} style={{ color: 'white'}}>FEEDS</Button>

                    <Divider orientation="vertical" variant="middle" flexItem style={{ backgroundColor: 'black',marginLeft: 12, marginRight: 8 }} /> {/* Divider separato */}
                    <IconButton  >
                        <NotificationsIcon  style={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton >
                        <MessageIcon style={{ fontSize: 30 }}/>
                    </IconButton>
                    <IconButton>
                        <AccountCircleIcon style={{ fontSize: 30 }}/>
                    </IconButton>

                </Box>
            </Toolbar>
        </AppBar>
    )

}

export default TopBar;