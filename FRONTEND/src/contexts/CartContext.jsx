import { createContext, useState } from 'react';

export const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const crearCarrito = () => {
    setCart([]);
  };

  const agregarAlCarrito = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const eliminarDelCarrito = (id) => {
    setCart((prevCart) => prevCart.filter((product) => product.id !== id));
  };

  const guardarCarrito = () => {
    localStorage.setItem('carrito_Compras', JSON.stringify(cart));
  };

  return (
    <CartContext.Provider value={{ cart, crearCarrito, agregarAlCarrito, eliminarDelCarrito, guardarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
