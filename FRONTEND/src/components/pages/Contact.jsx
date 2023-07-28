//vista del form de contacto
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';

export const Contact = () => {
  return (
    <>
      <h1>CONTACTO</h1>
      <div className="contenedor-main">
        <div className="contenedorMaincontacto">
          <form className="formcontacto" action="">
            <h2>Completa el Formulario</h2>

            <div className="datoscontacto">
              <div className="elemento">
                <label htmlFor="name">Nombre Completo</label>
                <div className="inputs">
                  <i className="bi bi-person"></i>
                  <input
                    className="inputs_Forms"
                    type="text"
                    id="name"
                    name="name"
                    maxLength="20"
                    placeholder="Nombre y Apellido"
                    required
                  />
                </div>
              </div>

              <div className="elemento">
                <label htmlFor="email">Correo Electrónico</label>
                <div className="inputs">
                  <i className="bi bi-envelope"></i>
                  <input
                    className="inputs_Forms"
                    type="email"
                    id="email"
                    name="email"
                    placeholder="tuemail@dominio.com"
                    required
                  />
                </div>
              </div>

              <div className="contenedorPhone">
                <div className="elementoPhone">
                  <label htmlFor="phone">Número de Celular</label>
                  <div className="inputs">
                    <i className="bi bi-telephone"></i>
                    <input
                      className="inputs_Forms"
                      type="tel"
                      id="phone"
                      name="phone"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>
                <small>Formato válido: 351 - 4545454</small>
              </div>

              <div className="elemento">
                <label htmlFor="accion">Motivo</label>
                <div className="inputs">
                  <select name="accion" id="accion">
                    <option disabled selected>
                      Seleccionar motivo
                    </option>
                    <option value="A">Consulta</option>
                    <option value="B">Arrepentimiento de compra</option>
                  </select>
                </div>
              </div>
              <div className="elemento">
                <label htmlFor="mensaje">Mensaje</label>
                <div className="inputs">
                  <textarea name="mensaje" id="mensaje" rows="5"></textarea>
                </div>
              </div>
            </div>

            <div className="buttonscontacto">
              <button className="consultar" type="submit">
                Enviar Consulta
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};