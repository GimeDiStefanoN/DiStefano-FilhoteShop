import { useContext } from 'react';
import { dataContext } from '../../contexts/DataContext';
import { Link, useParams } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react';
import { productStore } from '../../stores/store';

export const AdminProducts = () => {
  const { products, setProducts } = useContext(dataContext);
  const [show, setShow] = useState(false);
  // const [productData, setProductData] = useState({
  //   nombre_producto: '',
  //   detalle_producto: '',
  //   precio_producto: '',
  //   stock_producto: '',
  //   url_imagen_producto: '',
  //   id_categoria: '',
  // });
  const { id } = useParams();
  const product = productStore((state) => state.product);


  // funciones
  //AGREGAR PRODUCTO
    // crear funcion para agregar productos
  //MODIFICAR PRODUCTO
    // crear funcion para editar productos
// Función para manejar el cambio en los campos del formulario
// const handleInputChange = (event) => {
//   const { name, value } = event.target;
//   setProductData({
//     ...productData,
//     [name]: value,
//   });
// };

// Función para enviar la solicitud POST para agregar o editar un producto
// const handleSubmit = async () => {
//   try {
//     const requestOptions = {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(productData),
//     };
//     if (id) {
//       await fetch(`http://localhost:3000/adminProduct/${id}`, requestOptions);
//     } else {
//       await fetch('http://localhost:3000/addProductAdmin', requestOptions);
//     }
//     handleClose();
//     // Realizar una nueva solicitud para obtener los productos actualizados desde el servidor
//     // Esto actualizará la lista de productos mostrados en la tabla
//   } catch (error) {
//     console.log('Error al conectar con el servidor:', error);
//   }
// };


  //ELIMINAR PRODUCTO
  const eliminarProducto = async (productId) => {
    try{ 
     const resp = await fetch(`http://localhost:3000/deleteProductAdmin/${productId}`, {
     method: 'POST',
   });
     if (resp.ok) {
       console.log('Producto eliminado correctamente.');
       setProducts(products.filter(product => product.id !== productId));

     } else {
       console.log('Error al eliminar el Producto en el servidor.');
     }
   }catch (error) {
     console.log('Error al conectarse con el servidor:', error);
   }
 };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    
  }

  return (
    <>
    
    <h1 className="title-page">EDICION PRODUCTOS</h1>

    <div className="main_Admin main_Admin_prod">
      <div className="containerdataTable">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th colSpan="12" className='contenedorAddProd'><button className='btnAdmin'><i className="bi bi-plus-circle"></i> Agregar Producto</button></th>
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
                    <button className="btnAdmin" onClick={() => eliminarProducto(product.id)}>
                          <i className="bi bi-trash3"></i>
                    </button>
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

      <div className="modales">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title" id="editModalLabel">
                  {/* {id ? 'Editar Producto' : 'Agregar Producto'}   */}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h5 ></h5>
                  <div className="modal-body">
                    <form action="" method="post" onSubmit="">
                      <div>
                        <label htmlFor="nombre_producto">Nombre:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="nombre_producto"
                          placeholder=""
                          // value={productData.nombre_producto}
                          // onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="detalle_producto">Detalle:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="detalle_producto"
                          placeholder=""
                          // value={productData.detalle_producto}
                          // onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="precio_producto">Precio:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="precio_producto"
                          placeholder=""
                          // value={productData.precio_producto}
                          // onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="stock_producto">Stock:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="stock_producto"
                          placeholder=""
                          // value={productData.stock_producto}
                          // onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="url_imagen_producto">Imagen:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="url_imagen_producto"
                          placeholder=""
                          // value={productData.url_imagen_producto}
                          // onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="id_categoria"> ID Categoria:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="id_categoria"
                          placeholder=""
                          // value={productData.id_categoria}
                          // onChange={handleInputChange}
                        />
                      </div>
                    
                      {/* onClick={handleSubmit} */}
                      <Button variant="" type="submit" className="btn_cart btnAdmin text-btn" > 
                        <i className="bi bi-save"></i>
                      </Button>
                    </form>
                  </div>
                </div>
              </Modal.Body>

            </Modal>
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