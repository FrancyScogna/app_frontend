import { Close } from "@mui/icons-material";
import { Button, CircularProgress, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { customStyles } from "./styles/SubscribePopup";
import { getUserSubs } from "../../libs/backendSimulation";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";

function SubscribePopup ({username, nickname, type, open, setOpen}){

    const theme = useTheme();
    const styles = customStyles(theme);

    const [subsList, setSubsList] = useState(null);
    const [loadingSubs, setLoadingSubs] = useState(true);

    //simulazione di una lista di abbonamenti che verrà ricevuta da un'apposita funzione in backend
    async function fetchData(){
        try{
            const subsListData = await getUserSubs();
            setSubsList(subsListData);
            setLoadingSubs(false);
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
                <Grid container rowSpacing={1} style={styles.subscribepopup_grid}>
                    <Grid item xs={12} style={styles.subscribepopup_grid_item_close}>
                        <IconButton onClick={() => setOpen(false)} style={styles.subscribepopup_iconbutton_close}>
                            <Close />
                        </IconButton>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography 
                        variant="h5"
                        align="center"
                        style={styles.subscribepopup_title_text}
                        >
                            Abbonati a {nickname}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid style={styles.subscribepopup_grid_item_description} item xs={12}>
                        <Typography>
                            Scegli uno tra i seguenti abbonamenti, una volta selezionato
                            potrai procedere al pagamento.
                        </Typography>
                    </Grid>
                    {!loadingSubs ? 
                    subsList.map((item) => (
                        <Grid key={item.key} item xs={12} style={styles.subscribepopup_grid_item_button}>
                            <Button
                            fullWidth 
                            variant="contained"
                            style={styles.subscribepopup_subscribe_button}>
                                Abbonati {item.days} giorni a {item.price}€
                            </Button>
                        </Grid>
                    ))
                    :
                    (
                        <div style={styles.subscribepopup_loading_div}>
                            <CircularProgress /> 
                        </div>
                    )}
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default SubscribePopup;