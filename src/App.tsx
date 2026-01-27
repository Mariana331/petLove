import { Routes, Route } from "react-router-dom";
import MainLayout from "./app/pages/MainLayout/MainLayout";
import Home from "./app/pages/Home.page/Home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
