import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import discovery_auth_image from "../../images/discovery_auth_image.png"

function DiscoverAuth(){
    const theme = useTheme();

    return(
        <div className="auth-discover-component" 
        style={{
            backgroundImage: `url(${discovery_auth_image})`,
            backgroundSize: "100% 400px",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center"
        }}>
            <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            color={theme.palette.primary.dark}
            >
                Scopri cosa ti aspetta!
            </Typography>
            <Typography
            marginTop="170px"
            fontSize="25px"
            align="center"
            fontWeight="bold"
            color={theme.palette.primary.light}
            >
                Esplora Ptok e non perderti le novità, <div />
                iscriviti per migliorare la tua esperienza nell'app.
            </Typography>
            <Button
            variant="outlined"
            style={{fontSize: "20px", width: "300px", borderRadius: "30px", fontWeight: "bold", marginTop: "20px"}}
            >
                Discover
            </Button>
        </div>
    )
}

export default DiscoverAuth;