import { Button, Grid, IconButton, ListItemIcon, Menu, MenuItem, MenuList, Typography, useTheme } from "@mui/material";
import { Flag, MoreVert, Share } from "@mui/icons-material";
import { useEffect, useState } from "react";
import SubscribePopup from "./SubscribePopup";
import UnsubscribePopup from "./UnsubscribePopup";
import { customStyles } from "./styles/ButtonsGrid";

function ButtonsGrid({username, nickname, follow, subscribed}){

    const theme = useTheme();
    const styles = customStyles(theme);
    //probabile cambiamento di stile per i bottoni, borderradius 30px

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

    useEffect(() => {
        setFollowCheck(follow);
        setSubscribeCheck(subscribed);
    },[follow, subscribed])

    const [subscribeCheck, setSubscribeCheck] = useState(false);
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

    return(
        <Grid style={styles.buttonsgrid_main_grid} container columnSpacing={1} rowSpacing={1}>
            <Grid item>
                <Button style={styles.buttonsgrid_button} 
                variant={followCheck ? "outlined":"contained"}
                onClick={onClickFollowButton}>
                    {followCheck ? "Unfollow":"Follow"}
                </Button>
            </Grid>
            <Grid item>
                <Button style={styles.buttonsgrid_button}
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
                <Button style={styles.buttonsgrid_button} 
                variant="outlined">
                    Message
                </Button>
            </Grid>
            <Grid item>
                <Button style={styles.buttonsgrid_button} 
                variant="outlined"
                onClick={onClickTip}>
                    Tip
                </Button>
            </Grid>
            <Grid item>
                <IconButton style={styles.buttonsgrid_iconbutton_share}>
                    <Share style={styles.buttonsgrid_iconbutton_icon_share}/>
                </IconButton>
            </Grid>
            <Grid item>
                <IconButton onClick={handleClick}>
                    <MoreVert 
                    style={styles.buttonsgrid_iconbutton_icon_morevert}/>
                </IconButton>
                <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
                    <MenuList>
                        <MenuItem onClick={onClickReport}>
                            <ListItemIcon>
                                <Flag style={styles.buttonsgrid_listitem_icon}/>
                            </ListItemIcon>
                            <Typography style={styles.buttonsgrid_listitem_text}>
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