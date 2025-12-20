'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './Review.css';
import Image from 'next/image';
import { FaStar } from 'react-icons/fa';

export default function Review() {
    const [slidesPerView, setSlidesPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            setSlidesPerView(window.innerWidth < 500 ? 1 : 3);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ⭐ Array الريفيوهات
    const reviews = [
        {
            name: 'Mona Adel',
            date: '15 Dec 2025',
            review:
                'These products are absolutely amazing! From the first use, I felt my skin becoming softer and more hydrated. The natural ingredients really make a difference.',
        },
        {
            name: 'Sara Hassan',
            date: '18 Dec 2025',
            review:
                'The moisturizers are incredible! They leave my skin smooth and glowing without any greasy feeling. High quality and natural.',
        },
        {
            name: 'Aya Mahmoud',
            date: '20 Dec 2025',
            review:
                'I loved these beauty products! The scent is light and the results are amazing. My skin feels healthier and fresher.',
        },
        {
            name: 'Hana Youssef',
            date: '22 Dec 2025',
            review:
                'These moisturizers became part of my daily routine. Deep hydration and no irritation at all. Highly recommended.',
        },
        {
            name: 'Nada Ibrahim',
            date: '24 Dec 2025',
            review:
                'One of the best skincare products I’ve ever used. Natural ingredients and excellent quality.',
        },
        {
            name: 'Reem Khaled',
            date: '26 Dec 2025',
            review:
                'Amazing products! My skin feels soft and healthy after using them. I strongly recommend them.',
        },
    ];

    return (
        <div className='review'>
            <h2 style={{ fontFamily: 'monospace' }}>
                Some of our customer’s reviews
            </h2>

            <Swiper spaceBetween={50} slidesPerView={slidesPerView}>
                {reviews.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className='reviewcontent'>
                            <div className='c-info'>
                                <div className='cimg'>
                                    <Image
                                        src='/Assets/logoo.jpg'
                                        alt='userimg'
                                        width={70}
                                        height={70}
                                    />
                                    <div>
                                        <h5>{item.name}</h5>
                                        <p>{item.date}</p>
                                    </div>
                                </div>

                                <div style={{ color: 'red' }} className='stars'>
                                    {[...Array(5)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                            </div>

                            <p
                                style={{
                                    marginTop: '20px',
                                    color: 'black',
                                }}
                            >
                                “{item.review}”
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
