
import { createContext,useState, useEffect } from 'react';

export const dataContext = createContext();

const DataProvider = ({children}) =>{
  const [products, setProducts]= useState([]);
  const [loading, setLoading] = useState(true);

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
      setLoading(false);
    });
  },[])

  return(
    <dataContext.Provider value={{products, loading}}>
      {children}
    </dataContext.Provider>
  )
}

export default DataProvider;