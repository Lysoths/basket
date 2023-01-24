import { Outlet, Navigate } from "react-router-dom";
import { auth } from "../Firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Auth = () => {
  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <h1>Lütfen Bekleyiniz</h1>;
  }
  if (user) {
    return <Navigate to='/' />;
  }
  return <Outlet />;
};

export default Auth;
