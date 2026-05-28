import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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
        <div>
          {token ? (
            <div>
              <button className="bg-black text-white px-5 py-2 rounded-lg mx-2">
                <Link to={"/posts/create"}>Add Post</Link>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-5 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          ) : (
            <button className="bg-black text-white px-5 py-2 rounded-lg mx-2">
              <Link to={"/auth/login"}>Login</Link>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
