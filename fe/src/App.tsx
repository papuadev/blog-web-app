import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";
import DetailPostPage from "./pages/DetailPostPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import CreatePostPage from "./pages/PostCreate";
import EditPostPage from "./pages/PostEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/posts" element={<PostPage />} />
        <Route path="/posts/:id" element={<DetailPostPage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<RegisterPage />} />
        <Route path="/posts/create" element={<CreatePostPage />} />
        <Route path="/posts/edit/:id" element={<EditPostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
