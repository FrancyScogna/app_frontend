export const customStyles = (theme, downDesktop) => {
    return{
        bottombar_container: {
            position: "fixed",
            bottom: 0,
            width: "100%",
            display: !downDesktop && "none"
        }
    }
}