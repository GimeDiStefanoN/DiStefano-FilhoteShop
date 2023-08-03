//import React from 'react';
//import { Link, useLoaderData } from 'react-router-dom';
import { Logo } from '../Logo';
//import { NavBar } from '../Navbar';

export const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="contenedor-footer">
          <div className="info">
        <div className="contenedor-logo">
           <Logo></Logo>
            <div className="TextoEmpresa">
                <span className="name">FILHOTE SHOP</span>
                <span>Tienda de Mascotas</span>
            </div>
        </div>

        <div className="redes">
        <ul>
                <li><a href="https://www.instagram.com" rel="noreferrer"><i className="bi bi-instagram"></i></a></li>
                <li><a href="https://es-la.facebook.com" rel="noreferrer"><i className="bi bi-facebook"></i></a></li>
                <li><a href="https://www.tiktok.com/es/" rel="noreferrer"><i className="bi bi-tiktok"></i></a></li>
            </ul>
        </div>
          </div>
          <div className="data">
            <h3>Links Importantes</h3>
            <ul>
                <li><a href="#openModal1">Medios de Pago</a></li>
                <li><a href="#openModal2">FAQs</a></li>
                <li><a href="#openModal3">Legales</a></li>
                <li><a href="/contact">Anular compra</a></li>
                
            </ul>
            <div className="modales">
                <div id="openModal1" className="modalDialog">
                    <div>
                        <a href="#close" title="Close" className="close">X</a>
                        <h3>MEDIOS DE PAGO</h3>
                        <p>A través de Plataforma Mercadopago</p>
                        <ul className="mediospago">
                            <li><img src="https://http2.mlstatic.com/storage/logos-api-admin/a5f047d0-9be0-11ec-aad4-c3381f368aaf-m.svg" alt="visa"></img></li>
                            <li><img src="https://http2.mlstatic.com/storage/logos-api-admin/aa2b8f70-5c85-11ec-ae75-df2bef173be2-m.svg" alt="mastercard"></img></li>
                            <li><img src="https://http2.mlstatic.com/storage/logos-api-admin/fbf867c0-9108-11ed-87b1-fd4dd99fac51-m.svg" alt="american express"></img></li>
                            <li><img src="https://http2.mlstatic.com/storage/logos-api-admin/992bc350-f3be-11eb-826e-6db365b9e0dd-m.svg" alt="naranja"></img></li>
                        </ul>
                    </div>
                </div>
                <div id="openModal2" className="modalDialog">
                    <div>
                        <a href="#close" title="Close" className="close">X</a>
                        <h3>PREGUNTAS FRECUENTES</h3>
                        <p><strong>¿Hacen envíos?</strong> </p>
                        <p>Si, a todo el páis (Argentina)</p>
                        <p><strong>¿Que formas de pago aceptan?</strong> </p>
                        <p>En el local, efectivo, transferencias, tarjetas de débito, crédito, pagos con QR. En la web, tarjetas de débito y crédito solamente</p>
                        <p><strong>Compré y no lo quiero ¿Que hago?</strong> </p>
                        <p>podes cancelar el pedido dentro del plazo de 10 días. Completá el formulario que aparece en <a id="link_Anulacion" href="/contact">Anular compra</a> y te informaran como continuar.</p>
                    
                    </div>
                </div>
                <div id="openModal3" className="modalDialog">
                    <div>
                        <a href="#close" title="Close" className="close">X</a>
                          <h3>CONDICIONES LEGALES DEL SITIO</h3>
                          <p><strong>Terminos y condiciones</strong> </p>
                          <p>El stock, precios y detalle de productos es el publicado en nuestro sitio web. Los envíos solo se realizan dentro de la Républica Argentina</p>
                          <p><strong>USO DEL WEBSITE</strong> </p>
                          <p>El usuario acepta las Reglas mediante el solo uso del sitio web y declara bajo juramento tener 18 ó más años de edad. </p>
                          <p><strong>POLÍTICA DE PRIVACIDAD</strong> </p>
                          <p>Los datos facilitados a Filhote Shop para el uso del website son necesarios para establecer la relación contractual entre el cliente y la empresa y serán tratados únicamente para las operaciones relativas al cumplimiento de las Reglas, encuestas, suscripciones, ofertas y cualquier otra acción comercial</p>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div className="copy">
          <p> Diseñado y desarrollado por Gimena Di Stefano Nicolina © 2023</p>
        </div>
      </footer>
    </>
    
  );
};