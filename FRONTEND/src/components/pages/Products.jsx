// import React from 'react';
import Card from '../Card'; 
import { useContext } from 'react';
import { dataContext } from '../DataContext';
import Busqueda from '../Busqueda';
import Desplegable from '../Desplegable';
import Check from '../Check';
import Button from '../Button';
import Catalogo from '../Catalogo';
import {Loading} from '../Loading';
import { useState, useEffect } from 'react'


const Products = () => {
   //const { products } = useContext(dataContext);
   const [products, setProducts] = useState([]);

   const [loading, setLoading] = useState(true);
  const [buscadorNombre, setBuscadorNombre] = useState("");
  const [filteredProds, setFilteredProds] = useState([]);
  const [hasFilter, sethasFilter] = useState(false)
  const [buscadorPrecio, setBuscadorPrecio] = useState("");
  const [buscadorCategoria, setBuscadorCategoria] = useState("");
  const [buscadorOrden, setBuscadorOrden] = useState(false);
   
  const nameFilter = (e) =>{
    const valorIngresado = e.target.value
    setBuscadorNombre(valorIngresado)
  }
  
  const precioFilter = (e) =>{
    const precioIngresado = e.target.value
    setBuscadorPrecio(precioIngresado)
  }

  const categoriaFilter = (e) =>{
    const categoriaIngresada = e.target.value
    setBuscadorCategoria(categoriaIngresada)
  }

  const ordenFilter = (e) =>{
    const ordenIngresado = e.target.checked
    setBuscadorOrden(ordenIngresado)
  }
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProds(data);
        setLoading(false);       
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  useEffect(() =>{

    const newProducts = products.filter(product => product.title.toLowerCase().includes(buscadorNombre.toLowerCase()));
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorNombre.length > 0);
  }, [buscadorNombre, products]);

  useEffect(()=>{
    const newProducts = products.filter(product => product.price >= buscadorPrecio);
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorPrecio.length > 0);
  }, [buscadorPrecio, products])

  useEffect(()=>{
    const newProducts = products.filter(product => product.category === buscadorCategoria);
    setFilteredProds([...newProducts]);
    sethasFilter(buscadorCategoria.length > 0);
  }, [buscadorCategoria, products])

  useEffect(()=>{
    if (buscadorOrden) {
      const newProducts = [...products].sort((a, b) => a.price - b.price);
      setFilteredProds(newProducts);
      sethasFilter(true);
    } else {
      setFilteredProds([]);
      sethasFilter(false);
    }
  }, [buscadorOrden, products])

  //para que funcionen todos juntos

  const filtrosJuntos = () => {
    const productosFiltrados = products.filter((product) =>
      product.title.toLowerCase().includes(buscadorNombre.toLowerCase()) &&
      product.price >= buscadorPrecio &&
      (buscadorCategoria.length === 0 || product.category === buscadorCategoria)
    );
  
    if (buscadorOrden) {
      productosFiltrados.sort((a, b) => a.price - b.price);
    }
  
    setFilteredProds(productosFiltrados);
    sethasFilter(
      buscadorNombre.length > 0 ||
      buscadorPrecio.length > 0 ||
      buscadorCategoria.length > 0 ||
      buscadorOrden
    );
  };
  
  useEffect(() => {
    filtrosJuntos();
  }, [buscadorNombre, buscadorPrecio, buscadorCategoria, buscadorOrden, products]);

  const resetFiltros = () => {
    setBuscadorNombre("");
    setBuscadorPrecio("");
    setBuscadorCategoria("");
    setBuscadorOrden(false);
  };

  return (
    <main>
      <h1>CATALOGO PRODUCTOS</h1>

        {/* Aca deberia ir el span que diga "¡Hola! y el username" */}

  <div className="filtros">
      <div className="filtros-parte1">
      <Busqueda
          placeholder='Ingresá tu Busqueda'
          value={buscadorNombre}
          onChange={nameFilter}
        ></Busqueda>
      </div>
      <div className="filtros-parte2">

        <Busqueda
          placeholder='Ingresá un precio mínimo'
          value ={buscadorPrecio}
          onChange={precioFilter}
        ></Busqueda>

        <Desplegable
          placeholder='Elegí una categoria'
          value ={buscadorCategoria}
          onChange={categoriaFilter}>
            
        </Desplegable>

        <Check
          labelCheck = 'Ordenar por Menor Precio:'
          value ={buscadorOrden}
          onChange={ordenFilter}
        ></Check>
      </div>

        <Button
        nombre= "Reset"
        onClick={resetFiltros}
        ></Button>
    </div>
          
          {
            loading ? (
              <Loading />
              ) 
            : 
              hasFilter ?
                filteredProds.length > 0 ?
                <Catalogo products={filteredProds}/>
                : <p className='msjErrorBusqueda'>No se encontraron elementos filtrados.</p>
              
              : products.length > 0 ? 
                  <Catalogo products={products}/>
                : <p className='msjErrorBusqueda'>Inconvenientes al traer datos de API</p>      
          }
        
    </main>
  );
};

export default Products;
