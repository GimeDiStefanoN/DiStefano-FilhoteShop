import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../../contexts/DataContext';
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
      <h1 className="title-page">DETALLE</h1>

      <div className="main_Detail">

        <div className="ruta_Product">
          <Link to="/products"> INICIO </Link>
          <span> <i className="bi bi-chevron-double-right"></i> </span>
          {product.Categoria.map((categoria, index) => (
            <div key={index} className="text-grey">
              {categoria.nombre_categoria}
            </div>
          ))}
          <span> <i className="bi bi-chevron-double-right"></i> </span>
          <span>{product.nombre_producto}</span>
        </div>

        <Link to="/products" className="btn_regresar btn_cart text-btn">
          Volver al Catálogo
        </Link>

        <div className="contenedor_Card">
          <div className="card_detail">
            <div className="grupoDetail1">
              <div className="container">
                <i className="bi bi-chevron-left text-white"></i>
                <img src={product.url_imagen_producto} alt="Image 1" className="img_Cards" />
                <i className="bi bi-chevron-right text-white"></i>
              </div>

              <div className="description categoriaDetail">
                {product.Categoria.map((categoria, index) => (
                  <div key={index} className="text-grey">
                    {categoria.nombre_categoria}
                  </div>
                ))}

                <div className="text-black">{product.nombre_producto}</div>

                <div className="text-red">PRECIO $ {product.precio_producto.toLocaleString('es-AR')}</div>

                <div className="linea"></div>

                <div className="botonesDetail">
                  <div className="cantidad">
                    <div className='stock'>
                      <span>CANTIDAD</span>
                      <span>Quedan {product.stock_producto} unid.</span>
                    </div>

                    {/* <div className="contadorCantidad">
                      <button id="menos" type="button">-</button>

                      <input type="text" id="contador" className="form-control" value="1" min="1" />

                      <button id="mas" type="button">+</button>
                    </div> */}
                  </div>

                  <div className="comprar">
                    <form action={`/addProduct/${product.id}`} method="post">
                      <Link className="btn_cart btnAdmin text-btn" to=''>
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