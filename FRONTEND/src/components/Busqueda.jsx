
const Busqueda = (props) => {
   
    return (
        <div className='contenedorBuscador'>
            <input className='buscador' placeholder={props.placeholder} type="text" value={props.value} onChange={props.onChange}/>
        </div>
    )
}

export default Busqueda