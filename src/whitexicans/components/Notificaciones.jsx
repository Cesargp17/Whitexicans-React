import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import { CreateContext } from '../context/CreateContex';
import axios from 'axios';
import { useEffect } from 'react';
import { LoadingThink } from '../../UI/LoadingThink';
import { Alert, Avatar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,    
    // overflow: `${ open ? null : 'scroll' }`,
    // display:`${ open ? null : 'block' }`,
    // height:`${ open ? null : '100%' }`,

    overflow:'scroll',
    display:'block',
    height:'100%',
  };

export const Notificaciones = () => {

    const { open, setOpen, handleOpen, handleClose, Notifications } = useContext(CreateContext);

    const onGetNotifications = async() => {
        const token = localStorage.getItem('token');
        const url = 'https://whitexicanblogs.onrender.com/notification/';
        try {
            const resp = await axios.get(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      onGetNotifications();
    }, []);

    const navigate = useNavigate();

  return (
    <div>
    <Button onClick={handleOpen}>Open modal</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Notificaciones
        </Typography>
        <hr/>
        {
            Notifications.isLoading 
            ? <LoadingThink/>
            : (
                Notifications.notificacicones.map(n=>
                    <div key={n.link}>
                    <Alert  severity="success" color="info">
                        <div key={n.link} className="d-flex align-items-center justify-content-center">
                     <Avatar sx={{ bgcolor: 'green' }} aria-label="recipe">
                    <img src={`${n.author_photo ? n.author_photo : 'https://dummyimage.com/40x40/ced4da/6c757d'}`} width='40px' height='40px' alt="..." />
                    </Avatar>
                        &nbsp;<strong>{ n.author }</strong>
                    </div>
                    <hr></hr>
                    <p>{ n.content }</p>
                    <Box textAlign='center'>
                    {/* <Button onClick={()=>navigate(`/publication/${ n.link }`)} sx={{ color: 'black' }}>
                        Ver
                    </Button> */}
                    </Box>
                    </Alert><br></br>
                    </div>
                    )
            )
        }
      </Box>
    </Modal>
  </div>
  )
}
