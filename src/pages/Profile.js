import "./Profile.css";
import coverImage from "../images/cover-1500x500.png";
import avatarImage from "../images/avatar-400x400.png";
import { Avatar, Button, Grid, Typography, useTheme } from "@mui/material";

function Profile (){

    const theme = useTheme();

    return(
        <div className="main-container">
            <div className="profile-left-container">
                <h1>Left</h1>
            </div>
            <div className="profile-center-container">
                <div className="profile-center-top-container">
                    <div className="profile-cover-container">
                        <img className="profile-cover-image" src={coverImage} />
                    </div>
                    <div className="profile-avatar-buttons-container">
                        <div className="profile-avatar-container">
                            <Avatar style={{width: "100%", height: "100%", border: "solid 2px gray"}} src={avatarImage}/>
                        </div>
                        <div className="profile-buttons-container">
                            <Typography 
                            fontWeight="bold" 
                            fontSize="20px" 
                            color={theme.palette.primary.dark}>
                                    @Nickname
                            </Typography>
                            <Grid className="profile-buttons-grid" container columnSpacing={2}>
                                <Grid item>
                                    <Button variant="outlined">Button1</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined">Button2</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined">Button3</Button>
                                </Grid>
                            </Grid>
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