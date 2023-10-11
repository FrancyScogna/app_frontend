import { Button, Collapse, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { customStyles } from "./styles/DescriptionBox";

function DescriptionBox({text}) {

    const styles = customStyles();

    const [hide, setHide] = useState(false);

    const onClickHideShow = () => {
        setHide(!hide);
    }

    return(
        <div style={styles.descriptionbox_main_div}>
            <Collapse in={hide} collapsedSize="37px" orientation="vertical">
                <Typography style={styles.descriptionbox_text}>
                    {text}
                </Typography>
                <p/>
            </Collapse>
            <Divider>
                <Button variant="text" style={styles.descriptionbox_button_hide} onClick={onClickHideShow}>
                    {hide ? "Hide Info" : "More Info"}
                </Button>
            </Divider>
        </div>
    )
}

export default DescriptionBox;