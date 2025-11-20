'use client'
import './Footer.css';
import { useRouter } from "next/navigation";
function Footer(){
    const router = useRouter();
    return(
        <>
        <div className='Foooter'>
            <div className="Footer">
                        <div className="footertitle">
                            <h2>BREZDA</h2>
                            <p>shop all products, online store, premium products, best deals, buy online, affordable products, latest arrivals, high-quality items, trusted store, fast delivery.</p>
                        </div>
                        <div className="footerMenue">
                            <h2 style={{color:"gray",fontSize:"20px"}}>MENU</h2>
                            <ul>
                                <li onClick={()=>{router.push("/")}}> 
                                    Home
                                </li>
                                <li onClick={()=>{router.push("/ContactUs")}}>
                                    Contact Us
                                </li>
                                <li onClick={()=>{router.push("/Blogs")}}>
                                    Blogs
                                </li>
                                <li onClick={()=>{router.push("/BrezadaNews")}}>
                                    News
                                </li>
                                <li onClick={()=>{router.push("/Shop")}}>
                                    Shop 
                                </li>
                                <li onClick={()=>{router.push("/Categories")}}>
                                    Categories
                                </li>
                            </ul>
                        </div>
                        <div className="footerContact">
                            <h2 style={{color:"gray",fontSize:"20px"}}>CONTACTS</h2>
                            <ul>
                                <li>
                                <div className="square"></div> El Ahram Street ,Banha,Egypt
                                </li>
                                <li>
                                <div className="square"></div> +01115217083
                                </li>
                                <li>
                                    <div className="square"></div> mohamed.mekdad.mm@gmail.com
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='footercopyright'>
                        <p>© 2025 Brezada . All rights reserved</p>
                        <ul>
                            <li>
                                Privcy Policy
                            </li>
                            <li>
                                Term of service
                            </li>
                            <li>
                                Legal info
                            </li>
                        </ul>
                    </div>
        </div>
        
        </>
    )
}
export default Footer;