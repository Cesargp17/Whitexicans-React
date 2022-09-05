import { AppBar, Avatar, Badge, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useScreenSize } from '../whitexicans/hooks/useScreenSize';
import { CreateContext } from '../whitexicans/context/CreateContex';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { SearchPeople } from '../whitexicans/components/SearchPeople';


export const NavBar = ({ drawerWidth = 255 }) => {

    const { OpenMenú: open, setOpenMenú: setOpen } = useContext(CreateContext);

    const { width, height } = useScreenSize();
  
    const onClickMenu = () => {
      if(open){
        setOpen(false)
      }else{
        setOpen(true)
      };
    };

    const { user } = useContext(AuthContext);

    const navigate = useNavigate();

  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
            <Badge sx={{ mt: 2 }} badgeContent='Beta v1.0.1' color="secondary">
                <Typography variant='h6' noWrap component='div'> Whitexicans</Typography>
                </Badge>
                {/* <IconButton onClick={()=>navigate(`/perfil/${ user.slug }`)} color='secondary'> */}
                                <SearchPeople/>
            {
            width <= 599
            ? (
                <>
                <Avatar sx={{ bgcolor: 'green', mr: 5 }} aria-label="recipe">
                <img onClick={()=>navigate(`/perfil/${ user.slug }`)} src={`${user.img ? user.img : 'https://dummyimage.com/40x40/ced4da/6c757d'}`} width='40px' height='40px' alt="..." />
             </Avatar>
              <IconButton
              onClick={onClickMenu}
              size='sm'
              sx={{
                color: 'white',
                ':hover': { backgroundColor: 'gray', opacity: 0.9 },
                position: 'fixed',
                right: 10,
              }}
            >
              {
                open
                ? <CloseIcon sx={{ fontSize: 30 }} />
                : <MenuIcon sx={{ fontSize: 30 }} />
              }
            </IconButton>
            </>
            )
            : <>
                            <IconButton onClick={()=>navigate(`/perfil/${ user.slug }`)} color='secondary'>
            <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
               <img src={`${user.img ? user.img : 'https://dummyimage.com/40x40/ced4da/6c757d'}`} width='40px' height='40px' alt="..." />
            </Avatar>&nbsp;
                <Typography variant='h6' noWrap component='div'> { user.username } &nbsp; </Typography>
                </IconButton>
                </>
          }

            </Grid>

        </Toolbar>
    </AppBar>
  )
}