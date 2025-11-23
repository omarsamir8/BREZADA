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
    const [selectedProduct, setSelectedProduct] = useState(null);

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
                            <li>
                            <input 
                                type="checkbox" 
                                checked={selectedBrand === "Brezda"}
                                onChange={() => setSelectedBrand(selectedBrand === "Brezda" ? "" : "Brezda")}
                            />
                            Brezda
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
                            <li>
                            <input 
                                type="checkbox" 
                                checked={selected === "Beauty Products"}
                                onChange={() => setSelected(selected === "Beauty Products" ? "" : "Beauty Products")}
                            />
                            Beauty Products
                            </li>

                            <li>
                            <input 
                                type="checkbox" 
                                checked={selected === "Natural Drinks"}
                                onChange={() => setSelected(selected === "Natural Drinks" ? "" : "Natural Drinks")}
                            />
                            Natural Drinks
                            </li>

                            <li>
                            <input 
                                type="checkbox" 
                                checked={selected === "Natural oils"}
                                onChange={() => setSelected(selected === "Natural oils" ? "" : "Natural oils")}
                            />
                            Natural Oils
                            </li>                        
                            <li>
                            <input 
                                type="checkbox" 
                                checked={selected === "Honey"}
                                onChange={() => setSelected(selected === "Honey" ? "" : "Honey")}
                            />
                            Honey
                            </li>                        
                            {/* <li onClick={() => setSelected("Spices Products")}>
                                <input type="checkbox"/> Spices Products
                            </li> */}              
                            {/* <li onClick={() => setSelected("Snacks & Nuts")}>
                                <input type="checkbox"/> Snacks & Nuts
                            </li> */}
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
                <div className='prductsSide' data-bs-toggle="modal" data-bs-target="#exampleModal">
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
                            addToCart={addToCart}
                            onSelect={(product) => setSelectedProduct(product)}
                        />

                    ))}
                </div>
            </div>
            <div className="modal-body">
                {selectedProduct ? (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                    }}>

                        {/* صورة المنتج */}
                        <img 
                            src={selectedProduct.image} 
                            alt=""
                            style={{
                                width: "100%",
                                borderRadius: "12px",
                                objectFit: "cover",
                                maxHeight: "280px",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                            }}
                        />

                        {/* الاسم */}
                        <h2 style={{
                            fontSize: "22px",
                            fontWeight: "bold",
                            margin: 0
                        }}>
                            {selectedProduct.name}
                        </h2>

                        {/* البراند */}
                        <h4 style={{
                            fontSize: "16px",
                            color: "#777",
                            margin: 0
                        }}>
                            Brand: 
                            <span style={{color: "#000", fontWeight: "bold"}}> {selectedProduct.brand}</span>
                        </h4>

                        {/* السعر */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px"
                        }}>
                            <h3 style={{
                                margin: 0,
                                fontWeight: "bold",
                                color: "#28a745"
                            }}>
                                ${selectedProduct.price}
                            </h3>

                            {selectedProduct.priceBeforeSale && (
                                <p style={{
                                    textDecoration: "line-through",
                                    color: "red",
                                    margin: 0,
                                    fontSize: "14px"
                                }}>
                                    ${selectedProduct.priceBeforeSale}
                                </p>
                            )}
                        </div>

                        {/* الوصف */}
                        <p style={{
                            fontSize: "15px",
                            lineHeight: "1.6",
                            color: "#444",
                            marginTop: "5px"
                        }}>
                            {selectedProduct.description}
                        </p>

                    </div>
                ) : (
                    <p style={{fontWeight:"bold"}}>No product selected</p>
                )}
            </div>

        </div>
        </>
    )
}
export default ShopAll;
