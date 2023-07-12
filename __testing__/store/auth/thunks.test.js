/* eslint-disable */
import { checkingCredentials, login, logout } from "../../../src/store/Auth/authSlice"
import { demoUser } from "../../fixtures/authFixtures"
import { setClearNotesLogout } from "../../../src/store/journal"
import  { loginWithEmailPassword, 
            logoutFirebase, 
            registerWithEmailAndPassword, 
            signInWithGoogle 
        } from "../../../src/firebase/providers"
import  { startAuthenticationGoogle, 
            startCheckingAuthentication, 
            startCreateWithEmailAndPassword, 
            startLoginWithEmailPassword, 
            startLogout
        } from "../../../src/store/Auth/thunks"

jest.mock('../../../src/firebase/providers')

describe('Prueba en los thunks del Auth', () => { 

    const dispatch = jest.fn()

    beforeEach( () => jest.clearAllMocks())

    test('Debe de invocar el startCheckingAuthentication de los thunks', async() => { 
        
        await startCheckingAuthentication()(dispatch)
        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
    });

    //TODO: Google test 
    test('startGoogleSignIn debe de llamar checkingCredentials y el Login Correcto', async() => { 

        const loginData = {ok: true, ...demoUser}

        await signInWithGoogle.mockResolvedValue(loginData)

        await startAuthenticationGoogle() (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))

    });

    test('startGoogleSignIn debe de llamar checkingCredentials y el Logout', async() => { 

        const loginData = {ok: false, errorMessage: 'Un error con Google'}

        await signInWithGoogle.mockResolvedValue(loginData)

        await startAuthenticationGoogle() (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage))

    });

    //TODO: Register test
    test('startCreateWithEmailAndPassword debe de llamar checkingCredentials y el Registro Correto', async() => { 

        const loginData = {ok: true, ...demoUser}
        const formData = { email: demoUser.email, password: '123ABC', displayName: demoUser.displayName }

        await registerWithEmailAndPassword.mockResolvedValue(loginData)

        await startCreateWithEmailAndPassword(formData) (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(demoUser))
    });

    test('startCreateWithEmailAndPassword debe de llamar checkingCredentials y el Logout', async() => { 

        const loginData = {ok: false, errorMessage: 'Error al Registrar'}
        const formData = { email: demoUser.email, password: '123ABC', displayName: demoUser.displayName }

        await registerWithEmailAndPassword.mockResolvedValue(loginData)

        await startCreateWithEmailAndPassword(formData) (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout({errorMessage: loginData.errorMessage}))
   
    });

    //TODO: Login test
    test('startLoginWithEmailPassword debe de llamar checkingCredentials y el Login Correto', async() => { 

        const loginData = {ok: true, ...demoUser}
        const formData = { email: demoUser.email, password: '123ABC' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData) (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(login(loginData))
    });

    test('startLoginWithEmailPassword debe de llamar checkingCredentials y el Logout', async() => { 

        const loginData = {ok: false, errorMessage: 'Error al ingresar'}
        const formData = { email: demoUser.email, password: '123ABC' }

        await loginWithEmailPassword.mockResolvedValue(loginData)

        await startLoginWithEmailPassword(formData) (dispatch)

        expect(dispatch).toHaveBeenCalledWith(checkingCredentials())
        expect(dispatch).toHaveBeenCalledWith(logout(loginData))
   
    });

    //TODO: Logout test
    test('startLogout debe llamar logoutFirebase, clear notes y el Logout', async() => { 

        await startLogout() (dispatch)

        expect(logoutFirebase).toHaveBeenCalled()
        expect(dispatch).toHaveBeenCalledWith(setClearNotesLogout())
        expect(dispatch).toHaveBeenCalledWith(logout())

    })
})  