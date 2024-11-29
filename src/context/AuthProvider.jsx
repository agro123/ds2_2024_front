import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { API } from "../constants";

export const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        console.error('Error al usar el contexto');
        return;
    }
    return context;
}

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        loadInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const saveUserData = (data) => {
        if (data) {
            setUserData(data);
            localStorage.setItem('userData', JSON.stringify(data))
            localStorage.setItem('authToken', data.token)
        }
    }

    const loadInfo = () => {
        let _userData = localStorage.getItem('userData');
        if(_userData){
            _userData = JSON.parse(_userData);
            axios.get(API.private + `users/${_userData.id}`,{headers: API.authHeaders})
            .then((res) => {
                console.log('user logged: ', res.status)
                saveUserData(_userData);
            }).catch((err) => {
                console.log('user not logged: ', err?.message)
                clearSavedData()
            });
        }
    }

    const clearSavedData = () => {
        setUserData(null);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
    }

    return (
        <AuthContext.Provider
            value={{
                saveUserData,
                clearSavedData,
                userData
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}

export default AuthProvider;