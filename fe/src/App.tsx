import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import DetailPostPage from "./pages/DetailPostPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<DetailPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
