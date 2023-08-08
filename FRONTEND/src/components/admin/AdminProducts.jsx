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
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [productEdit, setProductEdit] = useState({
    nombre_producto: '',
    detalle_producto: '',
    precio_producto: '',
    stock_producto: '',
    url_imagen_producto: '',
    id_categoria: '',
  });
  const { id } = useParams();
  const product = productStore((state) => state.product);
  const [isEditing, setIsEditing] = useState(false); // Para indicar si estás editando un producto existente
  const [modalTitle, setModalTitle] = useState('Agregar Producto'); // Título del modal

  // funciones


const productToEdit = products.find((p) => p.id === id);

const handleInputChange = (event) => {
  const { name, value } = event.target;
  setProductEdit({
    ...productEdit,
    [name]: value,
  });
};

// Función para enviar la solicitud POST para agregar o editar un producto
const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    const opciones = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productEdit),
    };

    if (isEditing) {
      const response = await fetch(`http://localhost:3000/adminProduct/${id}`, opciones);
      if (response.ok) {
        window.alert('Producto Modificado OK')
      } else {
        console.log('No se pudo editar producto.');
      }
    } else {
      const response = await fetch('http://localhost:3000/adminProduct', opciones);
      if (response.ok) {
        window.alert('Producto Agregado')
      } else {
        console.log('No se pudo agregar producto');
      }
    }
  } catch (error) {
    console.log('Error al conectarse con el servidor:', error);
  }
};

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

  const handleShow = (productId) => {
    if (productId) {
      console.log('El botón tiene asociado el id:', productId);
      const productToEdit = products.find((product) => product.id === productId);
      // Establecer el estado productEdit con los valores del producto a editar
      setProductEdit(productToEdit);
      setIsEditing(true); // Estás editando un producto existente
      setModalTitle('Editar Producto'); // Actualiza el título del modal
    } else {
      console.log('El botón no tiene asociado ningún id.');
      setProductEdit(null);
      setIsEditing(false); // Estás agregando un nuevo producto
      setModalTitle('Agregar Producto'); // Actualiza el título del modal
    }
    setShow(true);
  }

  
  useEffect(() => {
    // Obtener el producto que se está editando
    const product = products.find((product) => product.id === editingProduct);
    setEditingProduct(product);
  }, [editingProduct, products]);
  return (
    <>
    
    <h1 className="title-page">EDICION PRODUCTOS</h1>

    <div className="main_Admin main_Admin_prod">
      <div className="containerdataTable">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th colSpan="12" className='contenedorAddProd'>
                  <Button variant="" className="btnAdmin" onClick={() => handleShow()}>
                    <i className="bi bi-plus-circle"></i>
                    Agregar Producto
                  </Button>
                </th>
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
                    <Button variant="" className="btnAdmin" onClick={() => eliminarProducto(product.id)}>
                          <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                  <td>
                      <Button variant="" className="btnAdmin" onClick={() => handleShow(product.id)}>
                        <i className="bi bi-pencil"></i>
                      </Button>
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
                {modalTitle}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h5 ></h5>
                  <div className="modal-body">
                    <form action={id ? `http://localhost:3000/adminProduct/${id}` : 'http://localhost:3000/addProductAdmin'} method="post" onSubmit={handleSubmit}>
                      <div>
                        <label htmlFor="nombre_producto">Nombre:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="nombre_producto"
                          placeholder={productToEdit?.nombre_producto}
                          value={productEdit?.nombre_producto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="detalle_producto">Detalle:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="detalle_producto"
                          placeholder={productToEdit?.detalle_producto}
                          value={productEdit?.detalle_producto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="precio_producto">Precio:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="precio_producto"
                          placeholder={productToEdit?.precio_producto}
                          value={productEdit?.precio_producto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="stock_producto">Stock:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="stock_producto"
                          placeholder={productToEdit?.stock_producto}
                          value={productEdit?.stock_producto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="url_imagen_producto">Imagen:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="url_imagen_producto"
                          placeholder={productToEdit?.url_imagen_producto}
                          value={productEdit?.url_imagen_producto}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="id_categoria"> ID Categoria:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="id_categoria"
                          placeholder={productToEdit?.id_categoria}
                          value={productEdit?.id_categoria}
                          onChange={handleInputChange}
                        />
                      </div>
                    
                      {/*  */}
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