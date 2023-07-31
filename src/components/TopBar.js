import { Button, IconButton, Toolbar, Box, AppBar, InputBase } from "@mui/material";
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logo from "../images/logo.png"
import styled from "@mui/material/styles/styled";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";

function TopBar(){

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit', 
        width: 'calc(100% - 48px)',
        flex:'1',
        '& .MuiInputBase-input': {
            transition: theme.transitions.create('width'),
            [theme.breakpoints.up('sm')]: {
            width: '20ch',
            '&:focus': {
                width: '40ch',
            },
            },
        },
    }));

    const theme = useTheme()
    const navigate = useNavigate()

    return(
        <AppBar>
            <Toolbar style={{display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", maxWidth:'100%',paddingRight:'16px',
            }}>
                <Box style={{display:"flex",alignItems:"center",minwidth:'300px'}}>
                    <img alt="" src={Logo} onClick={() => navigate("/")} style={{cursor: "pointer", height:"58px",position:"relative"}}/>
                </Box>
                <Box style={{position:"relative",minWidth: "100px",paddingTop:'0px',paddingBottom:'0px',paddingLeft:'8px',paddingRight:'8px', borderBottom: `2px solid ${theme.palette.primary.light}`}}>
                    
                        <StyledInputBase
                            placeholder="Cerca..."
                            inputProps={{ 'aria-label': 'search' }}
                        />
                        <IconButton
                        type="button"
                        sx={{ p: "10px", width: "48px" }}
                        aria-label="search"
                    >
                    <SearchIcon style={{color: theme.palette.background.paper}}/>
                    </IconButton>
            
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