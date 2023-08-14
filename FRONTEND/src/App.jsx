import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom';
import RouterApp from './routes/Router';
import { Loading } from './components/Loading.jsx';
import { Header } from '../src/components/partials/Header';
import { Footer } from '../src/components/partials/Footer';
import DataProvider from './contexts/DataContext';
import UserProvider from './contexts/UserContext';
import CartProvider from './contexts/CartContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular un tiempo de carga (por ejemplo, 2 segundos) antes de cambiar el estado para mostrar el contenido
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => {
      clearTimeout(loadingTimer);
    };
  }, []);


  return (
    <>
        <UserProvider>
          <DataProvider>
            <CartProvider>
            <BrowserRouter>
              <Header className="header" />
              <main>
                {isLoading ? <Loading /> : <RouterApp />}
              </main>
              <Footer className="footer" />
            </BrowserRouter>
            </CartProvider>
          </DataProvider>
        </UserProvider>
    </>
  )
}
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

