import { Button, IconButton, Toolbar, Box, TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import SearchIcon from '@mui/icons-material/Search'; // Importa l'icona di ricerca
import NotificationsIcon from '@mui/icons-material/Notifications'; // Importa l'icona per le notifiche
import MessageIcon from '@mui/icons-material/Message'; // Importa l'icona per i messaggi
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Importa l'icona per l'account
import Logo from "../images/logo.png"

import { createTheme, ThemeProvider } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: {
      main: '#b14dff', // Imposta il colore primario personalizzato
    },
  },
});
function TopBar(){

    return(
        <ThemeProvider theme={theme}>
        <Toolbar style={{width:'100%', height:'100%', display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center", maxWidth:'100%',paddingRight:'16px',background: '#1a237e', // Aggiungi il colore di sfondo desiderato
          borderBottom: '2px solid' }}>
            <Box style={{display:"flex",alignItems:"center",minwidth:'300px'}}>
                <img alt="" src={Logo} style={{ height:"58px",position:"relative"}}/>
            </Box>
            <Box style={{position:"relative",minwidth:'200px',width:'516px',paddingTop:'0px',paddingBottom:'0px',paddingLeft:'8px',paddingRight:'8px'}}>
                    <TextField
                       fullWidth
                       variant="outlined"
                       size="small"
                       sx={{
                            borderRadius: '50px',
                            margin: '0 auto',
                            '& .MuiOutlinedInput-root': {
                                 borderRadius: '50px', // Ispessire il bordo della TextField
                                 borderWidth: '2px', // Ispessire il bordo della TextField
                                 borderColor: '#b14dff', // Imposta il colore del bordo a bianco
                            '& .MuiOutlinedInput-input': {
                                color: 'white', // Imposta il colore del testo a bianco
                                },
                                '&:hover': {
                                color: 'white', // Imposta il colore del testo a bianco al passaggio del mouse (hover)
                    },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '50px', // Aggiungere il bordo arrotondato all'outline
                                borderWidth: '2px', // Ispessire il bordo dell'outline
                                borderColor: '#b14dff', // Imposta il colore del bordo dell'outline a bianco
                                 },
                                 '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#b14dff',
                },
                            }}
                         InputProps={{
                            endAdornment: ( // Icona di ricerca all'interno dell'endAdornment
                            <IconButton
                                color="primary"
                                style={{ cursor: 'pointer' }} // Mostra il cursore della mano
                            >
                                <SearchIcon />
                            </IconButton>
                            ),
                         }}
                    />
            </Box>

            <Box style={{alignItems:"center",  display: 'flex'}}>
                <Button variant="contained" sx={{ flex: 1,marginRight: 1.5,fontSize: '16px' }} style={{ backgroundColor: '#b14dff', color: 'white'}}>DISCOVER</Button>
                <Button variant="contained" sx={{ flex: 1,fontSize: '16px'}} style={{ backgroundColor: '#b14dff', color: 'white'}}>FEEDS</Button>
               
                <Divider orientation="vertical" variant="middle" flexItem style={{ backgroundColor: 'black',marginLeft: 12, marginRight: 8 }} /> {/* Divider separato */}
                <IconButton color="primary" >
                    <NotificationsIcon style={{ fontSize: 30 }}/>
                </IconButton>
                <IconButton color="primary">
                    <MessageIcon style={{ fontSize: 30 }}/>
                </IconButton>
                 <IconButton color="primary">
                    <AccountCircleIcon style={{ fontSize: 30 }}/>
                </IconButton>

            </Box>
        </Toolbar>
        </ThemeProvider>
    )

}

export default TopBar;