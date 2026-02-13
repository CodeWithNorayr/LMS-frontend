import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../context/StoreContext";

const EducatorProtectedRoute = ({ children }) => {
  const { educatorToken } = useContext(StoreContext);

  if (educatorToken === "") return <p>Checking educator login...</p>;

  if (!educatorToken)
    return <Navigate to="/educator-login" replace />;

  return children;
};


export default EducatorProtectedRoute;
