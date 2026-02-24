import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader/Loader";
import { useAuthStore } from "./app/stores/authStore";

function Layout() {
  const { isAuth } = useAuthStore();
  return (
    <div>
      <Header isAuth={isAuth} />
      <Loader />
      <Outlet />
    </div>
  );
}

export default Layout;
