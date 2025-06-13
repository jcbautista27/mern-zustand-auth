import { Navigate, Outlet, useLocation } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
  isAllowed: boolean;
};

export const ProtectedRoute = ({ isAllowed, children }: Props) => {
  const location = useLocation();
  if (!isAllowed) {
    localStorage.setItem("lastPath", location.pathname);
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};
