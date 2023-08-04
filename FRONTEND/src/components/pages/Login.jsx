
// import { Link } from 'react-router-dom';
// import { useState } from 'react';
// import { userStore } from '../../stores/store';

// export const Login = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [validaciones, setValidaciones] = useState([]);
//   const [username, setUsername] = useState('');
//   const [rememberUser, setRememberUser] = useState(false);

//   const handleLoginSubmit = (event) => {
//     event.preventDefault();
//     // Aquí manejar la lógica de inicio de sesión
//     // Por ejemplo, puedes enviar la información al servidor para autenticar al usuario
//   };

//   return (
//     <div>
//       <h1 className="title-page">INICIAR SESION</h1>
//       <div className="contenedor-main">
//         <div className="contenedorMainlogin">
//           {/* MODAL CON ERROR */}
//           {showModal && (
//             <div className="alert alert-danger alert-dismissible fade show" role="alert">
//               <strong>Usuario o contraseña incorrecto</strong>
//               <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//           )}
//           {/* MENSAJES DE ERRORES VALORES MINIMOS */}
//           {validaciones.map((validacion, index) => (
//             <div key={index} className="alert alert-danger alert-dismissible fade show" role="alert">
//               <strong>{validacion.msg}</strong>
//               <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
//             </div>
//           ))}

//           {/* FORMULARIO DE LOGIN */}
//           <form className="formlogin" onSubmit={handleLoginSubmit}>
//             {/* TITULO DEL FORM */}
//             <h2>Ingresá tus datos</h2>
//             {/* DATOS */}
//             <div className="datoslogin">
//               <div className="elemento">
//                 <label htmlFor="username">Nombre de Usuario</label>
//                 <div className="inputs">
//                   <i className="bi bi-person"></i>
//                   <input
//                     className="inputs_Forms"
//                     type="text"
//                     id="username"
//                     name="username"
//                     maxLength="10"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                   />
//                 </div>
//               </div>

//               <div className="elemento">
//                 <label htmlFor="password">Contraseña</label>
//                 <div className="inputs">
//                   <i className="bi bi-lock"></i>
//                   <input className="inputs_Forms" type="password" id="password" name="password" required />
//                 </div>
//               </div>
//               <Link to="" id="recuperarPass">
//                 ¿Olviste tu contraseña?
//               </Link>
//             </div>
//             {/* T&C */}
//             <div className="checks">
//               <div className="elemento">
//                 <label htmlFor="recordarUs">Recordar Usuario</label>
//                 <input
//                   className="inputs_Check"
//                   type="checkbox"
//                   id="recordarUs"
//                   name="recordarUs"
//                   value="recordarUs"
//                   checked={rememberUser}
//                   onChange={() => setRememberUser(!rememberUser)}
//                 />
//               </div>
              
//             </div>
//             {/* BOTONES */}
//             <div className="buttonslogin">
//               <button className="ingresar" type="submit">
//                 Ingresar
//               </button>
//             </div>
//             <p className="textButton">
//               No tengo Usuario, <Link to="/register">Registrarme</Link>{' '}
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };


/// algo nuevo

import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../UserContext';
import { userStore } from '../../stores/store';

export const Login = () => {
const [validaciones, setValidaciones] = useState([]);
const [rememberUser, setRememberUser] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { setUsers } = useContext(UserContext);
  const setUser = userStore((state) => state.setUser);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const userData = await response.json();

        // Guardar el usuario en el contexto y en el estado global
        setUsers([...users, userData]);
        setUser(userData);

        // Puedes redireccionar al usuario a la página principal o la página que desees después de iniciar sesión exitosamente
        console.log('Inicio de sesión exitoso');
        setShowModal(false); // Cerrar el modal de error en caso de que esté abierto
      } else {
        // En caso de inicio de sesión fallido, mostramos el modal de error
        setShowModal(true);
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al comunicarse con el servidor', error);
    }
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
            <Link to="" id="recuperarPass">
              ¿Olviste tu contraseña?
            </Link>
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
            
          </div>
          {/* BOTONES */}
          <div className="buttonslogin">
            <button className="ingresar" type="submit">
              Ingresar
            </button>
          </div>
          <p className="textButton">
            No tengo Usuario, <Link to="/register">Registrarme</Link>{' '}
          </p>
        </form>
      </div>
    </div>
  </div>
  );
};
