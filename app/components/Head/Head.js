'use client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Head.css';
import { useRouter } from "next/navigation";
function Head(){
     const router = useRouter();
 return (
    <>
    <div className="Head">
        <div style={{width:"30%"}}><i className="fa-solid fa-phone"></i> (+20) 1558 8493 71</div>
        <h2>Welcome To Our Online Store!</h2>
        <ul>
            {/* <li onClick={()=>{router.push("/ContactUs")}}>Contact Us</li> */}
            {/* <div className="headline"></div> */}
            <li onClick={()=>{router.push("/Neews")}}>News Control</li>
            <div className="headline"></div>
            <li onClick={()=>{router.push("/OrdersControl")}}>Orders Control </li>
            <div className="headline"></div>
            <li onClick={()=>{router.push("/ProductControl")}}>ProductControl </li>
        </ul>
    </div>
    </>
 )   
}
export default Head;