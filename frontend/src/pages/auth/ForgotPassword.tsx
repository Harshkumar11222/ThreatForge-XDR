import { Link } from "react-router-dom";
import { Mail, ArrowLeft } from "lucide-react";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl">

        {/* Heading */}

        <h1 className="text-3xl font-bold text-white">
          Forgot Password
        </h1>

        <p className="mt-3 text-slate-400 leading-7">
          Enter your registered email address and we'll send you a password reset link.
        </p>

        {/* Form */}

        <form className="mt-8 space-y-6">

          <div>
            <label className="text-sm text-slate-300">
              Email Address
            </label>

            <div className="relative mt-2">

              <Mail
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-700 bg-[#111827] py-3 pl-12 pr-4 text-white outline-none transition focus:border-cyan-400"
              />

            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-500"
          >
            Send Reset Link
          </button>

        </form>

        {/* Bottom */}

        <div className="mt-8 text-center">

          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
}