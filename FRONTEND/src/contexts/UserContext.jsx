import { createContext, useState, useEffect } from 'react';
import { userStore } from '../stores/store';

export const UserContext = createContext();    
    
const userProvider = ({children}) =>{
    const [users, setUsers]= useState([]);

    const url= "http://localhost:3000/adminUsers";

    useEffect(()=>{
        fetch(url)
        .then((response) => {return response.json()
        })
        .then((products) => 
         setUsers(products))
        
        .catch((error) => {
        console.error(error);
        });
    },[])

      // Obtener el valor de 'user' del estado 'userStore'
    const { user } = userStore();

    return (
        <UserContext.Provider value={{ users, setUsers, user }}>
            {children}
        </UserContext.Provider>
    )
}

export default userProvider