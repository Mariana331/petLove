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
import { useEffect, useState } from "react";
import ProtectedRoute from "./app/routes/ProtectedRoute";
import type { Notice } from "./app/types/notices";
import { deleteFavorite, addFavorite } from "./app/services/notices";

function App() {
  const isAuth = useAuthStore((state) => state.isAuth);
  const logoutStore = useAuthStore((state) => state.logout);
  const initAuth = useAuthStore((state) => state.initAuth);
  const navigate = useNavigate();
  const { closeModal, openModal } = useModalStore();

  const [favorite, setFavorite] = useState<string[]>([]);

  const toggleFavorite = async (notice: Notice) => {
    if (!isAuth) {
      openModal("attention");
      return;
    }

    const isFavorite = favorite.includes(notice._id);

    try {
      if (isFavorite) {
        await deleteFavorite(notice._id);
        setFavorite((prev) => prev.filter((id) => id !== notice._id));
      } else {
        await addFavorite(notice._id);
        setFavorite((prev) => [...prev, notice._id]);
      }
    } catch (error) {
      console.error(error);
    }
  };

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

        <Route element={<Layout isAuth={isAuth} handleLogout={handleLogout} />}>
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route
            path="notices"
            element={
              <Notices
                isAuth={isAuth}
                toggleFavorite={toggleFavorite}
                isFavorite={favorite}
              />
            }
          />
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
