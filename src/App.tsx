import { Routes, Route } from "react-router-dom";
import Main from "./app/pages/Main/Main";
import Home from "./app/pages/Home/Home";
import News from "./app/pages/News/News";
import Notices from "./app/pages/Notices/Notices";
import Friends from "./app/pages/Friends/Friends";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />

        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="news" element={<News />} />
          <Route path="notices" element={<Notices />} />
          <Route path="friends" element={<Friends />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
