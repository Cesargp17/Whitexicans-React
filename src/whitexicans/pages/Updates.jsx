import { Grid, Typography } from '@mui/material';
import React from 'react'
import { WhitexicansLayout } from '../../UI/layout/WhitexicansLayout'
import { useScreenSize } from '../hooks/useScreenSize';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

export const Updates = () => {

    const { width, height } = useScreenSize();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpenModal(true);
    const handleClose = () => setOpenModal(false);

    const getSizeScreen = () => {
        if(width >= 606) {
          setOpen(true);
        };
    
        if(width <= 599){
          setOpen(false);
        }
      };
  
      React.useEffect(() => {
        getSizeScreen();
      }, [width]);

  return (
    <WhitexicansLayout>
            <Typography align="center" component="h1" variant={ open ? 'h5' : 'h6' } sx={{ ml: `${ open ? '0px' : '40px'}`, mt: 5 }}>
              ACTUALIZACIONES
            </Typography>

            <Grid container spacing={0} direction="column" alignItems="center" justify="center">

            <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Actualización Beta v1.1.1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hemos agregado nuevas carácteristicas a Whitexicans Blog: 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Notificaciones: ahora cuando un usuario comenta y da like a una de tus publicaciones, recibirás una notificaciones. 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - En una próxima actualizacion agregaremos más caracteristicas a las notificaciones.
        </Typography>
      </CardContent>
    </Card>

            <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Actualización Beta v1.0.1
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Hemos agregado nuevas carácteristicas a Whitexicans Blog: 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Busqueda de usuarios. 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - La posibilidad de ir al perfíl de las personas al dar click en algún comentario.
        </Typography>
      </CardContent>
    </Card>

            <Card sx={{ width: `${ open ? '450px' : '280px'}`, ml: `${ open ? '0px' : '40px' }`, mt: 5, mb: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/bienvenidos-design-template-92b9a04b0affb3b048d2dd966d44e21d_screen.jpg?ts=1571621892"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Actualización Beta v1.0.0
        </Typography>
        <Typography variant="body2" color="text.secondary">
          La primera Beta de WhitexicansBlog ya esta aquí, mira todo lo que esta versión incluye: 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Crear publicaciones con categoria, titulo, descripcion e imagen. 
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Añadir una foto de perfíl.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Comentar y dar like a las publicaciones.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Vista de publicaciones más populares y de seguidos.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Seguir a los usuarios, ser seguido por los usuarios.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Vista del perfíl personal.
        </Typography>
        <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
          - Vista del perfíl de los usuarios.
        </Typography>
      </CardContent>
    </Card>
    </Grid>
    </WhitexicansLayout>
  )
}
