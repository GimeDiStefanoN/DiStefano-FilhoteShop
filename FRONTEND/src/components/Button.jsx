const Button = (props) => {    
  return(
  <>
  <div className='contenedorButton'>
     <button className="btnCompra" onClick={props.onClick} > {props.nombre} </button>
  </div>
  </>     
  )
}

export default Button