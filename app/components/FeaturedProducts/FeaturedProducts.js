'use client';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './FeaturedProducts.css';
import Product from '../Product/Product';
function FeaturedProducts(){
     const [slidesPerView, setSlidesPerView] = useState(1);        
            useEffect(() => {
                const handleResize = () => {
                    setSlidesPerView(window.innerWidth < 500 ? 1 : 1);
                };
                        
                handleResize(); // استدعاء التحديث عند التحميل الأول
                window.addEventListener('resize', handleResize);
        
                return () => window.removeEventListener('resize', handleResize);
            }, []);
    return (
        <>
        
        <div className='FeaturedProducts'>
            <h2 style={{color:"white",fontWeight:"bold",padding:"10px"}} className='NewsTitle'>Featured Products</h2>
            <div style={{display:"none"}} className='notresponsive'>
                <Swiper
                                        
                                        spaceBetween={50}
                                        slidesPerView={slidesPerView} // ✅ تحديث القيمة ديناميكيًا
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-5.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-6.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-3.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-4.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-5.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-6.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-7.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-8.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-5.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-1.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-3.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                          <Product img="./Assets/p-7.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>  
            </Swiper>
            </div>
            <div style={{display:"none"}} className='responsivecursal'>
                <Swiper
                                        spaceBetween={50}
                                        slidesPerView={slidesPerView} // ✅ تحديث القيمة ديناميكيًا
                                        onSlideChange={() => console.log('slide change')}
                                        onSwiper={(swiper) => console.log(swiper)}
            >
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-3.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-5.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>
                <SwiperSlide >
                    <div style={{margin:"0",padding:"20px",borderRadius:"10px",display:"flex",justifyContent:"space-between"}}>
                          <Product img="./Assets/p-7.jpg" status="On Sale!" olPrice="50" currentPrice="39.00" name="Fresh Fruit ,Pannana" brand="Common Good"/>
                    </div> 
                </SwiperSlide>  
            </Swiper>
            </div>
        </div>
        </>
    )
}
export default FeaturedProducts;