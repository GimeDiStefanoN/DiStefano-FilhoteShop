export const OrdenCompra = () => {
    // Ejemplo de datos de productos
    const productos = [
        { id: 1, nombre: 'Producto 1', cantidad: 2, precioUnitario: 5000 },
        { id: 2, nombre: 'Producto 2', cantidad: 1, precioUnitario: 10000 },
    ];
    
    return (
        <>
            <h1 className="title-page">ORDEN DE COMPRA</h1>
            <div className="mainOrden">
                <div className="datosUser">
                    <h5>Datos del Comprador</h5>
                    <table className="tablaUser">
                        <tbody>           
                            <tr >
                                <td>Nombre Completo</td>
                                <td>Juan Perez</td>
                            </tr>
                            <tr >
                                <td>Teléfono</td>
                                <td>0351-135135</td>
                            </tr>
                            <tr >
                                <td>Email</td>
                                <td>JuanPerez@mail.com</td>
                            </tr>         
                        </tbody>
                    </table>
                </div>
                <div className="datosCompra">
                    <h5>Datos del Pedido</h5>
                    <div className="contenidoCompra">
                        <div className="detalle">
                            <table className="tablaProductos">
                                <thead>
                                    <tr>
                                        <th>PRODUCTO</th>
                                        <th>Cantidad</th>
                                        <th>Pr. Unitario</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.map((producto) => (
                                        <tr key={producto.id}>
                                            <td>{producto.nombre}</td>
                                            <td>{producto.cantidad}</td>
                                            <td>$ {producto.precioUnitario}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="precioFinal">
                            <p>TOTAL</p>
                            <p>$ {productos.reduce((total, producto) => total + producto.cantidad * producto.precioUnitario, 0)}</p>
                        </div>
                    </div>
                </div>
                <div className="datosEnvio">
                    <h5>Direccion de Envio</h5>
                    <div className="contenedorInputs">
                        <input type="text" value="direccion" readOnly />
                        <input type="text" value="Provincia" readOnly />
                        <input type="text" value="Pais" readOnly />
                    </div>
                    <p>* El envio solo se realiza a la dirección registrada en tu cuenta <b> ¿Quieres otra dirección?</b> Envianos un mensaje antes de comprar para modificarla</p>
                </div>
                <div className="DatosFilhote">
                    <h5>Datos del Vendedor</h5>
                    <div className="contenidoFilhote">
                        <div className="contenedorLogo">
                            <img src="/images/filhoteShop.png" alt="Logo" />
                        </div>
                        <div className="contenedorDatos">
                            <p>FILHOTE SHOP</p>
                            <p>CUIT: 30-X0245GQS9-6</p>
                            <p>EMAIL: ventas@filhoteshop.com</p>
                        </div>
                    </div>
                </div>
                <div className='contenedorBtn'>
                    <button className="btn_cart btnAdmin">Confirmar Compra</button>
                </div>
            </div>
        </>
    )
}