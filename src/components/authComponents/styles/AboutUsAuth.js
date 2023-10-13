export const customStyles = (theme) => {
    return{
        aboutusauth_main_div: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
        },
        aboutusauth_title_text: {
            fontWeight: "bold",
            color: theme.palette.primary.dark
        },
        aboutusauth_description_text: {
            fontSize: "22px",
            marginTop: "22px",
            width: "78%",
            color: theme.palette.primary.light
        },
        aboutusauth_button: {
            fontSize: "20px",
            width: "300px",
            borderRadius: "30px",
            fontWeight: "bold",
            marginTop: "30px"
        }
    }
}