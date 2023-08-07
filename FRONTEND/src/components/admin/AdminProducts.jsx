import { useContext } from 'react';
import { dataContext } from '../../contexts/DataContext';
import { Link } from 'react-router-dom';

export const AdminProducts = () => {
  const { products } = useContext(dataContext);

  return (
    <>
    
    <h1 className="title-page">EDICION PRODUCTOS</h1>

    <div className="main_Admin main_Admin_prod">
      <div className="containerdataTable">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th colSpan="12" className='contenedorAddProd'><button><i className="bi bi-plus-circle"></i> Agregar Producto</button></th>
              </tr>
              <tr>
                <th colSpan="12">CONTROL DE PRODUCTOS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>DETALLE</td>
                <td>PRECIO</td>
                <td>STOCK</td>
                <td>IMAGEN</td>
                <td>ID CATEGORIA</td>
                <td>BORRAR</td>
                <td>EDITAR</td>
              </tr>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.nombre_producto}</td>
                  <td>{product.detalle_producto}</td>
                  <td>{product.precio_producto}</td>
                  <td>{product.stock_producto}</td>
                  <td>{product.url_imagen_producto}</td>
                  <td>{product.id_categoria}</td>
                  <td>
                    <form action={`/deleteUser/${product.id}`} method="post">
                      <button className="btnAdmin">
                        <i className="bi bi-trash3"></i>
                      </button>
                    </form>
                  </td>
                  <td>
                    <form>
                      <button
                        className="btnAdmin"
                        onClick={() => (window.location.href = `#openModal${product.id}`)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     

      <div className="contenedorButtonAdmin">
          <Link to="/inicioAdmin" className="btn_regresar btn_cart text-btn">
            Volver al Panel Admin
          </Link>
        </div>
    </div>
    </>
  );
};