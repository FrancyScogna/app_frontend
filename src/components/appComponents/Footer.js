import { ButtonBase, Grid, IconButton, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import { Facebook, Twitter, Instagram } from "@mui/icons-material";
import { customStyles } from "./styles/Footer";

function Footer(){

    const theme = useTheme();
    const downIpad = useMediaQuery(theme.breakpoints.down("ipad"));
    const styles = customStyles(theme, downIpad);

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
        {key: "facebook", path: "/", icon: (<Facebook style={styles.footer_right_div_socialicons}/>)},
        {key: "twitter", path: "/", icon: (<Twitter style={styles.footer_right_div_socialicons}/>)},
        {key: "instagram", path: "/", icon: (<Instagram style={styles.footer_right_div_socialicons}/>)}
    ]

    return(
        <div style={styles.footer_main_div}>
            <div style={styles.footer_top_div}>
                <div style={styles.footer_left_div}>
                    <Grid container rowSpacing={1} columnSpacing={3}>
                        {links.map((link) => (
                            <Grid key={link.key} item>
                            <ButtonBase
                            onClick={() => window.location.href = link.path}
                            >
                                <Typography
                                style={styles.footer_link_text}
                                >
                                    {link.name}
                                </Typography>
                            </ButtonBase>
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div style={styles.footer_right_div}>
                    <Grid container rowSpacing={1} columnSpacing={6} >
                        <Grid item xs={12} style={styles.footer_right_div_grid_item_title}>
                            <Typography
                            variant="button"
                            style={styles.footer_right_div_title_text}
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
            <div style={styles.footer_bottom_div}>
                <Typography
                variant="subtitle1"
                style={styles.footer_bottom_div_text}
                >
                    2023 © ptok.com. All rights reserved.
                </Typography>
            </div>
        </div>
    )
}

export default Footer;