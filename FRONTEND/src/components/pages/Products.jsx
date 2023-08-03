
import { useContext } from 'react';
import { dataContext } from '../DataContext';
import Busqueda from '../Busqueda';
import Desplegable from '../Desplegable';
import Check from '../Check';
import Button from '../Button';
import Catalogo from '../Catalogo';
import { Loading } from '../Loading';
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
  const [buscadorPrecioMaximo, setBuscadorPrecioMaximo] = useState("");
  const [buscadorOrdenMayor, setBuscadorOrdenMayor] = useState(false);

  const nameFilter = (e) => {
    const valorIngresado = e.target.value
    setBuscadorNombre(valorIngresado)
  }

  const precioFilter = (e) => {
    const precioIngresado = e.target.value
    setBuscadorPrecio(precioIngresado)
  }

  const categoriaFilter = (e) => {
    const categoriaIngresada = e.target.value
    setBuscadorCategoria(categoriaIngresada)
  }

  const ordenFilter = (e) => {
    const ordenIngresado = e.target.checked
    setBuscadorOrden(ordenIngresado)
  }
  const precioMaximoFilter = (e) => {
    const precioMaximoIngresado = e.target.value;
    setBuscadorPrecioMaximo(precioMaximoIngresado);
  };

  const ordenMayorFilter = (e) => {
    const ordenMayorIngresado = e.target.checked;
    setBuscadorOrdenMayor(ordenMayorIngresado);
  };

  useEffect(() => {
    setStateProducts(products);
    setLoading(false);
  }, [products]);

  useEffect(() => {
    // Filtro general
    const productosFiltrados = stateProducts.filter((product) =>
      product.nombre_producto.toLowerCase().includes(buscadorNombre.toLowerCase()) &&
      (buscadorPrecio === "" || product.precio_producto >= parseFloat(buscadorPrecio)) &&
      (buscadorPrecioMaximo === "" || product.precio_producto <= parseFloat(buscadorPrecioMaximo)) &&
      (buscadorCategoria === "" || product.Categoria.some((categoria) => categoria.nombre_categoria === buscadorCategoria))
    );

    // ordeno por precio
    if (buscadorOrden) {
      productosFiltrados.sort((a, b) => a.precio_producto - b.precio_producto);
    } else if (buscadorOrdenMayor) {
      productosFiltrados.sort((a, b) => b.precio_producto - a.precio_producto);
    }

    // Actualizo estados
    setFilteredProds(productosFiltrados);
    sethasFilter(
      buscadorNombre.length > 0 ||
      buscadorPrecio.length > 0 ||
      buscadorPrecioMaximo.length > 0 ||
      buscadorCategoria.length > 0 ||
      buscadorOrden ||
      buscadorOrdenMayor
    );

    setLoading(false);
  }, [
    buscadorNombre,
    buscadorPrecio,
    buscadorPrecioMaximo,
    buscadorCategoria,
    buscadorOrden,
    buscadorOrdenMayor,
    stateProducts
  ]);

  const resetFiltros = () => {
    setBuscadorNombre("");
    setBuscadorPrecio("");
    setBuscadorCategoria("");
    setBuscadorOrden(false);
    setBuscadorPrecioMaximo("");
    setBuscadorOrdenMayor(false);
  };

  return (
    <div>
      <h1 className="title-page">CATALOGO PRODUCTOS</h1>

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

          <Busqueda
            placeholder='Ingresá un precio máximo'
            onChange={precioMaximoFilter}
          ></Busqueda>

          <Desplegable
            placeholder='Elegí una categoria'
            onChange={categoriaFilter}
            value={buscadorCategoria}
          ></Desplegable>

          <Check
            labelCheck='Ordenar por Menor Precio:'
            onChange={ordenFilter}
          ></Check>

          <Check
            labelCheck='Ordenar por Mayor Precio:'
            onChange={ordenMayorFilter}
          ></Check>
        </div>

        <Button
          nombre="Reset"
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
              <Catalogo products={filteredProds} />
              : <p className='msjErrorBusqueda'>No se encontraron elementos filtrados.</p>

            : stateProducts.length > 0 ?
              <Catalogo products={stateProducts} />
              : <p className='msjErrorBusqueda'>Inconvenientes al traer datos de API</p>
      }

    </div>
  );
};

export default Products;
