import { Grid, Typography, useTheme } from "@mui/material";
import { formatCount } from "../../libs/utilFunctions";
import FollowListPopup from "./FollowListPopup";
import { useState } from "react";
import { customStyles } from "./styles/FollowCounterBox";

function FollowCounterBox({counters}){

    const theme = useTheme();
    const styles = customStyles(theme);

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
        <div style={styles.followcounterbox_main_div}>
            <FollowListPopup show={show} open={open} setOpen={setOpen} counters={counters} />
            <Grid container columnSpacing={1.5}>
                {itemsGrid.map((item) => (
                    <Grid key={item.key} onClick={item.onClickFn} item style={styles.followcounterbox_grid_item}>
                        <Typography style={styles.followcounterbox_item_count}>
                            {formatCount(item.count)}
                        </Typography>
                        <Typography style={styles.followcounterbox_item_text}>
                            {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default FollowCounterBox;