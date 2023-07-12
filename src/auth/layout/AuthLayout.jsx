/* eslint-disable */
import { Grid, Stack, Typography } from "@mui/material"

export const AuthLayout = ({ children, title, description }) => {
  return (
    <Grid 
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{minHeight: "100vh", backgroundColor: "primary.main", padding: 4}}
    >
      {/* Caja del Login  */}
      <Grid item
        className="box-shadow"
        xs={ 3 } //tamaño en pantallas pequeñas de 3 posiciones
        sx={{ width:{ md: 500 } ,backgroundColor: "white", padding: 3 , borderRadius: 2}}>

          <Stack sx={{alignItems: "center", justifyContent: "center"}}>
            <Typography variant="h1" sx={{mb: 1, fontSize: 25, fontWeight: 450  }} color="primary"> { title } </Typography>
            <Typography variant="h6" sx={{mb: 1}}> { description } </Typography>
          </Stack>
          
         {/* Children  */}
         { children }

        </Grid>

    </Grid>

  )
}
