//vista del carrito
import { Link } from 'react-router-dom';

export const Cart = () => {
  return (
    <>
      <h1 className="title-page">MI CARRITO</h1>
      <div className="mainCarrito">
        <div className="ruta">
          <nav className="pasosCompra">
            <span className="rayaConectora"></span>
            <ul>
              <li className="pasoUno activo">
                <i className="bi bi-cart4"></i>
                <p>Mi Carrito</p>
              </li>
              <li className="pasoTres ">
                <i className="bi bi-truck"></i>
                <p>Envío</p>
              </li>
              <li className="pasoCuatro ">
                <i className="bi bi-credit-card"></i>
                <p>Pago</p>
              </li>
            </ul>
          </nav>
        </div>

        <div className="tablaCarrito">
          <div className="detalleProductos">
            <div className="title">
              <ul>
                <li id="titleeliminar"></li>
                <li id="titleproducto">PRODUCTO</li>
                <li id="titlecantidad">CANTIDAD</li>
                <li id="titlesubtotal">SUBTOTAL</li>
              </ul>
            </div>
            <div className="cadaproductos">
              {/* {cart.productsCart.map((product) => ( */}
                {/* <div className="productoindividual" key={product.id}>
                  <div className="eliminar">
                    <form action={`/deleteProduct/${product.id}`} method="post">
                      <button className="btnAdmin"><i className="bi bi-trash3"></i></button>
                    </form>
                  </div> */}
                  <div className="productoindividual">
                  <div className="eliminar">
                    <form action="" method="post">
                      <button className="btnAdmin"><i className="bi bi-trash3"></i></button>
                    </form>
                  </div>
                  <div className="elemento">
                    <div className="datosElemento">
                      <div className="imagen">
                        <img src="#" alt="" />
                        {/* <img src={product.imagen} alt="" /> */}
                      </div>
                      <div className="nombre">
                        <p>Cepillo</p>
                        {/* <p>{product.nombre}</p> */}
                      </div>
                    </div>
                    <div className="numerosElemento">
                      <div className="contadorCantidad">
                        <button id="menos" type="button">-</button>
                        <input type="text" id="contador" className="form-control" value="1" min="1" />
                        <button id="mas" type="button">+</button>
                      </div>
                      <div className="valor">
                        <p>$100</p>
                        {/* <p>$ {product.precio.toLocaleString('es-AR')}</p> */}
                      </div>
                    </div>
                  </div>
                </div>
              {/* ))} */}
            </div>
            <div className="btnSeguir">
              <Link to="/products">
                <button>Seguir Comprando</button>
              </Link>
            </div>
          </div>

          <div className="linea1"></div>

          <div className="precios">
            <h4>TOTAL DEL CARRITO</h4>
            <div className="cuadro">
              <div className="cadaUno">
                <p>SUBTOTAL</p>
                <div className="cadaUnoDetalle">
                  {/* <p>$ {totalPrice.toLocaleString('es-AR')} </p> */}
                  <p>$100</p>
                </div>
              </div>
              <div className="linea2"></div>
              <div className="cadaUno">
                <p>ENVIO</p>
                <div className="cadaUnoDetalle">
                  <select name="Zip" id="Zip">
                    <option value="value1">Capital Federal</option>
                    <option value="value2">Interior del pais</option>
                    <option value="value2">CORDOBA</option>
                  </select>
                  <p className="textEnvio"> Costo del Envio $1000</p>
                  <p className="textEnvio2"> Costo del Envio $2000</p>
                  <p className="textEnvio2"> Costo del Envio $0</p>
                </div>
              </div>
              <div className="linea2"></div>
              <div className="cadaUno">
                <p>TOTAL DE LA COMPRA</p>
                <div className="cadaUnoDetalle">
                  <p>$100</p>
                  {/* <p>$ {totalPrice.toLocaleString('es-AR')} </p> */}
                </div>
              </div>
            </div>

            <div className="btnFinalizarCompra">
              <button onClick={() => alert('¿Está seguro de continuar la compra?')}>Continuar Compra</button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};