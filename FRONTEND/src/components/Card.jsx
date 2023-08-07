import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    // DATOS PETSHOP
    <div className="card" id={`user-${product.id}`}>
      <div className="container">
        <i className="bi bi-chevron-left text-white"></i>
        <img src={product.url_imagen_producto} alt="Image 1" className="img_Cards" />
        <i className="bi bi-chevron-right text-white"></i>
      </div>
      {product.Categoria.map((categoria) => (
        <div className="text-grey" key={categoria.id}>
          {categoria.nombre_categoria}
        </div>
      ))}
      <div className="text-black">{product.nombre_producto}</div>
      <div className="text-red">PRECIO $ {product.precio_producto.toLocaleString('es-AR')}</div>
      <div className="botones">
        <Link to={`/addProduct/${product.id}`} className="btn_cart  text-btn">
        <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
        
        <Link className="btn_cart  text-btn" to={`/detail_Product/${product.id}`}>
          <span>Ver Detalle</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
