import { Dialog, DialogTitle, Grid, IconButton, Typography, useTheme } from "@mui/material";

function SubscribePopup ({username, nickname, type, open, setOpen}){

    const theme = useTheme();

    return(
    <div>
        <Dialog
        open={open}
        onClose={() => setOpen(false)}
        >
            <Grid container rowSpacing={1}>
                <Grid item>
                    <Typography>
                        Abbonati a {nickname}
                    </Typography>
                </Grid>
            </Grid>
        </Dialog>
    </div>
    )
}

export default SubscribePopup;