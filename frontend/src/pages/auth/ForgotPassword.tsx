import { ArrowLeft, KeyRound, ShieldAlert } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  return <div className="tf-auth-shell !grid-cols-1">
    <section className="tf-auth-card mx-auto max-w-lg">
      <span className="tf-feature-icon"><KeyRound size={19}/></span>
      <h1 className="mt-6 text-2xl font-extrabold text-white">Password recovery</h1>
      <p className="mt-3 text-xs leading-7 text-slate-400">Password-reset delivery is not connected in the current backend build. Contact the project administrator to reset the account password.</p>
      <div className="mt-5 flex gap-3 rounded-xl border border-amber-300/15 bg-amber-300/[.04] p-4"><ShieldAlert size={16} className="mt-0.5 flex-none text-amber-200"/><p className="text-[10px] leading-5 text-slate-400">No reset email has been sent. This page is informational until a password-reset endpoint is implemented.</p></div>
      <Link to="/login" className="tf-button-secondary mt-7 w-full"><ArrowLeft size={14}/> Back to sign in</Link>
    </section>
  </div>;
}
