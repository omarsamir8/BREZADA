'use client'
import { useEffect, useState } from 'react';
import './CategoriesButtons.css'
import Product from '../Product/Product';
import { toast } from 'react-toastify';
import axios from 'axios';

function CategoriesButtons() {
    const [selected, setSelected] = useState("");
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
      try {
        const res = await axios.get("/api/product");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to load products");
      }
    };

    useEffect(() => { getProducts(); }, []);

    // فلترة المنتجات حسب الزرار
    const filteredProducts = selected 
        ? products.filter((pro) => pro.category === selected)
        : products;


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

    return (
        <>
       <div className="CategoriesButtons">
            <button 
                onClick={() => setSelected("Beauty Products")}
                className={selected === "Beauty Products" ? "selectedbutton" : ""}
            >
                Beauty Products
            </button>
            {/* <button 
                onClick={() => setSelected("Spices Products")}
                className={selected === "Spices Products" ? "selectedbutton" : ""}
            >
                Spices Products
            </button> */}
            <button 
                onClick={() => setSelected("Natural Drinks")}
                className={selected === "Natural Drinks" ? "selectedbutton" : ""}
            >
                Natural Drinks
            </button>
            {/* <button 
                onClick={() => setSelected("Snacks & Nuts")}
                className={selected === "Snacks & Nuts" ? "selectedbutton" : ""}
            >
                Snacks & Nuts
            </button> */}
            <button 
                onClick={() => setSelected("Natural oils")}
                className={selected === "Natural oils" ? "selectedbutton" : ""}
            >
                Natural Oils
            </button>
       </div>
        <div className="selectedprodcts">
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
        </>
    )
}

export default CategoriesButtons;
