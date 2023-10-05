import { Close } from "@mui/icons-material";
import { Button, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { getFollowerList } from "../../libs/backendSimulation";
import { useEffect, useState } from "react";
import AdaptableUserBox from "../AdaptableUserBox";


function FollowListPopup({show, open, setOpen}){

    const theme = useTheme();
    const title = show === "followers" ? "Follower" : "Account seguiti";
    const [users, setUsers] = useState(null);

    console.log(users);

    async function getFollowList(show){
        await getFollowerList().then((data) => {
            setUsers(data);
        })
    }

    useEffect(() => {
        getFollowList(show);
    },[])

    return(
        <div>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}>
            <div style={{width: "500px"}}>
                <Grid container padding="15px" rowSpacing={1} marginBottom="20px">
                    <Grid item xs={12} style={{display: "flex", justifyContent: "end", padding: "0px"}}>
                        <IconButton onClick={() => setOpen(false)}style={{padding: "0px"}}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography
                        variant="h5"
                        fontWeight="bold" 
                        align="center"
                        color={theme.palette.primary.dark}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid style={{marginInline: "10px"}} item xs={12}>
                        <AdaptableUserBox />
                    </Grid>
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default FollowListPopup;