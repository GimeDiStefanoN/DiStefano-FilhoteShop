import {  Route, Routes } from "react-router-dom";
import { Home } from '../components/pages/Home';
import { About } from '../components/pages/About';
import  Products  from '../components/pages/Products';
import { DetailProduct } from '../components/pages/DetailProduct';
import { Contact } from '../components/pages/Contact';
import { Login } from '../components/pages/Login';
import { Register } from '../components/pages/Register';
import { Cart } from '../components/pages/Cart';
import { OrdenCompra } from '../components/pages/OrdenCompra';
import { Error } from '../components/pages/Error';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminProducts } from '../components/admin/AdminProducts';
import { InicioAdmin } from '../components/admin/InicioAdmin';
import Logout from "../components/Logout";

export const routesConfig = [
  {
    path: '/',
    component: Home,
    name: 'INICIO'
  },
  {
    path: '/about',
    component: About,
    name: 'SOBRE NOSOTROS'
  },
  {
    path: '/products',
    component: Products,
    name: 'CATALOGO'
  },
  {
    path: '/detail_Product/:id',
    component: DetailProduct,
    name: 'DETALLE PRODUCTO'
  },
  {
    path: '/contact',
    component: Contact,
    name: 'CONTACTO'
  },
  {
    path: '/login',
    component: Login,
    name: 'INICIO SESION'
  },
  {
    path: '/register',
    component: Register,
    name: 'REGISTRO'
  },
  {
    path: '/cart/:id?',
    component: Cart,
    name: 'MI CARRITO'
  },
  {
    path: '/ordenCompra/:id?',
    component: OrdenCompra,
    name: 'TU COMPRA'
  },
  {
    path: '*',
    component: Error,
    name: 'ERROR'
  },
  {
    path: '/adminUsers/:id?',
    component: AdminUsers,
    name: 'LISTA USUARIOS'
  },
  {
    path: '/adminProducts/:id?',
    component: AdminProducts,
    name: 'EDICION PRODUCTOS'
  },
  {
    path: '/inicioAdmin',
    component: InicioAdmin,
    name: 'PORTAL ADMIN'
  },
  {
    path: '/logout',
    component: Logout,
    
  }
];

const RouterApp = () => (

  <Routes>
    {routesConfig.map((route) => (
      <Route key={route.path} path={route.path} element={<route.component />} />
    ))}
  </Routes>

);

export default RouterApp;
