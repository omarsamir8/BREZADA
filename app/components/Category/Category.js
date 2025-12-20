'use client'
import './Category.css';
import { useRouter } from "next/navigation";
function Category(){
    const router = useRouter();
    return (
        <>
        <h2 className='ctegorytitle'>Top Categories</h2>
        <div className="CategoryContainer">
            <div onClick={()=>{router.push('/Categories')}} className='category'>
                <img style={{borderRadius:"10px"}} src='./Assets/cat-1.jpg' alt='CategoryImg' width={350} height={200}/>
                <h2>Beauty Products</h2>
            </div>
            {/* <div onClick={()=>{router.push('/Categories')}} className='category'>
                <img style={{borderRadius:"50%"}} src='./Assets/cat-2.jpg' alt='CategoryImg' width={200} height={200}/>
                <h2>Spices Products</h2>
            </div> */}
            <div onClick={()=>{router.push('/Categories')}} className='category'>
                <img style={{borderRadius:"10px"}} src='./Assets/cat-3.jpg' alt='CategoryImg' width={350} height={200}/>
                <h2>Natural oils</h2>
            </div>
            <div onClick={()=>{router.push('/Categories')}} className='category'>
                <img style={{borderRadius:"10px"}} src='./Assets/cat-4.jpg' alt='CategoryImg' width={350} height={200}/>
                <h2>Natural Drinks</h2>
            </div>
            {/* <div onClick={()=>{router.push('/Categories')}} className='category'>
                <img style={{borderRadius:"50%"}} src='./Assets/cat-5.jpg' alt='CategoryImg' width={200} height={200}/>
                <h2>Snacks & Nuts</h2>
            </div>  */}
        </div>
        </>
    )
}
export default Category;