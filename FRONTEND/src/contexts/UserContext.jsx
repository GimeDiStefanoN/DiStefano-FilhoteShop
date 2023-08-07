import { createContext, useState, useEffect } from 'react';

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
    return (
        <UserContext.Provider value={{ users, setUsers }}>
            {children}
        </UserContext.Provider>
    )
}

export default userProvider