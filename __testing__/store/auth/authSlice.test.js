/* eslint-disable */
import { authSlice, checkingCredentials, login, logout } from "../../../src/store/Auth/authSlice"
import { authenticatedState, demoUser, initialState } from "../../fixtures/authFixtures"

describe('Pruebas en el authSlice ', () => { 

    test('Debe de regresar el estado inicial y llamarse "auth"', () => {  

        expect(authSlice.name).toBe('auth') //asegurar el nombre el authSlice
        const state = authSlice.reducer( initialState, {})
        expect(state).toEqual(initialState)
    });

    test('Debe de realizar la autenticacion', () => { 

        const state = authSlice.reducer( initialState, login(demoUser))
        expect(state).toEqual({
            status: 'authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: demoUser.uid,
            email: demoUser.email,
            displayName: demoUser.displayName,
            photoURL: demoUser.photoURL,
            errorMessage: null,
        })
    });

    test('Debe realizar el Logout sin argumentos', () => { 
        
        const state = authSlice.reducer( authenticatedState, logout())
        expect(state).toEqual({
            status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,   
            errorMessage: undefined
        })
    });

    test('Debe realzar el Logout con argumentos', () => { 

        const errorMessage = 'Credenciales no son correctas'
        const state = authSlice.reducer( authenticatedState, logout({errorMessage}))
        expect(state).toEqual({
            status: 'not-authenticated', //'checking' 'not-authenticated', 'authenticated'
            uid: null,
            email: null,
            displayName: null,
            photoURL: null,
            errorMessage: errorMessage
        })
    });

    test('Debe de cambiar el state a checking', () => { 
        const state = authSlice.reducer( authenticatedState, checkingCredentials())
        expect(state.status).toBe('checking')
    })
})