
import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoSelectedView } from "../views/NoSelectedView"
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import { NoteVIew } from "../views/NoteVIew"
import { startNewNote } from "../../store/journal/thunks"
import { useDispatch, useSelector } from "react-redux"

export const JournalPage = () => {

  const { isSaving, active } = useSelector(state => state.journal)

  const dispatch = useDispatch()

  const onClickNewNote = () => {
    dispatch(startNewNote())
  }

  return (
    <JournalLayout>

      {
        (!!active) //si hay una nota activa 
        ? <NoteVIew/> // vamos a mostrar esto 
        : <NoSelectedView /> //si no hay ninguna nota activa mostramos esto 
      }

      {/* Button para agregar una nueva nota*/}
      <IconButton
        disabled = { isSaving }
        onClick={ onClickNewNote }
        size="medium"
        sx={{
          color: "white",
          backgroundColor: "error.main",
          ':hover':{backgroundColor: "error.main", opacity: 0.8},
          position: "fixed", //fijado
          right: 50,
          bottom: 50,
          borderRadius: 1,
          boxShadow: 3,
          fontSize: 16,
          fontWeight: "bold"
        }}
        className='animate__animated animate__fadeInUp'
      >
        <BookmarkAddOutlinedIcon  sx={{mr: 1}}/>
        CREAR NOTA
      </IconButton>

    </JournalLayout>
  )
}
