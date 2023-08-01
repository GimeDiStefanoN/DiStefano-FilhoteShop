import { useState, useEffect } from 'react'

const Desplegable = (props) => {
    // const [desplegable, setDesplegable] = useState("");
    const [categorias, setCategorias] = useState([])

    useEffect(() => { {/*llamo al fetch para traerme las categorias*/}
        fetch('https://fakestoreapi.com/products')
            .then(response => response.json())
            .then(data => {
                const arrayCategorias = Array.from(new Set(data.map((product) => product.category)));
                setCategorias(arrayCategorias);
            });
    }, []);
    // const seleccionCategoria = (e) => {

    //     const categoriaElegida = e.target.value
    //     console.log("🚀 ~ file: Desplegable.jsx:19 ~ seleccionCategoria ~ categoriaElegida:", categoriaElegida)
    // }

    return (
        <div className='contenedorDesplegable'>
            <select className='desplegable' name="desplegable" id="desplegable" onChange={props.onChange} defaultValue={''} value={props.value}>
                <option value='' disabled >
                    {props.placeholder}
                </option>
                {categorias.map((categoria) => (
                    <option key={categoria} value={categoria}>
                        {categoria}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Desplegable