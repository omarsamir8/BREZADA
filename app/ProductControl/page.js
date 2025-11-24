"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './productcontrol.css'
export default function ProductsPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    priceBeforeSale: "",
    brand: "",
    category: "",
    image: null,
  });
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getProducts = async () => {
    try {
      const res = await axios.get("/api/product");
      setProducts(res.data);
    } catch (err) {
      toast.error("Failed to load products");
    }
  };

  useEffect(() => { getProducts(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login as admin first");

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) data.append(key, formData[key]);
    }

    try {
      if (editingProduct) {
        await axios.put(`/api/product/${editingProduct._id}`, Object.fromEntries(data), {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Product updated successfully");
      } else {
        await axios.post("/api/product", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("✅ Product added successfully");
      }
      setFormData({ name: "", description: "", price: "", priceBeforeSale: "", brand: "", category: "", image: null });
      setEditingProduct(null);
      getProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving product");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Please login as admin first");
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`/api/product/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("🗑️ Product deleted");
      getProducts();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete product");
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      priceBeforeSale: product.priceBeforeSale || "",
      brand: product.brand,
      category: product.category,
      image: null,
    });
  };

  return (
    <div className="productform">
      <ToastContainer position="top-center" />
      <h2>
        {editingProduct ? "Edit Product" : "Add New Product"}
      </h2>

      <form onSubmit={handleSubmit} className="shadow">
        <input type="text" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name:e.target.value})} required className="form-control" />
        {/* <input type="text" placeholder="Brand" value={formData.brand} onChange={e => setFormData({...formData, brand:e.target.value})} className="form-control" /> */}
        <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price:e.target.value})} required className="form-control" />
        <input className="form-control" type="number" placeholder="Price Before Sale" value={formData.priceBeforeSale} onChange={e => setFormData({...formData, priceBeforeSale:e.target.value})}  />
        <select 
          value={formData.brand} 
          onChange={e => setFormData({ ...formData, brand: e.target.value })} 
          className="form-select"
          aria-label="Default select example"
        >
            <option value=""hidden>Select Brand</option>
            <option value="Brezda">Brezda</option>
            <option value="Common Good">Common Good</option>
            <option value="EL Fursan">EL Fursan</option>
        </select>
        <select 
          value={formData.category} 
          onChange={e => setFormData({ ...formData, category: e.target.value })} 
          className="form-select"
          aria-label="Default select example"
        >
            <option value=""hidden>Select Category</option>
            <option value="Beauty Products">Beauty Products</option>
            <option value="Spices Products">Spices Products</option>
            <option value="Natural oils">Natural oils</option>
            <option value="Honey">Honey</option>
            <option value="Natural Drinks">Natural Drinks</option>
            <option value="Snacks & Nuts">Snacks & Nuts</option>
        </select>
        <input type="file" accept="image/*" onChange={e => setFormData({...formData, image:e.target.files[0]})} className="form-control" />
        <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description:e.target.value})} rows={1} className="form-control" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded col-span-2 hover:bg-green-700">{editingProduct ? "Update Product" : "Add Product"}</button>
      </form>

      <h2 style={{marginTop:"20px"}}>Products List</h2>
      <div className="table-wrapper">
          <table>
        <thead style={{backgroundColor:"blanchedalmond",fontSize:"18px"}}>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Brand</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Price Befor Sale</th> 
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody style={{fontSize:"17px",color:"gray",fontWeight:"300"}}>
          {products.length > 0 ? products.map(p => (
            <tr key={p._id} className="hover:bg-gray-100">
              <td className="border p-2"><img  src={p.image || "/no-image.png"} alt={p.name} className="" width={200}/></td>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.brand}</td>
              <td className="border p-2">{p.category}</td>
              <td className="border p-2">${p.price}</td>
              <td className="border p-2">${p.priceBeforeSale}</td>
              <td style={{display:"flex",alignItems:"center",gap:"10px",justifyContent:"center",height:"78px"}} className="border p-2 space-x-2">
                <button onClick={() => handleEdit(p)} className="editbutton">Edit</button>
                <button style={{backgroundColor:"red"}} onClick={() => handleDelete(p._id)} className="deletebutton">Delete</button>
              </td>
            </tr>
          )) : <tr><td colSpan="5" className="border p-4">No products found</td></tr>}
        </tbody>
      </table>
      </div>
    </div>
  );
}
