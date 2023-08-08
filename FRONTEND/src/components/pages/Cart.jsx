
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../../contexts/DataContext';
import { useState, useEffect } from 'react';

export const Cart = () => {
  const { products, setProducts } = useContext(dataContext);
  //const [localProducts, setLocalProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // Agrega el estado para el subtotal
  const [envioOption, setEnvioOption] = useState('valueO');
  const [totalCompra, setTotalCompra] = useState(0);
  const { cart, setCart } = useContext(dataContext);
  // ...
  const compraProductos = (product) => {
    console.log(product);
    setCart([...cart, product]);
  };

  return (
    <>
      <h1 className="title-page">MI CARRITO</h1>
      <div className="mainCarrito">
        <div className="ruta2">
          <span className="raya"></span>
          <div>
            <i className="bi bi-cart4"></i>
            <p>Mi Carrito</p>
          </div>
          <div>
            <i className="bi bi-truck"></i>
            <p>Envío</p>
          </div>
          <div>
            <i className="bi bi-credit-card"></i>
            <p>Pago</p>
          </div>
        </div>

        <div className="tablaCarrito">
          <div className="detalleProductos">
            <table className='tableCart1'>
              <thead>
                <tr>
                  <th></th>
                  <th>IMAGEN</th>
                  <th>PRODUCTO</th>
                  {/* <th>CANTIDAD</th> */}
                  <th>PRECIO</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((product) => (
                  <tr key={product.id}>
                    <td className="eliminar"><i className="bi bi-trash3"></i></td>
                    <td><img src={product.url_imagen_producto} alt="" width="50px" height="50px" /></td>
                    <td>{product.nombre_producto}</td>
                    {/* <td>
                      <Contador cantidad={1} className="contadorCart" updateCantidad={(newCantidad) => updateCantidad(producto.id, newCantidad)}></Contador>
                    </td> */}
                    <td>$ {product.precio_producto}</td>
                  </tr>
                ))}
              </tbody>
            </table>


            <div className="btnSeguir">
              <Link to="/products">
                <button>Seguir Comprando</button>
              </Link>
            </div>
          </div>

          <div className="linea1"></div>

          <div className="precios">

            <div className="tabla-vertical">
              <table>
                <thead>
                  <tr >
                    <th colSpan="2">
                      <h4>TOTAL DEL CARRITO</h4>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <td>
                    <tr>
                      <td>SUBTOTAL</td>
                      <td>${subtotal}</td>
                    </tr>

                    <tr>
                      <td>ENVIO</td>
                      <td>
                        <select name="Zip" id="Zip" value={envioOption} onChange={(e) => setEnvioOption(e.target.value)}>
                          <option value="valueO" disabled>Elegí</option>
                          <option value="value1">Capital Federal</option>
                          <option value="value2">Interior del país</option>
                          <option value="value3">Córdoba</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td>Costo del Envío </td>
                      <td>
                        {envioOption === 'value1' && <p className="textEnvio">$1000</p>}
                        {envioOption === 'value2' && <p className="textEnvio2">$2000</p>}
                        {envioOption === 'value3' && <p className="textEnvio3">$0</p>}
                      </td>
                    </tr>
                    <tr>
                      <td>TOTAL COMPRA</td>
                      <td>${totalCompra}</td>
                    </tr>

                  </td>
                </tbody>
              </table>
            </div>


            <div className="btnFinalizarCompra">
              <Link to="/ordenCompra" className="btnSeguir">
                <button>Continuar Compra</button>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};