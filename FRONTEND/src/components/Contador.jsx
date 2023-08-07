// import { useState, useEffect  } from "react"

const Contador = ({cantidad, updateCantidad   }) => {

    const sumar = () => {
        if (cantidad  < 5) {
          updateCantidad(cantidad  + 1);
        }
      };
    
      const restar = () => {
        if (cantidad  > 1) {
          updateCantidad(cantidad  - 1);
        }
      };

  
    return (
        <div className="contadorCantidad">
            <button id="menos" type="button" onClick={restar}>-</button>
            <input type="text" id="contador" className="form-control-contador" value={ cantidad  } min="1" readOnly/>
            <button id="mas" type="button" onClick={sumar}>+</button>
        </div>
    )
}

export default Contador