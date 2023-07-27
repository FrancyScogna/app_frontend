import { Alert, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import "./styles.css";
import { LoadingButton } from "@mui/lab";

function LoginForm(){

    return(
        <div className="login-container">
            <Grid container rowSpacing={2} columnSpacing={1} display="flex">
                <Grid item xs={12}>
                    <Typography variant="h4" align="center" color="primary" fontWeight="bold">
                        Accedi
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
                            >
                                Crea un account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default LoginForm;