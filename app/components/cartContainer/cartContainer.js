"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import "./cartContainer.css";
import { toast } from "react-toastify";
export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    paymentMethod: "cash",
  });

  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const updateQty = (id, type) => {
    let updated = cart.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          qty: type === "inc" ? item.qty + 1 : item.qty > 1 ? item.qty - 1 : 1,
        };
      }
      return item;
    });

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const grandTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 🔥 إرسال الطلب للـ Backend
  const submitOrder = async () => {
    const orderData = {
      guestInfo: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
      },
      cartItems: cart.map((item) => ({
        product: item.id,
        quantity: item.qty,
        price: item.price,
      })),
      totalAmount: grandTotal,
      paymentMethod: form.paymentMethod,
    };

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Order created successfully ✔");
      localStorage.removeItem("cart");
      setCart([]);
      setOpenModal(false);
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="cart-container">
      <div className="breadcrumb">
        Home / <span>Your Cart</span>
      </div>

      <h2 className="cart-title">Your Cart ({cart.length} Items)</h2>

      <div className="cart-box">
        <div className="cart-header">
          <div>Item</div>
          <div>Price</div>
          <div>Quantity</div>
          <div>Total</div>
          <div>Remove</div>
        </div>

        {cart.map((item) => (
          <div className="cart-row" key={item.id}>
            <div className="cart-product">
              <Image src={item.img} width={80} height={80} alt={item.name} />

              <div className="product-info">
                <p className="brand">{item.brand}</p>
                <p className="product-name">{item.name}</p>
              </div>
            </div>

            <div className="price">L£{item.price}</div>

            <div className="quantity-box">
              <button onClick={() => updateQty(item.id, "dec")}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => updateQty(item.id, "inc")}>+</button>
            </div>

            <div className="total">L£{(item.price * item.qty).toFixed(2)}</div>
            <button className="remove-btn" onClick={() => removeItem(item.id)}>
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="summary-box">
        <div className="summary-row grand-total">
          <span>Grand total:</span>
          <span>L£{grandTotal.toFixed(2)}</span>
        </div>

        <button className="checkout-btn" onClick={() => setOpenModal(true)}>
          Check out
        </button>
      </div>

      {/* 🔥 المودال */}
      {openModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Checkout</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <input
              type="text"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <input
              type="text"
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <label>Payment Method</label>
            <select
              value={form.paymentMethod}
              onChange={(e) =>
                setForm({ ...form, paymentMethod: e.target.value })
              }
            >
              <option value="cash">Cash</option>
              <option value="card">Visa / Card</option>
            </select>

            <button className="confirm-btn" onClick={submitOrder}>
              Confirm Order
            </button>

            <button className="close-btn" onClick={() => setOpenModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
