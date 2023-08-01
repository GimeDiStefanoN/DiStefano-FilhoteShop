
import Card from './Card';
import { useContext } from 'react';
import { dataContext } from './DataContext';

const Catalogo = ({ products }) => {
    // const { products } = useContext(dataContext);
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