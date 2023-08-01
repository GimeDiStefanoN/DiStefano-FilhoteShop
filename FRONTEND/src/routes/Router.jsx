import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  BrowserRouter,
  Routes
} from "react-router-dom";
import { Loading } from '../components/Loading';
import { Home } from '../components/pages/Home';
import { About } from '../components/pages/About';
import  Products  from '../components/pages/Products';
import { DetailProduct } from '../components/pages/DetailProduct';
import { Contact } from '../components/pages/Contact';
import { Login } from '../components/pages/Login';
import { Register } from '../components/pages/Register';
import { Cart } from '../components/pages/Cart';
import { Error } from '../components/pages/Error';
import { AdminUsers } from '../components/admin/AdminUsers';
import { AdminProducts } from '../components/admin/AdminProducts';
 

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
    path: '/detailproduct',
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
    path: '/cart',
    component: Cart,
    name: 'MI CARRITO'
  },
  {
    path: '*',
    component: Error,
    name: 'ERROR'
  },
  {
    path: '/adminusers',
    component: AdminUsers,
    name: 'LISTA USUARIOS'
  },
  {
    path: '/adminproducts',
    component: AdminProducts,
    name: 'EDICION PRODUCTOS'
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


//  const Router = () =>(
//     <BrowserRouter>
//         <Routes>
//             <Route index element={<Home/>}/>
//             <Route path="/about" element={<About/>}/>
//             <Route path="/products" element={<Products/>}/>
//             <Route path="/detailproduct" element={<DetailProduct/>}/>
//             <Route path="/contact" element={<Contact/>}/>
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/register" element={<Register/>}/>
//             <Route path="/cart" element={<Cart/>}/>
//             <Route path="*" element={<Error errorNumber={404} subtitle="Página no encontrada" />} />
//             <Route path="/loading" element={<Loading/>}/>
//             <Route path="/adminusers" element={<AdminUsers/>}/>
//             <Route path="/adminproducts" element={<AdminProducts/>}/>
//         </Routes>
//     </BrowserRouter>
// );

// export default Router;

// let router = createBrowserRouter([
//     { path: '/', Component: Home },
//     { path: '/about', Component: About },
//     { path: '/products', Component: Products },
//     { path: '/detailproduct', Component: DetailProduct },
//     { path: '/contact', Component: Contact },
//     { path: '/login', Component: Login },
//     { path: '/register', Component: Register },
//     { path: '/cart', Component: Cart },
//     { path: '/error', Component: Error },
//     { path: '/loading', Component: Loading },
//     { path: '/adminusers', Component: AdminUsers },
//     { path: '/adminproducts', Component: AdminProducts }
// ]);

//  export { router };

