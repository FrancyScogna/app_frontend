import { Button, Collapse, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function DescriptionBox({text}) {

    const [hide, setHide] = useState(false);

    const onClickHideShow = () => {
        setHide(!hide);
    }

    return(
        <div className="description-box-container">
            <Collapse in={hide} collapsedSize="37px" orientation="vertical">
                <Typography style={{whiteSpace: "pre-wrap"}}>
                    {text}
                </Typography>
                <p/>
            </Collapse>
            <Divider>
                <Button variant="text" style={{fontSize: "10px"}} onClick={onClickHideShow}>
                    {hide ? "Hide Info" : "More Info"}
                </Button>
            </Divider>
        </div>
    )
}

export default DescriptionBox;