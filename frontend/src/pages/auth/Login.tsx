import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/validators";
import type { LoginSchema } from "../../utils/validators";
import { login } from "../../services/auth";
//import { useAuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  //const { loginUser } = useAuthContext();
  const {
  register,
  handleSubmit,
  formState: { errors },
  
} = useForm<LoginSchema>({
  resolver: zodResolver(loginSchema),
});
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8">

        <h1 className="text-3xl font-bold text-white">
          Welcome Back
        </h1>

        <p className="mt-2 text-slate-400">
          Login to your ThreatForge account
        </p>

        <form
  className="mt-8 space-y-5"
  onSubmit={handleSubmit(async (data) => {
  try {

    setLoading(true);

    const response = await login(data);

    console.log("========== LOGIN ==========");
    console.log(response);
    console.log("ACCESS TOKEN:", response.access_token);

    localStorage.setItem("token", response.access_token);
    localStorage.setItem("user", JSON.stringify(response.user));

    console.log("SAVED TOKEN:", localStorage.getItem("token"));
    console.log("===========================");

    toast.success("Login Successful");

    navigate("/dashboard");

  } catch (error: any) {

    console.error(error);

    toast.error(
      error?.response?.data?.detail ||
      "Login Failed"
    );

  } finally {

    setLoading(false);

  }
})}
>

          <div>
            <label className="text-slate-300 text-sm">
              Email
            </label>

            <input
              {...register("email")}
              type="email"
              placeholder="you@example.com"
              className="mt-2 w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 text-white outline-none focus:border-cyan-400"
            />
            {errors.email && (
  <p className="mt-2 text-sm text-red-400">
    {errors.email.message}
  </p>
)}

          </div>

          <div>
  <label className="text-sm text-slate-300">
    Password
  </label>

  <div className="relative mt-2">

    <input
      {...register("password")}
      type={showPassword ? "text" : "password"}
      placeholder="********"
      className="w-full rounded-xl border border-slate-700 bg-[#111827] px-4 py-3 pr-12 text-white outline-none focus:border-cyan-400"
    />
    {errors.password && (
  <p className="mt-2 text-sm text-red-400">
    {errors.password.message}
  </p>
)}

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400"
    >
      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>

  </div>
</div>

          <div className="flex items-center justify-between">

  <label className="flex items-center gap-2 text-sm text-slate-400">

    <input
      type="checkbox"
      className="accent-cyan-500"
    />

    Remember Me

  </label>

  <Link
    to="/forgot-password"
    className="text-sm text-cyan-400 hover:underline"
  >
    Forgot Password?
  </Link>

</div>

          <button
  type="submit"
  disabled={loading}
  className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
>
  {loading ? "Signing In..." : "Login"}
</button>

          <div className="my-6 flex items-center">

  <div className="h-px flex-1 bg-slate-700" />

  <span className="px-4 text-sm text-slate-500">
    OR
  </span>

  <div className="h-px flex-1 bg-slate-700" />

</div>


<div className="grid gap-3">

  <button
    type="button"
    className="rounded-xl border border-slate-700 py-3 text-white hover:border-cyan-400 transition"
  >
    Continue with Google
  </button>

  <button
    type="button"
    className="rounded-xl border border-slate-700 py-3 text-white hover:border-cyan-400 transition"
  >
    Continue with GitHub
  </button>

</div>

        </form>

        <p className="mt-8 text-center text-slate-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-400 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>

    </div>
  );
}