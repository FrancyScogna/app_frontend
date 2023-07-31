import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, FormControl, Grid, TextField, Typography, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./styles.css";

function ForgotPasswordCodeForm(){

    const navigate = useNavigate();
    const theme = useTheme();

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

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert, del check del "ricordami".
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState([]);
    const [alert, setAlert] = useState(false);

    //Funzione che si esegue quando clicchi sul pulsante "Esegui l'accesso".
    //AAA: Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onPressSendCode = async(e) =>{
        e.preventDefault()
        setLoading(true);
        setAlert(false);
        setMessage([]);

        const mainAlertMessages = () => {
            setMessage([])
            const messages = [
                { key: "emailInvalid", message: "Verifica che l'email inserita sia in un formato corretto.", visible: !emailValid && !emailEmpty},
                { key: "emailEmpty", message: "Verifica che tutti i campi siano compilati.", visible: emailEmpty },            
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

            /*Auth.forgotPassword(email)
            .then(() => {
                */
                localStorage.setItem("email", email);
                navigate("/forgotPassword");
                /*
            })
            .catch(error => {
                setAlert(true)
                switch (error.message) {
                    case "Username/client id combination not found.":
                        setMessage("L'email non è associata a nessun account.")
                        setLoading(false)
                        setAlert(true)
                        break;
                    case "Username cannot be empty":
                        setMessage("Il campo della mail non può essere vuoto.")
                        setAlert(true)
                        setLoading(false)
                        break;
                    case "Attempt limit exceeded, please try after some time.":
                        setMessage("Hai effettuato troppi tentativi. Riprova più tardi.")
                        setAlert(true)
                        setLoading(false)
                        break;
                    case "Cannot reset password for the user as there is no registered/verified email or phone_number":
                        setMessage("Impossibile resettare la password se l'email non è verificata.")
                        setAlert(true)
                        setLoading(false)
                        break;
                    default:
                        setAlert(false)
                        setLoading(false)
                        setMessage('')
                        break;
                }
            })*/
        }
    }

    return(
        <div className="forgot-code-container">
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
                                Inserisci l'email associata all'account per ottenere il codice di sicurezza.
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
                        <Grid item xs={12}>
                            <LoadingButton
                            type="submit"
                            variant="contained" 
                            fullWidth
                            loading={loading}
                            onClick={onPressSendCode}
                            >
                                Invia codice
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}

export default ForgotPasswordCodeForm;