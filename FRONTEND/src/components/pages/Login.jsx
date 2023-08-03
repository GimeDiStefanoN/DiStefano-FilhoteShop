//vista login
import React from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { useState } from 'react';

export const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [validaciones, setValidaciones] = useState([]);
  const [username, setUsername] = useState('');
  const [rememberUser, setRememberUser] = useState(false);

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Aquí manejar la lógica de inicio de sesión
    // Por ejemplo, puedes enviar la información al servidor para autenticar al usuario
  };

  return (
    <div>
      <h1 className="title-page">INICIAR SESION</h1>
      <div className="contenedor-main">
        <div className="contenedorMainlogin">
          {/* MODAL CON ERROR */}
          {showModal && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>Usuario o contraseña incorrecto</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          )}
          {/* MENSAJES DE ERRORES VALORES MINIMOS */}
          {validaciones.map((validacion, index) => (
            <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
              <strong>{validacion.msg}</strong>
              <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          ))}

          {/* FORMULARIO DE LOGIN */}
          <form className="formlogin" onSubmit={handleLoginSubmit}>
            {/* TITULO DEL FORM */}
            <h2>Ingresá tus datos</h2>
            {/* DATOS */}
            <div className="datoslogin">
              <div className="elemento">
                <label htmlFor="username">Nombre de Usuario</label>
                <div className="inputs">
                  <i className="bi bi-person"></i>
                  <input
                    className="inputs_Forms"
                    type="text"
                    id="username"
                    name="username"
                    maxLength="10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="elemento">
                <label htmlFor="password">Contraseña</label>
                <div className="inputs">
                  <i className="bi bi-lock"></i>
                  <input className="inputs_Forms" type="password" id="password" name="password" required />
                </div>
              </div>
              <a href="" id="recuperarPass">
                ¿Olviste tu contraseña?
              </a>
            </div>
            {/* T&C */}
            <div className="checks">
              <div className="elemento">
                <label htmlFor="recordarUs">Recordar Usuario</label>
                <input
                  className="inputs_Check"
                  type="checkbox"
                  id="recordarUs"
                  name="recordarUs"
                  value="recordarUs"
                  checked={rememberUser}
                  onChange={() => setRememberUser(!rememberUser)}
                />
              </div>
              <div className="elemento">
                <label htmlFor="mantenerlogin">Mantenerse Logueado</label>
                <input className="inputs_Check" type="checkbox" id="mantenerlogin" name="mantenerlogin" value="mantenerlogin" />
              </div>
            </div>
            {/* BOTONES */}
            <div className="buttonslogin">
              <button className="ingresar" type="submit">
                Ingresar
              </button>
            </div>
            <p className="textButton">
              No tengo Usuario, <a href="/register">Registrarme</a>{' '}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
