import { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export const AdminUsers = () => {
  const { users, setUsers  } = useContext(UserContext);
  const [editingUser, setEditingUser] = useState(null);
  const [userEdit, setUserToEdit] = useState(null); // Agrega el estado userToEdit y su setter

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setEditingUser(null);
  };
  const handleShow = (userId) => {
    setShow(true);
    setEditingUser(userId);
  }
  const userToEdit = users.find(user => user.id === editingUser);

  const formatDateForInput = (dateString) => {
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) return ''; // Si la fecha es inválida, devuelve una cadena vacía
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // EDITAR
  const [formData, setFormData] = useState({
    nombre_completo: '',
    username: '',
    password: '',
    email: '',
    direccion: '',
    provincia: '',
    pais: '',
    nacimiento: '',
    telefono: '',
    rol: '',
  });

  useEffect(() => {
    if (editingUser !== null) {
      const userToEdit = users.find((user) => user.id === editingUser);
      setFormData({
        nombre_completo: userToEdit?.nombre_completo || '',
        username: userToEdit?.username || '',
        password: userToEdit?.password || '',
        email: userToEdit?.email || '',
        direccion: userToEdit?.direccion || '',
        provincia: userToEdit?.provincia || '',
        pais: userToEdit?.pais || '',
        nacimiento: formatDateForInput(userToEdit?.nacimiento) || '',
        telefono: userToEdit?.telefono || '',
        rol: userToEdit?.rol || '',
      });
    } else {
      // Si no hay un usuario existente (estamos en modo creación), inicializa el estado con campos vacíos
      setFormData({
        nombre_completo: '',
        username: '',
        password: '',
        email: '',
        direccion: '',
        provincia: '',
        pais: '',
        nacimiento: '',
        telefono: '',
        rol: '',
      });
    }
  }, [editingUser, users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

   // Función para actualizar el contexto con la lista de usuarios actualizada
   const updateUsersContext = (updatedUsersList) => {
    setUsers(updatedUsersList);
  };
  // Función para manejar la edición del usuario
  const handleEditUser = () => {
    // Realiza una solicitud POST al servidor con los datos modificados
    fetch(`/adminUsers/${editingUser}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // La solicitud se completó con éxito, recibe la lista actualizada de usuarios del servidor
        return response.json();
      })
      .then((updatedUsersList) => {
        // Actualiza el contexto con la lista de usuarios actualizada
        updateUsersContext(updatedUsersList);

        // Después de actualizar los datos, cierra el modal y reinicia el estado de edición
        handleClose();
      })
      .catch((error) => {
        // Manejar errores si ocurre alguno al hacer la solicitud al servidor
        console.error('Error al actualizar el usuario:', error);
        // Puedes mostrar un mensaje de error o realizar alguna otra acción en caso de error.
      });
  };


  return (
    <>
      <h1 className="title-page">EDICION USUARIOS</h1>
      <div className="main_Admin">
        <div className="containerdataTable">
          <div className="table-responsive">
            <table className="table table-bordered table-hover">
              <thead className="thead-dark">
                <tr>
                  <th colSpan="13">CONTROL DE USUARIOS</th>
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
                        <Button variant="" className="btnAdmin" onClick={() => handleShow(user.id)}>
                          <i className="bi bi-pencil"></i>
                        </Button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {editingUser !== null && (
          <div className="modales">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title className="modal-title" id="editModalLabel">Editar Usuario</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <h5 ></h5>
                  <div className="modal-body">
                    <form action={`/adminUsers/${editingUser}`} method="post">
                      <div>
                        <label htmlFor="nombre_completo">Nombre:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="nombre_completo"
                          placeholder={userToEdit?.nombre_completo}
                          onChange={handleChange}
                        />
                      </div>
                      <div>
                        <label htmlFor="username">Usuario:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="username"
                          placeholder={userToEdit?.username || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, username: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="password">Contraseña:</label>
                        <input
                          className="inputAdmin"
                          type="password"
                          name="password"
                          placeholder={userToEdit?.password || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, password: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="email">Email:</label>
                        <input
                          className="inputAdmin"
                          type="email"
                          name="email"
                          placeholder={userToEdit?.email || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="direccion">Dirección:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="direccion"
                          placeholder={userToEdit?.direccion || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, direccion: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="provincia">Provincia:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="provincia"
                          placeholder={userToEdit?.provincia || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, provincia: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="pais">País:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="pais"
                          placeholder={userToEdit?.pais || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, pais: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="nacimiento">Fecha Nacimiento:</label>
                        <input
                          className="inputAdmin"
                          type="date"
                          name="nacimiento"
                          placeholder={formatDateForInput(userToEdit?.nacimiento) || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, nacimiento: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="telefono">Teléfono:</label>
                        <input
                          className="inputAdmin"
                          type="tel"
                          name="telefono"
                          placeholder={userToEdit?.telefono || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, telefono: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="rol">Rol:</label>
                        <input
                          className="inputAdmin"
                          type="text"
                          name="rol"
                          placeholder={userToEdit?.rol || ''}
                          onChange={(e) => setUserToEdit({ ...userToEdit, rol: e.target.value })}
                        />
                      </div>
                      <Button variant="" type="submit" className="btn_cart btnAdmin text-btn" onClick={handleChange}>
                        <i className="bi bi-save"></i>
                      </Button>
                    </form>
                  </div>
                </div>
              </Modal.Body>

            </Modal>
          </div>
        )}
        <div className="contenedorButtonAdmin">
          <Link to="/inicioAdmin" className="btn_regresar btn_cart text-btn">
            Volver al Panel Admin
          </Link>
        </div>




      </div>
    </>
  );
};