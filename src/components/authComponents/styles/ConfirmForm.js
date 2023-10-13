export const customStyles = (theme, alert) => {
    return{
        confirmform_main_div: {
            width: "350px",
            display: "flex"
        },
        confirmform_grid_container: {
            display: "flex"
        },
        confirmform_title: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        confirmform_description_div: {
            padding: "10px",
            backgroundColor: theme.palette.background.paper, 
            borderRadius: "10px"
        },
        confirmform_error_alert: {
            marginTop: "3px",
            display: !alert && "none"
        },
        confirmform_error_alert_ul: {
            marginLeft: "-24px",
            marginTop: "0px",
            marginBottom: "0px"
        },
        confirmform_resendcode_text: {
            cursor: "pointer",
            marginTop:"9px",
            marginRight: "5px"
        }
    }
}