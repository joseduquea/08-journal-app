import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";

//Function Authentication Google 
const googleProvider = new GoogleAuthProvider();
    googleProvider.setCustomParameters({
        prompt: 'select_account'
    })

    //TODO: Registro mediante Google
export const signInWithGoogle = async() => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider );
        //const credentials = GoogleAuthProvider.credentialFromResult( result );
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            //user Info
            displayName, email, photoURL, uid
        }

    } catch (error) {

        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;

        return {
            ok: false,
            errorMessage, email, errorCode
            
        }
        
    }
}

    //TODO: Registro mediante Email & Password 
export const registerWithEmailAndPassword = async({email, password, displayName}) => {

    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password );
        const { uid, photoURL} = resp.user

        //TODO: Actualizar el displayName en Firebase
        await updateProfile( FirebaseAuth.currentUser, { displayName })

        return{
            ok: true,
            //user Info
            displayName, email, photoURL, uid
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message}
    }
}

    //TODO: Login mediante Email & Password
export const loginWithEmailPassword = async({email,password}) => {
    
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password )
        const {uid, photoURL, displayName} = resp.user

        return{
            ok: true,
            //user Info
            uid, photoURL, displayName
        }

    } catch (error) {
        return { ok: false, errorMessage: error.message}
    }
    
}

//TODO: Logout mediante Firebase 
export const logoutFirebase = async() => {

    return await FirebaseAuth.signOut() 
    //De esta forma se cierra cualquier metodo de autenticacion por el cual el usuario haya hecho el login 

}
