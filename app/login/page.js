"use client";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../register/register.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // ✅ تحميل بيانات المستخدم المخزنة في localStorage (لو موجودة)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // ✅ تحديث بيانات الفورم
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
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
        console.log("✅ User:", data.user);

        // ✅ حفظ بيانات المستخدم في localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);

        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "User Logged In successfully 🎉",
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          router.push("/"); // بعد تسجيل الدخول يروح للصفحة الرئيسية
        });
      }
    } catch (err) {
      Swal.fire("❌ Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ نسيان كلمة المرور
  const handleForgetPassword = async () => {
    const { value: email } = await Swal.fire({
      title: "Forgot Password?",
      input: "email",
      inputLabel: "Enter your registered email",
      inputPlaceholder: "example@email.com",
      showCancelButton: true,
      confirmButtonText: "Send Reset Link",
    });

    if (email) {
      try {
        const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        const data = await res.json();

        if (!res.ok) {
          Swal.fire("❌ Error", data.message || "Something went wrong!", "error");
        } else {
          Swal.fire("📩 Email Sent", data.message, "success");
        }
      } catch (err) {
        Swal.fire("❌ Error", err.message, "error");
      }
    }
  };

  // ✅ عرض صفحة الترحيب لو المستخدم داخل بالفعل
  if (user) {
    return (
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow regForm text-center">
        <h2 className="text-2xl font-bold mb-4" style={{ color: "black" }}>
          Welcome back, {user.name || user.email} 👋
        </h2>
        <button
          onClick={() => {
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            setUser(null);
          }}
          style={{backgroundColor:"greenyellow",border:"none",outline:"none"}}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    );
  }

  // ✅ صفحة تسجيل الدخول
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-2xl shadow regForm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2
          style={{ color: "black", fontWeight: "bold" }}
          className="text-2xl font-bold mb-4 text-center"
        >
          Welcome To Login Page
        </h2>

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

        <div style={{ flexDirection: "column" }} className="d-flex">
          <p
            style={{ fontWeight: "bold", margin: "0" }}
            className="text-blue-600 cursor-pointer hover:underline text-sm"
          >
            Do You Have An Account?{" "}
            <Link
              style={{ color: "blue" }}
              href="/register"
              className="text-blue-600 hover:underline"
            >
              SignUp
            </Link>
          </p>
        </div>

        {/* 🔑 زر تسجيل الدخول */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          style={{ marginTop: "0" }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* 🔁 نسيان كلمة المرور */}
        <p
          onClick={handleForgetPassword}
          className="text-blue-600 cursor-pointer hover:underline text-sm"
          style={{
            fontWeight: "bold",
            margin: "0",
            cursor: "pointer",
            color: "blue",
          }}
        >
          Forgot password?
        </p>
      </form>
    </div>
  );
}
