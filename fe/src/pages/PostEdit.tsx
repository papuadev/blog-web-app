import { useEffect, useState, type FormEvent } from "react";
import { getPostById, updatePost } from "../services/post.service";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import { useNavigate, useParams } from "react-router-dom";
import type { Post } from "../types/post.type";

function EditPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const data = await getPostById(Number(id));
      setTitle(data.title);
      setContent(data.content);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      await updatePost(Number(id), {
        title,
        content,
      });
      navigate("/posts", {
        state: { message: "Berhasil melakukan update." },
      });
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-4xl mx-auto px-6">
      <Navbar />
      <div className="my-8 text-center">
        <h2 className="font-bold text-primary text-xl tracking-tight">
          Edit Post
        </h2>
        <p className="font-caption text-caption text-on-surface-variant mt-2">
          Silakan edit sesuai form berikut
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label
            htmlFor="title"
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Your title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 border-outline-variant text-on-surface placeholder-outline bg-surface-container-lowest focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint transition-all duration-200 text-sm"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="content"
            className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
          >
            Content
          </label>
          <input
            id="content"
            type="text"
            placeholder="Your content here"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 border-outline-variant text-on-surface placeholder-outline bg-surface-container-lowest focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint transition-all duration-200 text-sm"
            required
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-black text-white font-label-caps text-label-caps bg-primary text-on-primary uppercase tracking-widest py-4 px-6 rounded-lg transition-soft active:scale-[0.98] hover:opacity-90 font-semibold shadow-sm"
          >
            Submit
          </button>
          {error && (
            <p className="text-error text-red-500  mt-3 text-center">{error}</p>
          )}
        </div>
      </form>

      <Footer />
    </div>
  );
}

export default EditPostPage;
