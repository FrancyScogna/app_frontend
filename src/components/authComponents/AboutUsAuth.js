import { Button, Typography } from "@mui/material";
import { useTheme } from "@mui/system";

function AboutUsAuth(){
    const theme = useTheme();

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
                Ptok è un avvincente social network che offre contenuti esclusivi e coinvolgenti. <div/>
                Scopri post, video e altro ancora attraverso un'esperienza di scorrimento intuitiva e interattiva. <div />
                Connettiti con altri utenti e creator, esplora nuovi contenuti e vivi un'esperienza unica nel suo genere. <div/>
                Puoi diventare anche tu un Creator!
            </Typography>
            <Button
            variant="outlined"
            style={{fontSize: "20px", width: "300px", borderRadius: "30px", fontWeight: "bold", marginTop: "30px"}}
            >
                About us
            </Button>
        </div>
    )
}

export default AboutUsAuth;