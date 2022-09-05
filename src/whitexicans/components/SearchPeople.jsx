import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import axios from 'axios';
import { useEffect } from 'react';
import { LoadingThink } from '../../UI/LoadingThink';
import { useForm } from '../hooks/useForm';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string'
import { useLocation } from 'react-router-dom'

const style = {
    position: 'absolute',
    top: '15%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  const formData = {
    username: '',
  };

export const SearchPeople = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [Datos, setDatos] = useState();
    let info = [];

    const onGetAllPeople = async() => {
        const token = localStorage.getItem('token');
        const url = 'https://whitexicanblogs.onrender.com/profile/';
        try {
            const resp = await axios.get(url,{
                headers: {
                  'Authorization': `Bearer ${token}`
                }
              });
              if(resp.data !== undefined){
                for (const persona of resp.data) {
                    info.push(persona)
                    setDatos(info);
                }
              }
        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
      onGetAllPeople();
    }, []);

    const navigate = useNavigate();
    

    const filterOptions = createFilterOptions({
        matchFrom: 'start',
        stringify: (option) => option.username,
      });

      const [Busqueda, setBusqueda] = useState();

      const onSearchPeople = (e) => {
        e.preventDefault();
        if(Busqueda == null) return;
        navigate('/')
        if(Datos !== undefined){
            const informacion = Datos.find(user=>user.user.username === Busqueda);
            navigate(`/view/${ informacion.slug }`)
        }
      }

  return (
    <div>
        <IconButton onClick={handleOpen} aria-label="delete">
        <SearchIcon sx={{ color: 'white' }}/>&nbsp;<Typography sx={{ color: 'white' }}>Buscar...</Typography>
        </IconButton>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
                <Box sx={style}>
                    {
                        personas == null
                        ?<LoadingThink/>
                        :(
                            <form onSubmit={ onSearchPeople }>
                            <Autocomplete
                            options={personas}
                            getOptionLabel={(option) => option.username}
                            filterOptions={filterOptions}
                            sx={{ width: 300 }}
                            onChange={ e => setBusqueda(e.target.innerText) } 
                            renderInput={(params) => <TextField value={ Busqueda } onChange={ e => setBusqueda(e.target.innerText) }  {...params} label="Buscar..." />}
                          />
                    <IconButton type='submit' aria-label="delete">
                    <SearchIcon sx={{ color: 'black' }}/>&nbsp;<Typography sx={{ color: 'black' }}>Buscar...</Typography>
                    </IconButton>
                            </form>
                        )
                    }
                </Box>

    </Modal>
  </div>
  )
}

let personas = [];
// const [Persona, setPersona] = useState();

const onGetAllPeople = async() => {
    const token = localStorage.getItem('token');
    const url = 'https://whitexicanblogs.onrender.com/profile/';
    try {
        const resp = await axios.get(url,{
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if(resp.data !== undefined){
            for (const persona of resp.data) {
                personas.push(persona.user)
                // setPersona(personas)
            }
          }
    } catch (error) {
        console.log(error)
    }
};

  onGetAllPeople()