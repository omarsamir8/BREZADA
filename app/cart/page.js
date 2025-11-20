import CartPage from "../components/cartContainer/cartContainer";
export const metadata = {
  title: "Cart",
  description: "“Review and manage your selected products in our cart page before checkout. Update quantities, apply coupons, add shipping details, and view your subtotal and grand total instantly. A fast, clean, and secure shopping cart designed for a smooth online shopping experience.”",
};
function Cart(){
    return (
        <>
        <div>
            <CartPage/>
        </div>
        </>
    )
}
export default Cart;