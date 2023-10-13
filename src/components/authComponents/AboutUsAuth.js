import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { navigateFun } from "../../libs/utilFunctions";
import { useNavigate } from "react-router-dom";
import { customStyles } from "./styles/AboutUsAuth";

function AboutUsAuth(){
    const theme = useTheme();
    const styles = customStyles(theme);
    const navigate = useNavigate();

    return(
        <div style={styles.aboutusauth_main_div}>
            <Typography
            variant="h3"
            align="center"
            style={styles.aboutusauth_title_text}
            >
                Cos'è Ptok?
            </Typography>
            <Typography    
            align="left"
            component="p"
            style={styles.aboutusauth_description_text}
            >
                Ptok è un avvincente social network che offre contenuti esclusivi e coinvolgenti.<br/>
                Scopri post, video e altro ancora attraverso un'esperienza di scorrimento intuitiva e interattiva.<br/>
                Connettiti con altri utenti e creator, esplora nuovi contenuti e vivi un'esperienza unica nel suo genere.<br/>
                Puoi diventare anche tu un Creator!
            </Typography>
            <Button
            onClick={() => navigateFun(navigate, "/aboutus", false)}
            variant="outlined"
            style={styles.aboutusauth_button}
            >
                About us
            </Button>
        </div>
    )
}

export default AboutUsAuth;