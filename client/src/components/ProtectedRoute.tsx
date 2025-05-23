import { Navigate , Outlet} from "react-router-dom";
type Props = {
  children?: React.ReactNode;
  isAllowed: boolean;
};

export const ProtectedRoute = ({ isAllowed, children }: Props) => {
  if (!isAllowed) return <Navigate to={"/login"} />;
  return children? <>{children}</> : <Outlet/>;
};
