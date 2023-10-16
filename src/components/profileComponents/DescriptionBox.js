import { Button, Collapse, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { customStyles } from "./styles/DescriptionBox";

function DescriptionBox({text}) {

    const styles = customStyles();

    const [long, setLong] = useState(false);
    const [shownText, setShownText] = useState("");

    useEffect(() => {
        if(text){
            if(text.length > 200){
                setLong(true)
                setShownText(`${text.slice(0, 200)}...`)
            }else{
                setLong(false)
                setShownText(text);
            }
        }
    },[]);

    const [hide, setHide] = useState(false);

    const onClickHideShow = () => {
        if(hide){
            setTimeout(() => {
                setShownText(`${text.slice(0, 200)}...`)
            },100);
        }else{
            setShownText(text)
        }
        setHide(!hide);
    }

    return(
        <div style={styles.descriptionbox_main_div}>
            {long ? 
            <Collapse in={hide} collapsedSize={70} orientation="vertical">
                <Typography style={styles.descriptionbox_long_text}>
                    {shownText}
                </Typography>
            </Collapse>
            :
            <Typography style={styles.descriptionbox_short_text}>
                    {shownText}
            </Typography>
            }
            <Divider>
                {long && <Button variant="text" style={styles.descriptionbox_button_hide} onClick={onClickHideShow}>
                    {hide ? "Hide Info" : "More Info"}
                </Button>}
            </Divider>
        </div>
    )
}

export default DescriptionBox;