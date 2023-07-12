import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { login, logout } from "../store/Auth"
import { FirebaseAuth } from "../firebase/config"
import { starLoadingNotes } from "../store/journal/thunks"


export const useCheckAuth = () => {
  
    const { status } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async(user) => {
        
            if ( !user ) return dispatch(logout()) //si no hay ningun usuario voy a mandar a llamar el logout del <authSlice/>

            const { uid, email, photoURL, displayName } = user 
            dispatch(login({uid, email, photoURL, displayName })) //si tengo un usuario voy a despachar directamente la accion sincrona del Login
            dispatch(starLoadingNotes())
        }) 

        //cada vez que el estado de autenticacion cambie, esta funcion se volvera a disparar
    
    }, [dispatch]) 
    //si aparece la siguiente alerta "React Hook useEffect has a missing dependency: 'dispatch'. Either include it or remove the dependency array."
    //basta con solo agregar el dispatch []

    return {
        status
    }
}
