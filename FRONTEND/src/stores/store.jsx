import { create } from 'zustand';

export const userStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => {
      set({ user });
      localStorage.setItem('user', JSON.stringify(user));
    },
  }));

export const cartStore = create((set)=>{
    return{
       
    }
});