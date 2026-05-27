import { useState, type FormEvent } from "react";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const data = await login({
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err: any) {
      console.log(err.response?.data?.message);
      setError(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-body-md text-on-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-sm border border-gray-300 p-8 md:p-10 transition-soft">
        <div className="mb-8 text-center">
          <h2 className="font-bold text-primary tracking-tight">
            Welcome Back
          </h2>
          <p className="font-caption text-caption text-on-surface-variant mt-2">
            Silakan masuk untuk melanjutkan ke dashboard Anda
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 border-outline-variant text-on-surface placeholder-outline bg-surface-container-lowest focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint transition-all duration-200 text-sm"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label
                htmlFor="password"
                className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider block"
              >
                Password
              </label>
              {/* <a
                href="#"
                className="font-caption text-caption text-surface-tint hover:underline"
              >
                Lupa password?
              </a> */}
            </div>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 border-outline-variant text-on-surface placeholder-outline bg-surface-container-lowest focus:outline-none focus:border-surface-tint focus:ring-1 focus:ring-surface-tint transition-all duration-200 text-sm"
              required
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full bg-black text-white font-label-caps text-label-caps bg-primary text-on-primary uppercase tracking-widest py-4 px-6 rounded-lg transition-soft active:scale-[0.98] hover:opacity-90 font-semibold shadow-sm"
            >
              Log In
            </button>
            {error && (
              <p className="text-error text-red-500  mt-3 text-center">
                {error}
              </p>
            )}
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-outline-variant text-center">
          <p className="font-caption text-caption text-on-surface-variant">
            Belum punya akun?{" "}
            <a href="#" className="text-primary font-semibold hover:underline">
              Daftar sekarang
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
