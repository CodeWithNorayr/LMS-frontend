import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"; // ✅ FIXED

export const StoreContext = createContext(null);

export const StoreContextProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Backend URL
  const backendURL = "http://localhost:4000";

  const [filteredCourses, setFilteredCourses] = useState([]);

  // ✅ Courses
  const [courseSchemas, setCourseSchemas] = useState([]);

  const [totalAmount, setTotalAmount] = useState(0);

  // ✅ Cart
  const [cartItems, setCartItems] = useState({});

  // ✅ Tokens
  const [token, setToken] = useState("");
  const [educatorToken, setEducatorToken] = useState("");

  // ✅ Comment popup state
  const [isClicked, setIsClicked] = useState(false);

  const [updateButtonIsClicked, setUpdateButtonIsClicked] = useState(false);

  /* ==========================
        CART FUNCTIONS
  ========================== */

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1,
    }));

    if(token){
      await axios.post(`http://localhost:4000/api/cart/add`,{itemId},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      if (!prev[itemId]) return prev;

      const updated = { ...prev };
      updated[itemId] -= 1;

      if (updated[itemId] <= 0) {
        delete updated[itemId];
      }

      return updated;
    });

    if(token){
      await axios.post(`http://localhost:4000/api/cart/remove`,{itemId},{
        headers:{
          "Authorization":`Bearer ${token}`
        }
      })
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
  
    for (const courseId in cartItems) {
  
      // ✅ Correct ID match
      const course = courseSchemas.find(
        (c) => String(c._id) === String(courseId)
      );
  
      if (!course) continue;
  
      const discount = course.discount || 0;
  
      // ✅ Discount as fixed amount
      const discountedPrice = course.coursePrice - discount;
  
      total += discountedPrice * cartItems[courseId];
    }
  
    setTotalAmount(total);
  };
  
  useEffect(() => {
    getTotalCartAmount();
  }, [cartItems, courseSchemas]);
  

  const clearCart = () => {
    setCartItems({});
  };

  /* ==========================
        FETCH COURSES
  ========================== */

  const fetchingCourses = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/api/courses/getAllCourses`
      );

      if (response.data.success) {
        setCourseSchemas(response.data.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message || "Failed to fetch courses"
      );
    }
  };

  useEffect(() => {
    fetchingCourses();
  }, []);

  const addToUi = (newCourse) => {
    setCourseSchemas((prev)=>[newCourse,...prev])
  }

  /* ==========================
        LOAD TOKENS
  ========================== */

  useEffect(() => {
    const storedUserToken = localStorage.getItem("token");
    const storedEducatorToken = localStorage.getItem("educatorToken");

    if (storedUserToken) setToken(storedUserToken);
    if (storedEducatorToken) setEducatorToken(storedEducatorToken);
  }, []);

  /* ==========================
        SAVE TOKENS
  ========================== */

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (educatorToken)
      localStorage.setItem("educatorToken", educatorToken);
    else localStorage.removeItem("educatorToken");
  }, [educatorToken]);

  /* ==========================
        CONTEXT VALUE
  ========================== */

  const value = {
    navigate,

    backendURL,

    // Courses
    courseSchemas,
    setCourseSchemas,

    // Cart
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,

    // Tokens
    token,
    setToken,
    educatorToken,
    setEducatorToken,

    // Comment Popup
    isClicked,
    setIsClicked,
    updateButtonIsClicked,
    setUpdateButtonIsClicked,
    addToUi,
    filteredCourses, 
    setFilteredCourses,
    totalAmount,
    getTotalCartAmount
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
