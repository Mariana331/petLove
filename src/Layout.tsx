import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
import Loader from "./app/components/Loader/Loader";

interface LayoutProps {
  isAuth: boolean;
}

function Layout({ isAuth }: LayoutProps) {
  return (
    <div>
      <Header isAuth={isAuth} />
      <Loader />
      <Outlet />
    </div>
  );
}

export default Layout;
