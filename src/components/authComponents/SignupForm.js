import { Alert, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import "./styles.css";
import { LoadingButton } from "@mui/lab";

function SignupForm(){

    return(
        <div className="signup-container">
            <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                        Registrati
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Alert
                    severity="error" 
                    >
                        <Typography 
                        variant="body2">
                            Messaggio di errore
                        </Typography>
                    </Alert>
                </Grid>
                <Grid item xs={12}>
                    <TextField 
                    autoComplete="username"
                    type="text"
                    label="Nome utente"
                    fullWidth
                    variant="outlined" />
                    {/*Alert sul nome utente
                    <Alert 
                    severity="error"
                    style={{marginTop: "3px"}}
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
                    </Alert>*/
                    }
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
                    autoComplete="new-password"
                    type="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    />
                    {/*Alert sulla password
                    <Alert
                    severity="error"
                    style={{marginTop: "3px"}}
                    >
                        <Typography fontSize="15px">Errore sul formato della password:</Typography>
                        <ul style={{marginLeft: "-24px", marginTop: "0px", marginBottom: "0px"}}>
                        <Typography fontSize="13px">
                            <li>Errore 1</li> 
                        </Typography>
                        <Typography fontSize="13px">
                            <li>Ecc...</li>
                        </Typography>
                        </ul>
                    </Alert>
                    */}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    autoComplete="new-password"
                    type="password"
                    label="Ripeti la password"
                    variant="outlined"
                    fullWidth
                    />
                    {/*Alert sul ripeti password
                    <Alert
                    severity="error"
                    style={{marginTop: "3px"}}
                    >
                        <Typography fontSize="15px">Le password non coincidono.</Typography>
                    </Alert>
                */}
                </Grid>
                <Grid item xs={12}>
                    <FormControlLabel 
                    style={{marginBottom: "-10px"}}
                    control={
                    <Checkbox 
                    style={{transform: "scale(0.8)"}}
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
                    style={{transform: "scale(0.8)"}}
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
                            fullWidth
                            >
                                Effettua registrazione
                            </LoadingButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography 
                            align="right"
                            variant="subtitle1" 
                            fontSize="15px"
                            style={{cursor: "pointer", marginTop:"9px", marginRight: "5px", marginBottom: "10px"}}>
                                Hai già un account? Effettua l'accesso.
                            </Typography>
                        </Grid>
                    </Grid>
                    

                </Grid>
            </Grid>
        </div>
    )
}

export default SignupForm;