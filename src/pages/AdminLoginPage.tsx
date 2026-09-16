import React, { useState } from 'react';
import { Lock, Mail, ArrowLeft, AlertCircle, ShieldCheck } from 'lucide-react';
import { signInAdmin } from '../firebase/auth';
import { isFirebaseConfigured } from '../firebase/config';

interface AdminLoginPageProps {
  onSuccess: () => void;
  onBack: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({ onSuccess, onBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setErrorMsg(null);
      await signInAdmin(email.trim(), password);
      onSuccess();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDevFill = () => {
    setEmail('admin@fcmobile.com');
    setPassword('Admin@12345');
  };

  return (
    <div className="container-custom flex min-h-[75vh] items-center justify-center py-12">
      <div className="card w-full max-w-md bg-[#0e1524] border border-[#22314a] p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#94a3b8] hover:text-[#00ff87] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} /> Back to Code Vault
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ff87] to-[#00df73] text-[#060a12] shadow-[0_0_15px_rgba(0,255,135,0.3)]">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-white">Administrator Login</h1>
            <p className="text-xs text-[#94a3b8]">FC Mobile Code Management Vault</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#ef4444]/15 border border-[#ef4444]/40 p-3 text-xs font-semibold text-[#ef4444]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
              Admin Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-[#64748b]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fcmobile.com"
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] py-2.5 pl-9 pr-3 text-sm font-medium text-white outline-none focus:border-[#00ff87] transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
              Admin Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-[#64748b]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] py-2.5 pl-9 pr-3 text-sm font-medium text-white outline-none focus:border-[#00ff87] transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full text-xs font-black mt-2 tracking-wider uppercase"
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Development Mode Helper */}
        {!isFirebaseConfigured && (
          <div className="mt-6 rounded-xl bg-[#121929] p-4 text-xs text-[#94a3b8] border border-[#1e2a3e]">
            <div className="flex items-center gap-1.5 font-bold text-white mb-1">
              <ShieldCheck size={14} className="text-[#00ff87]" />
              <span>Dev Preview Mode</span>
            </div>
            <p className="leading-relaxed">
              Firebase credentials not configured in <code>.env</code>. You can click below to test the admin dashboard locally.
            </p>
            <button
              onClick={handleQuickDevFill}
              className="mt-2.5 text-xs font-black text-[#00ff87] hover:underline cursor-pointer"
            >
              Autofill dev credentials (admin@fcmobile.com)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

