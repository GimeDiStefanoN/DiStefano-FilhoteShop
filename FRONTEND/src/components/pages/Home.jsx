
import Card from '../Card';
import Banner from '../Banner'; 
import { useContext } from 'react';
import { dataContext } from '../DataContext';

export const Home = () => {
  
  const { products } = useContext(dataContext);
  return (
    <>

      <main>
        <div className="contenido">
          <div className="imgBanner">
            <Banner></Banner>
          </div>

          <div className="opcionesBanner">
            <ul>
              <li>
                <a href="">
                  <span className="material-symbols-outlined">local_shipping</span>
                  <p>Envio a Domicilio</p>
                </a>
              </li>
              <li>
                <a href="#openModal1">
                  <span className="material-symbols-outlined">credit_card</span>
                  <p>Medios de Pago</p>
                </a>
              </li>
              <li>
                <a href="">
                  <span className="material-symbols-outlined">local_activity</span>
                  <p>Promociones</p>
                </a>
              </li>
            </ul>
          </div>

          <div className="productosHome">
            <ul className="catalogo">
              {products.map((product) => (
                <li key={product.id}>
                  <Card product={product} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </>
  );
};