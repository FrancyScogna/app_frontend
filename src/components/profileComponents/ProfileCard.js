import { Avatar, Card, CardMedia, Skeleton, Typography, useTheme } from "@mui/material";
import coverImage from "../../images/cover-1500x500.png";
import avatarImage from "../../images/avatar-400x400.png";
import CountersBox from "./CountersBox";
import { useEffect, useState } from "react";
import { getUserAmplify } from "../../libs/backendSimulation";
import { customStyles } from "./styles/ProfileCard";
 
function ProfileCard(){

    const theme = useTheme();
    const styles = customStyles(theme);

    const [user, setUser] = useState(null);
    const [loadingCard, setLoadingCard] = useState(true);

    const fetchData = async() => {
        try {
            setTimeout(async() => {
                const userData = await getUserAmplify("frasco.97");
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
        <Card style={styles.profilecard_card}>
            {!loadingCard ? 
            <CardMedia
            image={coverImage}
            style={styles.profilecard_cardmedia}
            />
            :
            <Skeleton variant="rectangular" style={styles.profilecard_skeleton_cover}/>
            }
            <div style={styles.profilecard_avatar_div}>
                {loadingCard ? 
                    <Skeleton variant="circular" style={styles.profilecard_skeleton_avatar}/> 
                    :
                    <Avatar src={avatarImage} style={styles.profilecard_avatar} />
                }
            </div>
            <div style={styles.profilecard_anagraphic_div}>
                <Typography style={styles.profilecard_username_text}>
                    {loadingCard ? <Skeleton variant="rounded" style={styles.profilecard_skeleton_username}/> : user.username}
                </Typography>
                <Typography style={styles.profilecard_nickname_text}>
                    {loadingCard ? <Skeleton variant="rounded" style={styles.profilecard_skeleton_nickname}/> : `@${user.nickname}`}
                </Typography>
            </div>
            <div style={styles.profilecard_countersbox_div}>
                {loadingCard ? <Skeleton variant="rounded" style={styles.profilecard_skeleton_countersbox}/> : <CountersBox counters={user.counters}/>}
            </div>
            
        </Card>
    )
}

export default ProfileCard;