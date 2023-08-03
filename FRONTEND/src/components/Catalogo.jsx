
import Card from './Card';

const Catalogo = ({ products }) => {
    return (
        <>
        <ul className='catalogo'>

            {products.map((product) => (
                <li key={product.id}>
                    <Card product={product} />
                </li>
            ))}
        </ul>    
        </>
    )
}

export default Catalogo