import { ButtonBase, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import "./styles.css"
import { useTheme } from "@mui/system";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";

function Foother(){

    const theme = useTheme();
    const colorLight = theme.palette.primary.light;
    const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));

    //Link nella bottomBar da settare
    const links = [
        {key: "1", name: "Link1", path: "/"},
        {key: "2", name: "Link2", path: "/"},
        {key: "3", name: "Link3", path: "/"},
        {key: "4", name: "Link4", path: "/"},
        {key: "5", name: "Link5", path: "/"},
        {key: "6", name: "Link6", path: "/"},
        {key: "7", name: "Link7", path: "/"},
        {key: "8", name: "Link8", path: "/"}
    ];

    //Link dei social da settare
    const socials = [
        {key: "facebook", path: "/", icon: (<Facebook style={{color: colorLight, fontSize: "35px"}}/>)},
        {key: "twitter", path: "/", icon: (<Twitter style={{color: colorLight, fontSize: "35px"}}/>)},
        {key: "instagram", path: "/", icon: (<Instagram style={{color: colorLight, fontSize: "35px"}}/>)}
    ]

    return(
        <div className="foother-component" 
        style={{
            backgroundColor: theme.palette.primary.main,
            borderTop: `1px solid ${theme.palette.primary.dark}`
        }}
        >
            <div className="foother-top-container"
            style={{flexDirection: downIpad && "column"}}
             >
                <div className="foother-left-container"
                style={{marginBottom: downIpad && "20px"}}>
                    <Grid container rowSpacing={1} columnSpacing={1}>
                        {links.map((link) => (
                            <Grid key={link.key} item xs={3}>
                            <ButtonBase
                            onClick={() => window.location.href = link.path}
                            >
                                <Typography
                                color={colorLight}
                                fontWeight="bold"
                                >
                                    {link.name}
                                </Typography>
                            </ButtonBase>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div className="foother-right-container">
                    <Grid container rowSpacing={1} columnSpacing={6} >
                        <Grid item xs={12} marginBottom="-8px">
                            <Typography
                            variant="button"
                            fontSize="15px"
                            color={colorLight}
                            >
                                social:
                            </Typography>
                        </Grid>
                        {socials.map((social) => (
                            <Grid key={social.key} item xs={1}>
                            <IconButton
                            onClick={() => window.open(social.path, "_blank")}
                            >
                                {social.icon}
                            </IconButton>
                        </Grid>
                        ))}
                    </Grid>
                </div>
            </div>
            <div className="foother-bottom-container">
                <Typography
                variant="subtitle1"
                color="#c9a0dc"
                >
                    2023 © ptok.com. All rights reserved.
                </Typography>
            </div>
        </div>
    )
}

export default Foother;