import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../Firebase";
import { Navigate, Outlet } from "react-router-dom";
const MainLayout = () => {
  const [user, isLoading] = useAuthState(auth);
  if (isLoading) {
    return <h1>Lütfen Bekleyiniz</h1>;
  }
  if (!user) {
    return <Navigate to='signIn' />;
  }
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayout;
