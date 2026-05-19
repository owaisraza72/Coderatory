// src/components/PrivateRoute.tsx
import React, { type JSX } from "react";

import { Navigate } from "react-router-dom";

type Props = { children: JSX.Element };

const PrivateRoute = ({ children }: Props) => {
  const isLoggedIn = localStorage.getItem("token"); // token check
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;