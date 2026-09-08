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
      <div className="card w-full max-w-md bg-white p-6 sm:p-8 shadow-xl">
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-1.5 text-xs font-bold text-[#686863] hover:text-[#151515]"
        >
          <ArrowLeft size={15} /> Back to Code Vault
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#151515] text-white">
            <Lock size={20} />
          </div>
          <div>
            <h1 className="text-xl font-black text-[#151515]">Administrator Login</h1>
            <p className="text-xs text-[#686863]">FC Mobile Code Management Vault</p>
          </div>
        </div>

        {errorMsg && (
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#fee2e2] p-3 text-xs font-semibold text-[#dc2626]">
            <AlertCircle size={16} className="shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-[#686863] mb-1">
              Admin Email Address
            </label>
            <div className="relative flex items-center">
              <Mail size={16} className="absolute left-3 text-[#686863]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@fcmobile.com"
                className="w-full rounded-xl border border-[#deded6] py-2.5 pl-9 pr-3 text-sm font-medium text-[#151515] outline-none focus:border-[#151515]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#686863] mb-1">
              Admin Password
            </label>
            <div className="relative flex items-center">
              <Lock size={16} className="absolute left-3 text-[#686863]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full rounded-xl border border-[#deded6] py-2.5 pl-9 pr-3 text-sm font-medium text-[#151515] outline-none focus:border-[#151515]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="btn btn-primary w-full text-sm mt-2 font-bold"
          >
            {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        {/* Development Mode Helper */}
        {!isFirebaseConfigured && (
          <div className="mt-6 rounded-xl bg-[#f5f5f0] p-4 text-xs text-[#686863] border border-[#deded6]">
            <div className="flex items-center gap-1.5 font-bold text-[#151515] mb-1">
              <ShieldCheck size={14} className="text-[#1d5f52]" />
              <span>Dev Preview Bypass</span>
            </div>
            <p className="leading-relaxed">
              Firebase credentials are not yet configured in <code>.env</code>. You can click below to test the admin dashboard.
            </p>
            <button
              onClick={handleQuickDevFill}
              className="mt-2.5 text-xs font-bold text-[#1d5f52] hover:underline"
            >
              Autofill dev credentials (admin@fcmobile.com)
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
