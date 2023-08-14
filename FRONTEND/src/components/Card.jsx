import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { userStore } from '../stores/store';
import { cartStore } from '../stores/store';
import { CartContext } from '../contexts/CartContext';

const Card = ({ product, id}) => {
  
  const user = userStore.getState().user; // Accede al usuario desde el contexto
  console.log("🚀 ~ file: Card.jsx:10 ~ Card ~ user:", user)
  const { cart, agregarAlCarrito, eliminarDelCarrito  } = useContext(CartContext); // Corrección aquí
  console.log("🚀 ~ file: Card.jsx:12 ~ Card ~ cart:", cart)

  const agregarAlCarritoHandler = async () => {

    try {
      // Validar la sesión y el rol del usuario
      if (!user || user.rol !== 'customer') {
        // Manejar el caso de usuario no autenticado o sin el rol adecuado
        console.log('Usuario no autorizado para agregar al carrito');
        return;
      }

      // Hacer la solicitud para guardar en la base de datos
      const response = await fetch(`http://localhost:3000/addProduct/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: user,
          id_producto: product.id,
          nombre_producto: product.nombre_producto,
          precio_producto: product.precio_producto,
          url_imagen_producto: product.url_imagen_producto,
        }),
      });

      const responseData = await response.json();
      console.log(responseData.message); // Mensaje de respuesta del servidor
     
      // Si la solicitud fue exitosa, actualiza el carrito en el contexto
    if (response.ok) {
      agregarAlCarrito(product); // Llama a la función para agregar en el contexto
    }
    } catch (error) {
      console.error(error);
    }
  };


  // const agregarAlCarrito = async () => {
  //   try {
  //     // Realizar una solicitud al servidor para verificar la sesión del usuario
  //     const response = await fetch('http://localhost:3000/login', {
  //       method: 'GET',
  //       credentials: 'include', // Incluir las cookies en la solicitud
  //     });
  
  //     if (response.ok) {
  //       //Si la respuesta es exitosa, el usuario tiene una sesión válida
  //       const user = userStore.getState().user;

  //       const opciones = {
  //         method: 'POST',
  //         headers: {
  //           'Accept': 'application/json',
  //           'Content-Type': 'application/json',
  //           //'user': JSON.stringify(user) // Convertir el usuario a cadena JSON
  //         },
  //         body: JSON.stringify({
  //           user: user, // Enviar el objeto user en el cuerpo de la solicitud
  //           product: product
  //         }),
  //      };

  //       const agregarProductoResponse = await fetch(`http://localhost:3000/addProduct/${id}`, opciones);

  //       if (agregarProductoResponse.ok) {
  //         // Si la respuesta es exitosa, se puede actualizar el estado del carrito
  //         cartStore.getState().agregarAlCarrito(product);
  //         window.alert('Producto Agregado al carrito');
  //       } else {
  //         // Manejar otros posibles errores aquí (opcional).
  //         console.log('Error al agregar producto al carrito.');
  //       }
  //     } else {
  //       // Si la respuesta es un error, el usuario no tiene una sesión válida o no está autorizado
  //       // Muestra una alerta y redirecciona al usuario al inicio (home).
  //       window.alert('No puedes agregar productos al carrito. Debes iniciar sesión como cliente.');
  //       window.location.href = '/home'; // Redireccionar al inicio
  //     }
  //   } catch (error) {
  //     console.log('Error al conectarse con el servidor:', error);
  //   }
  // };
  
  return (
    // DATOS PETSHOP
    <div className="card" id={`user.${product.id}`}>
      <div className="container">
        <i className="bi bi-chevron-left text-white"></i>
        <img src={product.url_imagen_producto} alt="Image 1" className="img_Cards" />
        <i className="bi bi-chevron-right text-white"></i>
      </div>
      {product.Categoria.map((categoria) => (
        <div className="text-grey" key={categoria.id}>
          {categoria.nombre_categoria}
        </div>
      ))}
      <div className="text-black">{product.nombre_producto}</div>
      <div className="text-red">PRECIO $ {product.precio_producto.toLocaleString('es-AR')}</div>
      <div className="botones">
        <Link
          to={`/addProduct/${product.id}`}
          className="btn_cart text-btn"
          onClick={agregarAlCarritoHandler}
          // onClick={() => agregarAlCarrito(product.id)}

        >
          <span className="material-symbols-outlined">shopping_cart</span>
        </Link>
        <Link className="btn_cart  text-btn" to={`/detail_Product/${product.id}`}>
          <span>Ver Detalle</span>
        </Link>
      </div>
    </div>
  );
};

export default Card;
