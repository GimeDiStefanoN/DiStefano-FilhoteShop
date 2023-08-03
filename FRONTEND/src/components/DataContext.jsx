// aca llamo al fetch
//https://www.youtube.com/watch?v=uPYfPcMtOvI&ab_channel=onthecode

import { createContext,useState, useEffect } from 'react';

export const dataContext = createContext();

const DataProvider = ({children}) =>{
  const [products, setProducts]= useState([]);
  const [loading, setLoading] = useState(true); // Estado para manejar la carga

  const url= "http://localhost:3000/products";
  useEffect(()=>{
    fetch(url)
    .then((response) => {return response.json()
    })
    .then((products) => {
      return setProducts(products),
      setLoading(false);
    }).catch((error) => {
      console.error(error);
      setLoading(false); // Actualizar el estado a "false" en caso de error
    });
  },[])

  return(
    <dataContext.Provider value={{products, loading}}>
      {children}
    </dataContext.Provider>
  )
}

export default DataProvider;