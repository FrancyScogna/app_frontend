import { Alert, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import "./styles.css";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignupForm(){

    const navigate = useNavigate();

    //Variabili per il settaggio e il controllo del nickname.
    const [nickname, setNickname] = useState('');
    const [showNicknameAlert, setShowNicknameAlert] = useState(false);
    const [nicknameEmpty, setNicknameEmpty] = useState(true);

    //Funzione per controllare il campo "Nome utente".
    const onChangeNickname = (event) => {
        const inputNickname = event.target.value;
        const regex = /^[a-zA-Z0-9_.]+$/;
        setNickname(inputNickname);
        var valid = false;
        var empty = true;
        if(inputNickname === ""){
            valid = false;
            empty = true;
        }else{
            valid = regex.test(inputNickname) && inputNickname.length >= 5 && inputNickname.length <= 30;
            empty = false;
        }
        
        if(empty){
            setShowNicknameAlert(false);
            setNicknameEmpty(true);
        }else{
            if(valid){
                setShowNicknameAlert(false);
                setNicknameEmpty(false);
            }else{
                setShowNicknameAlert(true);
                setNicknameEmpty(false);
            }
        }
    };

    //Variabili per il settaggio e il controllo dell'email.
    const [email, setEmail] = useState("");
    const [showEmailAlert, setShowEmailAlert] = useState(false);
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
            setShowEmailAlert(false);
        }else{
            if(valid){
                setEmailEmpty(false);
                setShowEmailAlert(false);
            }else{
                setEmailEmpty(false);
                setShowEmailAlert(true);
            }
        }

    }

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

    //Variabile per il settaggio del checkbox "Accetta i nostri termini e condizioni".
    const [termsAndConditions, setTermsAndConditions] = useState(false);

    //Funzione per il settaggio del checkbox "T&C".
    const onChangeTermsAndConditions = (event) => {
        const checked = event.target.checked;
        if(checked){
            setTermsAndConditions(true);
        }else{
            setTermsAndConditions(false);
        }
    }

    //Variabile per il settaggio del checkbox "Ho più di 18 anni".
    const [adult, setAdult] = useState(false);

    //Funzione per il settaggio del checkbox "Ho più di 18 anni".
    const onChangeAdult = (event) => {
        const checked = event.target.checked;
        if(checked){
            setAdult(true);
        }else{
            setAdult(false);
        }
    }

    //Quando clicchi sulla scritta "Hai già un account? Accedi".
    const onClickLogin = () => {
        navigate("/");
    }

    //Variabili per il bottone "Effettua registrazione" e per l'alert di eventuali errori
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState([]);
    const [loading, setLoading] = useState(false);

    //Funzione che si attiva al click di "Effettua Registrazione" e verifica se è stato compilato il form correttamente
    // AAA. Quando aggiungeremo il backend bisogna configurare attentamente questa funzione.
    const onClickSignupLoadingButton = async(e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(false);
        setMessage([]);

        const mainAlertMessages = () => {
            setMessage([])
            const messages = [
                { key: "invalidError", message: "Verifica che tutti i campi siano stati compilati correttamente.", visible: showNicknameAlert || showEmailAlert || showPasswordAlert || showRepeatPasswordAlert },
                { key: "emptyFormError", message: "Verifica che i campi non siano vuoti.", visible: nicknameEmpty || emailEmpty || passwordEmpty || repeatPasswordEmpty },
                { key: "adultError", message: "Devi confermare di avere almeno 18 anni.", visible: !adult },
                { key: "termsAndConditionsError", message: "Devi accettare i nostri termini e condizioni.", visible: !termsAndConditions }             
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
            //Si procede con la registrazione da backend
            /*
            await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                  name: nickname
                },
                autoSignIn: {
                    enabled: true,
                }
            })
            .then((data) => {  
            */
            localStorage.setItem("email", email);
            navigate("/confirmAccount");
             /*
            })
            .catch((error) => {
                setLoading(false)
                setAlert(true)
                switch (error.message) {
                    case "Username should be an email.":
                        setAlert(true)
                        setLoading(false)
                        setMessage("L'email inserita non è valida")
                        break;
                    case "Username cannot be empty":
                        setAlert(true)
                        setLoading(false)
                        setMessage("Il campo dell'email non può essere vuoto")
                        break;
                    case "Password cannot be empty":
                        setAlert(true)
                        setLoading(false)
                        setMessage("Il campo della password non può essere vuoto")
                        break;
                    case "An account with the given email already exists.":
                        setAlert(true)
                        setLoading(false)
                        setMessage("Esiste già un account con questa email")
                        break;
                    default:
                        setMessage("")
                        setAlert(false)
                        break;
                }
            })
            */
        }
    }

    return(
        <div className="signup-container">
            <FormControl component="form">
                <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                    <Grid item xs={12}>
                        <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                            Registrati
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
                        autoComplete="username"
                        type="text"
                        label="Nome utente"
                        fullWidth
                        onChange={onChangeNickname}
                        variant="outlined" />
                        
                        <Alert 
                        severity="error"
                        style={{marginTop: "3px", display: !showNicknameAlert && "none"}}
                        >
                            <Typography fontSize="15px">Errore sul nome utente:</Typography>
                            <ul style={{marginLeft: "-24px", marginTop: "0px", marginBottom: "0px"}}>
                            <Typography fontSize="13px">
                                <li>Deve contenere dai 5 ai 30 caratteri.</li> 
                            </Typography>
                            <Typography fontSize="13px">
                                <li>Può contenere solo lettere, numeri e i caratteri "_" e "."</li>
                            </Typography>
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
                        <Alert
                        severity="error"
                        style={{marginTop: "3px", display: !showEmailAlert && "none"}}
                        >
                            <Typography fontSize="15px">Formato email non valido.</Typography>
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
                        <FormControlLabel 
                        style={{marginBottom: "-10px"}}
                        control={
                        <Checkbox
                        onChange={onChangeTermsAndConditions}
                        />
                        }
                        label={
                            <Typography 
                            marginLeft="-5px"
                            fontSize="15px">
                                Accetta i nostri termini e condizioni.
                            </Typography>
                        }/>
                        <FormControlLabel 
                        control={
                        <Checkbox 
                        onChange={onChangeAdult}
                        />
                        } 
                        label={
                            <Typography 
                            marginLeft="-5px"
                            fontSize="15px">
                                Ho più di 18 anni.
                            </Typography>
                        }/>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container >
                            <Grid item xs={12}>
                                <LoadingButton 
                                type="submit"
                                id="signup_button" 
                                variant="contained"
                                loading={loading}
                                fullWidth
                                onClick={onClickSignupLoadingButton}
                                >
                                    Effettua registrazione
                                </LoadingButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography 
                                align="right"
                                variant="subtitle1" 
                                fontSize="15px"
                                tabIndex={0}
                                onClick={onClickLogin}
                                style={{cursor: "pointer", marginTop:"9px", marginRight: "5px", marginBottom: "10px"}}>
                                    Hai già un account? Effettua l'accesso.
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </FormControl>
        </div>
    )
}

export default SignupForm;