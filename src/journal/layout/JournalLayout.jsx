/* eslint-disable */
import { Box } from "@mui/material"
import { NavBar } from "../components/NavBar";
import { SideBar } from "../components/SideBar";

const drawerWidth = 300; //tamaño especifico de la barra lateral 

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{display: "flex"}} /* animated */ className="animate__animated animate__fadeIn animate__fast">

        {/* Navbar */}
          <NavBar drawerWidth={ drawerWidth }/>

        {/* Sidebar drawerWidth*/}
          <SideBar drawerWidth={ drawerWidth }/>

        <Box component="main" sx={{flexGrow: 1, p: 3, mt: 8}}>

            {/* Toolbar */}

            { children }
            
        </Box>


    </Box>
  )
}
