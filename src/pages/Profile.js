import "./Profile.css";
import coverImage from "../images/cover-1500x500.png";
import avatarImage from "../images/avatar-400x400.png";
import { Avatar, Button, Grid, Typography, useTheme } from "@mui/material";
import ButtonsGrid from "../components/profileComponents/ButtonsGrid";
import { lightenHexColor } from "../libs/utilFunctions";

function Profile (){

    const theme = useTheme();
    const bordersColor = lightenHexColor(theme.palette.primary.dark, 120);

    const username = "User Name";
    const nickname = "nickname";

    return(
        <div className="main-container">
            <div className="profile-left-container">
                <h1>Left</h1>
            </div>
            <div className="profile-center-container" style={{borderInline: `solid 2px ${bordersColor}`}}>
                <div className="profile-center-top-container">
                    <div className="profile-cover-container" style={{borderBottom: `solid 5px ${bordersColor}`,borderBottomLeftRadius: "10px",borderBottomRightRadius: "10px", overflow: "hidden"}}>
                        <img className="profile-cover-image" src={coverImage} />
                    </div>
                    <div className="profile-avatar-buttons-container">
                        <div className="profile-avatar-container">
                            <Avatar style={{width: "100%", height: "100%", border: `solid 3px ${bordersColor}`}} src={avatarImage}/>
                        </div>
                        <div className="profile-buttons-container">
                            <Typography
                            fontWeight="bold" 
                            fontSize="20px" 
                            color={theme.palette.primary.dark}>
                                {username}
                            </Typography>
                            <Typography 
                            fontWeight="bold" 
                            fontSize="15px"
                            marginTop="-3px"
                            color={theme.palette.primary.light}>
                                    @{nickname}
                            </Typography>
                            <ButtonsGrid username={username} nickname={nickname} />
                        </div>
                    </div>
                </div>
                <div className="profile-center-bottom-container">
                    <h1>Bottom Components</h1>
                </div>
            </div>
            <div className="profile-right-container">
                <h1>Right</h1>
            </div>
        </div>
    )
}

export default Profile;