"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function OrdersControls() {
  const [orders, setOrders] = useState([]);

  // ================================
  // 1) Load Orders
  // ================================
  const getOrders = async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (err) {
      console.log("Error loading orders:", err);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // ================================
  // 2) Update Status
  // ================================
  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) {
        toast.error("Failed to update status");
        return;
      }

      toast.success("Order status updated successfully ✔");
      getOrders();
    } catch (err) {
      console.log("Error updating status:", err);
      toast.error("Error updating order");
    }
  };

  // ================================
  // 3) Delete Order (with SweetAlert)
  // ================================
  const deleteOrder = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This order will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`/api/orders/${id}`, {
            method: "DELETE",
          });

          if (!res.ok) {
            toast.error("Failed to delete order");
            return;
          }

          Swal.fire("Deleted!", "Order has been deleted.", "success");

          toast.success("Order deleted successfully ❌");

          getOrders();
        } catch (err) {
          console.log("Error deleting order:", err);
          toast.error("Error deleting order");
        }
      }
    });
  };

  return (
    <>
      <div className="OrdersControls">
        <h2 style={{ marginTop: "20px", textAlign: "center" }}>Orders List</h2>
        <div className="table-wrapper">
        <table style={{ width: "100%", textAlign: "center" }}>
          <thead style={{ backgroundColor: "blanchedalmond", fontSize: "18px" }}>
            <tr>
              <th className="border p-2">Customer</th>
              <th className="border p-2">Phone</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Products</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Payment</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody style={{ fontSize: "17px", color: "gray", fontWeight: "500" }}>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-100">
                  <td className="border p-2">{order.guestInfo?.name}</td>
                  <td className="border p-2">{order.guestInfo?.phone}</td>
                  <td className="border p-2">{order.guestInfo?.address}</td>

                  <td className="border p-2">
                    {order.cartItems.map((item, index) => (
                      <div key={index}>
                        <img
                          width={40}
                          height={40}
                          src={item.product?.image}
                          alt="productimage"
                        />{" "}
                        <b>{item.quantity}×</b>{" "}
                        {item.product?.name || "Deleted Product"}
                      </div>
                    ))}
                  </td>

                  <td className="border p-2">L£{order.totalAmount}</td>
                  <td className="border p-2">{order.paymentMethod}</td>

                  <td className="border p-2">{order.status}</td>

                  <td className="border p-2">
                    <button
                      style={{
                        backgroundColor: "red",
                        padding: "6px 10px",
                        color: "white",
                        borderRadius: "6px",
                        marginRight: "5px",
                      }}
                      onClick={() => deleteOrder(order._id)}
                    >
                      Delete
                    </button>

                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateStatus(order._id, e.target.value)
                      }
                      style={{
                        padding: "6px",
                        borderRadius: "6px",
                        border: "1px solid #bbb",
                      }}
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="border p-4">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        
      </div>
    </>
  );
}

export default OrdersControls;
