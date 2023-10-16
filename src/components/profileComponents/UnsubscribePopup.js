import { Close } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { customStyles } from "./styles/UnsubscribePopup";
import { useEffect, useState } from "react";
import { getUserSubs } from "../../libs/backendSimulation";

function UnsubscribePopup ({username, nickname, type, open, setOpen}){

    const theme = useTheme();
    const styles = customStyles(theme);

    const [subsList, setSubsList] = useState(null);
    const [loadingSubs, setLoadingSubs] = useState(true);

    //simulazione di una lista di abbonamenti che verrà ricevuta da un'apposita funzione in backend
    async function fetchData(){
        try{
            setTimeout(async() => {
            const subsListData = await getUserSubs();
            setSubsList(subsListData);
            setLoadingSubs(false);
            },2000)
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData();
    },[]);

    return(
    <div>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}>
            <div>
                <Grid container rowSpacing={1} style={styles.unsubscribepopup_grid_container}>
                    <Grid item xs={12} style={styles.unsubscribepopup_grid_item_close}>
                        <IconButton onClick={() => setOpen(false)} style={styles.unsubscribepopup_iconbutton_close}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                        variant="h5"
                        align="center"
                        style={styles.unsubscribepopup_title_text}
                        >
                            Rimuovi abbonamento a {nickname}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid style={styles.unsubscribepopup_grid_item_description} item xs={12}>
                        <Typography align="center" style={styles.unsubscribepopup_description_text}>
                            Confermi di voler rimuovere l'abbonamento a {nickname}?
                        </Typography>
                    </Grid>
                    <Grid style={styles.unsubscribepopup_grid_item_removesub} item xs={12}>
                        <Button 
                        variant="outlined"
                        style={styles.unsubscribepopup_grid_item_removesub}>
                            Rimuovi abbonamento
                        </Button>
                    </Grid>
                    <Grid style={styles.unsubscribepopup_grid_item_divider} item xs={12}>
                        <Divider>
                            <Typography style={styles.unsubscribepopup_divider_text}>
                                OPPURE
                            </Typography>
                        </Divider>
                    </Grid>
                    {!loadingSubs ? 
                    subsList.map((item) => (
                        <Grid key={item.key} item xs={12} style={styles.unsubscribepopup_grid_item_unsubbutton}>
                            <Button 
                            fullWidth 
                            variant="contained"
                            style={styles.unsubscribepopup_button_unsubbutton}>
                                Prolunga di {item.days} giorni a {item.price}€
                            </Button>
                        </Grid>
                    ))
                    :
                    (
                        <div style={styles.unsubscribepopup_loading_div}>
                            <CircularProgress /> 
                        </div>
                    )
                    }
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default UnsubscribePopup;