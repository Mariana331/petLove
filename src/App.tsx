import { Routes, Route } from "react-router-dom";
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
import { useState } from "react";

function App() {
  const [isAuth, setIsAuth] = useState<boolean>(!localStorage.getItem("token"));
  const [userName, setUserName] = useState<string>(
    localStorage.getItem("userName") || "",
  );

  const [userEmail, setUserEmail] = useState<string>(
    localStorage.getItem("userEmail") || "",
  );

  const handleLogout = () => {
    SignOut();
    setIsAuth(false);
    setUserName("");
    setUserEmail("");
  };

  return (
    <div>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/" element={<Main />} />

        <Route
          path="/"
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
          <Route path="notices" element={<Notices />} />
          <Route path="friends" element={<Friends />} />
          <Route
            path="register"
            element={
              <Register
                setIsAuth={setIsAuth}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
              />
            }
          />
          <Route
            path="login"
            element={
              <Login
                setIsAuth={setIsAuth}
                setUserName={setUserName}
                setUserEmail={setUserEmail}
              />
            }
          />
          <Route path="*" element={<NotFound />} />
          <Route path="/add-pet" element={<AddPet />} />
          <Route
            path="/profile"
            element={<Profile userName={userName} userEmail={userEmail} />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
