export const customStyles = (theme, alert) => {
    return{
        forgotpasswordcode_main_div: {
            width: "350px",
            display: "flex"
        },
        forgotpasswordcode_grid_container: {
            display: "flex"
        },
        forgotpasswordcode_title: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        forgotpasswordcode_description_div: {
            padding: "10px",
            backgroundColor: theme.palette.background.paper,
            borderRadius: "10px"
        },
        forgotpasswordcode_error_alert: {
            marginTop: "3px", 
            display: !alert && "none"
        },
        forgotpasswordcode_error_alert_ul: {
            marginLeft: "-24px", 
            marginTop: "0px", 
            marginBottom: "0px"
        }
    }
}