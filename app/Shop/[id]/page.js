'use client'
import '../../components/ShopAll/ShopAll.css'
import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ استيراد useParams
import axios from "axios";
import { toast } from "react-toastify";

function SinglePage(){
    const [selectedProduct, setSelectedProduct] = useState(null);

    const params = useParams();  // ✅ استخدام useParams
    const { id } = params;       // ناخد الـ id

    const getProducts = async () => {
        try {
            const res = await axios.get(`/api/product/${id}`);
            setSelectedProduct(res.data);
        } catch (err) {
            toast.error("Failed to load products");
        }
    };

    useEffect(() => {
        if (id) getProducts(); // نتأكد ان id موجود قبل الجلب
    }, [id]);

    if (!selectedProduct) return <p>Loading...</p>; // Loader قبل تحميل المنتج

    return(     
        <div  style={{ width:"100%",height:"100%" }} className="modal-body">
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
                height:"92vh"
                ,position:"relative"
            }}>
                <img 
                    src={selectedProduct.image} 
                    alt=""
                    style={{
                        borderRadius: "12px",
                        objectFit: "cover",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
                    }}
                />

                <div className='m-content' style={{
                    padding:"20px",
                    display:"flex",
                    flexDirection:"column",
                    gap:"20px"
                }}>
                    <h2 style={{fontSize:"22px", fontWeight:"bold", margin:0}}>
                        {selectedProduct.name}
                    </h2>

                    <h4 style={{fontSize:"16px", color:"#777", margin:0}}>
                        Brand: <span style={{color:"#000", fontWeight:"bold"}}>{selectedProduct.brand}</span>
                    </h4>

                    <h4 style={{fontSize:"16px", color:"#000", fontWeight:"bold"}}>
                        {selectedProduct.description}
                    </h4>

                    <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
                        <h3 style={{margin:0, fontWeight:"bold", color:"#28a745"}}>
                            L£{selectedProduct.price}
                        </h3>
                        {selectedProduct.olPrice && (
                            <p style={{
                                textDecoration:"line-through",
                                color:"red",
                                margin:0,
                                fontSize:"14px"
                            }}>
                                L£{selectedProduct.olPrice}
                            </p>
                        )}
                    </div>

                    <button 
                        style={{
                            padding:"10px",
                            border:"none",
                            outline:"none",
                            borderRadius:"10px",
                            backgroundColor:"#4b8106",
                            color:"#fff",
                            cursor:"pointer"
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
