import PostCard from "./PostCard";
import type { Post } from "../../types/post.type";

type Props = {
  posts: Post[];
  onDelete: (id: number) => void;
};

function PostList({ posts, onDelete }: Props) {
  return (
    <section>
      <h2 className="text-lg uppercase tracking-[0.3em] font-bold">Post</h2>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} onDelete={onDelete} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
