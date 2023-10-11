import React, { useState, useEffect } from 'react';
import { Close, Search } from "@mui/icons-material";
import { CircularProgress, Dialog, Divider, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { getFollowerList } from "../../libs/backendSimulation";
import AdaptableUserBox from "./AdaptableUserBox";
import { handleViewport } from 'react-in-viewport';
import { formatCount } from '../../libs/utilFunctions';
import { customStyles } from './styles/FollowListPopup';

function FollowListPopup({ show, open, setOpen, counters }) {

    const theme = useTheme();
    const styles = customStyles(theme);

    const title = show === "followers" ? `Followers (${formatCount(counters.followersCount)})` : `Account seguiti (${formatCount(counters.followingCount)})`;
    const textFieldLabel = show === "followers" ? "i followers" : "gli account seguiti";

    const [items, setItems] = useState([]);
    const [index, setIndex] = useState(0);
    const [mousePosition, setMousePosition] = useState({top: 0, left: 0});
    const pagination = 20;

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setDisableViewPort(true);
        setTimeout(async() => {
            const newData = await getFollowerList(index, pagination);
            setIndex(index+pagination);
            setItems((prevItems) => [...prevItems, ...newData]);
            if(newData.length === 0){
                setDisableViewPort(true);
            }
        },3000)
        setDisableViewPort(false);
    };

    const [disableViewport, setDisableViewPort] = useState(false)
    const Block = ({forwardedRef}) => {
        return (
            <div ref={forwardedRef} style={styles.followlistpopup_viewportblock}>
                <CircularProgress style={styles.followlistpopup_viewportblock_icon} />
            </div>
        )
      };

    const ViewportBlock = handleViewport(Block);
    
    return (

        <Dialog open={open} onClose={() => setOpen(false)}>
            <div style={styles.followlistpopup_main_div}>
                <Grid container style={styles.followlistpopup_grid_sticky} rowSpacing={1}>
                    <Grid item xs={12} style={styles.followlistpopup_grid_item_closebutton}>
                        <IconButton onClick={() => setOpen(false)}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" style={styles.followlistpopup_grid_item_title_text}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>  
                </Grid>
                <Grid container style={styles.followlistpopup_grid} rowSpacing={1}>
                    <Grid item xs={12} style={styles.followlistpopup_grid_item_searchbar}>
                    <TextField
                    label={`Cerca tra ${textFieldLabel}`}
                    style={styles.followlistpopup_searchbar}
                    InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    ),
                    }}
                    variant="outlined"
                    />
                    </Grid>
                    {items.map((item, index) => (
                        <Grid key={index} style={styles.followlistpopup_grid_item_userbox} item xs={12}>
                            <AdaptableUserBox user={item} mousePosition={mousePosition} setMousePosition={setMousePosition}/>
                        </Grid>
                    ))}
                    {!disableViewport && <ViewportBlock onEnterViewport={fetchData}/>}
                </Grid>
            </div>
        </Dialog>
    );
}

export default FollowListPopup;