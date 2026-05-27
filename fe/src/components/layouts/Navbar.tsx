import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="sticky mb-4 top-0 z-50 border-b bg-white">
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to={"/"}>
          <h1 className="text-3xl font-serif font-bold">blog.</h1>
        </Link>
        <div className="flex font-bold flex-items-center gap-8">
          <Link className="hover:underline" to={"/"}>
            Home
          </Link>
          <Link className="hover:underline" to={"/posts"}>
            Posts
          </Link>
        </div>
        <button className="bg-black text-white px-5 py-2 rounded-lg">
          Sign In
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
