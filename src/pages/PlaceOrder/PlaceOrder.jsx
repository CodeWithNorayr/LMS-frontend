import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const {
    backendURL,
    token,
    cartItems,
    courseSchemas,
    totalAmount,
  } = useContext(StoreContext);

  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    streetcode: "",
    zipcode: "",
    state: "",
    city: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Login required!");
      return;
    }

    // ✅ Build items from cart
    const orderItems = courseSchemas
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        name: item.courseTitle,
        price: item.coursePrice,
        quantity: cartItems[item._id],
      }));

    if (orderItems.length === 0) {
      toast.error("Cart is empty!");
      return;
    }

    // ✅ Correct request (NO userId sent)
    const orderData = {
      address: data,
      items: orderItems,
      amount: totalAmount,
    };

    try {
      const res = await axios.post(
        `${backendURL}/api/order/place`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        window.location.href = res.data.session_url;
      }
    } catch (err) {
      console.log(err);
      toast.error("Order failed!");
    }
  };

  return (
    <form className="order-container" onSubmit={onSubmitHandler}>
      <h1>Place Order</h1>

      {Object.keys(data).map((field) => (
        <input
          key={field}
          name={field}
          value={data[field]}
          onChange={onChangeHandler}
          placeholder={field}
          required
        />
      ))}

      <h2>Total: ${totalAmount}</h2>

      <button type="submit">Place Order</button>
    </form>
  );
};

export default PlaceOrder;
