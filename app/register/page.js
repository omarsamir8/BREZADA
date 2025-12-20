"use client";
import { useState } from "react";
import Swal from "sweetalert2";
import './register.css';
import Link from "next/link";
export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error || "Something went wrong!",
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User registered successfully 🎉",
          timer: 2000,
          showConfirmButton: false,
        });

        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow regForm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 style={{color:"black",fontWeight:"bold"}} className="text-2xl font-bold mb-4 text-center">
          Welcome To Registration Page
        </h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <p
              style={{ fontWeight: "bold", margin: "0" }}
              className="text-blue-600 cursor-pointer hover:underline text-sm"
            >
              Do You Have An Account?{" "}
              <Link style={{color:"blue"}} href="/login" className="text-blue-600 hover:underline">
                LogIn
              </Link>
        </p> 
      </form>
    </div>
  );
}
