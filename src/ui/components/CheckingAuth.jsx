import { CircularProgress, Grid } from "@mui/material"

export const CheckingAuth = () => {
  return (

    <Grid 
      container
      spacing={0}
      sx={{minHeight: "100vh", backgroundColor: "primary.main"}}
    >

      {/* Caja del Loadder  */}
      <Grid container
        direction="row"
        justifyContent="center"
        alignItems="center"
        >
            <CircularProgress color="warning"/>
      </Grid>

    </Grid>
  )
}
 