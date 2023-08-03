// import React from 'react';
 
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
  const { products } = useContext(dataContext); // Obtener los datos del contexto
  const [stateProducts, setStateProducts] = useState(products); 
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
    setStateProducts(products);
    setLoading(false);
  }, [products]);

  /////////
  useEffect(() => {
    // Filtro general que se aplica cuando cambian los valores de búsqueda
    const productosFiltrados = stateProducts.filter((product) =>
      product.nombre_producto.toLowerCase().includes(buscadorNombre.toLowerCase()) &&
      (buscadorPrecio === "" || product.precio_producto >= parseFloat(buscadorPrecio)) &&
      (buscadorCategoria === "" || product.Categoria.some((categoria) => categoria.nombre_categoria === buscadorCategoria))
    );

    // Aplicar ordenamiento si está activo
    if (buscadorOrden) {
      productosFiltrados.sort((a, b) => a.precio_producto - b.precio_producto);
    }

    // Actualizar los productos filtrados y el estado de filtros
    setFilteredProds(productosFiltrados);
    sethasFilter(
      buscadorNombre.length > 0 ||
      buscadorPrecio.length > 0 ||
      buscadorCategoria.length > 0 ||
      buscadorOrden
    );

    setLoading(false);
  }, [buscadorNombre, buscadorPrecio, buscadorCategoria, buscadorOrden, stateProducts]);

  const resetFiltros = () => {
    setBuscadorNombre("");
    setBuscadorPrecio("");
    setBuscadorCategoria("");
    setBuscadorOrden(false);
  };

  return (
    <div>
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
          onChange={precioFilter}
        ></Busqueda>

        <Desplegable
          placeholder='Elegí una categoria'
          onChange={categoriaFilter}
          value={buscadorCategoria}
        ></Desplegable>

        <Check
          labelCheck = 'Ordenar por Menor Precio:'
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
              
              : stateProducts.length > 0 ? 
                  <Catalogo products={stateProducts}/>
                : <p className='msjErrorBusqueda'>Inconvenientes al traer datos de API</p>      
          }
        
    </div>
  );
};

export default Products;
