import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./styles.css";
import { useTheme } from "@mui/system";

function LoginForm(){

    const navigate = useNavigate();

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

    const [password, setPassword] = useState("");
    const [passwordEmpty, setPasswordEmpty] = useState(true);
    const [passwordValid, setPasswordValid] = useState(false);

    const onChangePassword = (event) => {
        const inputPassword = event.target.value;
        setPassword(inputPassword);

        const spaces = /(?=\s)/;
        const valid = spaces.test(inputPassword);

        if(inputPassword === ""){
            setPasswordEmpty(true);
        }else{
            setPasswordEmpty(false);
            if(valid){
                setPasswordValid(true)
            }else{
                setPasswordValid(false)
            }
        }
    }

    //Variabile per il settaggio del checkbox "Ricordami".
    const [remembermeChecked, setRemembermeChecked] = useState(false);

    //Funzione che si esegue quando il checkbox "Ricordami" cambia e setta la variabile.
    const onChangeRememberme = (event) => {
        setAlert(false)
        const checked = event.target.checked;
        if(checked){
            setRemembermeChecked(true)
        }else{
            setRemembermeChecked(false)
        }
    }

    //Funzione che si esegue quando clicchi sul testo "Hai dimenticato la password?".
    const onClickForgotPassword = () => {
        navigate("/forgotPasswordCode")
    }

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert, del check del "ricordami".
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [alert, setAlert] = useState(false);

    //Funzione che si esegue quando clicchi sul pulsante "Esegui l'accesso".
    //AAA: Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onPressSignIn = async(e) =>{
        e.preventDefault()
        setLoading(true);
        setAlert(false);
        setMessage([]);

        const mainAlertMessages = () => {
            setMessage([])
            const messages = [
                { key: "emailInvalid", message: "Verifica che l'email inserita sia in un formato corretto.", visible: !emailValid && !passwordEmpty && !emailEmpty},
                { key: "emailEmpty", message: "Verifica che tutti i campi siano compilati.", visible: passwordEmpty || emailEmpty },    
                { key: "passwordInvalid", message: "La password inserita non è corretta.", visible: passwordValid && !passwordEmpty && !emailEmpty}
            ];
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
            await Auth.signIn(email, password)
            .then((data) => {
                if(remembermeChecked){
                    rememberDevice()
                }else{
                    window.location.reload(false)
                }
            })
            .catch(error => {
                switch (error.message) {
                    case "Incorrect username or password.":
                        setAlert(true)
                        setMessage("L'username o la password non sono corretti.")
                        setLoading(false)
                        break;
                    case "Custom auth lambda trigger is not configured for the user pool.":
                        setAlert(true)
                        setMessage("Verifica che tutti i campi siano stati compilati.")
                        setLoading(false)
                        break;
                    case "Username cannot be empty":
                        setAlert(true)
                        setMessage("Verifica che tutti i campi siano stati compilati.")
                        setLoading(false)
                        break;
                    case "User does not exist.":
                        setAlert(true)
                        setMessage("L'utente non esiste.")
                        setLoading(false)
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        setAlert(true)
                        setMessage("Hai effettuato troppi tentativi, riprova in seguito.")
                        setLoading(false)
                        break;
                    case "User is not confirmed.":
                        */ 
                        sendConfirmCode();
                        /*
                        setLoading(false)
                        break;
                    default:
                        setAlert(false)
                        setMessage('')
                        setLoading(false)
                        break;
                }*/
            }
    }

    //Funzione evocata quando si accede con un account che non è stato ancora confermato
    //Rinvia il codice di conferma e passa alla pagina di Conferma Account
    const sendConfirmCode = () => {
        /*await Auth.resendSignUp(email)
        .then((data) => {
            */
            localStorage.setItem("email", email);
            navigate("/confirmAccount")
            /*
        })
        */
    }

    //Funzione che si esegue quando clicchi il pulsante "Crea un account".
    const onPressSignUp = () => {
        navigate("/signup")
    }

    return(
        <div className="login-container">
            <FormControl component="form">
                <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                            Accedi
                        </Typography>
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
                        autoComplete="current-password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        onChange={onChangePassword}
                        />
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={4}>
                                <FormControlLabel 
                                control={
                                <Checkbox 
                                onChange={onChangeRememberme}
                                />
                                } 
                                label={
                                    <Typography 
                                    marginLeft="-5px"
                                    fontSize="15px">
                                        Ricordami
                                    </Typography>
                                }/>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography 
                                align="right"
                                variant="subtitle1" 
                                fontSize="15px"
                                onClick={onClickForgotPassword}
                                tabIndex={0}
                                style={{cursor: "pointer", marginTop:"9px", marginRight: "5px", marginBottom: "10px"}}>
                                    Hai dimenticato la password?
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container rowSpacing={1}>
                            <Grid item xs={12}>
                                <LoadingButton
                                type="submit"
                                variant="contained" 
                                fullWidth
                                loading={loading}
                                onClick={onPressSignIn}
                                >
                                    Effettua l'accesso
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider>
                                    <Typography 
                                    id="text_divider" 
                                    variant="button"
                                    fontSize="12px"
                                    >
                                        Oppure
                                    </Typography>
                                </Divider>
                            </Grid>
                            <Grid item xs={12}>
                                <Button 
                                id="signup_button" 
                                variant="contained" 
                                fullWidth
                                onClick={onPressSignUp}
                                >
                                    Crea un account
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}

export default LoginForm;