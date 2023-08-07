
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
export const Header = () => {

  return (
    <>
      <header>
        <div className="contenedorHeader">
          <Logo></Logo>
          <nav className="main-nav">
              <div id="toggle-menu" className="toggle-menu">
                  <label htmlFor="toggle-menu-checkbox">
                      <i className="bi bi-list"></i>
                  </label>
              </div>
              <input type="checkbox" name="" id="toggle-menu-checkbox" className="toggle-menu__checkbox"></input>

              <Navbar></Navbar>
          </nav>
        </div>

      </header>
    </>
  );
};