import { getEnvironments } from "./getEnvironments";

export const fileUpload = async( file ) => {

    if ( !file ) throw new Error('No hay ningun archivo para subir') //si el file no existe "!file"
    //if ( !file ) return null; //SOLO TESTING

    const {VITE_CLOUDINARY_URL, VITE_CLOUDINARY_PRESET} = getEnvironments()

    const formData = new FormData();
    formData.append('upload_preset',VITE_CLOUDINARY_PRESET) //referencia(key), valor(value) como en Postman
    formData.append('file', file) //referencia(key), valor(value) como en Postman

    try {
        
        const resp = await fetch(VITE_CLOUDINARY_URL, {
            method: 'POST',
            body: formData
        });

        if (!resp.ok) throw new Error('No se pudo subir la imagen') //si la respuesta no es correta 

        //Si todo sale bien entonces vamos a regresar el secure_url (Postman)
        const cloudResp = await resp.json() //esto es para tomar la respuesta asi como nos sale en Postman
        return cloudResp.secure_url //aca obtenemos de esa respuesta solo el "secure_url"

    } catch (error) {
        throw Error (error.message)
        //return null //SOLO TESTING
    }
}