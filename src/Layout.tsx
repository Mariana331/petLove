import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader/Loader";

interface LayoutProps {
  isAuth: boolean;
  handleLogout: () => void;
}

function Layout({ isAuth, handleLogout }: LayoutProps) {
  return (
    <div>
      <Header isAuth={isAuth} handleLogout={handleLogout} />
      <Loader />
      <Outlet />
    </div>
  );
}

export default Layout;
