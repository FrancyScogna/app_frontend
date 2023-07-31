import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, FormControl, Grid, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./styles.css";

function ForgotPasswordForm(){

    const navigate = useNavigate();
    const theme = useTheme();
    const email = localStorage.getItem("email")

    useEffect(() => {
        if(!email){
            navigate("/");
        }
    },[email, navigate])

    //Variabili per il settaggio e il controllo della password.
    const [password, setPassword] = useState("");
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(true);
    const [passwordAlertMessage, setPasswordAlertMessage] = useState([]);

    //Funzione per controllare il campo "Password".
    const onChangePassword = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);

        const validatePassword = () => {
            setPasswordAlertMessage([])
            const atLeastOneLowercaseLetter = /(?=.*[a-z])/;
            const atLeastOneUppercaseLetter = /(?=.*[A-Z])/;
            const atLeastOneDigit = /(?=.*\d)/;
            const atLeastOneSpecialChar = /(?=.*[$*{}()?!@#.%&><':;|_=+\-,])/;
            const validLength = /^.{8,20}$/;
            const spaces = /(?=\s)/;
            const messages = [
                { key: "lowercaseLetter", message: "La password deve contenere almeno una lettera minuscola.", visible: !atLeastOneLowercaseLetter.test(inputPassword) },
                { key: "uppercaseLetter", message: "La password deve contenere almeno una lettera maiuscola.", visible: !atLeastOneUppercaseLetter.test(inputPassword) },
                { key: "digit", message: "La password deve contenere almeno un numero.", visible: !atLeastOneDigit.test(inputPassword) },
                { key: "specialChar", message: "La password deve contenere almeno un carattere speciale tra $*{}()?!@#.%&><':;|_=+-,.", visible: !atLeastOneSpecialChar.test(inputPassword) },
                { key: "validLength", message: "La password deve avere una lunghezza minima di 8 caratteri e massima di 20 caratteri.", visible: !validLength.test(inputPassword) },
                { key: "spaces", message: "La password non deve contenere spazi.", visible: spaces.test(inputPassword)}
            ];
            return messages;
        };

        const messages = validatePassword();
        setPasswordAlertMessage(messages);

        if (inputPassword === "") {
            setShowPasswordAlert(false);
            setPasswordEmpty(true);
        }else {
            const allConditionsSatisfied = messages.every((message) => !message.visible);
            setShowPasswordAlert(!allConditionsSatisfied);
            setPasswordEmpty(false);
        }
        setRepeatPassword("");
        setShowRepeatPasswordAlert(false);
        setRepeatPasswordEmpty(true);
    }

    //Variavili per il settaggio e il controllo del ripeti password.
    const [showRepeatPasswordAlert, setShowRepeatPasswordAlert] = useState(false);
    const [repeatPasswordEmpty, setRepeatPasswordEmpty] = useState(true);
    const [repeatPassword, setRepeatPassword] = useState("");

    //Funzione di controllo per il ripeti password.
    const onChangeRepeatPassword = (event) => {
        const inputRepeatPassword = event.target.value;
        setRepeatPassword(inputRepeatPassword);

        if(inputRepeatPassword === ""){
            setRepeatPasswordEmpty(true);
            setShowRepeatPasswordAlert(false);
        }else{
            if(inputRepeatPassword === password){
                setRepeatPasswordEmpty(false);
                setShowRepeatPasswordAlert(false);
            }else{
                setRepeatPasswordEmpty(false);
                setShowRepeatPasswordAlert(true);
            }
        }
    }

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

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert, del check del "ricordami".
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [alert, setAlert] = useState(false);
    const [confirmAlert, setConfirmAlert] = useState(false);

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
                { key: "emptyFormError", message: "Verifica che i campi non siano vuoti.", visible: passwordEmpty || repeatPasswordEmpty || codeEmpty},
                { key: "codeInvalid", message: "Verifica che il codice inserito sia in un formato valido.", visible: !codeValid && !codeEmpty},
                { key: "invalidError", message: "Verifica che tutti i campi siano stati compilati correttamente.", visible: showPasswordAlert || showRepeatPasswordAlert }
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
            Auth.forgotPasswordSubmit(email, code, password)
            .then((data) => {
                */
                setConfirmAlert(true);
                setTimeout(() => {
                    localStorage.removeItem("email");
                    window.location.href="/"
                }, 2500)
                /*
            })
            .catch(error => {
                switch (error.message) {
                    case "Confirmation code cannot be empty":
                        setAlert(true)
                        setMessage("Il campo del codice non può essere vuoto.")
                        setLoading(false)
                        break;
                    case "Username cannot be empty":
                        setAlert(true)
                        setMessage("Il campo dell'email non può essere vuoto.")
                        setLoading(false)
                        break;
                    case "Password cannot be empty":
                        setAlert(true)
                        setMessage("Il campo della password non può essere vuoto.")
                        setLoading(false)
                        break;
                    case "Username/client id combination not found.":
                        setAlert(true)
                        setMessage("L'email non corrisponde a nessun account registrato.")
                        setLoading(false)
                        break;
                    case "Invalid code provided, please request a code again.":
                        setAlert(true)
                        setMessage("Il codice inserito non è valido.")
                        setLoading(false)
                        break;
                    case "Invalid verification code provided, please try again.":
                        setAlert(true)
                        setMessage("Il codice inserito non è valido.")
                        setLoading(false)
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        setAlert(true)
                        setMessage("Hai effettuato troppi tentativi, riprova più tardi.")
                        setLoading(false)
                        break;
                    default:
                        setAlert(false)
                        setMessage("")
                        setLoading(false)
                        break;
                }
            });
            */
        }
    }

    return(
        <div className="forgot-password-container">
            <FormControl component="form">
                <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                            Recupera Password
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div 
                        id="text_container" 
                        style={{padding: "10px", backgroundColor: theme.palette.background.paper, borderRadius: "10px"}}>
                            <Typography 
                            variant="body1"
                            align="left">
                                Inserisci una nuova password e il codice ottenuto all'indirizzo:{" "}
                                <Typography fontWeight="bold" component="span">{email}</Typography>
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
                        autoComplete="new-password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        onChange={onChangePassword}
                        />
                        <Alert
                        severity="error"
                        style={{marginTop: "3px", display: !showPasswordAlert && "none"}}
                        >
                            <Typography fontSize="15px">Errore sul formato della password:</Typography>
                            <ul style={{marginLeft: "-24px", marginTop: "0px", marginBottom: "0px"}}>
                            {passwordAlertMessage.map((message) => (
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
                        autoComplete="new-password"
                        type="password"
                        label="Ripeti la password"
                        variant="outlined"
                        value={repeatPassword}
                        fullWidth
                        onChange={onChangeRepeatPassword}
                        />
                        <Alert
                        severity="error"
                        style={{marginTop: "3px", display: !showRepeatPasswordAlert && "none"}}
                        onChange={onChangeRepeatPassword}
                        >
                            <Typography fontSize="15px">Le password non coincidono.</Typography>
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
                    Password cambiata con successo!
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ForgotPasswordForm;