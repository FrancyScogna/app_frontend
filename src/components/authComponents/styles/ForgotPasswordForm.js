export const customStyles = (theme, alert) => {
    return{
        forgotpassword_main_div: {
            width: "350px",
            display: "flex"
        },
        forgotpassword_grid_container: {
            display: "flex"
        },
        forgotpassword_title: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        forgotpassword_description_div: {
            padding: "10px", 
            backgroundColor: theme.palette.background.paper, 
            borderRadius: "10px"
        },
        forgotpassword_error_alert: {
            marginTop: "3px", 
            display: !alert && "none"
        },
        forgotpassword_error_alert_ul: {
            marginLeft: "-24px", 
            marginTop: "0px", 
            marginBottom: "0px"
        }
    }
}