import { useState, useEffect, useContext } from 'react';
import { dataContext } from '../contexts/DataContext';

//obtengo las categorias unicas
const getCategoriasUnicas = (products) => {
  const categoriasUnicas = new Set();
  products.forEach((product) => {
    product.Categoria.forEach((categoria) => {
      categoriasUnicas.add(categoria.nombre_categoria);
    });
  });
  return Array.from(categoriasUnicas);
};

const Desplegable = (props) => {
  const { products } = useContext(dataContext);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const categoriasUnicas = getCategoriasUnicas(products);
    setCategorias(categoriasUnicas);
  }, [products]);

  return (
    <div className='contenedorDesplegable'>
      <select className='desplegable' name="desplegable" id="desplegable" onChange={props.onChange} defaultValue={''} value={props.value}>
        <option value='' disabled>
          {props.placeholder}
        </option>
        {categorias.map((categoria, index) => (
          <option key={index} value={categoria}>
            {categoria}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Desplegable;
  