import { loginWithEmailPassword, logoutFirebase, registerWithEmailAndPassword, signInWithGoogle } from "../../firebase/providers"
import { setClearNotesLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"

//TODO: Chequeo credenciales 
export const startCheckingAuthentication = () => {

    return async( dispatch ) => {

        dispatch(checkingCredentials())
    }
}
    //TODO: Login mediante Google
export const startAuthenticationGoogle = () => {

    return async( dispatch ) => {

        dispatch(checkingCredentials())
        const result = await signInWithGoogle()
        if ( !result.ok ) return dispatch( logout( result.errorMessage )) //Si falla se envia este errorMessage

        dispatch(login( result )) //si todo sale bien se dispara el login con el nuevo state 
    }
}
    //TODO: Register mediante Email & Password
export const startCreateWithEmailAndPassword = ({email, password, displayName}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials())
        
        const { ok, uid, photoURL, errorMessage } = await registerWithEmailAndPassword({email, password, displayName})
        if (!ok) return dispatch(logout({errorMessage}))
        //si esto sale mal, voy a mandar a llamar el logout y le envio el errorMessage como payload

        dispatch(login( { uid, displayName, email, photoURL} ))
        //si todo sale bien, entonces manda el registro del usuario
    }   

}

    //TODO: Login mediante Email & Password
export const startLoginWithEmailPassword = ({email, password}) => {
    return async(dispatch) => {

        dispatch(checkingCredentials())

        const result = await loginWithEmailPassword({email, password})
        if(!result.ok) return dispatch(logout(result ))

        dispatch(login( result ))
    }
}

    //TODO: Logout mediante Firebase
export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();

        dispatch(setClearNotesLogout())
        dispatch(logout())
    } 
}
