import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: { 
            isSaving: false, //esto me dira si esta guardando o no la nota (bandera booleana)
            messageSaved: '',
            notes: [], //en este arreglo estaran almacenadas las notas
            activeNote: null //la nota al entrar a la aplicacion 
            //active: {
            //    id: 'ABC123',
            //    title: '',
            //    body: '',
            //    date: 123456,
            //   imageURL: [], //las fotos que subira el usuario
        },

    //TODO: Recordar que todo lo que pongamos en los Reducer debe y tiene que ser trabajos síncronos 
    reducers: { 

        //TODO: agregar nueva entrada o nota 
        addNewEmptyNote: (state, action) => { 
            state.notes.push( action.payload ); //* en el payload vamos a mutar la notas 
            state.isSaving = false
        },
        
        //TODO: hacer click y establecer cual es la nota activa
        setActiveNote: (state, action) => {  
            state.active = action.payload
            state.messageSaved =  '' // Se pude usar null o undefined?
        },

        savingNewNote: (state) => {
            state.isSaving = true 
        },

        //TODO: cargar y establecer las notas
        setNotes: (state, action) => { 
            state.notes = action.payload;
        },

        //TODO: grabar, guardar las notas 
        setSaving: (state) => { 
            state.isSaving = true
            state.messageSaved = '' // Se pude usar null o undefined?
        },

        //TODO: guardar la nota actulizada 
        setUpdateNote: (state, action) => { 
            state.isSaving = false
            state.notes = state.notes.map( note => {
                
                if (note.id === action.payload.id) {
                    return action.payload
                }
                return note
            })
            
            /*const index = state.notes.findIndex( note => note.id === action.payload.id)
            state.notes[index] = action.payload;*/

            //* mensage de alerta para la nota actulizada
            state.messageSaved = `La nota "${action.payload.title}", fue actualizada correctamente`
        },

        //TODO: subir y preservar las imagenes
        setImageToActiveNote: (state, action) => {  

            //preserva las anteriores y adjunta las nuevas (append)
            state.active.imageURL = [ ...state.active.imageURL, ...action.payload ] 
            //es igual a lo anterior para mantener las imagenes y le contena el payload que es un arreglo con todas las nuevas imagenes

            state.isSaving = false //para indicar que ya terminamos la carga
        },

        //TODO: limpiar las notas al cerrar sesion 
        setClearNotesLogout: (state) => {
            state.isSaving = false
            state.messageSaved = ''
            state.notes = []
            state.activeNote = null

        },

        //TODO: Eliminar una nota de nuestro listado
        setDeleteNote: (state, action) => { 
            state.active = null
            state.notes = state.notes.filter(note => note.id !== action.payload)
            //tomar todas las notas y unicamente eliminar la nota cuyo id sea igual al que recibo en el payload 
        }
    }
})

//Recordar que estas son las acciones o funciones que vamos a disparar 
export const {
    addNewEmptyNote, 
    setActiveNote, 
    savingNewNote, 
    setNotes, 
    setSaving, 
    setUpdateNote, 
    setImageToActiveNote, 
    setClearNotesLogout,
    setDeleteNote
} = journalSlice.actions;
