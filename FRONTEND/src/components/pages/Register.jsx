//vista del form de registro
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export const Register = () => {
  const [validaciones, setValidaciones] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [valoresCapturados, setValoresCapturados] = useState({
    nombre_completo: '',
    username: '',
    password: '',
    repeatPassword: '',
    email: '',
    direccion: '',
    provincia: '',
    pais: '',
    nacimiento: '',
    telefono: '',
    aceptTerms: false,
  });

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica de registro, enviar los datos al servidor, etc.
    // Por ejemplo, puedes hacer una solicitud POST a tu API con los datos del formulario.
  };

  return (
    <>
      <h1 className="title-page">REGISTRATE</h1>
      <div className="contenedor-main">
        <div className="contenedorMainregister">
          {/* DIV CON ALERTS DE ERRORES */}
          {validaciones.map((validacion, index) => (
            <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>{validacion.msg}</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          ))}

          {/* DIV MODAL REGISTRO EXITOSO */}
          {showModal && (
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-body">¡Usuario registrado con Éxito!</div>
                  <div className="modal-footer">
                    <button type="button" className="btn-user" onClick={() => setShowModal(false)}>
                      Iniciar Sesión
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* FORMULARIO DE REGISTRO */}
          <form className="formregister" onSubmit={handleRegisterSubmit}>
            {/* TITULO DEL FORM */}
            <h2>Completá los datos</h2>
            {/* DATOS */}
            <div className="datosregister">
              <div className="elemento">
                <label htmlFor="nombre_completo">
                  Nombre Completo <span>*</span>
                </label>
                <div className="inputs">
                  <i className="bi bi-person"></i>
                  <input
                    className="inputs_Forms"
                    type="text"
                    id="nombre_completo"
                    name="nombre_completo"
                    value={valoresCapturados.nombre_completo}
                    onChange={(e) => setValoresCapturados({ ...valoresCapturados, nombre_completo: e.target.value })}
                  />
                </div>
              </div>

              <div className="elemento">
      <label htmlFor="username">Nombre de Usuario <span>*</span></label>
      <div className="inputs">
        <i className="bi bi-person"></i>
        <input
          className="inputs_Forms"
          type="text"
          id="username"
          name="username"
          value={valoresCapturados.username}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, username: e.target.value })}
        />
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="password">Contraseña <span>*</span></label>
      <div className="inputs">
        <i className="bi bi-lock"></i>
        <input
          className="inputs_Forms"
          type="password"
          id="password"
          name="password"
          value={valoresCapturados.password}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, password: e.target.value })}
        />
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="repeatPassword">Repetir Contraseña <span>*</span></label>
      <div className="inputs">
        <i className="bi bi-lock"></i>
        <input
          className="inputs_Forms"
          type="password"
          id="repeatPassword"
          name="repeatPassword"
          value={valoresCapturados.repeatPassword}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, repeatPassword: e.target.value })}
        />
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="email">Correo Electrónico <span>*</span></label>
      <div className="inputs">
        <i className="bi bi-envelope"></i>
        <input
          className="inputs_Forms"
          type="email"
          id="email"
          name="email"
          value={valoresCapturados.email}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, email: e.target.value })}
        />
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="direccion">Direccion <span>*</span></label>
      <div className="inputs">
        <i className="bi bi-person"></i>
        <input
          className="inputs_Forms"
          type="text"
          id="direccion"
          name="direccion"
          value={valoresCapturados.direccion}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, direccion: e.target.value })}
        />
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="provincia">Provincia</label>
      <div className="inputs">
        <select
          name="provincia"
          id="provincia"
          value={valoresCapturados.provincia}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, provincia: e.target.value })}
        >
          <option disabled value="">
            Seleccionar tu provincia
          </option>
          <option value="BUENOS AIRES">BUENOS AIRES</option>
      <option value="CATAMARCA">CATAMARCA</option>
      <option value="CHACO">CHACO</option>
      <option value="CHUBUT">CHUBUT</option>
      <option value="CÓRDOBA">CÓRDOBA</option>
      <option value="CORRIENTES">CORRIENTES</option>
      <option value="ENTRE RÍOS">ENTRE RÍOS</option>
      <option value="FORMOSA">FORMOSA</option>
      <option value="JUJUY">JUJUY</option>
      <option value="LA PAMPA">LA PAMPA</option>
      <option value="LA RIOJA">LA RIOJA</option>
      <option value="MENDOZA">MENDOZA</option>
      <option value="MISIONES">MISIONES</option>
      <option value="NEUQUÉN">NEUQUÉN</option>
      <option value="RÍO NEGRO">RÍO NEGRO</option>
      <option value="SALTA">SALTA</option>
      <option value="SAN JUAN">SAN JUAN</option>
      <option value="SAN LUIS">SAN LUIS</option>
      <option value="SANTA CRUZ">SANTA CRUZ</option>
      <option value="SANTA FE">SANTA FE</option>
      <option value="SANTIAGO DEL ESTERO">SANTIAGO DEL ESTERO</option>
      <option value="TIERRA DEL FUEGO">TIERRA DEL FUEGO</option>
      <option value="TUCUMÁN">TUCUMÁN</option>

        </select>
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="pais">Pais</label>
      <div className="inputs">
        <select
          name="pais"
          id="pais"
          value={valoresCapturados.pais}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, pais: e.target.value })}
        >
          <option disabled value="">
            Seleccionar un pais
          </option>
          <option value="Argentina">Argentina</option>
          {/* Resto de las opciones de país */}
        </select>
      </div>
    </div>

    <div className="elemento">
      <label htmlFor="nacimiento">Fecha de Nacimiento <span>*</span></label>
      <div className="inputs">
        <input
          className="inputs_Forms"
          type="date"
          name="nacimiento"
          id="nacimiento"
          value={valoresCapturados.nacimiento}
          onChange={(e) => setValoresCapturados({ ...valoresCapturados, nacimiento: e.target.value })}
        />
      </div>
    </div>

    <div className="contenedorPhone">
      <div className="elementoPhone">
        <label htmlFor="telefono">Número de Celular <span>*</span></label>
        <div className="inputs">
          <i className="bi bi-telephone"></i>
          <input
            className="inputs_Forms"
            type="tel"
            id="telefono"
            name="telefono"
            value={valoresCapturados.telefono}
            onChange={(e) => setValoresCapturados({ ...valoresCapturados, telefono: e.target.value })}
          />
        </div>
      </div>
      <small>Formato válido: 351 - 4545454</small>
    </div>
  </div>

              {/* T&C */}
              <div className="checks" id="registerChecks">
                <div className="elemento">
                  <input
                    className="inputs_Check"
                    type="checkbox"
                    id="aceptTerms"
                    name="aceptTerms"
                    checked={valoresCapturados.aceptTerms}
                    onChange={(e) => setValoresCapturados({ ...valoresCapturados, aceptTerms: e.target.checked })}
                  />

                  <label htmlFor="aceptTerms">
                    Acepto los <a href="#" target="_blank">Términos y Condiciones</a> <span>*</span>
                  </label>
                </div>
              </div>
              {/* BOTONES */}
              <div className="buttonsregister">
                <button className="resetear" type="reset">
                  Resetear
                </button>
                <button className="registrar" type="submit">
                  Registrar
                </button>
              </div>
              <p className="textButton">
                Ya tengo Usuario, <a href="/login">Ingresar</a>{' '}
              </p>
              </form>

            </div>
      </div>
    </>
  );
};
