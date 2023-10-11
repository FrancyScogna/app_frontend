import { Avatar, Card, CardMedia, Skeleton, Typography, useTheme } from "@mui/material";
import coverImage from "../../images/cover-1500x500.png";
import avatarImage from "../../images/avatar-400x400.png";
import { lightenHexColor } from "../../libs/utilFunctions";
import CountersBox from "./CountersBox";
import { useEffect, useState } from "react";
import { getUserAmplify } from "../../libs/backendSimulation";
 
function ProfileCard(){

    const theme = useTheme();
    const [user, setUser] = useState(null);
    const [loadingCard, setLoadingCard] = useState(true);

    const fetchData = async() => {
        try {
            setTimeout(async() => {
                const userData = await getUserAmplify();
                setUser(userData);
                setLoadingCard(false);
            },3000);
        }catch(error){
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return(
        <Card style={{maxWidth: 450, backgroundColor: lightenHexColor(theme.palette.background.paper, 40), display: "block", flexDirection: "column", height: "280px"}}>
            {!loadingCard ? 
            <CardMedia
            image={coverImage}
            style={{height: 140, borderBottom: `1px solid ${theme.palette.background.paper}`}}
            />
            :
            <Skeleton variant="rectangular" style={{width: "450px", height: "140px", borderBottom: `1px solid ${theme.palette.background.paper}`}}/>
            }
            <div style={{position: "relative", bottom: "37px", height: "fit-content", width: "25%", left: "15px"}}>
                {loadingCard ? 
                    <Skeleton variant="circular" style={{height: "100px", width: "100px", border: `3px solid ${theme.palette.background.paper}`}}/> 
                    :
                    <Avatar src={avatarImage} style={{height: "100%", width: "100%", border: `3px solid ${theme.palette.background.paper}`}} />
                }
            </div>
            <div style={{position: "relative", display: "block", width: "fit-content", height: "fit-content", bottom: "95px", left: "145px"}}>
                <Typography fontWeight="bold" fontSize="22px" color={theme.palette.primary.dark}>
                    {loadingCard ? <Skeleton variant="rounded" style={{width: "150px", height: "25px"}}/> : user.username}
                </Typography>
                <Typography fontWeight="bold" fontSize="17px" marginTop="-5px" color={lightenHexColor(theme.palette.primary.dark, 80)}>
                    {loadingCard ? <Skeleton variant="rounded" style={{width: "120px", height: "20px", marginTop: "10px"}}/> : `@${user.nickname}`}
                </Typography>
            </div>
            <div style={{position: "relative", bottom: "75px", display: "flex", justifyContent: "center", alignItems: "center"}}>
                {loadingCard ? <Skeleton variant="rounded" style={{width: "420px", height: "30px"}}/> : <CountersBox counters={user.counters}/>}
            </div>
            
        </Card>
    )
}

export default ProfileCard;