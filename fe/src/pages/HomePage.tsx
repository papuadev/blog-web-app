import { useEffect, useState } from "react";
import { getPosts } from "../services/post.service";
import type { Post } from "../types/post.type";
import PostCard from "../components/posts/PostCard";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import HeroSection from "../components/hero/HeroSection";
import PostList from "../components/posts/PostList";

function HomePage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <main className="max-w-4xl mx-auto px-6 py-8">
        <HeroSection />
      </main>{" "}
      <PostList posts={posts} />
      <Footer />
    </div>
  );
}

export default HomePage;
