'use client';
import News from '../News/News';
import './NewsContainer.css';
import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { toast } from 'react-toastify';
import axios from 'axios';
function NewsContainer(){
     const [slidesPerView, setSlidesPerView] = useState(3);
    
        useEffect(() => {
            const handleResize = () => {
                setSlidesPerView(window.innerWidth < 500 ? 1 : 3);
            };
    
            handleResize(); // استدعاء التحديث عند التحميل الأول
            window.addEventListener('resize', handleResize);
    
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        const [newsList, setNewsList] = useState([]);

            const getNews = async () => {
                try {
                const res = await axios.get("/api/news");
                setNewsList(res.data.news || []);
                } catch (err) {
                toast.error("Failed to load news");
                console.error(err);
                }
            };

            useEffect(() => {
                getNews();
            }, []);

            console.log(newsList)
    return (
        <>
        <h2 className='NewsTitle'>Latest News</h2>
        <div className="NewsContainer">
            <Swiper
                            spaceBetween={50}
                            slidesPerView={slidesPerView} // ✅ تحديث القيمة ديناميكيًا
                            onSlideChange={() => console.log('slide change')}
                            onSwiper={(swiper) => console.log(swiper)}
            >
                 {newsList.length > 0 ? (
                    newsList.map((n) => (
                    <SwiperSlide style={{backgroundColor:"white"}} >
                         <News img={n.image} author={n.author} title="Latest news from Brezada — Read more details" desc={n.description}/>
                    </SwiperSlide>
                    ))
                ) : (
                    <p>No news available.</p>
                )}
            </Swiper>
        </div>  
        </>
    )
}
export default NewsContainer;