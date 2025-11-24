'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './FeaturedProducts.css';
import Product from '../Product/Product';
import axios from 'axios';
import { toast } from 'react-toastify';

function FeaturedProducts() {
  const [slidesPerView, setSlidesPerView] = useState(1);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ضبط عدد الـ slides حسب حجم الشاشة
  useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(window.innerWidth < 500 ? 1 : 1);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // جلب المنتجات من API
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

  // فلترة المنتجات للي category = "FeaturedProducts"
  const filteredProducts = products.filter((pro) => pro.category === "FeaturedProducts");

  // قسم المنتجات إلى مجموعات كل مجموعة فيها 4 منتجات
  const chunkProducts = [];
  for (let i = 0; i < filteredProducts.length; i += 4) {
    chunkProducts.push(filteredProducts.slice(i, i + 4));
  }

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
    <div className='FeaturedProducts'>
      <h2 style={{ color: "white", fontWeight: "bold", padding: "10px" }} className='NewsTitle'>
        Featured Products
      </h2>

      <Swiper
        spaceBetween={50}
        slidesPerView={slidesPerView}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {chunkProducts.map((group, index) => (
          <SwiperSlide key={index}>
            <div style={{
              margin: "0",
              padding: "20px",
              borderRadius: "10px",
              display: "flex",
              justifyContent: "space-between",
              gap: "10px", // مسافة بين المنتجات
              flexWrap: "wrap"
            }}>
              {group.map((pro) => (
                <Product
                  key={pro._id}
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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default FeaturedProducts;
