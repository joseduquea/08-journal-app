import { collection, getDocs } from "firebase/firestore/lite"
import { FirebaseDB } from "../firebase/config"

export const loadNotes = async(uid = '') => {

    if (!uid) throw new Error('El uid no ha sido establecido') 
    //si el uid no existe mostramos el error y obligamos a que uid debe venir bajo esta condicion 

    //TODO: traer las notas de Firestore
    const collectionRef = collection( FirebaseDB, `${uid}/journal/notes`) //collection me pide la instancia de mi base de datos, esta ya la creamos en el config.js de Firebase y la ruta o segmentos para llegar a esa coleccion

    //traer los documentos que esa collection tiene
    const docs = await getDocs(collectionRef); //podemos traer el collection tambien mediante filtros, condiciones,etc. Esto dependiendo de lo que queremos traer de coleccion, nosotros lo dejamos asi por que vamos a traer todo

    const notes = []
    docs.forEach(doc => {
        notes.push({id: doc.id, ...doc.data()})
    });
    return notes;
}
