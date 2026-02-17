import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";

interface LayoutProps {
  isAuth: boolean;
  userName: string;
  onLogOut: () => void;
}

function Layout({ isAuth, userName, onLogOut }: LayoutProps) {
  return (
    <div>
      <Header isAuth={isAuth} onLogOut={onLogOut} userName={userName} />
      <Outlet />
    </div>
  );
}

export default Layout;
