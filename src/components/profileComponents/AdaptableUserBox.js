import profileImage from "../../images/avatar-400x400.png";
import { Avatar, Button, Popover, StyledEngineProvider, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import ProfileCard from "./ProfileCard";
import { customStyles } from "./styles/AdaptableUserBox";

function AdaptableUserBox({user, mousePosition, setMousePosition}){

    const theme = useTheme();
    const styles = customStyles(theme);

    const [follows, setFollows] = useState(user.follows);

    async function onClickFollowButton(){
        setFollows(!follows);
        await followUnfollowBackend();
    }

    async function followUnfollowBackend(){
        if(follows){
            console.log("Unfollow backend");
        }else{
            console.log("Follow backend");
        }
    }

    const [showCard, setShowCard] = useState(false);
    const timerRef = useRef(null);
    const delayTime = 1200;
  
    const handlePopoverOpen = () => {
      timerRef.current = setTimeout(() => {
        setShowCard(true);
      }, delayTime);
    };
  
    const handlePopoverClose = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowCard(false);
    };

    const handleMouseMove = (event) => {
        setMousePosition({ top: event.clientY, left: event.clientX });
    };

    return(
        <div style={styles.adaptableuserbox_main_div}>
            <div style={styles.adaptableuserbox_avatar_div}>
                <Avatar style={styles.adaptableuserbox_avatar} src={profileImage}/>
            </div>
            <div style={styles.adaptableuserbox_content_div}>
                <div 
                onMouseMove={handleMouseMove} 
                onMouseEnter={handlePopoverOpen} 
                onMouseLeave={handlePopoverClose} 
                style={styles.adaptableuserbox_typography_div}>
                <StyledEngineProvider injectFirst>
                    <Typography style={styles.adaptableuserbox_username}>
                        {user.name}
                    </Typography>
                </StyledEngineProvider>
                    <Typography style={styles.adaptableuserbox_nickname}>
                        @{user.nickname}
                    </Typography>
                    <Popover
                        id="mouse-over-popover"
                        sx={{
                        pointerEvents: "none",
                        }}
                        open={showCard}
                        anchorReference="anchorPosition"
                        anchorPosition={{ top: mousePosition.top, left: mousePosition.left }}
                        onClose={handlePopoverClose}
                        disableRestoreFocus
                    >
                        <ProfileCard />
                    </Popover>
                </div>
                <div style={styles.adaptableuserbox_button}>
                    <Button onClick={() => onClickFollowButton(user.follows)} variant="contained">
                        {follows ? "Unfollow":"Follow"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default AdaptableUserBox;