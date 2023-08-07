// OPCION 1
// import { Link } from 'react-router-dom';
// import Contador from '../Contador';
// import { useState, useEffect } from 'react';

// export const Cart = () => {
//   const [productos, setProductos] = useState([
//     { id: 1, imagen: '/images/filhoteShop.png', nombre: 'Producto 1', cantidad: 1, precio: 5000 },
//     { id: 2, imagen: '/images/filhoteShop.png', nombre: 'Producto 1', cantidad: 1, precio: 10000 },
//   ]);
//   const [subtotal, setSubtotal] = useState(0); // Agrega el estado para el subtotal
//   const [envioOption, setEnvioOption] = useState('valueO');
//   const [totalCompra, setTotalCompra] = useState(0);

//   // Actualiza la cantidad del producto correspondiente en el estado
//   const updateCantidad = (productId, newCantidad) => {
//     setProductos((prevProductos) =>
//       prevProductos.map((producto) =>
//         producto.id === productId ? { ...producto, cantidad: newCantidad } : producto
//       )
//     );
//   };

//   // Calcula el subtotal de la compra
//   const calcularSubtotal = () => {
//     let subtotalCalculado = 0;
//     productos.forEach((producto) => {
//       subtotalCalculado += producto.cantidad * producto.precio;
//     });
//     return subtotalCalculado;
//   };
//   // Actualiza el estado del subtotal
//   const updateSubtotal = () => {
//     const subtotalCalculado = calcularSubtotal();
//     setSubtotal(subtotalCalculado);
//   };

//   // Calcula el total de la compra
//   const calcularTotalCompra = () => {
//     let costoEnvio = 0;
//     if (envioOption === 'value1') {
//       costoEnvio = 1000;
//     } else if (envioOption === 'value2') {
//       costoEnvio = 2000;
//     } else if (envioOption === 'value3') {
//       costoEnvio = 0;
//     }

//     return subtotal + costoEnvio;
//   };

//   // Actualiza el estado del total de la compra cada vez que cambie el desplegable o la cantidad de productos
//   const updateTotalCompra = () => {
//     const total = calcularTotalCompra();
//     setTotalCompra(total);
//   };

//   useEffect(() => {
//     updateSubtotal();
//     updateTotalCompra();
//   }, [productos]);

//   useEffect(() => {
//     updateTotalCompra();
//   }, [envioOption]);

//   useEffect(() => {
//     setTotalCompra(subtotal);
//   }, [subtotal]);

  
//   return (
//     <>
//       <h1 className="title-page">MI CARRITO</h1>
//       <div className="mainCarrito">
//         <div className="ruta2">
//           <span className="raya"></span>
//           <div>
//             <i className="bi bi-cart4"></i>
//             <p>Mi Carrito</p>
//           </div>
//           <div>
//             <i className="bi bi-truck"></i>
//             <p>Envío</p>
//           </div>
//           <div>
//             <i className="bi bi-credit-card"></i>
//             <p>Pago</p>
//           </div>
//         </div>

//         <div className="tablaCarrito">
//           <div className="detalleProductos">
//             <table className='tableCart1'>
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th>IMAGEN</th>
//                   <th>PRODUCTO</th>
//                   <th>CANTIDAD</th>
//                   <th>PRECIO</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {productos.map((producto) => (
//                   <tr key={producto.id}>
//                     <td className="eliminar"><i className="bi bi-trash3"></i></td>
//                     <td><img src={producto.imagen} alt="" width="50px" height="50px" /></td>
//                     <td>{producto.nombre}</td>
//                     <td>
//                       <Contador cantidad={producto.cantidad} className="contadorCart" updateCantidad={(newCantidad) => updateCantidad(producto.id, newCantidad)}></Contador>
//                     </td>
//                     <td>$ {producto.precio}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>


//             <div className="btnSeguir">
//               <Link to="/products">
//                 <button>Seguir Comprando</button>
//               </Link>
//             </div>
//           </div>

//           <div className="linea1"></div>

//           <div className="precios">

//             <div className="tabla-vertical">
//               <table>
//                 <thead>
//                   <tr >
//                     <th colSpan="2">
//                       <h4>TOTAL DEL CARRITO</h4>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <td>
//                     <tr>
//                       <td>SUBTOTAL</td>
//                       <td>${subtotal}</td>
//                     </tr>

//                         <tr>
//                           <td>ENVIO</td>
//                           <td>
//                             <select name="Zip" id="Zip" value={envioOption} onChange={(e) => setEnvioOption(e.target.value)}>
//                               <option value="valueO" disabled>Elegí</option>
//                               <option value="value1">Capital Federal</option>
//                               <option value="value2">Interior del país</option>
//                               <option value="value3">Córdoba</option>
//                             </select>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>Costo del Envío </td>
//                           <td>
//                             {envioOption === 'value1' && <p className="textEnvio">$1000</p>}
//                             {envioOption === 'value2' && <p className="textEnvio2">$2000</p>}
//                             {envioOption === 'value3' && <p className="textEnvio3">$0</p>}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>TOTAL COMPRA</td>
//                           <td>${totalCompra}</td>
//                         </tr>

//                   </td>
//                 </tbody>
//               </table>
//             </div>


//             <div className="btnFinalizarCompra">
//               <Link to="/ordenCompra" className="btnSeguir">
//                 <button>Continuar Compra</button>
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// OPCION 2
// import { Link } from 'react-router-dom';
// import Contador from '../Contador';
// import { useContext } from 'react';
// import { dataContext } from '../../contexts/DataContext';
// import { useState, useEffect } from 'react';

// export const Cart = () => {
//   const { products, setProducts } = useContext(dataContext);
//   const [localProducts, setLocalProducts] = useState(products);
//   const [subtotal, setSubtotal] = useState(0); // Agrega el estado para el subtotal
//   const [envioOption, setEnvioOption] = useState('valueO');
//   const [totalCompra, setTotalCompra] = useState(0);

//   // Actualiza la cantidad del producto correspondiente en el estado
//   const updateCantidad = (productId, newCantidad) => {
//     setLocalProducts((prevProductos) =>
//       prevProductos.map((producto) =>
//         producto.id === productId ? { ...producto, cantidad: newCantidad } : producto
//       )
//     );
//   };

//   // Calcula el subtotal de la compra
//   const calcularSubtotal = () => {
//     let subtotalCalculado = 0;
//     localProducts.forEach((producto) => {
//       subtotalCalculado += producto.cantidad * producto.precio;
//     });
//     return subtotalCalculado;
//   };
//   // Actualiza el estado del subtotal
//   const updateSubtotal = () => {
//     const subtotalCalculado = calcularSubtotal();
//     setSubtotal(subtotalCalculado);
//   };

//   // Calcula el total de la compra
//   const calcularTotalCompra = () => {
//     let costoEnvio = 0;
//     if (envioOption === 'value1') {
//       costoEnvio = 1000;
//     } else if (envioOption === 'value2') {
//       costoEnvio = 2000;
//     } else if (envioOption === 'value3') {
//       costoEnvio = 0;
//     }

//     return subtotal + costoEnvio;
//   };

//   // Actualiza el estado del total de la compra cada vez que cambie el desplegable o la cantidad de productos
//   const updateTotalCompra = () => {
//     const total = calcularTotalCompra();
//     setTotalCompra(total);
//   };

//   useEffect(() => {
//     updateSubtotal();
//     updateTotalCompra();
//   }, [localProducts]);

//   useEffect(() => {
//     updateTotalCompra();
//   }, [envioOption]);

//   useEffect(() => {
//     setTotalCompra(subtotal);
//   }, [subtotal]);
// // Guardar los cambios en el contexto cuando sea necesario
// useEffect(() => {
//   setProducts(localProducts);
// }, [localProducts]);
  
//   return (
//     <>
//       <h1 className="title-page">MI CARRITO</h1>
//       <div className="mainCarrito">
//         <div className="ruta2">
//           <span className="raya"></span>
//           <div>
//             <i className="bi bi-cart4"></i>
//             <p>Mi Carrito</p>
//           </div>
//           <div>
//             <i className="bi bi-truck"></i>
//             <p>Envío</p>
//           </div>
//           <div>
//             <i className="bi bi-credit-card"></i>
//             <p>Pago</p>
//           </div>
//         </div>

//         <div className="tablaCarrito">
//           <div className="detalleProductos">
//             <table className='tableCart1'>
//               <thead>
//                 <tr>
//                   <th></th>
//                   <th>IMAGEN</th>
//                   <th>PRODUCTO</th>
//                   {/* <th>CANTIDAD</th> */}
//                   <th>PRECIO</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {localProducts.map((producto) => (
//                   <tr key={producto.id}>
//                     <td className="eliminar"><i className="bi bi-trash3"></i></td>
//                     <td><img src={producto.url_imagen_producto} alt="" width="50px" height="50px" /></td>
//                     <td>{producto.nombre_producto}</td>
//                     {/* <td>
//                       <Contador cantidad={1} className="contadorCart" updateCantidad={(newCantidad) => updateCantidad(producto.id, newCantidad)}></Contador>
//                     </td> */}
//                     <td>$ {producto.precio_producto}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>


//             <div className="btnSeguir">
//               <Link to="/products">
//                 <button>Seguir Comprando</button>
//               </Link>
//             </div>
//           </div>

//           <div className="linea1"></div>

//           <div className="precios">

//             <div className="tabla-vertical">
//               <table>
//                 <thead>
//                   <tr >
//                     <th colSpan="2">
//                       <h4>TOTAL DEL CARRITO</h4>
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <td>
//                     <tr>
//                       <td>SUBTOTAL</td>
//                       <td>${subtotal}</td>
//                     </tr>

//                         <tr>
//                           <td>ENVIO</td>
//                           <td>
//                             <select name="Zip" id="Zip" value={envioOption} onChange={(e) => setEnvioOption(e.target.value)}>
//                               <option value="valueO" disabled>Elegí</option>
//                               <option value="value1">Capital Federal</option>
//                               <option value="value2">Interior del país</option>
//                               <option value="value3">Córdoba</option>
//                             </select>
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>Costo del Envío </td>
//                           <td>
//                             {envioOption === 'value1' && <p className="textEnvio">$1000</p>}
//                             {envioOption === 'value2' && <p className="textEnvio2">$2000</p>}
//                             {envioOption === 'value3' && <p className="textEnvio3">$0</p>}
//                           </td>
//                         </tr>
//                         <tr>
//                           <td>TOTAL COMPRA</td>
//                           <td>${totalCompra}</td>
//                         </tr>

//                   </td>
//                 </tbody>
//               </table>
//             </div>


//             <div className="btnFinalizarCompra">
//               <Link to="/ordenCompra" className="btnSeguir">
//                 <button>Continuar Compra</button>
//               </Link>
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

//OPCION 3

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { dataContext } from '../../contexts/DataContext';
import { useState, useEffect } from 'react';

export const Cart = () => {
  const { products, setProducts } = useContext(dataContext);
  const [localProducts, setLocalProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0); // Agrega el estado para el subtotal
  const [envioOption, setEnvioOption] = useState('valueO');
  const [totalCompra, setTotalCompra] = useState(0);
  
  

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
                {localProducts.map((producto) => (
                  <tr key={producto.id}>
                    <td className="eliminar"><i className="bi bi-trash3"></i></td>
                    <td><img src={producto.url_imagen_producto} alt="" width="50px" height="50px" /></td>
                    <td>{producto.nombre_producto}</td>
                    {/* <td>
                      <Contador cantidad={1} className="contadorCart" updateCantidad={(newCantidad) => updateCantidad(producto.id, newCantidad)}></Contador>
                    </td> */}
                    <td>$ {producto.precio_producto}</td>
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