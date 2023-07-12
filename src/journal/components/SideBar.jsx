/* eslint-disable */
import { Box, Divider, Drawer, List, Toolbar, Typography } from "@mui/material"
import { useSelector } from "react-redux"
import { SideBarList } from "./SideBarList"

export const SideBar = ({ drawerWidth = 240 }) => {

    //Obtengo en nombre de usuario "displayName"
    const { displayName } = useSelector(state => state.auth)

    //Obtengo las notas del usuario 
    const { notes } = useSelector(state => state.journal)


  return ( 
    <Box
        component="nav"
        sx={{width: {md: drawerWidth}, flexShrink: {sm: 0 }}}
        
    >
        <Drawer
            variant="permanent" //temporary
            sx={{
                display: {sm: "block", }, //en pantallas xs sera block, en las demas quedara normal
                "& .MuiDrawer-paper": {boxSizing: "border-box", width: drawerWidth}
            }}
        >
            {/* Nombre de usuario en la barra lateral  */}
        <Toolbar sx={{ marginBottom: -4, alignItems: "center", justifyContent: "center"}} >
            <Typography variant="h5" noWrap color= "primary" sx={{fontWeight:450}} >¡Bienvenid@! 👋</Typography>
        </Toolbar>
        <Toolbar sx={{ alignItems: "center", justifyContent: "center"}}>
            <Typography variant="h6" noWrap >{ displayName }</Typography>
        </Toolbar>
        
        <Divider/>

        {/* Title del SideBarList */}
        <Toolbar sx={{marginBottom: -2}}>
            <Typography variant="h6" color="primary" sx={{fontWeight:500 }}>
                Lista de notas
            </Typography>
        </Toolbar>

            {/* Notes en el SideBar */}
        <List> 
            {
                notes.map(note => (
                    <SideBarList key={ note.id } { ...note }/> //esparcimos toda la Note (title, body, id)
                ))
            }
        </List>

        </Drawer>
    </Box>
  )
}
