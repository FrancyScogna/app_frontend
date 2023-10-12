import { Close } from "@mui/icons-material";
import { Button, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { customStyles } from "./styles/SubscribePopup";

function SubscribePopup ({username, nickname, type, open, setOpen}){

    const theme = useTheme();
    const styles = customStyles(theme);

    //simulazione di una lista di abbonamenti che verrà ricevuta da un'apposita funzione in backend
    var subsList = [
        {
            key: 1,
            price: 10,
            days: 30
        },
        {
            key: 2,
            price: 18,
            days: 60
        },
        {
            key: 3,
            price: 25,
            days: 90
        }
    ]

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
                    {subsList.map((item) => (
                        <Grid key={item.key} item xs={12} style={styles.subscribepopup_grid_item_button}>
                            <Button 
                            fullWidth 
                            variant="contained"
                            style={styles.subscribepopup_subscribe_button}>
                                Abbonati {item.days} giorni a {item.price}€
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default SubscribePopup;