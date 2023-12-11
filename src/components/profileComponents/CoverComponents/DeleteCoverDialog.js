import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, Grid } from "@mui/material";
import { useState } from "react";
import nullCoverImage from "../../../images/cover-1500x500.png";

function DeleteCoverDialog({setSelectedOperation}){

    const [openDelete, setOpenDelete] = useState(true);
    const nullCoverHeight = 500;
    const nullCoverWidth = 1500;

    const onClickDelete = () => {
        //Funzione di backend che esegue la rimozione dal db del cover crop
        //e da s3 l'immagine di copertina
        setOpenDelete(false);
        setSelectedOperation(null);
        window.location.reload();
    }

    const onClickClose = () => {
        setOpenDelete(false);
        setSelectedOperation(null);
    }

    return(
        <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
            <DialogTitle justifyContent="center">
            Elimina immagine di copertina
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Vuoi eliminare l'attuale immagine di copertina?
            </DialogContentText>
            </DialogContent>
            <Grid container columnSpacing={2} justifyContent="center" style={{marginBottom: "10px"}}>
              <Grid item>
                <Button onClick={onClickDelete} variant="contained">Elimina</Button>
              </Grid>
              <Grid item>
                <Button onClick={onClickClose} variant="outlined">Annulla</Button>
              </Grid>
            </Grid>
      </Dialog>
    )
}

export default DeleteCoverDialog;