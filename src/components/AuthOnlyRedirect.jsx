import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";

const AuthOnlyRedirect = ({ children }) => {
  const { user } = useUser();

  if (user) return <Navigate to="/" replace />;
  return children;
};

export default AuthOnlyRedirect;
