'use client'
import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './ShopAll.css'
import { toast } from 'react-toastify';
import axios from 'axios';

function ShopAll(){
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(""); // category
    const [selectedBrand, setSelectedBrand] = useState(""); // brand
    const [selectedPrice, setSelectedPrice] = useState(1000); // price filter

    const getProducts = async () => {
        try {
            const res = await axios.get("/api/product");
            setProducts(res.data);
        } catch (err) {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => { getProducts(); }, []);

    // فلترة المنتجات
    const filteredProducts = products.filter((pro) => {
        const categoryMatch = selected ? pro.category === selected : true;
        const brandMatch = selectedBrand ? pro.brand === selectedBrand : true;
        const priceMatch = pro.price <= selectedPrice;

        return categoryMatch && brandMatch && priceMatch;
    });

    const addToCart = (item) => {
            let cart = localStorage.getItem("cart");

            if (cart) {
                cart = JSON.parse(cart);

                // هل المنتج موجود قبل كده؟
                const exist = cart.find((pro) => pro.id === item.id);

                if (exist) {
                    exist.qty += 1; // زود الكمية
                } else {
                    cart.push({ ...item, qty: 1 }); // ضيف منتج جديد
                }

                localStorage.setItem("cart", JSON.stringify(cart));
            } 
            else {
                // أول مرة يضيف منتج
                localStorage.setItem("cart", JSON.stringify([{ ...item, qty: 1 }]));
            }

            toast.success("Added to cart!");
        };

    return(
        <>
        <div className="ShopAll">
            <div className='shopHead'>
                <h5>Home</h5>
                <p>/ Shop All</p>
            </div>

            <div className='shopcontainer'>
                <div className='filterSide'>

                    {/* Category Name Display */}
                    <div className='refineBy'>
                        <h3>Refine by</h3>
                        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",fontWeight:"bold",marginTop:"10px"}}>
                            <h4 style={{fontWeight:"bold",cursor:"pointer"}}>
                                {selected || selectedBrand ? `${selected} ${selectedBrand}` : "No filter applied"}
                            </h4>
                            <h4 
                                style={{fontWeight:"bold",cursor:"pointer",color:"red"}} 
                                onClick={() => { setSelected(""); setSelectedBrand(""); setSelectedPrice(1000); }}
                            >
                                Clear
                            </h4>
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className='brand'>
                        <h3>Brand</h3>
                        <ul>
                            {/* <li onClick={() => setSelectedBrand("Common Good")}>
                                <input type="checkbox"/> Common Good
                            </li> */}
                            <li onClick={() => setSelectedBrand("Brezda")}>
                                <input type="checkbox"/> Brezda
                            </li>
                            {/* <li onClick={() => setSelectedBrand("EL Fursan")}>
                                <input type="checkbox"/> EL Fursan
                            </li> */}
                        </ul>
                    </div>

                    {/* Category Filter */}
                    <div className='brand'>
                        <h3>Category</h3>
                        <ul>
                            <li onClick={() => setSelected("Beauty Products")}>
                                <input type="checkbox"/> Beauty Products
                            </li>
                            {/* <li onClick={() => setSelected("Spices Products")}>
                                <input type="checkbox"/> Spices Products
                            </li> */}
                            <li onClick={() => setSelected("Natural Drinks")}>
                                <input type="checkbox"/> Natural Drinks
                            </li>
                            {/* <li onClick={() => setSelected("Snacks & Nuts")}>
                                <input type="checkbox"/> Snacks & Nuts
                            </li> */}
                            <li onClick={() => setSelected("Natural oils")}>
                                <input type="checkbox"/> Natural Oils
                            </li>
                        </ul>
                    </div>

                    {/* Price Filter */}
                    <div className="brand">
                        <h3>Filter by Price</h3>
                        <div className="price-range">
                            <input 
                                style={{width:"100%"}} 
                                type="range"  
                                min="0" 
                                max="1000" 
                                step="10"
                                value={selectedPrice}
                                onChange={(e) => setSelectedPrice(Number(e.target.value))}
                            />
                            <div className="price-value">
                                <span style={{color:"gray",fontWeight:"bold"}}>
                                    ${selectedPrice}
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Products List */}
                <div className='prductsSide'>
                    {filteredProducts.map((pro, index) => (
                        <Product 
                            key={index}
                            id={pro._id}
                            img={pro.image}
                            status="On Sale!"
                            olPrice={pro.priceBeforeSale}
                            currentPrice={pro.price}
                            name={pro.name}
                            brand={pro.brand}
                            addToCart={addToCart}   // ← هنا
                        />
                    ))}
                </div>
            </div>

        </div>
        </>
    )
}
export default ShopAll;
