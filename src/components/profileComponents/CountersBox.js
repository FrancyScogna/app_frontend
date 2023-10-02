import { Favorite, Image, SmartDisplay, Videocam } from "@mui/icons-material";
import { Grid, Typography, useTheme } from "@mui/material";
import { formatCount, lightenHexColor } from "../../libs/utilFunctions";

function CountersBox({counters}){

    const theme = useTheme();

    const iconStyle = {
        marginRight: "3px",
        color: theme.palette.primary.dark
    }

    const gridsItems = [
        {key: "1", icon: <Favorite style={iconStyle} />, count: counters.vidsCount, text: "likes"},
        {key: "2", icon: <Videocam style={iconStyle} />, count: counters.vidsCount, text: "videos"},
        {key: "3", icon: <Image style={iconStyle} />, count: counters.picsCount, text: "photos"},
        {key: "4", icon: <SmartDisplay style={iconStyle} />, count: counters.clipsCount, text: "clips"}
    ]

    return(
        <div className="profile-media-count">
            <Grid container columnSpacing={1}>
                {gridsItems.map((item) => (
                    <Grid key={item.key} item className="profile-media-grid-item">
                        {item.icon}
                        <Typography color={lightenHexColor(theme.palette.primary.dark, 50)} fontSize="15px" paddingTop="3px" fontWeight="bold">
                            {formatCount(item.count)} {item.text}
                        </Typography>
                    </Grid>
                ))}
            </Grid>
        </div>
    )
}

export default CountersBox;