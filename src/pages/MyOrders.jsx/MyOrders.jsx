import React, { useContext, useEffect, useState } from "react";
import "./MyOrders.css";
import axios from "axios";
import { toast } from "react-toastify";
import { StoreContext } from "../../context/StoreContext";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
  const { token, backendURL } = useContext(StoreContext);

  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Orders Function
  const fetchingOrders = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/order/my-orders`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("No orders found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Run when token is available
  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchingOrders();
  }, [token]);

  return (
    <div className="myorders-page">
      <h1>Order history</h1>

      {/* ✅ Loading */}
      {loading && <p>Loading orders...</p>}

      {/* ✅ No Orders */}
      {!loading && orders.length === 0 && (
        <p>You have no orders yet.</p>
      )}

      {/* ✅ Orders List */}
      {orders.map((order) => (
        <div className="order-card-section">
          <div className="order-card" key={order._id}>
            <h2>Student's information</h2>
            <p>Amount: ${order.amount}</p>
            <p>Status: {order.payment ? "Paid ✅" : "Not Paid ❌"}</p>
            <p>First Name: {order.address.firstname}</p>
            <p>Last Name: {order.address.lastname}</p>
            <p>Email: {order.address.email}</p>
            <p>Streetcode: {order.address.streetcode}</p>
            <p>Zipcode: {order.address.zipcode}</p>
            <p>State: {order.address.state}</p>
            <p>City: {order.address.city}</p>
            <p>Country: {order.address.country}</p>
            <p>Phone: {order.address.phone}</p>
          </div>
          <div>
            <div>
              <h2>Course info</h2>
            </div>
            {order.items.map((item)=>(
              <div key={item._id}>
                <p>Course name: {item.name}</p>
                <p>Course price: {item.price}</p>
                <p>Course quantity: {item.quantity}</p>
              </div>
            ))}
          </div>
          <div>
            <div>
              <h2>Order created/updated</h2>
            </div>
            <div>
              <p>Order created at: {order.createdAt}</p>
              <p>Order updated at: {order.updatedAt}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
