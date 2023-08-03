//import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    

    // DATOS PETSHOP
    <div className="card" id={`user-${product.id}`}>
      <div className="container">
        <i className="bi bi-chevron-left"></i>
        <img src={product.url_imagen_producto} alt="Image 1" className="img_Cards" />
        <i className="bi bi-chevron-right"></i>
      </div>
      {product.Categoria.map((categoria) => (
        <div className="text-grey" key={categoria.id}>
          {categoria.nombre_categoria}
        </div>
      ))}
      <div className="text-black">{product.nombre_producto}</div>
      <div className="text-red">PRECIO $ {product.precio_producto.toLocaleString('es-AR')}</div>
      <div className="botones">
        <form action={`/addProduct/${product.id}`} method="post">
          <button className="btnAdmin">
            <span className="material-symbols-outlined">shopping_cart</span>
          </button>
        </form>
        <Link className="btn_cart btnAdmin" to={`/detail_Product/${product.id}`}>
          <span >Ver Detalle</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
