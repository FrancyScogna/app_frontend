import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./styles.css";
import useTimer from "../../libs/useTimer";

function ConfirmForm(){

    const navigate = useNavigate();
    const theme = useTheme();
    const {timerSeconds, startTimer, resetTimer} = useTimer();

    //Variabili per il settaggio e il controllo dell'email.
    const [email, setEmail] = useState("");
    const [emailValid, setEmailValid] = useState(false);
    const [emailEmpty, setEmailEmpty] = useState(true);

    //Funzione per controllare il campo "Email".
    const onChangeEmail = (event) => {
        const inputEmail = event.target.value;
        setEmail(inputEmail);
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        var valid;
        var empty;

        if(inputEmail === ""){
            valid = false;
            empty = true;
        }else{
            valid = emailRegex.test(inputEmail);
            empty = false;
        }
        
        if(empty){
            setEmailEmpty(true);
            setEmailValid(false);
        }else{
            if(valid){
                setEmailEmpty(false);
                setEmailValid(true);
            }else{
                setEmailEmpty(false);
                setEmailValid(false);
            }
        }
    }

    //Variabili per il settaggio e il controllo sul codice inserito.
    const [code, setCode] = useState("");
    const [codeEmpty, setCodeEmpty] = useState(true);
    const [codeValid, setCodeValid] = useState(false);

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
        
    }

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert, del check del "ricordami".
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [alert, setAlert] = useState(false);

    //Funzione che si esegue quando clicchi sul pulsante "Esegui l'accesso".
    //AAA: Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onPressConfirm = async(e) =>{
        e.preventDefault()
        setLoading(true);
        setAlert(false);
        setMessage([]);

        const mainAlertMessages = () => {
            setMessage([])
            const messages = [
                { key: "emailInvalid", message: "Verifica che l'email inserita sia in un formato corretto.", visible: !emailValid && !codeEmpty && !emailEmpty},
                { key: "codeInvalid", message: "Verifica che il codice inserito sia in un formato valido.", visible: !codeValid && !codeEmpty && !emailEmpty},
                { key: "emailEmpty", message: "Verifica che tutti i campi siano compilati.", visible: codeEmpty || emailEmpty }            
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
                setOpenSuccess(true)
                setTimeout(() => {
                    window.location.href="/"
                },2000)
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

    return(
        <div className="login-container">
            <FormControl component="form">
                <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                            Conferma Account
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div 
                        id="text_container" 
                        style={{padding: "10px", backgroundColor: theme.palette.background.paper, borderRadius: "10px"}}>
                            <Typography 
                            variant="body1"
                            align="left">
                                Ti è stata inviata una mail con il codice per la conferma della tua mail associata all'account.
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Alert
                        severity="error"
                        style={{marginTop: "3px", display: !alert && "none"}}
                        >
                            <ul style={{marginLeft: "-24px", marginTop: "0px", marginBottom: "0px"}}>
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
                        autoComplete="email"
                        type="email"  
                        label="Email" 
                        variant="outlined" 
                        fullWidth
                        onChange={onChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        type="text"
                        label="Codice"
                        variant="outlined"
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
                                style={{cursor: "pointer", marginTop:"9px", marginRight: "5px"}}>
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
        </div>
    )
}

export default ConfirmForm;