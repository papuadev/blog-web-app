import { useEffect, useState } from "react";
import { getPosts } from "../services/post.service";
import type { Post } from "../types/post.type";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import PostList from "../components/posts/PostList";
import { useLocation } from "react-router-dom";

function PostPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const location = useLocation();

  const successMessage = location.state?.message;

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError("Failed to fetch posts");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      <Navbar />
      {successMessage && (
        <div
          style={{
            color: "green",
            backgroundColor: "#e6fff0",
            padding: "10px",
            marginBottom: "15px",
          }}
        >
          {successMessage}
        </div>
      )}
      <PostList posts={posts} />
      <Footer />
    </div>
  );
}

export default PostPage;
