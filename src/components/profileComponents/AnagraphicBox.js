import { Typography, useTheme } from "@mui/material";

function AnagraphicBox({username, nickname}){

    const theme = useTheme();

    return(
        <div className="anagraphic-container">
            <Typography
                fontWeight="bold" 
                fontSize="25px" 
                color={theme.palette.primary.dark}>
                    {username}
            </Typography>
            <Typography 
                fontWeight="bold" 
                fontSize="17px"
                marginTop="-3px"
                color={theme.palette.primary.light}>
                        @{nickname}
            </Typography>
        </div>
    )
}

export default AnagraphicBox;