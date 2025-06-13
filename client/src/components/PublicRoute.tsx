import { Navigate, Outlet } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
  isAllowed: boolean;
};
export const PublicRoute = ({isAllowed, children }: Props) => {
  return isAllowed ? <Navigate to="/dashboard" replace /> : children;

}