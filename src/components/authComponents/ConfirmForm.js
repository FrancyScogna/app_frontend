import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, FormControl, Grid, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { customStyles } from "./styles/ConfirmForm";

function ConfirmForm(){

    const navigate = useNavigate();
    const theme = useTheme();
    const email = localStorage.getItem("email");

    useEffect(() => {
        if(!email){
            navigate("/");
        }
    },[email, navigate])

    //Variabili per il settaggio e il controllo sul codice inserito.
    const [code, setCode] = useState("");
    const [codeEmpty, setCodeEmpty] = useState(true);
    const [codeValid, setCodeValid] = useState(false);
    const [resendCodeAlert, setResendCodeAlert] = useState(false);

    //Funzione per il controllo della validità e il settaggio del codice.
    const onChangeCode = (event) => {
        const inputCode = event.target.value;
        setCode(inputCode);
        const containsOnlyNumbers = /^\d+$/.test(inputCode);
        if(inputCode === ""){
            setCodeEmpty(true);
        }else{
            setCodeEmpty(false);
            if(containsOnlyNumbers){
                setCodeValid(true);
            }else{
                setCodeValid(false);
            }
        }
    }

    //Funzione che si esegue quando clicchi sul testo "Non hai ricevuto il codice? Rinvia codice".
    const onClickResendCode = () => {
        /*await Auth.resendSignUp(email)
        .then((data) => {
            */
            setResendCodeAlert(true);
            setTimeout(() => {
                setResendCodeAlert(false);
            }, 4000)
            /*
        })
        .catch((error) => {
            console.log(error.message)
            switch (error.message) {
                case "Username cannot be empty":
                    setLoading(false)
                    setAlert(true)
                    setMessage("Il campo della mail non può essere vuoto.")
                    break;
                case "User is already confirmed.":
                    setAlert(true)
                    setLoading(false)
                    setMessage("L'utente è già stato confermato.")
                    setTimeout(function(){window.location.href="/"}, 6000)
                    break;
                case "Username/client id combination not found.":
                    setAlert(true)
                    setMessage("L'email non è associata a nessun account.")
                    setLoading(false)
                    break;
                case "Attempt limit exceeded, please try after some time.":
                    setAlert(true)
                    setMessage("Hai effettuato troppi tentativi. Riprova più tardi.")
                    setLoading(false)
                    break;
                default:
                    setAlert(true)
                    setMessage("")
                    setLoading(false)
                    break;
            }
        })*/
    }

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert.
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [alert, setAlert] = useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);

    //Funzione che si esegue quando clicchi sul pulsante "Conferma".
    //AAA: Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onPressConfirm = async(e) =>{
        e.preventDefault()
        setLoading(true);
        setAlert(false);
        setMessage([]);

        const mainAlertMessages = () => {
            setMessage([])
            const messages = [
                { key: "codeInvalid", message: "Verifica che il codice inserito sia in un formato valido.", visible: !codeValid && !codeEmpty},
                { key: "emailEmpty", message: "Verifica che tutti i campi siano compilati.", visible: codeEmpty }            
            ]
            return messages;
        };

        const messages = mainAlertMessages();
        const allConditionsSatisfied = messages.every((message) => !message.visible);

        if(!allConditionsSatisfied){
            setAlert(true);
            setMessage(messages);
            setLoading(false);
        }else{
            setAlert(false);
            setMessage([]);
            /*
            await Auth.confirmSignUp(email, code)
            .then(() =>{
                */
                setConfirmAlert(true);
                setResendCodeAlert(false);
                setTimeout(() => {
                    localStorage.removeItem("email");
                    window.location.href="/"
                }, 2500)
                /*
            })
            .catch((error) => {
                switch (error.message) {
                    case "Confirmation code cannot be empty":
                        setAlert(true)
                        setLoading(false)
                        setMessage("Il campo del codice non può essere vuoto.")
                        break;
                    case "Username cannot be empty":
                        setLoading(false)
                        setAlert(true)
                        setMessage("Il campo della mail non può essere vuoto.")
                        break;
                    case "Invalid verification code provided, please try again.":
                        setLoading(false)
                        setAlert(true)
                        setMessage("Il codice inserito non è valido, per favore ripeti.")
                        break;
                    case "User cannot be confirmed. Current status is CONFIRMED":
                        setLoading(false)
                        setAlert(true)
                        setMessage("L'utente è già stato confermato.")
                        setTimeout(function(){window.location.href="/"}, 6000)
                        break;
                    case "Username/client id combination not found.":
                        setLoading(false)
                        setAlert(true)
                        setMessage("L'email non è associata a nessun account.")
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        setLoading(false)
                        setAlert(true)
                        setMessage("Hai tentato troppe volte, per favore ripeti più avanti.")
                        break;
                    default:
                        switch (error.name) {
                            case "Il formato del codice non è valido, verifica che non ci siano spazi.":
                                setLoading(false)
                                setAlert(true)
                                setMessage()
                                break;
                            default:
                                setLoading(false)
                                setAlert(true)
                                setMessage("")
                                break;
                        }
                        break;
                }
            })*/
        }
    }

    const styles = customStyles(theme, alert);

    return(
        <div style={styles.confirmform_main_div}>
            <FormControl component="form">
                <Grid container rowSpacing={2} columnSpacing={1} style={styles.confirmform_grid_container}>
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" style={styles.confirmform_title}>
                            Conferma Account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div 
                        id="text_container" 
                        style={styles.confirmform_description_div}>
                            <Typography 
                            variant="body1"
                            align="left">
                                Ti è stato inviato un codice di verifica all'indirizzo:{" "}
                                <Typography fontWeight="bold" component="span">{email}</Typography>
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Alert
                        severity="error"
                        style={styles.confirmform_error_alert}
                        >
                            <ul style={styles.confirmform_error_alert_ul}>
                            {message.map((message) => (
                                message.visible && (
                                <Typography key={message.key} fontSize="13px">
                                <li>{message.message}</li>
                                </Typography>
                                )
                            ))}
                            </ul>
                        </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        type="text"
                        label="Codice"
                        variant="outlined"
                        value={code === ""? "" : code}
                        fullWidth
                        onChange={onChangeCode}
                        />
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={12}>
                                <Typography 
                                align="left"
                                variant="subtitle1" 
                                fontSize="15px"
                                tabIndex={0}
                                onClick={onClickResendCode}
                                style={styles.confirmform_resendcode_text}>
                                    Non hai ricevuto il codice? Rinvia codice.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <LoadingButton
                            type="submit"
                            variant="contained" 
                            fullWidth
                            loading={loading}
                            onClick={onPressConfirm}
                            >
                                Conferma
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
            <Snackbar
            open={confirmAlert} 
            autoHideDuration={2500} 
            anchorOrigin={{vertical: "bottom", horizontal: "right"}} 
            >
                <Alert severity="success">
                    Account confermato con successo!
                </Alert>
            </Snackbar>
            <Snackbar
            open={resendCodeAlert} 
            autoHideDuration={4000} 
            anchorOrigin={{vertical: "bottom", horizontal: "right"}} 
            >
                <Alert severity="success">
                    Il codice è stato inviato all'indirizzo:{" "}
                    <Typography fontWeight="bold" fontSize="14px" component="span">{email}</Typography>
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ConfirmForm;