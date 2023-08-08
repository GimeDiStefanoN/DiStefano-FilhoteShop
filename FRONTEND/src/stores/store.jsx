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

export const cartStore = create((set)=>{
    return{
       
    }
});