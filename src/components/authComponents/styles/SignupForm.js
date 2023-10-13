export const customStyles = (theme, alert) => {
    return{
        signupform_main_div: {
            display: "flex",
            width: "350px"
        },
        signupform_grid_container: {
            display: "flex"
        },
        signupform_title: {
            color: theme.palette.primary.main,
            fontWeight: "bold"
        },
        signupform_error_alert: {
            marginTop: "3px",
            display: !alert && "none"
        },
        signupform_error_alert_ul: {
            marginLeft: "-24px", 
            marginTop: "0px", 
            marginBottom: "0px"
        },
        signupform_checkbox: {
            marginLeft: "-5px",
            fontSize: "15px"
        },
        signupform_accountyet_text: {
            fontSize: "15px",
            cursor: "pointer", 
            marginTop:"9px", 
            marginRight: "5px", 
            marginBottom: "10px"
        }
    }
}