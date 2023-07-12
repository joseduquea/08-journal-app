import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { FirebaseDB } from "../../firebase/config"
import { addNewEmptyNote, savingNewNote, setActiveNote, setDeleteNote, setImageToActiveNote, setNotes, setSaving, setUpdateNote } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"

//TODO: sera para agregar nueva entrada o nota
// la nomenclatura start hace referencia al inicio del proceso 
export const startNewNote = () => {

    return async( dispatch, getState ) => {

        //TODO: dispatch del la nota en guardando 
        dispatch ( savingNewNote())

        const { uid } = getState().auth //desestructuramos el uid y que lo busque dentro del auth

        //uid: para poder grabar la nota en Firebase del usuario autenticado 

        const newNote = {
            title: '',
            body: '',
            imageURL: [], //debemos llamar las images con arreglo vacio, para que despues no falle al crear una nueva nota 
            date: new Date().getTime(),
        }

        //apuntamos al nodo de las notas que vamos en Firestore
        const newDoc = doc( collection( FirebaseDB, `${ uid }/journal/notes`))
        await setDoc(newDoc, newNote) //1) referencia al documento donde lo voy a insertar 2) el objeto que vamos a guardar

        newNote.id= newDoc.id //Creando la propiedad "id" al newNote 

        //dispatch de la nueva nota cuando ya la tengamos guardada 
        dispatch (addNewEmptyNote(newNote))
        //otro dispatch para activar la nueva nota 
        dispatch (setActiveNote(newNote))
        

    }

} 

//TODO: cargar las notas en Firestore y que se vean en la aplicacion 
export const starLoadingNotes = () => {
    return async( dispatch, getState ) => {

        const { uid } = getState().auth //uid del usuario autenticado en Firebase
        if (!uid) throw new Error('El uid no ha sido establecido') 
        //si el uid no existe mostramos el error y obligamos a que uid debe venir bajo esta condicion 

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}

//TODO: guardar las notas en Firestore y mandar nuevamente lo sucedido a la aplicacion
export const startSaveNote = () => {
    return async( dispatch, getState ) => {
        dispatch(setSaving())

        const { uid } = getState().auth //uid del usuario autenticado en Firebase
        const { active } = getState().journal //necesitamos la nota activa del journal 

        const noteToFirestore = {...active} //la nota activa que vamos a mandar a Firestore para guardar 
        delete noteToFirestore.id //eliminar una propiedad de la nota activa "...active"

        const docRef = doc( FirebaseDB, `${uid}/journal/notes/${active.id}`) //referencia al documento en Firestore

        await setDoc(docRef, noteToFirestore, {merge: true}) 
        //merge = si envio campos del "noteToFirestore" que no existian, entonces los campos que estaban alla se mantienen 

        //dispatch de la accion que hace que la nota activa cambie en tiempo real al dar click sobre guardar
        dispatch(setUpdateNote( active ))
    }
}

//TODO: subir las imagenes 
export const startUploadingFiles = ( files = [] ) => {  
    return async( dispatch, getState ) => {
        dispatch( setSaving() ) //cuando empieza la app a cargar hace el dispath de setSaving
                                //esto va bloquear los botones y va poner la app en un estado de carga

        const fileUploadPromises = []; //arreglo de todas las promesas que vamos a disparar 

        for (const file of files) { //creando el arreglo de promesas
            fileUploadPromises.push( fileUpload(file)) //y de esta forma le indicamos que las empiece almacenar ahi
        } 
        
        //disparar la promesas
        const imagesURLs = await Promise.all( fileUploadPromises );
        dispatch(setImageToActiveNote(imagesURLs))

        //se obtiene del Store la nota activa
        const { active } = getState().journal

        //se obtiene el uid desde el Store auth 
        const { uid } = getState().auth

        //Se almacenan las imagenes en la nota activa y actualiza las mismas 
        const imageToFirestore = { imageURL: active.imageURL}

        //proceso igual al de "startSaveNote" que actuliza directamente el Firestore 
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`)

        await setDoc(docRef, imageToFirestore, {merge: true})

        dispatch(setUpdateNote(active))
    }

}

//TODO: eliminar una nota 
export const startDeleteNote = () => {
    
    return async( dispatch, getState ) => {

        //se obtiene del Store la nota activa
        const { active } = getState().journal

        //desestructuramos el uid y que lo busque dentro del auth
        const { uid } = getState().auth 

        //uid: para poder eliminar la nota en Firebase del usuario autenticado 

        //apuntamos al nodo de la nota que vamos a eliminar en Firestore
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${active.id}`)

        //deleteDoc es un metodo propio de Firebase para que busque y elimine y doc al cual apuntamos mediante la ruta anterior
        await deleteDoc(docRef)

        //dispatch de la nota eliminada
        dispatch (setDeleteNote(active.id))
        

    }
}