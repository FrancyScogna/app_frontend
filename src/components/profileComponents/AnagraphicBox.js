import { Typography, useTheme } from "@mui/material";
import { customStyles } from "./styles/AnagraphicBox"; 

function AnagraphicBox({username, nickname}){

    const theme = useTheme();
    const styles = customStyles(theme);

    return(
        <div style={styles.anagraphicbox_main_div}>
            <Typography style={styles.anagraphicbox_username}>
                    {username}
            </Typography>
            <Typography style={styles.anagraphicbox_nickname}>
                        @{nickname}
            </Typography>
        </div>
    )
}

export default AnagraphicBox;