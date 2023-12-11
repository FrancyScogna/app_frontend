import { Close, CloseOutlined } from "@mui/icons-material";
import { Dialog, DialogContent, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { style } from "@mui/system";

function ShowCoverImage({src, nickname, setOpen, open}){

    const theme = useTheme();
    const downDesktop = useMediaQuery(theme.breakpoints.down("desktop"));

    const handleCloseCover = () => {
        setOpen(false);
    };

    return(
        <Dialog 
            open={open} 
            onClose={handleCloseCover} 
            style={{margin: "0px"}}
            
            PaperProps={{style: {backgroundColor: "transparent", boxShadow: "none", margin: downDesktop && "5px"}}}
        >
            <DialogContent style={{maxWidth: 'none', width: '100%', padding: 0, margin: "0px", backgroundColor: "transparent"}}>
                <IconButton style={{position: "absolute", right: "0px"}}>
                    <Close onClick={handleCloseCover} style={{color: theme.palette.primary.dark, fontSize: "25px"}} />
                </IconButton>
                <img
                alt={`Copertina di ${nickname}`} 
                src={src} 
                style={{ width: '100%', height: 'auto', display: 'block'}} 
                />
                
            </DialogContent>
        </Dialog>
    )
}

export default ShowCoverImage;