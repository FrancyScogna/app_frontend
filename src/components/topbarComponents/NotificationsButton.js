import { Badge, CircularProgress, Divider, IconButton, Menu, MenuItem, Skeleton, Snackbar, Typography, Zoom, useTheme } from "@mui/material";
import { lightenHexColor } from "../../libs/utilFunctions";
import styled from "@mui/material/styles/styled";
import { AttachMoney, Favorite, Notifications, PersonAdd } from "@mui/icons-material";
import { getNotifications, setSeenNotifications, simulateNotification } from "../../libs/backendSimulation";
import { useEffect, useRef, useState } from "react";

function NotificationsButton(){

    const notificationRef = useRef(null);

    const theme = useTheme();

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
          right: -3,
          top: 20,
          color: lightenHexColor(theme.palette.primary.light, 40),
          backgroundColor: theme.palette.primary.dark
        },
    }));

    const [notifications, setNotifications] = useState(null);
    const [badgeNum, setBadgeNum] = useState(0);
    const [moreThanNine, setMoreThanNine] = useState(false);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    console.log(notifications)

    //Funzione che mi restituisce le prime 10 notifiche dalla tabella delle notifiche
    useEffect(() => {
        const fetchNotifications = async() => {
            const notificationsData = await getNotifications(0, 10);
            setNotifications(notificationsData);
            setLoading(false);
            setShow(true);
            console.log(notificationsData)
        }
        setShow(false);
        fetchNotifications();
    },[])

    //Funzione che mi da una notifica push ogni tot tempo
    const [show, setShow] = useState(false);
    useEffect(() => {
        simulateNotification((newNotification) => {
            setNotifications((prevNotifications) => [newNotification, ...prevNotifications]);
            setShow(true);
        });
        setShow(false);
    }, []);

    //Funzione che imposta il numero del badge in base a se abbiamo visto o meno le notifiche.
    useEffect(() => {
        if(notifications){
            if(anchorEl){
                setBadgeNum(0);
            }else{
                console.log(notifications)
                let intCount = 0;
                for (let i = 0; i < Math.min(10, notifications.length); i++) {
                    if (notifications[i] && notifications[i].seen === false) {
                        intCount += 1;
                    }
                }
                if(intCount < 10){
                    setBadgeNum(intCount);
                    setMoreThanNine(false);
                }else{
                    setBadgeNum("9+");
                    setMoreThanNine(true);
                }
            }
        }
    },[notifications, anchorEl])

    async function setSeenNotificationsDB() {
        if (notifications && notifications.length > 0) {
            await setSeenNotifications(notifications);
        }
    }

    async function getNotificationsDB() {
        const notificationsData = await getNotifications(0, 10);
        setNotifications(notificationsData);
        setLoading(false);
        setShow(true);
    }

    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        setSeenNotificationsDB();
    }

    const handleClose = () => {
        setAnchorEl(null);
        getNotificationsDB();
    }

    const renderIcon = {
        follow: <PersonAdd />,
        subs: <AttachMoney />,
        like: <Favorite />
    }

    return(
        <>
        <IconButton onClick={handleClick} style={{color: lightenHexColor(theme.palette.primary.light, 40)}}>
            <StyledBadge badgeContent={badgeNum}>
                <Notifications ref={notificationRef} />
            </StyledBadge>
        </IconButton>
        <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        style={{marginTop: "7px"}}
        anchorOrigin={{vertical: "bottom", horizontal: "center"}}>
            <div style={{width: "300px", maxHeight: "250px", display: "block", justifyContent: "center", scrollBehavior: "unset"}}>
                <div style={{width: "100%"}}>
                    <Typography variant="h6" align="center" style={{color: theme.palette.primary.dark}}>
                        Notifications
                    </Typography>
                </div>
                <div style={{marginInline: "10px", borderRadius: "5px", zIndex: 1, border: `1px solid ${theme.palette.primary.dark}`}}>
                {!loading ? 
                <>
                    {notifications.map((notific, index) => (
                            <MenuItem
                            key={notific.id}
                            style={{backgroundColor: !notific.seen && theme.palette.primary.light}}
                            >
                                <Zoom in={show}>
                                    <div style={{border: "1px solid black", padding: "20px", borderRadius: "10px", display: "flex", width: "100%", height: "60px", alignItems: "center", wordWrap: "break-word", overflowWrap: "break-word"}}>
                                        {renderIcon[notific.type]}
                                        <Typography fontSize={13} style={{whiteSpace: "pre-wrap", marginLeft: "5px"}}>
                                            {notific.message}
                                        </Typography>
                                    </div>
                                </Zoom>
                            </MenuItem>
                        )   
                    )}
                    <MenuItem>
                        Mostra tutte...
                    </MenuItem>
                </>
                :
                <div style={{display: "flex", flexDirection: "column", width: "100%", height: "fit-content", marginTop: "5px", marginBottom: "5px"}}>
                    <div style={{ display: "flex", alignItems: "center", width: "100%", height: "60px", justifyContent: "center"}}>
                        <Skeleton variant="rounded" width="250px" height={55}/>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", width: "100%", height: "60px", justifyContent: "center"}}>
                        <Skeleton variant="rounded" width="250px" height={55}/>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", width: "100%", height: "60px", justifyContent: "center"}}>
                        <Skeleton variant="rounded" width="250px" height={55}/>
                    </div>
                </div>
                }
                </div>
            </div>
        </Menu>
        </>
    )

}

export default NotificationsButton;