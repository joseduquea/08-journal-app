/* eslint-disable */
import { LoginOutlined, MenuOutlined } from "@mui/icons-material"
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material"
import { startLogout } from "../../store/Auth/thunks"
import { useDispatch } from "react-redux"

export const NavBar = ({drawerWidth = 240}) => {

    const dispatch = useDispatch()

    const onLogout = () => {
        dispatch(startLogout())
    }
  return (
    <AppBar 
        position="fixed" 
        sx={{ 
            width: { md: `calc(100% - ${drawerWidth}px)`},
            ml: {md: `${ drawerWidth }px`}
        }}
    >
        <Toolbar> 
            {/* Icono === para desplegar el menu en dispostivos mas pequeños */}
            <IconButton 
                id="menu"
                color="inherit" 
                edge="start" 
                sx={{mr: 2, display: {sm: 'block', md: 'none' }}}
            >
                <MenuOutlined/>
            </IconButton>

                {/* Text de Journal App en el Navbar */}
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" noWrap component="div"> Journal App </Typography>

                {/* Boton del Logout */}
                <IconButton color="tertiary" onClick={onLogout}>
                    <LoginOutlined/>
                </IconButton>

            </Grid>
        </Toolbar>
    </AppBar>
  )
}
