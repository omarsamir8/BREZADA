import ShopAll from "../components/ShopAll/ShopAll";
import './shop.css'
export const metadata = {
  title: "Shop All Products",
  description: "Discover our complete range of premium products all in one place. From top-rated essentials to the latest arrivals, Shop All Products offers everything you need in one easy-to-browse collection. Whether you’re looking for beauty, health, home, or lifestyle items, our store provides high-quality, affordable, and trusted products that suit every need and style.Enjoy a seamless shopping experience, detailed product descriptions, and fast delivery.Shop now and find your perfect pick today!",
};
function Shop(){
    return (
        <>
        <div className="shop">
            <ShopAll/>
        </div>
        </>
    )
}
export default Shop;