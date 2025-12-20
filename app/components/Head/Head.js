'use client'
import "@fortawesome/fontawesome-free/css/all.min.css";
import './Head.css';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
function Head(){
     const router = useRouter();
     const [user, setUser] = useState(null);
     useEffect(() => {
         const storeed = localStorage.getItem("user");
         if (storeed) {
           setUser(JSON.parse(storeed));
         }
       }, []);
 return (  
    <>
    <div className="Head">
        <div style={{width:"30%"}}><i className="fa-solid fa-phone"></i> (+20) 1115217083</div>
        <h2>Welcome To Our Online Store!</h2>
        {user&&user.role==="admin"?
        <ul>
            {/* <li onClick={()=>{router.push("/ContactUs")}}>Contact Us</li> */}
            {/* <div className="headline"></div> */}
            <li onClick={()=>{router.push("/Neews")}}>News Control</li>
            <div className="headline"></div>
            <li onClick={()=>{router.push("/OrdersControl")}}>Orders Control </li>
            <div className="headline"></div>
            <li onClick={()=>{router.push("/ProductControl")}}>ProductControl </li>
        </ul>
        :null}
        
    </div>
    </>
 )   
}
export default Head;