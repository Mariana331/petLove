import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader/Loader";

interface LayoutProps {
  isAuth: boolean;
  userName: string;
  handleLogout: () => void;
}

function Layout({ isAuth, userName, handleLogout }: LayoutProps) {
  return (
    <div>
      <Header isAuth={isAuth} userName={userName} handleLogout={handleLogout} />
      <Loader />
      <Outlet />
    </div>
  );
}

export default Layout;
