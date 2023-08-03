import { useContext } from 'react';
import { UserContext } from '../UserContext';


export const AdminUsers = () => {
  const { users } = useContext(UserContext);

  return (
    <>
    <h1 className="title-page">ADMINISTRADOR DE USUARIOS</h1>
    <div className="main_Admin">
      <div className="containerdataTable">
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th colSpan="12">CONTROL DE USUARIOS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td>NOMBRE</td>
                <td>USUARIO</td>
                <td>PASSWORD</td>
                <td>EMAIL</td>
                <td>PAIS</td>
                <td>PROVINCIA</td>
                <td>DIRECCION</td>
                <td>NACIMIENTO</td>
                <td>TELEFONO</td>
                <td>ROL</td>
                <td>BORRAR</td>
                <td>EDITAR</td>
              </tr>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nombre_completo}</td>
                  <td>{user.username}</td>
                  <td>{user.password.slice(0, 10)}</td>
                  <td>{user.email}</td>
                  <td>{user.pais}</td>
                  <td>{user.provincia}</td>
                  <td>{user.direccion || ''}</td>
                  <td>
                    {new Date(user.nacimiento).toLocaleDateString('es-AR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </td>
                  <td>{user.telefono}</td>
                  <td>{user.rol}</td>
                  <td>
                    <form action={`/deleteUser/${user.id}`} method="post">
                      <button className="btnAdmin">
                        <i className="bi bi-trash3"></i>
                      </button>
                    </form>
                  </td>
                  <td>
                    <form>
                      <button
                        className="btnAdmin"
                        onClick={() => (window.location.href = `#openModal${user.id}`)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="modales">
        {users.map((user) => (
          <div key={user.id} id={`openModal${user.id}`} className="modalDialog">
            <div>
              <a href="/adminUsers" title="Close" className="close">X</a>
              <div>
                <h5 className="modal-title" id="editModalLabel">Editar Usuario</h5>
                <div className="modal-body">
                  <form action={`/adminUsers/${user.id}`} method="post">
                    <div>
                      <label htmlFor="nombre_completo">Nombre:</label>
                      <input type="text" name="nombre_completo" value={user.nombre_completo} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Usuario:</label>
                      <input type="text" name="username" value={user.username} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Contraseña:</label>
                      <input type="password" name="password" value={user.password} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Email:</label>
                      <input type="email" name="email" value={user.email} />
                    </div>
                    <div>
                      <label htmlFor="direccion">Direccion:</label>
                      <input type="text" name="direccion" value={user.direccion || ''} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Provincia:</label>
                      <input type="text" name="provincia" value={user.provincia} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Pais:</label>
                      <input type="text" name="pais" value={user.pais} />
                    </div>
                    <div>
                      <label htmlFor="nacimiento">Fecha Nacimiento:</label>
                      <input type="date" name="nacimiento" value={user.nacimiento} />
                    </div>
                    <div>
                      <label htmlFor="nombre">Telefono:</label>
                      <input type="tel" name="telefono" value={user.telefono} />
                    </div>
                    <button type="submit" className="btnAdmin"><i className="bi bi-save"></i></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="contenedorButtonAdmin">
          <button onClick={() => location.href = '/'} className="btn_regresar">Volver a la Web</button>
      </div>
            
    </div>
    </>
  );
};