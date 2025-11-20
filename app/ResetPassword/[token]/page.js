"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";
import './resetpassform.css'
function ResetPassword() {
  const { token } = useParams();
  const router = useRouter();
console.log(token)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "❌ Passwords do not match!",
      });
      return;
    }

    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "✅ Password reset successful! Redirecting...",
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => router.push("/login"), 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: data.message || "❌ Something went wrong",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "❌ Please try again later",
      });
    }
  };

  return (
    <div className="resetpassform">
      <h2 style={{color:"black",fontWeight:"bold"}}>Reset Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "50%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={{
            display: "block",
            width: "50%",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default ResetPassword;
