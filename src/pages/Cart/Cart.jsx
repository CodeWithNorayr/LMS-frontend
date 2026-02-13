import React, { useContext, useEffect, useState } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";

const Cart = () => {
  const {
    cartItems,
    courseSchemas,
    addToCart,
    removeFromCart,
    backendURL,
    navigate
  } = useContext(StoreContext);

  const [totalAmount, setTotalAmount] = useState(0);

  // Calculate total
  useEffect(() => {
    let total = 0;

    for (const courseId in cartItems) {
      const course = courseSchemas.find((c) => c._id === courseId);
      if (!course) continue;

      const discountedPrice = course.coursePrice - (course.discount || 0);

      total += discountedPrice * cartItems[courseId];
    }

    setTotalAmount(total);
  }, [cartItems, courseSchemas]);

  const cartCourseIds = Object.keys(cartItems);

  if (cartCourseIds.length === 0) {
    return <h1>Your cart is empty 🛒</h1>;
  }

  return (
    <div className="cart">
      <div>
        <div className="cart-titles-title">
          <h1>HAPPY SHOPPING</h1>
        </div>

        <div className="cart-titles">
          <p>Image</p>
          <p>Course</p>
          <p>Price</p>
          <p>Discount</p>
          <p>Action</p>
        </div>

        {cartCourseIds.map((courseId) => {
          const course = courseSchemas.find((c) => c._id === courseId);
          if (!course) return null;

          return (
            <div className="cart-titles" key={courseId}>
              <img
                src={`${course.image}`}
                alt={course.courseTitle}
                className="cart-thumbnail"
              />

              <h3>{course.courseTitle}</h3>
              <p>${course.coursePrice}</p>
              <p>${course.discount || 0}</p>

              <div className="cart-controls">
                <button
                  className="button-subtract"
                  onClick={() => removeFromCart(courseId)}
                >
                  -
                </button>
                <span>{cartItems[courseId]}</span>
                <button
                  className="button-add"
                  onClick={() => addToCart(courseId)}
                >
                  +
                </button>
              </div>
              <hr className="hr-br-cr" />
            </div>
          );
        })}

        <hr className="h1-br" />

        <h2 className="totalAmount-h2">Total: ${totalAmount}</h2>

        <div>
          <button onClick={()=>navigate("/place-order")} type="button">
            Order
          </button>
        </div>

      </div>
    </div>
  );
};

export default Cart;
