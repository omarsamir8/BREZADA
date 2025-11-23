import './Product.css';
import { FaStar } from 'react-icons/fa';
import "@fortawesome/fontawesome-free/css/all.min.css";

function Product(props){

    // منع فتح المودل عند الضغط على زر Add To Cart
    const handleAddToCart = (e) => {
        e.stopPropagation();
        props.addToCart({
            id: props.id,
            img: props.img,
            name: props.name,
            brand: props.brand,
            price: props.currentPrice
        });
    };

    return(
        <>
        {/* اضغط على الكارد → يعرض التفاصيل في المودل */}
        <div className="product" onClick={() => props.onSelect(props)}>

            <img src={props.img} alt="" />
            <p>{props.brand}</p>
            <h3>{props.name}</h3>

            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <h2>L£{props.currentPrice}</h2>
                <div>
                    {[...Array(5)].map((_, i) => (
                        <FaStar style={{color:"gold"}} key={i} className="star-icon" />
                    ))}
                </div>
            </div>

            <p><del>L£{props.olPrice}</del></p>

            {/* زر السلة مش هيفتح المودل */}
            <button onClick={handleAddToCart}>
                <i className="fa-solid fa-cart-shopping"></i> Add To Cart
            </button>

            <div className='sale'>{props.status}</div>
        </div>
        </>
    )
}
export default Product;
