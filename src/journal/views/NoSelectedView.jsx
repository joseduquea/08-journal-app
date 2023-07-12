import { Grid, Typography } from "@mui/material"
import { useSelector } from "react-redux"

export const NoSelectedView = () => {

  const { displayName } = useSelector( state => state.auth)

  return (
    <Grid sx={{p: 5}} className='animate__animated animate__fadeInUp'>
      <Typography variant="h3" color="primary" sx={{ mb: 2 }}>
          ¡Hola! <strong>{ displayName } 😄</strong>
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          ¡Diviertete y disfruta del Journal App!
        </Typography>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Recuerda que puedes crear una nota nueva o hacer clic sobre una para 
          editarla y ver más información
        </Typography>
    </Grid>
  )
}
 