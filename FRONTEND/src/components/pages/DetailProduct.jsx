import { Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { dataContext } from '../DataContext';
import { useParams } from 'react-router-dom';


export const DetailProduct = () => {
  const { id } = useParams();

  const { products } = useContext(dataContext);
// Busca el producto con el id correspondiente
const product = products.find((product) => product.id === parseInt(id));  
  if (!product) {
    return <div>Cargando...</div>;
  }
  return (
    <>
      <h1>DETALLE</h1>

      <div className="main_Detail">
      
        {/* <div className="ruta_Product">
          <Link to="/products">INICIO</Link>
          <span>/</span>
          {product.Categoria.map((categoria) => (
            <React.Fragment key={categoria.id}>
              {categoria.nombre_categoria}
              <span>/</span>
            </React.Fragment>
          ))}
          <span>{product.nombre_producto}</span>
        </div> */}

        <Link to="/products" className="btn_regresar">
          Volver al Catálogo
        </Link>

        <div className="contenedor_Card">
          <div className="card_detail">
            <div className="grupoDetail1">
              <div className="container">
                <i className="bi bi-chevron-left"></i>
                <img src={product.url_imagen_producto} alt="Image 1" className="img_Cards" />
                <i className="bi bi-chevron-right"></i>
              </div>

              <div className="description">
                {/* {product.Categoria.map((categoria, index) => (
                  <div key={index} className="text-grey">
                    {categoria.nombre_categoria}
                  </div>
                ))} */}

                <div className="text-black">{product.nombre_producto}</div>

                <div className="text-red">PRECIO $ {product.precio_producto.toLocaleString('es-AR')}</div>

                <div className="linea"></div>

                <div className="botonesDetail">
                  <div className="cantidad">
                    <div className='stock'>
                    <span>CANTIDAD</span>
                    <span>Quedan {product.stock_producto} unid.</span>
                    </div>

                    <div className="contadorCantidad">
                      <button id="menos" type="button">-</button>

                      <input type="text" id="contador" className="form-control" value="1" min="1" />

                      <button id="mas" type="button">+</button>
                    </div>
                  </div>

                  <div className="comprar">
                    <form action={`/addProduct/${product.id}`} method="post">
                      <Link className="btn_cart btnAdmin" to=''>
                        <span className="material-symbols-outlined">shopping_cart</span>
                      </Link>
                    </form>

                  </div>
                </div>
              </div>
            </div>

            <div className="linea"></div>

            <div className="grupoDetail2">
              <h4 className="titleDescripcion">DESCRIPCIÓN</h4>
              <p className="descripcionCompleta">{product.detalle_producto}</p>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};