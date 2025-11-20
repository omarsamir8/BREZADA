"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../ProductControl/productcontrol.css";
import Swal from "sweetalert2";

export default function NewsPage() {
  const [formData, setFormData] = useState({
    author: "",
    description: "",
    image: null,
  });

  const [newsList, setNewsList] = useState([]);
  const [editingNews, setEditingNews] = useState(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const getNews = async () => {
    try {
      const res = await axios.get("/api/news");
      setNewsList(res.data.news || []);
    } catch (err) {
      toast.error("Failed to load news");
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Please login as admin first");

    const data = new FormData();
    data.append("author", formData.author);
    data.append("description", formData.description);

    if (formData.image) data.append("image", formData.image);

    try {
      if (editingNews) {
        // UPDATE
        await axios.put(`/api/news/${editingNews._id}`, data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("News updated successfully");
      } else {
        // CREATE
        await axios.post("/api/news", data, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("News added successfully");
      }

      // Reset
      setFormData({ author: "", description: "", image: null });
      setEditingNews(null);
      getNews();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error saving news");
    }
  };

  const handleDelete = async (id) => {
    if (!token) return toast.error("Please login as admin first");

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/news/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("🗑️ News deleted");
        getNews();
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete news");
      }
    }
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData({
      author: item.author,
      description: item.description,
      image: null, // لو مش عايز تغير الصورة
    });
  };

  return (
    <div className="productform">
      <ToastContainer />
      <h2>{editingNews ? "Edit News" : "Add New News"}</h2>

      <form onSubmit={handleSubmit} className="shadow">
        <input
          style={{ width: "100%" }}
          type="text"
          placeholder="Author"
          value={formData.author}
          onChange={(e) =>
            setFormData({ ...formData, author: e.target.value })
          }
          required
          className="form-control"
        />

        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="form-control"
          rows={3}
          required
        />

        <input
          style={{ width: "100%" }}
          type="file"
          accept="image/*"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
          className="form-control"
        />

        {editingNews && !formData.image && editingNews.image && (
          <div style={{ margin: "10px 0" }}>
            <img
              src={editingNews.image}
              alt="current news"
              width={150}
              style={{ border: "1px solid gray", borderRadius: "5px" }}
            />
            <p>Current image</p>
          </div>
        )}

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded col-span-2 hover:bg-green-700"
        >
          {editingNews ? "Update News" : "Add News"}
        </button>
      </form>

      <h2 style={{ marginTop: "20px" }}>News List</h2>

      <table>
        <thead style={{ backgroundColor: "blanchedalmond", fontSize: "18px" }}>
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Author</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody style={{ fontSize: "17px", color: "gray", fontWeight: "300" }}>
          {newsList.length > 0 ? (
            newsList.map((n) => (
              <tr key={n._id} className="hover:bg-gray-100">
                <td className="border p-2">
                  <img src={n.image || "/no-image.png"} alt="news" width={200} />
                </td>
                <td className="border p-2">{n.author}</td>
                <td className="border p-2">{n.description}</td>
                <td
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    justifyContent: "center",
                    height: "78px",
                  }}
                  className="border p-2"
                >
                  <button onClick={() => handleEdit(n)} className="editbutton">
                    Edit
                  </button>
                  <button
                    style={{ backgroundColor: "red" }}
                    onClick={() => handleDelete(n._id)}
                    className="deletebutton"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="border p-4">
                No news found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
