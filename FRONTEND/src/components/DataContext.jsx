// aca llamo al fetch
//https://www.youtube.com/watch?v=uPYfPcMtOvI&ab_channel=onthecode

import { createContext,useState, useEffect } from 'react';

export const dataContext = createContext();

const DataProvider = ({children}) =>{
  const [products, setProducts]= useState([]);

  useEffect(()=>{
    fetch('http://localhost:3000/')
    .then((response) => {
      console.log("🚀 ~ file: DataContext.jsx:14 ~ useEffect ~ response:", response)
      return response.json()
    })
    .then((products) => {
      console.log("🚀 ~ file: DataContext.jsx:16 ~ .then ~ products:", products)
      return setProducts(products)
    })
  },[])

  return(
    <dataContext.Provider value={{products}}>
      {children}
    </dataContext.Provider>
  )
}

export default DataProvider;