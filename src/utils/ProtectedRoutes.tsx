import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {
  isValid: boolean;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ isValid }) => {
  return isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
