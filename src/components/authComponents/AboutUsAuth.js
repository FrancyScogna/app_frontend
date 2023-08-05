import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { navigateFun } from "../../libs/utilFunctions";
import { useNavigate } from "react-router-dom";

function AboutUsAuth(){
    const theme = useTheme();
    const navigate = useNavigate();

    return(
        <div className="auth-aboutus-component">
            <Typography
            variant="h3"
            align="center"
            fontWeight="bold"
            color={theme.palette.primary.dark}
            >
                Cos'è Ptok?
            </Typography>
            <Typography
            fontSize="22px"
            marginTop="22px"
            align="left"
            component="p"
            width="78%"
            color={theme.palette.primary.light}
            >
                Ptok è un avvincente social network che offre contenuti esclusivi e coinvolgenti.<br/>
                Scopri post, video e altro ancora attraverso un'esperienza di scorrimento intuitiva e interattiva.<br/>
                Connettiti con altri utenti e creator, esplora nuovi contenuti e vivi un'esperienza unica nel suo genere.<br/>
                Puoi diventare anche tu un Creator!
            </Typography>
            <Button
            onClick={() => navigateFun(navigate, "/aboutus", false)}
            variant="outlined"
            style={{fontSize: "20px", width: "300px", borderRadius: "30px", fontWeight: "bold", marginTop: "30px"}}
            >
                About us
            </Button>
        </div>
    )
}

export default AboutUsAuth;