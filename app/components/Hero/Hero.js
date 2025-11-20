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
                <p>Organic Fresh offers unique organic spices and beverages, 100% natural, adding a healthy and distinctive flavor to every meal and drink. We also provide high-quality packaged products for your convenience.</p>
                <button onClick={()=>{router.push("/Shop")}}>Shop Now</button>
            </div>
            
        </div>
        </>
    )
}
export default Hero;