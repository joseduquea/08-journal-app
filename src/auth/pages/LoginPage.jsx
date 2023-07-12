import { Link as RouterLink } from "react-router-dom"
import { Grid,Typography, TextField, Button, Link, Alert, Box, Divider } from "@mui/material"
import Google from "@mui/icons-material/Google"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks/"
import { startAuthenticationGoogle, startLoginWithEmailPassword } from "../../store/Auth/"
import { useDispatch, useSelector } from "react-redux"
import { useMemo, useState } from "react"

const formData = {
  email: '',
  password: '' 
}

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const formValidations = {
  email: [(value) => emailValidation.test(value) , 'Escribe un correo valido, correo@example.com'],
  password: [(value) => value.length >= 6 , 'La contraseña debe tener más de 6 caracteres'],
}

export const LoginPage = () => {

  const [ formSubmitted, setFormSubmitted ] = useState(false);

  const { status, errorMessage } = useSelector( state => state.auth );

  const dispatch = useDispatch()

  const { email, password, onInputChange, isFormValid, emailValid, passwordValid } = useForm(formData, formValidations)

  //Bloqueo el Boton de Registro al hacer la autenticacion con Google
  const isAuthenticating = useMemo(() => status === 'checking', [status])

  //Bloqueo el Boton de Registro al hacer la autenticacion Email & Password
  const loadingAuthetication = useMemo(() => status === 'checking', [status])

  //Login con Email & Password
  const onSubmit = ( event ) => {
    event.preventDefault(); //despachar el thunks 
    setFormSubmitted(true)
    if( !isFormValid )return;
    dispatch(startLoginWithEmailPassword({email, password}))
  }

  //Login con Google
  const onGoogleSignIn = () => {
    dispatch(startAuthenticationGoogle())
  }

  return (
    <AuthLayout title="¡Bienvenid@!" description="Ingresa tus credenciales para continuar">
      <form onSubmit={ onSubmit } /* animated */ className="animate__animated animate__fadeIn animate__fast">   
      
            {/* Inputs del Login */}
            <Grid container>
              <Grid item xs={ 12 } sx={{mb: 1}}>
                <TextField label="Correo" type="email" placeholder="email@example.com"  fullWidth
                  name="email" value={ email } onChange={ onInputChange } error={ !!emailValid && formSubmitted } helperText={ formSubmitted && emailValid}
                />
              </Grid>

              <Grid item xs={ 12 } sx={{mb: 1}}>
                <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth
                  name="password" value={ password } onChange={ onInputChange } error={ !!passwordValid && formSubmitted } helperText={ formSubmitted && passwordValid}
                />
              </Grid>

            {/* Mensaje de Error para usuario no autenticado */}
            <Grid container spacing={ 1 } sx={{mb: 1}}>
                <Grid item xs={ 12 } display={ !!errorMessage && formSubmitted ? '' : 'none' }> 
                  <Alert severity="error">{ errorMessage }</Alert>
                </Grid>
              </Grid>

            {/* Buttons del Login */}
              <Grid container spacing={ 1 } sx={{mb: 1}}>
                <Grid item xs={ 12 } >
                  <Button disabled={ loadingAuthetication } type="submit" variant="contained" size="large" fullWidth >
                    Iniciar Sesión
                  </Button>
                </Grid>

              {/* Divider */}
                <Grid item xs={12} sx={{ mt: 2 }}>
                <Box alignItems="center" display="flex">
                  <Divider sx={{ flexGrow: 1, backgroundColor: "gray" }} orientation="horizontal" />

                  <Typography
                    sx={{
                      cursor: "unset",
                      mx: 1.5,
                      py: 0,
                      px: 0,
                      fontSize: 12,
                      color: "black",
                    }}
                  >
                    O
                  </Typography>

                  <Divider sx={{ flexGrow: 1, backgroundColor: "gray" }} orientation="horizontal" />
                </Box>
              </Grid>

                {/* Button con Google */}
                <Grid item xs={ 12 } sx={{ mt: 2 }}>
                  <Button disabled={ isAuthenticating } variant="contained" size="large" onClick={onGoogleSignIn} fullWidth>
                    <Google/>
                    <Typography sx={{ml: 1}}>Iniciar sesión con Google</Typography>
                  </Button>
                </Grid>
              </Grid>

              {/* Link hacia Crear Cuenta */}
              <Grid container direction="row" justifyContent="center" sx={{ mt: 2 }}> {/* Flexbox */}
                <Typography sx={{mr: 1}}>¿Aún no tienes cuenta?</Typography>
                <Link component={ RouterLink } color="inherit" to="/auth/register">
                  Crear Cuenta
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
  )
}
