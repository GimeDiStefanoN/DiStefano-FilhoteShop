import './App.css'
import { RouterProvider } from 'react-router-dom';
import Router from './routes/Router';
//import { Loading } from './components/Loading.jsx';
import { Header } from  '../src/components/partials/Header';
import { Footer } from '../src/components/partials/Footer';

export default function App() {
  return (
    <>
    <Header className="header"></Header>
    <main>
      <Router/>
    </main>
    <Footer className="footer"></Footer>
    </>
  )  
}
if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

