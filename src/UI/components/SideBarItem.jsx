import HomeIcon from '@mui/icons-material/Home';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import { CreateContext } from '../../whitexicans/context/CreateContex';

export const SideBarItem = ({ nombre, icon, id, number }) => {

  const { logout, openModal, setOpenModal, user } = useContext(AuthContext);

  const { Publicacion, open, setOpen, handleOpen, handleClose, onGetNotifications } = useContext(CreateContext);

  const isSavingPost = useMemo( () => Publicacion.isSaving === true );

  const navigate = useNavigate();

  const onClickSideBar = (id) => {
    if(id === 7){
      logout();
    }
    else if(id === 2){
      setOpenModal(true);
      navigate(`/perfil/${ user.slug }`)
    }
    else if(id === 5){
      navigate(`/perfil/${ user.slug }`)
      onGetNotifications();
    }
    else if( id === 1 ){
      navigate('/')
      onGetNotifications();
    }
    else if(id === 3){
      navigate('/populars')
      onGetNotifications();
    }else if(id === 4){
      navigate('/follows')
      onGetNotifications();
    }else if(id === 6){
      navigate(`/settings/${ user.slug }`);
    }
    else if(id === 8){
      navigate('/publicidad')
    }
    else if(id === 9){
      navigate('/about')
    }
    else if( id === 10 ) {
      navigate('/updates')
    }
    else if ( id === 11){
      onGetNotifications();
      setOpen(true);
      
    }

  }

  return (
    <ListItem onClick={ ()=>onClickSideBar(id) } disablePadding>
    <ListItemButton>
        <ListItemIcon disabled={isSavingPost}>
            {icon} { number }
        </ListItemIcon>
        <Grid container>
            <ListItemText primary={ nombre } />
        </Grid>
    </ListItemButton>
</ListItem>
  )
}