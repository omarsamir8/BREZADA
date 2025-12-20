"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./Navbar.css";
import { useRouter } from "next/navigation";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [cart, setCart] = useState([]);

    useEffect(() => {
    const storeed = localStorage.getItem("user");
    if (storeed) {
      setUser(JSON.parse(storeed));
    }
  }, []);
  console.log(user);
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const totalItems = cart.length;

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      router.push(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchOpen(false);
    }
  };

   const removeItem = (id) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  return (
    <>
      <div
        className="navbar text-black d-flex justify-content-between align-items-center"
        style={{ position: "relative" }}
      >
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            router.push("/");
          }}
          className="logoContainer"
        >
          <img src="/Assets/brezadaLogo.jpeg" alt="logoImage"  />
          <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
            <h2 style={{ margin: "0" }}>BREZADA</h2>
            <p style={{ margin: "0", padding: "0", color: "gray" }}>Organic Store</p>
          </div>
        </div>

        <ul className="nav-links">
          <li onClick={()=>{router.push("/Shop")}}>Shop All</li>
          <li onClick={()=>{router.push('/Categories')}}>Category</li>
          <li onClick={() => {router.push("/cart");}}>Cart</li>
          <li onClick={() => {router.push("/ContactUs");}}>Contact Us</li>
          <li onClick={() => {router.push("/Blogs");}}>Blogs</li>
          <li onClick={() => {router.push("/BrezadaNews");}}>News</li>
        </ul>
        <div className="nav-buttons" style={{ position: "relative" }}>
          {/* 🔍 زر البحث */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            style={{ position: "relative" }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          {/* 👤 تسجيل الدخول */}
          <button onClick={() => router.push("/login")}>
            <i className="fa-regular fa-user"></i>{user?user.name:"SignIn"} 
          </button>

          {/* 🛒 زر الكارت */}
          <button
            className="cartbutton"
            style={{ backgroundColor: "#4b8106", color: "white" }}
            onClick={() => setCartOpen(!cartOpen)}
          >
            <i style={{ color: "black" }} className="fa-solid fa-cart-shopping"></i>{" "}
            {totalItems} Cart
          </button>

          {/* 🧾 قائمة الكارت */}
          {cartOpen && (
            <div
              className="cart-dropdown"
              style={{
                position: "absolute",
                top: "60px",
                right: "0",
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                width: "260px",
                zIndex: 999,
                padding: "10px",
              }}
            >
              {cart.length > 0 ? (
                <>
                  {cart.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                        borderBottom: "1px solid #eee",
                        paddingBottom: "5px",
                      }}
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        width={50}
                        height={50}
                        style={{ borderRadius: "5px", marginRight: "10px" }}
                      />
                      <div>
                        <p style={{ margin: "0", fontWeight: "bold" }}>{item.name}</p>
                        <p style={{ margin: "0", fontSize: "13px", color: "gray" }}>
                          {item.brand}
                        </p>
                      </div>
                      <div>
                         <button
                          className="remove-btn"
                          onClick={() => removeItem(item.id)}
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between">
                    <button
                      style={{
                        backgroundColor: "#4b8106",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                    >
                      Checkout
                    </button>
                    <button
                      onClick={() => router.push("/cart")}
                      style={{
                        backgroundColor: "#4b8106",
                        color: "white",
                        border: "none",
                        borderRadius: "5px",
                        padding: "5px 10px",
                      }}
                    >
                      View Cart
                    </button>
                  </div>
                </>
              ) : (
                <p style={{ textAlign: "center", color: "gray" }}>No items in cart</p>
              )}
            </div>
          )}
        </div>

        {/* 📱 الأيقونة بتاعة البار للموبايل */}
        <div
          className="barcontainer"
          onClick={() => setOpen(!open)}
          style={{ cursor: "pointer" }}
        >
          <div className={`bar ${open ? "active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* 🔎 مربع البحث المنبثق */}
      {searchOpen && (
        <div
          className="search-bar"
          style={{
            position: "absolute",
            top: "00px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent:"center",
            width: "100%",
            height:"25vh",
            padding: "5px 10px",
            zIndex: 1000,
            
          }}
        >
          <input
            type="text"
            placeholder="Search the store"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              border: "none",
              outline: "none",
              padding: "10px",
              fontSize: "16px",
             backgroundColor:"white",
             width:"67%",
             borderTopLeftRadius:"5px",
             borderBottomLeftRadius:"5px"
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              backgroundColor: "#4b8106",
              color: "white",
              border: "none",
              width: "70px",
              borderTopRightRadius:"5px",
              padding:"11px",
              borderBottomRightRadius:"5px"
            }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button
            onClick={() => setSearchOpen(false)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              fontSize: "18px",
              marginLeft: "8px",
              fontWeight:"bold"
            }}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      )}

      {/* القائمة الجانبية */}
      {open && (
        <div className="menu bg-white text-black p-3">
          <ul className="list-unstyled mb-0">
            <li className="py-1">Welcome Back, {user ? user.name : null}</li>
            <li onClick={() => router.push("/")} className="py-1">
              Home
            </li>
            <li onClick={() => router.push("/Shop")}>Shop All</li>
            <li onClick={() => router.push("/Categories")}>Category</li>
            <li onClick={() => router.push("/cart")}>Cart</li>
            <li onClick={() => router.push("/ContactUs")}>Contact Us</li>
            <li onClick={() => router.push("/Blogs")}>Blogs</li>
            <li onClick={() => router.push("/BrezadaNews")}>News</li>
            {user?.role === "admin" && (
              <>
                <li onClick={() => router.push("/Neews")} className="py-1">
                  News Management
                </li>
                <li onClick={() => router.push("/ProductControl")} className="py-1">
                  Product Management
                </li>
                <li onClick={() => router.push("/OrdersControl")} className="py-1">
                  Order Management
                </li>
              </>
            )}
            <li onClick={() => router.push("/login")} className="py-1">
              {user ? "Logout" : "Login"}
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
