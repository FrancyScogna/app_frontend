import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { navigateFun } from "../../libs/utilFunctions";
import { useNavigate } from "react-router-dom";
import { customStyles } from "./styles/DiscoverAuth";

function DiscoverAuth(){
    const theme = useTheme();
    const styles = customStyles(theme);
    const navigate = useNavigate();

    return(
        <div style={styles.discoverauth_main_div}>
            <Typography
            variant="h3"
            align="center"
            style={styles.discoverauth_title_text}
            >
                Scopri cosa ti aspetta!
            </Typography>
            <Typography
            align="center"
            style={styles.discoverauth_description_text}
            >
                Esplora Ptok e non perderti le novità,<br/>
                iscriviti per migliorare la tua esperienza nell'app.
            </Typography>
            <Button
            variant="outlined"
            onClick={() => navigateFun(navigate, "/discover", false)}
            style={styles.discoverauth_button}
            >
                Discover
            </Button>
        </div>
    )
}

export default DiscoverAuth;