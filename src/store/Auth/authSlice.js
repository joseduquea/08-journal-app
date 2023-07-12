
import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: { 
        // 'checking' - 'not-authenticated' - 'authenticated' 
        status: 'checking', //como se inicializa el estado antes de autenticarse 
        uid: null, //user id 
        email: null,
        displayName: null,
        photoURL: null, //si se autentica con Google o Red social sera la foto de ahi 
        errorMessage: '', //si hay algun error en nuestra aplicacion y lo quiero mostrar 
    },
    reducers: { 

        login: (state, {payload} ) => {
            state.status = 'authenticated'; 
           state.uid = payload.uid; 
           state.email = payload.email;
           state.displayName = payload.displayName;
           state.photoURL = payload.photoURL; 
           state.errorMessage = null; //si todo se hizo bien no deberia haber un error 
        },

        //El segundo parametro puede tener cualquier nombre, action == payload && payload == action
        logout: (state, {payload}) => {
           state.status = 'not-authenticated'; 
           state.uid = null; 
           state.email = null;
           state.displayName = null;
           state.photoURL = null; 
           state.errorMessage = payload?.errorMessage; // .?. ternario para el errorMessage
        },

        //me ayudara a evitar duplicados en el proceso de Login mientras esta en Loading 
        checkingCredentials: (state) => {
            state.status = 'checking'
        }
    },
});

//Recordar que estas son las acciones o funciones que vamos a disparar 
export const { login, logout, checkingCredentials } = authSlice.actions;

