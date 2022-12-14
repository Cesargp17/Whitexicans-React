import { useContext } from "react"
import { AuthContext } from "../../auth/context/AuthContext"
import axios from 'axios';
import jwt_decode from "jwt-decode";

export const useAuthStore = () => {

    const { logout, checkingAuth, login, user } = useContext(AuthContext);

    const refreshUrl = 'https://whitexicanblogs.onrender.com/api/token/refresh/';

    const checkAuthToken = async() => {
        checkingAuth();
        const token = localStorage.getItem('token');
        const refresh = localStorage.getItem('refresh');
        if(!token) return logout();
        try {
            const resp = await axios.post(refreshUrl,{ refresh: refresh });
            let access = resp.data.access;
            const decoded = jwt_decode(token);
            let username = decoded.username;
            let user_id = decoded.user_id;
            let slug = decoded.slug;
            localStorage.setItem('token', resp.data.access);
            localStorage.setItem('token-init-date', decoded.exp);
            localStorage.setItem('refresh', resp.data.refresh)

            const profile = `https://whitexicanblogs.onrender.com/${slug}`;
            const respuesta = await axios.get(profile,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            login(access, username, user_id, slug, respuesta.data.follows, respuesta.data.posts, respuesta.data.followers, respuesta.data.profile_img);
            
        } catch (error) {
            console.log(error)
            localStorage.clear();
            logout();
        }
    }

    return {
        checkAuthToken
    }
}

// const resp = await axios.post(loginUrl, {username, password})