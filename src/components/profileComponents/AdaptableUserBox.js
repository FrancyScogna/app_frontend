import profileImage from "../../images/avatar-400x400.png";
import { lightenHexColor } from "../../libs/utilFunctions";
import { Avatar, Button, Popover, Typography, useTheme } from "@mui/material";
import { useRef, useState } from "react";
import ProfileCard from "./ProfileCard";

function AdaptableUserBox({user, mousePosition, setMousePosition}){

    const theme = useTheme();
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

    const [anchorEl, setAnchorEl] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const timerRef = useRef(null);
    const delayTime = 1200;
  
    const handlePopoverOpen = (event) => {
      timerRef.current = setTimeout(() => {
        setShowCard(true);
        setAnchorEl(event.currentTarget);
      }, delayTime);
    };
  
    const handlePopoverClose = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
      setShowCard(false);
      setAnchorEl(null);
    };

    const handleMouseMove = (event) => {
        setMousePosition({ top: event.clientY, left: event.clientX });
    };

    return(
        <div style={{height: "fit-content", width: "100%", display: "flex", padding: "5px", flexDirection: "row", backgroundColor: lightenHexColor(theme.palette.background.paper, 10), borderRadius: "10px"}}>
            <div style={{display: "flex", width: "20%"}}>
                <Avatar style={{width: "100%", height: "fit-content", border: `2px solid ${theme.palette.primary.dark}`}} src={profileImage}/>
            </div>
            <div style={{display: "flex", width: "100%", alignItems: "center", paddingInline: "15px"}}>
                <div onMouseMove={handleMouseMove} onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} style={{cursor: "pointer", display: "flex", flexDirection: "column", overflow: "hidden"}}>
                    <Typography fontWeight="bold" whiteSpace="nowrap" fontSize="20px" color={theme.palette.primary.dark} style={{textOverflow: "ellipsis", width: "200px"}}>
                        {user.name}
                    </Typography>
                    <Typography fontWeight="bold" marginLeft="2px" color={lightenHexColor(theme.palette.primary.dark, 50)}>
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
                <div style={{position: "relative", right: "-10px"}}>
                    <Button onClick={() => onClickFollowButton(user.follows)} variant="contained">{follows ? "Unfollow":"Follow"}</Button>
                </div>
            </div>
        </div>
    )
}

export default AdaptableUserBox;