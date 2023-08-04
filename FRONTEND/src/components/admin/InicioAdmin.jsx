import { Link } from 'react-router-dom';

export const InicioAdmin = () => {
    const acciones = [
        {
            icono: <i className="bi bi-person-bounding-box"></i>,
            titulo: 'Panel Usuarios',
            link:'/adminUsers'
         },
        {
            icono: <i className="bi bi-shop"></i>,
            titulo: 'Panel Productos',
            link:'/adminProducts'
         },
        // {
        //     icono: <i className="bi bi-basket"></i>,
        //     titulo: 'Ver Catalogo',
        //     link:'/products'
        //  }
    ]
  return (
    <div className="body_Error mainPanel">
        <h1 style={{ textAlign: "center" }}>Bienvenido Administrador</h1>
        <div className="contenedorAcciones">
        {acciones.map((accion, index) => (
            <div className="accion" key={index}>
              <Link to={accion.link} className='linkAccion'>
            <div className="contenedor-icono-accion">
              {accion.icono}
            </div>
            <h3>
              {accion.titulo}
            </h3>
          </Link>
          </div>
        ))}
        </div>
        <div className="contenedorButton">
            <button>Cerrar Sesion</button>
        </div>
    </div>
  )
}
