import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogTitle, Divider, Grid, Icon, IconButton, Typography, useTheme } from "@mui/material";

function SubscribePopup ({username, nickname, type, open, setOpen}){

    const theme = useTheme();

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
                            Abbonati a {nickname}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid style={{marginInline: "10px"}} item xs={12}>
                        <Typography>
                            Scegli uno tra i seguenti abbonamenti, una volta selezionato
                            potrai procedere al pagamento.
                        </Typography>
                    </Grid>
                    {subsList.map((item) => (
                        <Grid key={item.key} item xs={12} style={{marginInline: "10px"}}>
                            <Button 
                            fullWidth 
                            variant="contained"
                            style={{fontWeight: "bold"}}>
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