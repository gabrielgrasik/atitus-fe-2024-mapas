import { Children, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Navigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to="/" replace />;
  }
  return Children;
}
