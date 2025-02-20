import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from "../providers/AuthProvider";


const PrivateRoute: React.FC = () => {
  const auth = useContext(AuthContext);
  console.log("is logged in" + auth.isLoggedin)
  if (!auth.isLoggedin) {
    return <Navigate to="/connexion" replace />;
  }
  return <Outlet />;
};

export default PrivateRoute;
