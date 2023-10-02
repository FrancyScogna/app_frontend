import { Close } from "@mui/icons-material";
import { Button, Dialog, Divider, Grid, IconButton, Typography, useTheme } from "@mui/material";


function FollowListPopup({show, open, setOpen}){

    const theme = useTheme();
    const title = show === "followers" ? "Follower" : "Account seguiti";

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
                            {title}
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
                        <Grid  item xs={12} style={{marginInline: "10px"}}>
                            <Button 
                            fullWidth 
                            variant="contained"
                            style={{fontWeight: "bold"}}>
                                Abbonati
                            </Button>
                        </Grid>
                </Grid>
            </div>
        </Dialog>
    </div>
    )
}

export default FollowListPopup;