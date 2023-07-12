import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { Link as RouterLink} from "react-router-dom"
import { useForm } from "../../hooks"
import { useMemo, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { startCreateWithEmailAndPassword } from "../../store/Auth/thunks"

//No necesariamente los valores deben estar dentro del export, estan por fuera y llamamos el "formData"
const formData = {
  displayName: '',
  email: '',
  password: ''
}

const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/;
const passwordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,}$/;

const formValidations = {
  displayName: [ (value) => value.length >= 2, 'El nombre es obligatorio.'],
  email: [ (value) => emailValidation.test(value), 'El correo debe ser, correo@example.com'],
  password: [ (value) => passwordValidation.test(value), 'El password debe de tener más de 6 caracteres, una letra mayuscula y un numero.']
}

export const RegisterPage = () => {

  const dispatch = useDispatch()
  const [formSubbited, setFormSubbited] = useState(false);

  //Error en Firebase
  const { status, errorMessage } = useSelector(state => state.auth)

  //Bloqueo el Boton de Registro al hacer la autenticacion
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status])

  const { formState, displayName, email, password, onInputChange, 
    isFormValid, displayNameValid, emailValid, passwordValid
  } = useForm(formData, formValidations)

  const onSubmit = ( event ) => {
    event.preventDefault(); //Este evita que se mande la información sin recargar el formulario.
    setFormSubbited(true)
    if (!isFormValid) return;
    dispatch( startCreateWithEmailAndPassword(formState))
  }

  return (
    <AuthLayout title="Proceso de Registro" description="¡Hola! Ingresa tus datos para acceder">
      <form onSubmit={ onSubmit } /* animated */ className="animate__animated animate__fadeIn animate__fast">

            {/* Inputs para Crear Cuenta */}

            {/*//TODO: NAME */}
            <Grid container>
            <Grid item xs={ 12 } sx={{mb: 1}}>
                <TextField label="Nombre Completo" type="text" placeholder="Nombre Completo" fullWidth name="displayName" value={ displayName } 
                onChange={ onInputChange } error={ !!displayNameValid && formSubbited } helperText={ formSubbited && displayNameValid }/>
              </Grid>

            {/*//TODO: EMAIL */}
              <Grid item xs={ 12 } sx={{mb: 1}}>
                <TextField label="Correo" type="email" placeholder="email@example.com" fullWidth name="email" value={email} 
                onChange={onInputChange} error={!!emailValid && formSubbited} helperText={formSubbited && emailValid}/>
              </Grid>

            {/*//TODO: PASSWORD */}
              <Grid item xs={ 12 } sx={{mb: 1}}>
                <TextField label="Contraseña" type="password" placeholder="Contraseña" fullWidth name="password" value={password} 
                onChange={onInputChange} error={!!passwordValid && formSubbited} helperText={formSubbited && passwordValid}/>
              </Grid>

            {/* Mensaje de Error para correo ya usado */}
              <Grid container spacing={ 1 } sx={{mb: 1}}>
                <Grid item xs={ 12 } display={ !!errorMessage && formSubbited ? '' : 'none' }> 
                  <Alert severity="error">{ errorMessage }</Alert>
                </Grid>
              </Grid>

            {/* Buttons para Registrarse */}
              <Grid container spacing={ 1 } sx={{mb: 2, mt: 1}}>
                <Grid item xs={ 12 } >
                  <Button disabled={isCheckingAuthentication} type="submit" variant="contained" fullWidth>
                    Registrarse
                  </Button>
                </Grid>
              </Grid>

              {/* Link hacia el Login */}
              <Grid container direction="row" justifyContent="center" > {/* Flexbox */}
                <Typography sx={{mr: 1}}>¿Ya tienes una Cuenta?</Typography>
                <Link component={ RouterLink } color="inherit" to="/auth/login">
                  Ingresar
                </Link>
              </Grid>

            </Grid>
          </form>
    </AuthLayout>
  )
}
