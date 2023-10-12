import { Close } from "@mui/icons-material";
import { Button, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";
import { customStyles } from "./styles/UnsubscribePopup";

function UnsubscribePopup ({username, nickname, type, open, setOpen}){

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
                    {subsList.map((item) => (
                        <Grid key={item.key} item xs={12} style={styles.unsubscribepopup_grid_item_unsubbutton}>
                            <Button 
                            fullWidth 
                            variant="contained"
                            style={styles.unsubscribepopup_button_unsubbutton}>
                                Prolunga di {item.days} giorni a {item.price}€
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default UnsubscribePopup;