import { Favorite, Image, SmartDisplay, Videocam } from "@mui/icons-material";
import { Grid, Typography, useTheme } from "@mui/material";
import { formatCount } from "../../libs/utilFunctions";
import { customStyles } from "./styles/CountersBox";

function CountersBox({counters}){

    const theme = useTheme();
    const styles = customStyles(theme);

    const gridsItems = [
        {key: "1", icon: <Favorite style={styles.counterbox_grid_item_icon} />, count: counters.vidsCount, text: "likes"},
        {key: "2", icon: <Videocam style={styles.counterbox_grid_item_icon} />, count: counters.vidsCount, text: "videos"},
        {key: "3", icon: <Image style={styles.counterbox_grid_item_icon} />, count: counters.picsCount, text: "photos"},
        {key: "4", icon: <SmartDisplay style={styles.counterbox_grid_item_icon} />, count: counters.clipsCount, text: "clips"}
    ]

    return(
        <div style={styles.counterbox_main_div}>
            <Grid container columnSpacing={1}>
                {gridsItems.map((item) => (
                    <Grid key={item.key} item style={styles.counterbox_grid_item}>
                        {item.icon}
                        <Typography style={styles.counterbox_grid_item_text}>
                            {formatCount(item.count)} {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default CountersBox;