'use client'
import { useEffect, useState } from 'react';
import Product from '../Product/Product';
import './ShopAll.css'
import { toast } from 'react-toastify';
import axios from 'axios';

function ShopAll() {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(""); // category
    const [selectedBrand, setSelectedBrand] = useState(""); // brand
    const [selectedPrice, setSelectedPrice] = useState(1000); // price
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // 🔍 search

    const getProducts = async () => {
        try {
            const res = await axios.get("/api/product");
            setProducts(res.data);
        } catch (err) {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        getProducts();
    }, []);

    // 🔹 FILTER PRODUCTS
    const filteredProducts = products.filter((pro) => {
        const categoryMatch = selected ? pro.category === selected : true;
        const brandMatch = selectedBrand ? pro.brand === selectedBrand : true;
        const priceMatch = pro.price <= selectedPrice;

        const searchMatch = searchTerm
            ? pro.name.toLowerCase().includes(searchTerm.toLowerCase())
            : true;

        return categoryMatch && brandMatch && priceMatch && searchMatch;
    });

    const addToCart = (item) => {
        let cart = localStorage.getItem("cart");

        if (cart) {
            cart = JSON.parse(cart);
            const exist = cart.find((pro) => pro.id === item.id);

            if (exist) {
                exist.qty += 1;
            } else {
                cart.push({ ...item, qty: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
        } else {
            localStorage.setItem("cart", JSON.stringify([{ ...item, qty: 1 }]));
        }

        toast.success("Added to cart!");
    };

    return (
        <>
            <div className="ShopAll">

                {/* HEADER */}
                <div className='shopHead'>
                    <h5>Home</h5>
                    <p>/ Shop All</p>
                </div>

                {/* 🔍 SEARCH */}
                <div className='searchContainer'>
                    <input
                        type="text"
                        placeholder="Search Here ..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className='shopcontainer'>

                    {/* FILTER SIDE */}
                    <div className='filterSide'>

                        {/* FILTER HEADER */}
                        <div className='refineBy'>
                            <h3>Refine by</h3>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                fontWeight: "bold",
                                marginTop: "10px"
                            }}>
                                <h4 style={{ fontWeight: "bold" }}>
                                    {selected || selectedBrand || searchTerm
                                        ? `${selected} ${selectedBrand} ${searchTerm}`
                                        : "No filter applied"}
                                </h4>

                                <h4
                                    style={{ fontWeight: "bold", cursor: "pointer", color: "red" }}
                                    onClick={() => {
                                        setSelected("");
                                        setSelectedBrand("");
                                        setSelectedPrice(1000);
                                        setSearchTerm("");
                                    }}
                                >
                                    Clear
                                </h4>
                            </div>
                        </div>

                        {/* BRAND FILTER */}
                        <div className='brand'>
                            <h3>Brand</h3>
                            <ul>
                                <li>
                                    <input
                                        type="checkbox"
                                        checked={selectedBrand === "Brezda"}
                                        onChange={() =>
                                            setSelectedBrand(selectedBrand === "Brezda" ? "" : "Brezda")
                                        }
                                    />
                                    Brezda
                                </li>
                            </ul>
                        </div>

                        {/* CATEGORY FILTER */}
                        <div className='brand'>
                            <h3>Category</h3>
                            <ul>
                                <li>
                                    <input
                                        type="checkbox"
                                        checked={selected === "Beauty Products"}
                                        name='category'
                                        onChange={() =>
                                            setSelected(selected === "Beauty Products" ? "" : "Beauty Products")
                                        }
                                    />
                                    Beauty Products
                                </li>

                                <li>
                                    <input
                                        type="checkbox"
                                        checked={selected === "Natural Drinks"}
                                        name='category'
                                        onChange={() =>
                                            setSelected(selected === "Natural Drinks" ? "" : "Natural Drinks")
                                        }
                                    />
                                    Natural Drinks
                                </li>

                                <li>
                                    <input
                                        type="checkbox"
                                        checked={selected === "Natural oils"}
                                        name='category'
                                        onChange={() =>
                                            setSelected(selected === "Natural oils" ? "" : "Natural oils")
                                        }
                                    />
                                    Natural Oils
                                </li>

                                <li>
                                    <input
                                        type="checkbox"
                                        name='category'
                                        checked={selected === "Honey"}
                                        onChange={() =>
                                            setSelected(selected === "Honey" ? "" : "Honey")
                                        }
                                    />
                                    Honey
                                </li>

                                <li onClick={() => setSelected("FeaturedProducts")}>
                                    <input name='category' type="checkbox" /> Featured Products
                                </li>
                            </ul>
                        </div>

                        {/* PRICE FILTER */}
                        <div className="brand">
                            <h3>Filter by Price</h3>
                            <div className="price-range">
                                <input
                                    style={{ width: "100%" }}
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="10"
                                    value={selectedPrice}
                                    onChange={(e) => setSelectedPrice(Number(e.target.value))}
                                />
                                <div className="price-value">
                                    <span style={{ color: "gray", fontWeight: "bold" }}>
                                        ${selectedPrice}
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* PRODUCTS */}
                    <div className='prductsSide'>
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((pro, index) => (
                                <Product
                                    key={index}
                                    id={pro._id}
                                    img={pro.image}
                                    status="On Sale!"
                                    olPrice={pro.priceBeforeSale}
                                    currentPrice={pro.price}
                                    name={pro.name}
                                    brand={pro.brand}
                                    description={pro.description}
                                    addToCart={addToCart}
                                />
                            ))
                        ) : (
                            <p style={{ textAlign: "center", width: "100%" }}>
                                لا توجد منتجات مطابقة 🔍
                            </p>
                        )}
                    </div>

                </div>
            </div>
        </>
    );
}

export default ShopAll;
