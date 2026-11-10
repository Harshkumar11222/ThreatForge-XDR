import { useState } from "react";
import { Eye, EyeOff, Fingerprint, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { registerSchema, type RegisterSchema } from "../../utils/validators";
import { registerUser } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  return <div className="tf-auth-shell">
    <aside className="tf-auth-aside">
      <Link to="/" className="inline-flex items-center gap-3"><span className="grid h-11 w-11 place-items-center rounded-xl border border-cyan-300/25 bg-cyan-300/10 text-cyan-100"><ShieldCheck size={23}/></span><span><b className="block text-sm tracking-[.14em] text-white">THREATFORGE</b><small className="mt-1 block text-[9px] font-extrabold tracking-[.28em] text-cyan-300">XDR CONSOLE</small></span></Link>
      <p className="tf-eyebrow mt-16">Create your workspace account</p>
      <h1 className="mt-4 max-w-xl text-4xl font-extrabold leading-tight tracking-[-.05em] text-white sm:text-5xl">Build a sharper<br/><span className="text-cyan-300">security workflow.</span></h1>
      <p className="mt-6 max-w-lg text-sm leading-8 text-slate-400">Create an account to access file intake, security alert review and the ThreatForge XDR console.</p>
      <div className="mt-10 flex max-w-lg items-center gap-3 rounded-xl border border-slate-700/60 bg-slate-900/40 p-4"><Fingerprint size={21} className="text-cyan-200"/><div><p className="text-xs font-extrabold text-slate-200">Identity-aware access</p><p className="mt-1 text-[10px] text-slate-500">Protected API routes use bearer-token authentication.</p></div></div>
    </aside>

    <section className="tf-auth-card">
      <div className="mb-7"><span className="tf-chip">NEW ACCOUNT</span><h2 className="mt-4 text-2xl font-extrabold tracking-tight text-white">Create your account</h2><p className="mt-2 text-xs text-slate-400">Set up your ThreatForge workspace access.</p></div>
      <form className="space-y-4" onSubmit={handleSubmit(async (data) => {
        try {
          setLoading(true);
          const response = await registerUser({ name: data.name, email: data.email, password: data.password });
          toast.success(response.message || "Account created. You can sign in now.");
          navigate("/login");
        } catch (error: any) {
          toast.error(error?.response?.data?.detail || "Registration failed. Check the details and try again.");
        } finally { setLoading(false); }
      })}>
        <div><label className="mb-2 block text-[11px] font-bold text-slate-300">Full name</label><input {...register("name")} autoComplete="name" placeholder="Your name" className="tf-input"/>{errors.name && <p className="mt-1.5 text-[10px] text-rose-300">{errors.name.message}</p>}</div>
        <div><label className="mb-2 block text-[11px] font-bold text-slate-300">Email address</label><input {...register("email")} type="email" autoComplete="email" placeholder="you@company.com" className="tf-input"/>{errors.email && <p className="mt-1.5 text-[10px] text-rose-300">{errors.email.message}</p>}</div>
        <div><label className="mb-2 block text-[11px] font-bold text-slate-300">Password</label><div className="relative"><input {...register("password")} type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" className="tf-input !pr-12"/><button type="button" onClick={() => setShowPassword((value) => !value)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-200">{showPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.password && <p className="mt-1.5 text-[10px] text-rose-300">{errors.password.message}</p>}</div>
        <div><label className="mb-2 block text-[11px] font-bold text-slate-300">Confirm password</label><div className="relative"><input {...register("confirmPassword")} type={showConfirmPassword ? "text" : "password"} autoComplete="new-password" placeholder="Repeat your password" className="tf-input !pr-12"/><button type="button" onClick={() => setShowConfirmPassword((value) => !value)} aria-label="Toggle confirmation visibility" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-500 hover:text-cyan-200">{showConfirmPassword ? <EyeOff size={17}/> : <Eye size={17}/>}</button></div>{errors.confirmPassword && <p className="mt-1.5 text-[10px] text-rose-300">{errors.confirmPassword.message}</p>}</div>
        <button type="submit" disabled={loading} className="tf-button mt-2 w-full !min-h-[48px]">{loading ? "Creating account…" : "Create account"}</button>
      </form>
      <div className="mt-6 border-t border-slate-700/50 pt-5 text-center"><p className="text-xs text-slate-500">Already registered? <Link to="/login" className="font-extrabold text-cyan-300 hover:text-white">Sign in</Link></p></div>
    </section>
  </div>;
}
