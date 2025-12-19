'use client'
import './Hero.css'
import { useRouter } from "next/navigation";
function Hero(){
    const router = useRouter();
    return (
        <>
        <div className="Hero">
            <div>
                <h2>Organic Spices and Beverages For Your Health</h2>
                <p>Brezada offers unique natural beauty and skincare products, 100% organic and ethically sourced, enhancing your natural glow. We also provide high-quality, ready-to-use products for your convenience and wellness..</p>
                <button onClick={()=>{router.push("/Shop")}}>Shop Now</button>
            </div>
            
        </div>
        </>
    )
}
export default Hero;