export const customStyles = (theme, alert) => {
    return{
        loginform_main_div: {
            display: "flex",
            width: "350px"
        },
        loginform_grid_container: {
            display: "flex"
        },
        loginform_title: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        loginform_error_alert: {
            marginTop: "3px",
            display: !alert && "none"
        },
        loginform_error_alert_ul: {
            marginLeft: "-24px", 
            marginTop: "0px", 
            marginBottom: "0px"
        },
        loginform_forgotpassword_text: {
            cursor: "pointer", 
            marginTop:"9px", 
            marginRight: "5px", 
            marginBottom: "10px"
        }
    }
}