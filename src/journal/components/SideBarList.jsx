/* eslint-disable */
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal"

export const SideBarList = ({ title, body, id, date, imageURL = [] }) => {

    const dispatch = useDispatch()

    //activar la nota seleccionada
    const onClickNote = () => {
        dispatch(setActiveNote({ title, body, id, date, imageURL }))
    }

    const newTitle = useMemo(() => {
        if (title) { //si el titulo es mayor a 17, lo voy a recortar hasta 17 y le adiciono '...'
          return title.length > 17 ? title.substring(0, 17) + '...' : title; //si no es > 17 entonces se vera normal 
        }
        return '';
      }, [title]);

  return (
      
    //TODO: Componente de Material UI para crear listas

    <ListItem disablePadding className='animate__animated animate__fadeInUp'>
                
                {/* Establecer la nota activa */}
                <ListItemButton onClick={ onClickNote }>

                    {/* Icono de las notas*/}
                    <ListItemIcon>
                        {/*<TurnedInNot/>*/} 
                        <BookmarkAddedIcon fontSize="small" color="primary"/>
                    </ListItemIcon>

                    <Grid container>

                        <ListItemText primary={ newTitle }/>
                        <ListItemText secondary={ body }/>

                    </Grid>

            </ListItemButton>
     </ListItem>
 
  )
}
