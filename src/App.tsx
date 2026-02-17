import { Routes, Route, useNavigate } from "react-router-dom";
import Main from "./app/pages/Main/Main";
import Home from "./app/pages/Home/Home";
import News from "./app/pages/News/News";
import Notices from "./app/pages/Notices/Notices";
import Friends from "./app/pages/Friends/Friends";
import Register from "./app/pages/Register/Register";
import Login from "./app/pages/Login/Login";
import NotFound from "./app/pages/NotFound/NotFound";
import AddPet from "./app/pages/AddPet/AddPet";
import Profile from "./app/pages/Profile/Profile";
import Layout from "./Layout";
import { SignOut } from "./app/services/users";
import { ToastContainer } from "react-toastify";
import { useAuthStore } from "./app/stores/authStore";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const userName = useAuthStore((state) => state.userName);
  const logoutStore = useAuthStore((state) => state.logout);
  const initAuth = useAuthStore((state) => state.initAuth);

  const navigate = useNavigate();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleLogout = async () => {
    try {
      await SignOut();
    } catch {
      toast.error("You were logged out anyway.");
    } finally {
      logoutStore();
      navigate("/home");
    }
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          element={
            <Layout
              isAuth={isAuth}
              onLogOut={handleLogout}
              userName={userName}
            />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="notices" element={<Notices isAuth={isAuth} />} />
          <Route path="friends" element={<Friends />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route
            path="/profile"
            element={<Profile onLogOut={handleLogout} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
