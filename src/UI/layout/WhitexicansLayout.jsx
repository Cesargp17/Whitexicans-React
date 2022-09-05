import { AddOutlined } from '@mui/icons-material';
import { IconButton, Toolbar } from '@mui/material';
import { Box } from '@mui/system'
import { NavBar } from '../NavBar';
import { SideBar } from '../SideBar';
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from 'react';
import { CreateContext } from '../../whitexicans/context/CreateContex';
import CloseIcon from '@mui/icons-material/Close';
import { useScreenSize } from '../../whitexicans/hooks/useScreenSize';
import { SearchPeople } from '../../whitexicans/components/SearchPeople';

export const WhitexicansLayout = ({ children }) => {

  const { OpenMenú: open, setOpenMenú: setOpen } = useContext(CreateContext);

  const { width, height } = useScreenSize();

  const onClickMenu = () => {
    if(open){
      setOpen(false)
    }else{
      setOpen(true)
    };
  };

 
  return (
    <Box  sx={{ display: 'flex' }} className='animate__animated animate__fadeIn'>

    <NavBar/>

    <SideBar/>

    <Box component='main' sx={{ flexGrow: 1 }}>
        <Toolbar />

        { children }

    </Box>
</Box>
  )
}
