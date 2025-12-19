'use client'
import '../../components/ShopAll/ShopAll.css'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "react-toastify";

function SinglePage() {
    const params = useParams();
    const { id } = params;

    // ✅ استخدام initializer لتجنب setState داخل useEffect مباشرة
    const [selectedProduct, setSelectedProduct] = useState(() => null);

    // جلب بيانات المنتج
    const getProducts = async () => {
        try {
            const res = await axios.get(`/api/product/${id}`);
            setSelectedProduct(res.data);
        } catch (err) {
            toast.error("Failed to load product");
        }
    };

    useEffect(() => {
        if (id) getProducts(); // نتأكد أن id موجود
    }, [id]);

    if (!selectedProduct) return <p style={{textAlign:"center", marginTop:"50px"}}>Loading...</p>;
    console.log(selectedProduct)

    // add to cart
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
        } 
        else {
            localStorage.setItem("cart", JSON.stringify([{ ...item, qty: 1 }]));
        }

        toast.success("Added to cart!");
    };
    return (
        <div style={{ width: "100%", height: "100%" }} className="modal-body">
            {/* زر الإغلاق */}
            <button
                className="close-modal-btn"
                onClick={() => setSelectedProduct(null)}
            >
                ×
            </button>

            <div className='model' style={{
                display: "flex",
                flexDirection: "row",
                gap: "15px",
                height: "92vh",
                position: "relative"
            }}>
                {/* صورة المنتج باستخدام next/image */}
                <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    width={400}
                    height={280}
                    style={{
                        borderRadius: "12px",
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                />

                <div className='m-content' style={{
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px"
                }}>
                    <h2 style={{ fontSize: "22px", fontWeight: "bold", margin: 0 }}>
                        {selectedProduct.name}
                    </h2>

                    <h4 style={{ fontSize: "16px", color: "#777", margin: 0 }}>
                        Brand: <span style={{ color: "#000", fontWeight: "bold" }}>{selectedProduct.brand}</span>
                    </h4>

                    <h4 style={{ fontSize: "16px", color: "#000", fontWeight: "bold" }}>
                        {selectedProduct.description}
                    </h4>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <h3 style={{ margin: 0, fontWeight: "bold", color: "#28a745" }}>
                            L£{selectedProduct.price}
                        </h3>
                        {selectedProduct.priceBeforeSale && (
                            <p style={{
                                textDecoration: "line-through",
                                color: "red",
                                margin: 0,
                                fontSize: "14px",
                                display:"block"
                            }}>
                                L£{selectedProduct.priceBeforeSale}
                            </p>
                        )}
                    </div>

                    <button
                        style={{
                            padding: "10px",
                            border: "none",
                            outline: "none",
                            borderRadius: "10px",
                            backgroundColor: "#4b8106",
                            color: "#fff",
                            cursor: "pointer"
                        }}
                        onClick={() => addToCart(selectedProduct)}
                    >
                        <i className="fa-solid fa-cart-shopping"></i> Add To Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SinglePage;
