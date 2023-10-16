import { Button, CircularProgress, Grid, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { getUserSubs } from "../../libs/backendSimulation";
import { lightenHexColor } from "../../libs/utilFunctions";
import { customStyles } from "./styles/SubsBox";

function SubsBox({user}){

    const theme = useTheme();
    const styles = customStyles(theme);
    const [subsList, setSubsList] = useState(null);
    const [loadingList, setLoadingList] = useState(true);

    async function fetchData(){
        try{
            setTimeout(async() => {
                const subsListData = await getUserSubs();
                setSubsList(subsListData);
                setLoadingList(false);
            }, 2000)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    },[])

    return(
        <div style={styles.subsbox_main_div}>
            <Grid container rowSpacing={1} style={styles.subsbox_grid_container}>
                <Grid item xs={12} style={styles.subsbox_grid_item_title}>
                    <Typography style={styles.subsbox_title_text}>
                        Abbonati a {user.username}
                    </Typography>
                </Grid>
                {!loadingList ? 
                subsList.map((item) => (
                <Grid item key={item.key} xs={12} style={styles.subsbox_grid_item_listitem}>
                    <Button
                    fullWidth
                    variant="contained"
                    style={styles.subsbox_button}
                    >
                        Abbonati {item.days} giorni a {item.price}€
                    </Button>
                </Grid>
                ))
                :
                (
                    <div style={styles.subsbox_loading_div}>
                        <CircularProgress />
                    </div>
                )
                }
            </Grid>
        </div>
    )
}

export default SubsBox;