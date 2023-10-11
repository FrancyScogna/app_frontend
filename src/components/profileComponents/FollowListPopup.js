import React, { useState, useEffect } from 'react';
import { Close, Search } from "@mui/icons-material";
import { CircularProgress, Dialog, Divider, Grid, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import { getFollowerList } from "../../libs/backendSimulation";
import AdaptableUserBox from "./AdaptableUserBox";
import { handleViewport } from 'react-in-viewport';
import { formatCount } from '../../libs/utilFunctions';

function FollowListPopup({ show, open, setOpen, counters }) {

    const theme = useTheme();
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
    const Block = ({inViewport, forwardedRef}) => {
        return (
            <div className="viewport-block" ref={forwardedRef} style={{ display: "flex", justifyContent: "center"}}>
                <CircularProgress className="mt-3" size={"50px"} sx={{color: theme.palette.primary.dark}} />
            </div>
        )
      };

    const ViewportBlock = handleViewport(Block);
    
    return (

        <Dialog open={open} onClose={() => setOpen(false)}>
            <div style={{ width: "500px", maxHeight: "500px", overflowY: "auto" }}>
                <Grid container padding="15px" rowSpacing={1} marginBottom="20px">
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "end", padding: "0px" }}>
                        <IconButton onClick={() => setOpen(false)} style={{ padding: "0px" }}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" fontWeight="bold" align="center" color={theme.palette.primary.dark}>
                            {title}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>  
                    <Grid item xs={12} style={{display: "flex", justifyContent: "center"}}>
                    <TextField
                    label={`Cerca tra ${textFieldLabel}`}
                    style={{width: "90%"}}
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
                        <Grid key={index} style={{ marginInline: "10px" }} item xs={12}>
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