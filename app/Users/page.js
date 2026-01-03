"use client";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import './user.css'
export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("/api/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      
      if (res.ok) {
        setUsers(data.users);
      } else {
        console.error("❌ Error:", data.message);
      }
    } catch (err) {
      console.error("❌ Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ تعديل
  const updateUser = async (id, updates) => {
    try {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data = await res.json();
      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u._id === id ? { ...u, ...data.user } : u))
        );
        Swal.fire("Updated!", "User updated successfully", "success");
      } else {
        console.error("❌ Update error:", data.message);
      }
    } catch (err) {
      console.error("❌ Update error:", err);
    }
  };

  // 🔴 مسح مع SweetAlert
  const deleteUser = async (id, name) => {
    Swal.fire({
      title: `Are you sure you want to delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/users/${id}`, {
            method: "DELETE",
          });

          const data = await res.json();
          if (res.ok) {
            setUsers((prev) => prev.filter((u) => u._id !== id));
            Swal.fire("Deleted!", "User has been deleted.", "success");
          } else {
            Swal.fire("Error!", data.message, "error");
          }
        } catch (err) {
          console.error("❌ Delete error:", err);
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div className="adminPage">
      <h1 style={{textAlign:"center"}} className="mb-4">Welcom to Users Management Page</h1>

      {users.length === 0 ? (
        <p style={{textAlign:"center"}}>No users found</p>
      ) : (
        <div className="table-responsive">
          <table style={{textAlign:"center",width:"100%",margin:"auto"}} className="table table-striped table-bordered table-hover align-middle ">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className="badge bg-info text-dark">{user.role}</span>
                  </td>
                  <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td
                    className="text-center"
                    style={{ display: "flex", gap: "10px" ,alignItems:"center",justifyContent:"center"}}
                  >
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(user._id, user.name)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
