import { Route, Navigate } from "react-router-dom";

export const ProtectedRoute = ({ element, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/login" />
  );
};
