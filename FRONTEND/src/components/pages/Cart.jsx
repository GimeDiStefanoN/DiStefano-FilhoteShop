
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useState, useEffect } from 'react';
import { CartContext } from '../../contexts/CartContext';

export const Cart = () => {
  //const [localProducts, setLocalProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // Agrega el estado para el subtotal
  const [envioOption, setEnvioOption] = useState('valueO');
  const [totalCompra, setTotalCompra] = useState(0);
  const { cart } = useContext(CartContext);
  console.log("🚀 ~ file: Cart.jsx:13 ~ Cart ~ cart:", cart)


  useEffect(() => {
    // Calcular el subtotal
    const calculatedSubtotal = cart.reduce((total, product) => total + product.precio_producto, 0);
    setSubtotal(calculatedSubtotal);

    // Calcular el total de la compra considerando el costo de envío
    let calculatedTotal = calculatedSubtotal;
    if (envioOption === 'value1') {
      calculatedTotal += 1000;
    } else if (envioOption === 'value2') {
      calculatedTotal += 2000;
    } else if (envioOption === 'value3') {
      // No se agrega costo de envío
    }
    setTotalCompra(calculatedTotal);
  }, [cart, envioOption]);

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
                      <td>${subtotal.toFixed(2)}</td>
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
                      <td>${totalCompra.toFixed(2)}</td>
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