import PostCard from "./PostCard";
import type { Post } from "../../types/post.type";

type Props = {
  posts: Post[];
};

function PostList({ posts }: Props) {
  return (
    <section>
      <h2 className="text-lg uppercase tracking-[0.3em] font-bold">Post</h2>

      <div>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}

export default PostList;
