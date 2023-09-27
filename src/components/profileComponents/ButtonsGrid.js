import { Button, Grid, IconButton, ListItemIcon, Menu, MenuItem, MenuList, Typography, useTheme } from "@mui/material";
import "./styles.css";
import { Flag, MoreVert, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { lightenHexColor } from "../../libs/utilFunctions";
import { Container } from "@mui/system";
import SubscribePopup from "./SubscribePopup";
import UnsubscribePopup from "./UnsubscribePopup";

function ButtonsGrid({username, nickname}){

    const theme = useTheme();
    const themeModified = theme;
    themeModified.components = {MuiButton: {styleOverrides: {root: {borderRadius: "30px"}}}};

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }

    const onClickReport = () => {
        //quando clicchi il pulsante report dal menu dei tre puntini
        handleClose();
    }

    const [followCheck, setFollowCheck] = useState(false);
    async function followCheckFun(){
        //meccanismo da backend per il check del follow unfollow
        //esempio simulativo: mettiamo che la funzione ponga che i due users non si seguono
        setFollowCheck(false);
    }

    const onClickFollowButton = () => {
        //meccanismo da backend per l'aggiunta o rimozione del follower
        if(followCheck){
            //se si seguono deve essere rimosso il follow
            //operazioni da backend
            setFollowCheck(false);
        }else{
            //se non si seguono si deve aggiungere il follow
            //operazioni da backend
            setFollowCheck(true);
        }
    }

    const [subscribeCheck, setSubscribeCheck] = useState(false);
    async function subscribeCheckFun(){
        //meccanismo da backend per il check se l'utente è abbonato
        //esempio simulativo: mettiamo che la funzione ponga che l'utente non è già abbonato
        setSubscribeCheck(false);
    }

    const [showSubscribePopup, setShowSubscribePopup] = useState(false);
    const [showUnsubscribePopup, setShowUnsubscribePopup] = useState(false);
    const onClickSubscribe = () => {
        //se non è abbonato allora esce un popup con gli abbonamenti disponibili
        //se è abbonato allora esce un popup con la conferma della cancellazione dell'abbonamento
        if(subscribeCheck){
            setShowUnsubscribePopup(true);
            setShowSubscribePopup(false)
        }else{
            setShowSubscribePopup(true);
            setShowUnsubscribePopup(false);
        }
    }

    const [showTipPopup, setShowTipPopup] = useState(false);
    const onClickTip = () => {
        setShowTipPopup(true);
    }

    useEffect(() => {
        followCheckFun();
        subscribeCheckFun();
    },[])

    return(
        <Grid className="profile-buttons-grid" container columnSpacing={1} rowSpacing={1}>
            <Grid item>
                <Button className="buttonsgrid-button" 
                variant={followCheck ? "outlined":"contained"}
                onClick={onClickFollowButton}>
                    {followCheck ? "Unfollow":"Follow"}
                </Button>
            </Grid>
            <Grid item>
                <Button className="buttonsgrid-button" 
                variant={subscribeCheck ? "outlined":"contained"}
                onClick={onClickSubscribe}>
                    {subscribeCheck ? "Unsubscribe":"Subscribe"}
                </Button>
                <SubscribePopup 
                nickname={nickname} 
                username={username} 
                setOpen={setShowSubscribePopup} 
                open={showSubscribePopup} />
                <UnsubscribePopup
                nickname={nickname} 
                username={username} 
                setOpen={setShowUnsubscribePopup} 
                open={showUnsubscribePopup} />
            </Grid>
            <Grid item>
                <Button className="buttonsgrid-button" 
                variant="outlined">
                    Message
                </Button>
            </Grid>
            <Grid item>
                <Button className="buttonsgrid-button" 
                variant="outlined"
                onClick={onClickTip}>
                    Tip
                </Button>
            </Grid>
            <Grid item>
                <IconButton style={{marginRight: "-10px"}}>
                    <Share style={{color: theme.palette.primary.dark}}/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={handleClick}>
                    <MoreVert 
                    style={{color: lightenHexColor( theme.palette.primary.dark, 70)}}/>
                </IconButton>
                <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                    <MenuList>
                        <MenuItem onClick={onClickReport}>
                            <ListItemIcon>
                                <Flag style={{color: theme.palette.primary.dark}}/>
                            </ListItemIcon>
                            <Typography fontWeight="bold" color={theme.palette.primary.dark}>
                                Report
                            </Typography>
                        </MenuItem>
                    </MenuList>
                    
                </Menu>
            </Grid>
        </Grid>
    )
}

export default ButtonsGrid;