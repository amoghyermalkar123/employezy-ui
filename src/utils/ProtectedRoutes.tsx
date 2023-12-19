import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

interface PrivateRoutesProps {
  isValid: boolean;
}

const PrivateRoutes: FC<PrivateRoutesProps> = ({ isValid }) => {
  return isValid ? <Navigate to="/login" />: <Outlet /> ;
};

export default PrivateRoutes;
