import { create } from 'zustand';

export const userStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => {
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    },
  }));

export const productStore = create((set) => ({
    product: JSON.parse(localStorage.getItem('product')) || null,
    setProduct: (product) => {
      set({ product });
      localStorage.setItem('product', JSON.stringify(product));
    },
  }));

export const cartStore = create((set) => ({
  products: localStorage.getItem('carritoCompras')
    ? JSON.parse(localStorage.getItem('carritoCompras'))
    : [],

  guardarCarrito: (products) => {
    localStorage.setItem('carritoCompras', JSON.stringify(products));
  },

  crearCarrito: () => {
    const userIdentification = userStore.getState().user.id;
    const cart = JSON.parse(localStorage.getItem(`cart_${userIdentification}`));
    if (cart) {
      set({ products: cart });
    } else {
      set({ products: [] });
    }
  },

  agregarAlCarrito: (product) => {
    set((state) => {
      const userIdentification = userStore.getState().user.id;
      const actualizoCarrito = [...state.products];
      const exitenProductos = actualizoCarrito.findIndex(
        (item) =>
          item.product === product.id &&
          item.identification === userIdentification
      );
  
      if (exitenProductos !== -1) {
        actualizoCarrito[exitenProductos].quantity += 1;
      } else {
        const nuevoProduct = {
          product: product.id,
          cantidad: 1,
          precio: product.precio_producto,
          imagen: product.url_imagen_producto,
          nombre: product.nombre_producto,            
          identification: userIdentification,
        };
        actualizoCarrito.push(nuevoProduct);
      }
  
      localStorage.setItem(
        `cart_${userIdentification}`,
        JSON.stringify(actualizoCarrito)
      );
      return { products: actualizoCarrito };
    });
  },

  EliminarDelCarrito: (index) => {
    set((state) => {
      const userIdentification = userStore.getState().user.id; // Retrieve the user email from the useUserStore state
      const updatedProducts = state.products.filter((_, i) => i !== index);
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },


  guardarCompra: (userData, products, total) => {
    const datosCompra = {
        user: userData.username, // Guardamos el email del usuario
        products: products.map((product) => ({
        nombre_producto: product.nombre_producto,
        cantidad: product.cantidad,
        precio: product.precio_producto,
      })),
      total,
    };
    // Guardamos la información de la compra en el local storage
    const usuarioCompraID = `purchases_${userData.username}`; 
    const compras = localStorage.getItem(usuarioCompraID) ? JSON.parse(localStorage.getItem(usuarioCompraID)) : [];
    compras.push(datosCompra);
    localStorage.setItem(usuarioCompraID, JSON.stringify(compras));
    // Limpiamos el carrito después de guardar la compra
    cartStore.setState({ products: [] });
  },
}));
