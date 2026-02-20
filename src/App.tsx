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
import { useModalStore } from "./app/stores/modalStore";
import { useEffect } from "react";
import ProtectedRoute from "./app/routes/ProtectedRoute";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const userName = useAuthStore((state) => state.userName);
  const logoutStore = useAuthStore((state) => state.logout);
  const initAuth = useAuthStore((state) => state.initAuth);
  const navigate = useNavigate();
  const { closeModal } = useModalStore();

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const handleLogout = async () => {
    await SignOut().finally(() => {
      closeModal();
      logoutStore();
      navigate("/home");
    });
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={2000} />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          element={
            <Layout
              isAuth={isAuth}
              userName={userName}
              handleLogout={handleLogout}
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
          <Route
            path="/add-pet"
            element={
              <ProtectedRoute>
                <AddPet />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile onLogOut={handleLogout} />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
