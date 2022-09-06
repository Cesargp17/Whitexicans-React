import React, { useContext, useReducer, useState } from 'react'
import { CreateContext } from './CreateContex'
import axios from 'axios';
import { useEffect } from 'react';
import { types } from './types';
import { createReducer } from './createReducer';

export const CreateProvider = ({ children }) => {

  const [Publicacion, dispatch] = useReducer(createReducer, [{}]);

    const [Categorias, setCategorias] = useState({
        data: [],
        isLoading: true
    });

    const [Photos, setPhotos] = useState([]);

    const [OpenMenú, setOpenMenú] = useState(false)

    const isSaving = () => {
      const publicacion = {
        isSaving: true,
      }
      const action = {
        type: types.isSaving,
        payload: publicacion
      };
      dispatch(action);
    };

    const isSavingFalse = () => {
      const publicacion = {
        isSaving: false,
      }
      const action = {
        type: types.isSavingFalse,
        payload: publicacion
      };
      dispatch(action);
    };
  

    const onCreateNewPublication = () => {
      const publicacion = {
        isSaving: false,
      }
      const action = {
        type: types.createPublication,
        payload: publicacion
      };
      dispatch(action);
    };

    const getCategory = async() => {
        const token = localStorage.getItem('token');
        const url = 'https://whitexicanblogs.onrender.com/category/';
        if(!token) return;
        const resp = await axios.get(url,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
          setCategorias({
             data: resp.data,
             isLoading: false
         });
    }

    useEffect(() => {
      getCategory();
    }, []);

    const fileUpload = async( file ) => {
      if(!file) throw new Error('No hay nada para subir');
      const cloudUrl = 'https://api.cloudinary.com/v1_1/djxmfnsct/image/upload';
      const formData = new FormData();
      formData.append('upload_preset', 'whitexicans');
      formData.append('file', file);
      try {
        const resp = await fetch(cloudUrl,{
          method: 'POST',
          body: formData
        });
        if(!resp.ok) throw new Error('No se pudo subir la imagen');
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
      } catch (error) {
        console.log(error)
        throw new Error(error.message);
      }
    }

    let Imagenes = [];

    const startUploadingFiles = async( files = [] ) => {
      isSaving();
      // fileUpload(files[0]);
      const fileUploadPromises = [];
      for (const file of files) {
        fileUploadPromises.push(fileUpload(file));
      }
      const photosUrls = await Promise.all( fileUploadPromises );
      onCreateNewPublication();
      for(let i = 0; i<=photosUrls.length; i++){
        if(photosUrls[i] === undefined){
          break;
        }
        Imagenes.push(photosUrls[i]);
      }
      setPhotos(Imagenes)
    };
    const createPublication = async(titulo, descripcion, categoria) => {
      const token = localStorage.getItem('token');
      const url = 'https://whitexicanblogs.onrender.com/post/';
      if(!token) return;
      try {
        const resp = await axios.post(url, { title: titulo, description: descripcion, category: categoria, image: Photos  },{
          headers:{
            'Authorization': `Bearer ${token}`
           } 
        });
      } catch (error) {
        console.log(error)
      }
    };

    const [Comment, setComments] = useState({
      comment: [],
      isLoading: true,
    });

    let data = [];

    const onGetComments = async(id) => {
      const token = localStorage.getItem('token');
        const url = `https://whitexicanblogs.onrender.com/comment/${ id }`;
        if(!token) return;
        const resp = await axios.get(url,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        for (const comment of resp.data) {
          data.push(comment[0]);
        }
        setComments({
          comment: data,
          isLoading: false
        })
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [Notifications, setNotifications] = useState({
      notificaciones: [],
      isLoading: true
    });

    const onGetNotifications = async() => {
      const token = localStorage.getItem('token');
      const url = 'https://whitexicanblogs.onrender.com/notification/';
      try {
          const resp = await axios.get(url,{
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
          setNotifications({
            notificacicones: resp.data,
            isLoading: false
          });
      } catch (error) {
          console.log(error)
      }
  };


  useEffect(() => {
    onGetNotifications();
  }, []);

  return (
    <CreateContext.Provider value={{ createPublication, Categorias: Categorias, Publicacion: Publicacion, startUploadingFiles, Photos: Photos, onGetComments, Comment, isSaving, isSavingFalse, OpenMenú: OpenMenú, setOpenMenú, open: open, setOpen, handleOpen, handleClose, onGetNotifications, Notifications: Notifications }}>
        { children }
    </CreateContext.Provider>
  )
}
