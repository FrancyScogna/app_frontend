import { Grid, Typography, useTheme } from "@mui/material";
import { formatCount, lightenHexColor } from "../../libs/utilFunctions";
import FollowListPopup from "./FollowListPopup";
import { useState } from "react";

function FollowCounterBox({counters}){

    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(null);

    const onClickFollowers = () => { 
        setShow("followers");
        setOpen(true);
    }

    const onClickFollowing = () => {
        setShow("following");
        setOpen(true);
    }
 
    const itemsGrid = [
        {key: "1", count: counters.followersCount, onClickFn: onClickFollowers, text: "Followers"},
        {key: "2", count: counters.followingCount, onClickFn: onClickFollowing, text: "Following"}
    ]

    return(
        <div className="followcounter-container">
            <FollowListPopup show={show} open={open} setOpen={setOpen} />
            <Grid container columnSpacing={1.5}>
                {itemsGrid.map((item) => (
                    <Grid key={item.key} onClick={item.onClickFn} item className="followcounter-grid-item">
                        <Typography color={theme.palette.primary.dark} fontWeight="bold" fontSize="17px" marginRight="3px">
                            {formatCount(item.count)}
                        </Typography>
                        <Typography color={lightenHexColor(theme.palette.primary.dark, 50)} fontWeight="bold" >
                            {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default FollowCounterBox;