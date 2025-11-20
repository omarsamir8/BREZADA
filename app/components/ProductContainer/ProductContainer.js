'use client'
import Product from '../Product/Product';
import './ProductContainer.css'
function ProductContainer(props){
    return (
        <div className="ProductContainer">
            <h2 className='ProductContainertitle'>{props.title}</h2>
            <div className='P-Container'>
                <Product img="./Assets/p-1.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-2.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-3.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-4.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-5.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-6.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-7.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                <Product img="./Assets/p-8.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
            </div>
        </div>
    )
}
export default ProductContainer;