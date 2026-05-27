import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";

import type { Post } from "../types/post.type";

import { getPostById } from "../services/post.service";

function DetailPostPage() {
  const { id } = useParams();

  const [post, setPost] = useState<Post | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);

      const data = await getPostById(Number(id));

      setPost(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <>
      <Navbar />

      <main className="py-16">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-serif text-6xl font-bold leading-tight mb-8">
            {post.title}
          </h1>

          <div className="prose prose-lg max-w-none">
            <p>{post.content}</p>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}

export default DetailPostPage;
