import { Routes, Route } from "react-router-dom";
import Main from "./app/pages/Main/Main";
import Home from "./app/pages/Home.page/Home";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
