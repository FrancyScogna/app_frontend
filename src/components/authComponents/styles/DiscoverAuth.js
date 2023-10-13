export const customStyles = (theme, alert) => {
    return{
        discoverauth_main_div: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            width: "80%"
        },
        discoverauth_title_text: {
            fontWeight: "bold",
            color: theme.palette.primary.dark
        },
        discoverauth_description_text: {
            marginTop: "20px",
            fontSize: "25px",
            fontWeight: "bold",
            color: theme.palette.primary.light
        },
        discoverauth_button: {
            fontSize: "20px", 
            width: "300px", 
            borderRadius: "30px", 
            fontWeight: "bold", 
            marginTop: "20px"
        }
    }
}