import Header from "./app/components/Header/Header";
import { Outlet } from "react-router-dom";
// import Loader from "./app/components/Loader/Loader";

function Layout() {
  return (
    <div>
      <Header />
      <main className="container">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
