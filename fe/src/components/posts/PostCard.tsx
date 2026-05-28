import { Link } from "react-router-dom";
import type { Post } from "../../types/post.type";

type Props = {
  post: Post;
  onDelete: (id: number) => void;
};

function PostCard({ post, onDelete }: Props) {
  const token = localStorage.getItem("token");

  return (
    <article className="group py-10">
      <p className="text-sm text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleDateString("en-ID")}
        {token !== null && (
          <>
            |{" "}
            <Link className="hover:underline" to={`/posts/edit/${post.id}`}>
              Edit
            </Link>{" "}
            |{" "}
            <button
              onClick={() => onDelete(post.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </>
        )}{" "}
      </p>
      <h2 className="text-4xl font-serif font-bold leading-tight mb-4 group-hover:underline cursor-pointer">
        {post.title}
      </h2>
      <p className="text-lg text-gray-600 leading-relaxed mb-6">
        {post.content.slice(0, 150)} ......
      </p>
      <Link
        to={`/posts/${post.id}`}
        className="text-sm font-semibold hover:underline"
      >
        Read more →
      </Link>{" "}
      <div className="items-center gap-4">
        <span className="bg-gray-100 px-2 py-1 text-xs  tracking-wider">
          <span className="capitalize">{post.user.name}</span> -{" "}
          {post.user.email}
        </span>
      </div>
    </article>
  );
}

export default PostCard;
