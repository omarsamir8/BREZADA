'use client'
import './Services.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useEffect, useState } from 'react';
function Services(){
    const [slidesPerView, setSlidesPerView] = useState(8);
    
        useEffect(() => {
            const handleResize = () => {
                setSlidesPerView(window.innerWidth < 500 ? 1 : 8);
            };
    
            handleResize(); // استدعاء التحديث عند التحميل الأول
            window.addEventListener('resize', handleResize);
    
            return () => window.removeEventListener('resize', handleResize);
        }, []);
    return (
        <>
        <div className="services">
                <Swiper
                   spaceBetween={10}
                   slidesPerView={slidesPerView} // ✅ تحديث القيمة ديناميكيًا
                   onSlideChange={() => console.log('slide change')}
                   onSwiper={(swiper) => console.log(swiper)}
                >
                       <SwiperSlide >
                             <img src='./Assets/h1.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h2.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h3.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h4.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h5.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h6.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h7.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h8.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h9.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h10.png' alt='sevicesImage'/>
                        </SwiperSlide>
                       <SwiperSlide >
                             <img src='./Assets/h11.png' alt='sevicesImage'/>
                        </SwiperSlide>
                         
                     
                </Swiper>
        </div>
        </>
    )
}
export default Services;