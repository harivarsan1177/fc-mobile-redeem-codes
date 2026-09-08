import React, { useState } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import type { CodeItem, CodeStatus } from '../../types/code';

interface VerificationModalProps {
  isOpen: boolean;
  code: CodeItem | null;
  onClose: () => void;
  onVerify: (id: string, status: CodeStatus, notes: string) => Promise<void>;
}

export const VerificationModal: React.FC<VerificationModalProps> = ({
  isOpen,
  code,
  onClose,
  onVerify,
}) => {
  const [status, setStatus] = useState<CodeStatus>('ACTIVE');
  const [notes, setNotes] = useState('Checked and confirmed working.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !code) return null;

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      await onVerify(code.id, status, notes);
      onClose();
    } catch (err) {
      console.error('Failed to verify:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="card w-full max-w-md bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#deded6] pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-[#1d5f52]" />
            <h2 className="text-lg font-black text-[#151515]">Verify Code Status</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#686863] hover:bg-[#f1f1eb] hover:text-[#151515]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4 rounded-xl bg-[#f5f5f0] p-3 text-xs">
          <span className="font-bold text-[#686863]">Target Code:</span>
          <div className="mono mt-1 text-xl font-black text-[#151515]">{code.code}</div>
          <p className="mt-1 text-[#686863]">{code.reward}</p>
        </div>

        <form onSubmit={handleVerify} className="mt-5 space-y-4 text-sm">
          <div>
            <label className="block text-xs font-bold uppercase text-[#686863] mb-1">
              Confirmed Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as CodeStatus)}
              className="w-full rounded-xl border border-[#deded6] p-2.5 font-bold text-[#151515] outline-none focus:border-[#151515]"
            >
              <option value="ACTIVE">ACTIVE (Working on live servers)</option>
              <option value="EXPIRING_SOON">EXPIRING_SOON (Expiring imminent)</option>
              <option value="EXPIRED">EXPIRED (Failed with expired code)</option>
              <option value="LIMIT_REACHED">LIMIT_REACHED (Global quota full)</option>
              <option value="DISABLED">DISABLED (Deactivated)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-[#686863] mb-1">
              Verification Notes
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Checked on official redemption portal at 10:30 PM."
              className="w-full rounded-xl border border-[#deded6] p-2.5 text-xs text-[#151515] outline-none focus:border-[#151515]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#deded6]">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-secondary text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary text-xs"
            >
              <Check size={16} />
              {isSubmitting ? 'Recording...' : 'Record Verification'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
