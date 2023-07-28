
import { Logo } from '../Logo';
import { Link } from 'react-router-dom';

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

            <ul className="main-menu" id="main-menu">
                <li className="main-menu-item">
                 
                </li>
                <li className="main-menu-item">
                  
                </li>
                <li  className="main-menu-item" id="segundomenu">
                
                    <ul className="main-menu-item" id="menu-productos">
                        <li className="main-menu-item">
                        
                        </li>
                        <li className="main-menu-item">
                       
                        </li>
                        <li className="main-menu-item">
                       
                        </li>
                    </ul>
                </li>
                <li className="main-menu-item">
                
                </li>
                <li className="main-menu-item">
               
                </li>
            </ul>
          </nav>
        </div>

      </header>
    </>
  );
};