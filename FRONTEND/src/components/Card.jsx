import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import { dataContext } from '../contexts/DataContext';
// import { userStore } from '../stores/store';
import { cartStore } from '../stores/store';

const Card = ({ product, id, setCart, cart}) => {


  const agregarAlCarrito = async () => {
    try {
      // Realizar una solicitud al servidor para verificar la sesión del usuario
      const response = await fetch('http://localhost:3000/login', {
        method: 'GET',
        credentials: 'include', // Incluir las cookies en la solicitud
      });
  
      if (response.ok) {
        // Si la respuesta es exitosa, el usuario tiene una sesión válida
        const opciones = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        };

        const agregarProductoResponse = await fetch(`http://localhost:3000/addProduct/${id}`, opciones);

        if (agregarProductoResponse.ok) {
          // Si la respuesta es exitosa, se puede actualizar el estado del carrito
          setCart([...cart, product]);
          window.alert('Producto Agregado al carrito');
        } else {
          // Manejar otros posibles errores aquí (opcional).
          console.log('Error al agregar producto al carrito.');
        }
      } else {
        // Si la respuesta es un error, el usuario no tiene una sesión válida o no está autorizado
        // Muestra una alerta y redirecciona al usuario al inicio (home).
        window.alert('No puedes agregar productos al carrito. Debes iniciar sesión como cliente.');
        window.location.href = '/home'; // Redireccionar al inicio
      }
    } catch (error) {
      console.log('Error al conectarse con el servidor:', error);
    }
  };
  
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
          onClick={() => agregarAlCarrito(product.id)}

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
