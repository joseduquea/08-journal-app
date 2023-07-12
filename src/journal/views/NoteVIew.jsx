import { DeleteOutline, SaveOutlined, UploadFileOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useForm } from "../../hooks/useForm"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { setActiveNote, startDeleteNote, startSaveNote, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"

export const NoteVIew = () => {

    const dispatch = useDispatch()

    //tomar la nota activa del Store, messageSaved, isSaving
    const { active, messageSaved, isSaving } = useSelector( state => state.journal )

    //formulario para editar la nota
    const { title, body, onInputChange, formState } = useForm( active )

    //configuracion de la fecha 
    const dateString = useMemo(() => {
        const newDate = new Date (); // ( date ) es el del formulario
        const dateOptions = {  
            year: 'numeric', month: 'short', day: 'numeric'
        }
        return newDate.toLocaleDateString("es-ES", dateOptions) +" - "+ newDate.toLocaleTimeString('en-EN');
    },[ ]) 

    //Click para Upload Images
    const fileInputRef = useRef()

    //Actualizar los valores de la nota 
    useEffect(() => {
      
        dispatch(setActiveNote(formState)) 
        //activara la nota que yo selecciono y como le enviamos el formState tendra actualizadas las propiedades de la misma 
      
    }, [formState]) //cuando cualquier propiedad del formState cambie haremos el dispatch de una nueva accion
    
    //Funcion para el Sweet Alert 
    useEffect(() => {
      
        if (messageSaved.length > 0) {
            Swal.fire({
                title: 'Nota actualizada!',
                text: `${messageSaved}`, 
                icon: 'success',
                confirmButtonText: ' Ok '
            })
        }
    }, [messageSaved]) //cuando el messageSaved cambie vamos a disparar este efecto
    

    //Guardar la nota actualizada 
    const onSaveNote = () => {
        dispatch( startSaveNote())
    }

    // Subida de las imagenes 
    const onFileInputChange = ({ target }) => {
        if (target.files === 0) return; //si no selecciono ningun archivo entonces no hace nada 

        //si si selecciono archivos entonces disparo esta accion
        dispatch( startUploadingFiles(target.files)) 
    }

    //Eliminar una nota 
    const onDelete = () => {
        
        Swal.fire({
            title: '¿Estás seguro de eliminar esta nota?',
            text: "No se podrá revertir esta acción",
            icon: 'warning', 
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'

        })
        .then((result) => {
            if (result.isConfirmed) {
        
                dispatch(startDeleteNote());
            
                Swal.fire({
                    title:'Eliminado',
                    text: 'La nota ha sido eliminada',
                    icon:'success'
                })
            }
        })
          
    }

  return (
        <Grid container direction="row" alignItems="center" sx={{mb: 1}} className='animate__animated animate__fadeInUp'>

            {/* Text - Date */}
            <Grid item sx={{ml: 5, mt: 2, mb: 2}}>
                <Typography fontSize={26} color="primary" sx={{fontSize: 30}} >
                {dateString}
                </Typography>
            </Grid>

            {/* Input - Choose File */}
            <input type="file" multiple ref={ fileInputRef } onChange={ onFileInputChange } style={{ display:"none" }}/>

            {/* Container - Buttons */}
            <Grid item sx={{ marginLeft: 'auto' }}>
                <Grid container>

                {/* Button - Save Note */}
                <Grid item>
                    <Button color="secondary" onClick={onSaveNote} variant="outlined" disabled={isSaving} sx={{ mr: 2 }}>
                    <SaveOutlined sx={{ mr: 1 }} />
                    Guardar
                    </Button>
                </Grid>

                {/* Button - Upload File */}
                <Grid item>
                    <Button color="primary" variant="outlined" disabled={isSaving} onClick={() => fileInputRef.current.click()}>
                    <UploadFileOutlined sx={{ mr: 1 }} />
                    Subir Imágenes
                    </Button>
                </Grid>

                {/* Button - Delete Note */}
                <Grid item>
                    <Button color="error" onClick={ onDelete }  sx={{ ml: 2, mr: 5}} variant="outlined">
                        <DeleteOutline sx={{ mr: 1}}/>
                            Eliminar
                    </Button>
                </Grid>
                
                </Grid>
            </Grid>

            <Grid container sx={{ml: 5}}>
                <Grid item sm={6} sx={{ mt: 2 }}>
                    {/* Input - Title */}
                    <TextField 
                        type="text"
                        variant="standard"
                        fullWidth
                        placeholder="Ingrese un Titulo"
                        label="Titulo"
                        sx={{ mb: 3}}
                        name="title"
                        value={ title }
                        onChange={ onInputChange }
                    />

                    {/* Input - Description (Body) */}
                    <TextField 
                        type="text"
                        variant="standard"
                        fullWidth
                        multiline
                        placeholder="¿Que sucedio hoy?"
                        label="Descripción"
                        minRows={3} //tamaño del input
                        sx={{ mb: 1}}
                        name="body"
                        value={ body }
                        onChange={ onInputChange }
                    />
                </Grid>
            </Grid>

            {/* Image Galery */}
            <ImageGallery
                images={ active.imageURL }
            />
        </Grid>
    )
}
