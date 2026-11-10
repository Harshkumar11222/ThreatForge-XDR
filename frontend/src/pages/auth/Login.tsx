import { useState } from "react";
import { Eye, EyeOff, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { loginSchema, type LoginSchema } from "../../utils/validators";
import { login } from "../../services/auth";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({ resolver: zodResolver(loginSchema) });

  return <div className="tf-auth-shell">
    <aside className="tf-auth-aside">
      <Link to="/" className="inline-flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100"><ShieldCheck size={23}/></span><span><b className="block text-sm tracking-[.14em] text-white">THREATFORGE</b><small className="mt-1 block text-[9px] font-extrabold tracking-[.28em] text-cyan-300">XDR CONSOLE</small></span></Link>
      <p className="tf-eyebrow mt-16">Security operations workspace</p>
      <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-[-.05em] text-white sm:text-5xl">Your security picture,<br/><span className="text-cyan-300">in one place.</span></h1>
      <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400">Sign in to review security alerts, inspect file uploads and explore the current ThreatForge detection workflow.</p>
      <div className="mt-10 grid max-w-lg grid-cols-3 gap-3">{[{icon:Fingerprint,label:"SHA-256"},{icon:ShieldCheck,label:"ClamAV"},{icon:LockKeyhole,label:"YARA rules"}].map(({icon:Icon,label})=><div key={label} className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-3"><Icon size={17} className="text-cyan-200"/><p className="mt-3 text-[10px] font-extrabold text-slate-300">{label}</p></div>)}</div>
      <p className="mt-16 text-[10px] text-slate-600">DETECT · INVESTIGATE · RESPOND</p>
    </aside>

    <section className="tf-auth-card">
      <div className="mb-8"><span className="tf-chip"><span className="tf-status-dot"/> AUTHENTICATED WORKSPACE</span><h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white">Welcome back</h2><p className="mt-2 text-xs leading-6 text-slate-400">Enter your account details to continue to the console.</p></div>
      <form className="space-y-5" onSubmit={handleSubmit(async (data) => {
        try {
          setLoading(true);
          const response = await login(data);
          localStorage.setItem("token", response.access_token);
          localStorage.setItem("user", JSON.stringify(response.user));
          toast.success("Signed in successfully.");
          navigate("/dashboard");
        } catch (error: any) {
          toast.error(error?.response?.data?.detail || "Sign-in failed. Check your credentials and API connection.");
        } finally { setLoading(false); }
      })}>
        <div><label className="mb-2 block text-[11px] font-bold text-slate-300">Email address</label><input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" className="tf-input"/>{errors.email && <p className="mt-1.5 text-[10px] text-rose-300">{errors.email.message}</p>}</div>
        <div><div className="mb-2 flex items-center justify-between"><label className="text-[11px] font-bold text-slate-300">Password</label><Link to="/forgot-password" className="text-[10px] font-bold text-cyan-300 hover:text-white">Forgot password?</Link></div><div className="relative"><input {...register("password")} type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="tf-input !pr-12"/><button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-200" aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.password && <p className="mt-1.5 text-[10px] text-rose-300">{errors.password.message}</p>}</div>
        <button type="submit" disabled={loading} className="tf-button w-full !min-h-[48px]">{loading ? "Signing in…" : "Sign in to console"}</button>
      </form>
      <div className="mt-7 border-t border-slate-700/50 pt-6 text-center"><p className="text-xs text-slate-500">New to ThreatForge? <Link to="/register" className="font-extrabold text-cyan-300 hover:text-white">Create an account</Link></p><Link to="/" className="mt-5 inline-block text-[10px] font-bold text-slate-600 hover:text-slate-300">← Back to platform</Link></div>
    </section>
  </div>;
}
