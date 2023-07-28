import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Checkbox, Divider, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import "./styles.css";

function LoginForm(){

    const navigate = useNavigate();

    //Variabili per il settaggio del caricamento del loading button, del testo del messaggio dell'alert,
    //dell'attivazione dell'alert, del check del "ricordami".
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [alert, setAlert] = useState(false);
    const [remembermeChecked, setRemembermeChecked] = useState(false);

    //Funzione che si esegue quando clicchi sul pulsante "Esegui l'accesso".
    //AAA: Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onPressSignIn = async(e) =>{
        /*e.preventDefault()
        setLoading(true)
        setAlert(false)
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
                    navigate("/sendcodeverify")
                    setLoading(false)
                    break;
                default:
                    setAlert(false)
                    setMessage('')
                    setLoading(false)
                    break;
            }
        })*/
    }

    //Funzione che si esegue quando clicchi il pulsante "Crea un account".
    const onPressSignUp = () => {
        navigate("/signup")
    }

    //Funzione che si esegue quando il checkbox "Ricordami" cambia e setta la variabile.
    const onChangeRememberme = (checked) => {
        setAlert(false)
        if(checked){
            setRemembermeChecked(true)
        }else{
            setRemembermeChecked(false)
        }
    }

    //Funzione che si esegue quando clicchi sul testo "Hai dimenticato la password?".
    const onClickForgotPassword = () => {
        navigate("/forgotpassword")
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
                        style={{display: !alert && "none"}}
                        >
                            <Typography 
                            variant="body2">
                                {message}
                            </Typography>
                        </Alert>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        autoComplete="email"
                        type="email"  
                        label="Email" 
                        variant="outlined" 
                        fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="current-password"
                        type="password"
                        label="Password"
                        variant="outlined"
                        fullWidth
                        />
                        <Grid container rowSpacing={1} columnSpacing={1}>
                            <Grid item xs={4}>
                                <FormControlLabel 
                                control={
                                <Checkbox 
                                style={{transform: "scale(0.8)"}}
                                onChange={(e) => onChangeRememberme(e.target.checked)}
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