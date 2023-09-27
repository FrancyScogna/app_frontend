import { Button, Collapse, Divider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function DescriptionBox({text}) {

    const [hide, setHide] = useState(false);

    const onClickHideShow = () => {
        setHide(!hide);
    }

    useEffect(() => {
        console.log(hide)
    })

    return(
        <div>
            <Collapse in={hide} collapsedSize="40px" orientation="vertical">
                <Typography>
                    <pre>{text}</pre>
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