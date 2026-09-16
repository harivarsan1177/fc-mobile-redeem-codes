import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import type { CodeItem, CodeFormData, CodeStatus } from '../../types/code';

interface CodeFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CodeFormData) => Promise<void>;
  initialData?: CodeItem | null;
}

export const CodeFormModal: React.FC<CodeFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const isEditing = Boolean(initialData);

  const [formData, setFormData] = useState<CodeFormData>({
    code: '',
    reward: '',
    status: 'ACTIVE',
    releaseDate: new Date().toISOString().split('T')[0],
    expirationDate: '',
    source: '',
    sourceUrl: '',
    notes: '',
    usageLimit: null,
    verificationDate: new Date().toISOString(),
    verificationNotes: 'Verified working on global servers.',
    deleted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setFormData({
        code: initialData.code,
        reward: initialData.reward,
        status: initialData.status,
        releaseDate: initialData.releaseDate ? initialData.releaseDate.split('T')[0] : '',
        expirationDate: initialData.expirationDate ? initialData.expirationDate.split('T')[0] : '',
        source: initialData.source || '',
        sourceUrl: initialData.sourceUrl || '',
        notes: initialData.notes || '',
        usageLimit: initialData.usageLimit ?? null,
        verificationDate: initialData.verificationDate || '',
        verificationNotes: initialData.verificationNotes || '',
        deleted: initialData.deleted ?? false,
      });
    } else {
      setFormData({
        code: '',
        reward: '',
        status: 'ACTIVE',
        releaseDate: new Date().toISOString().split('T')[0],
        expirationDate: '',
        source: '',
        sourceUrl: '',
        notes: '',
        usageLimit: null,
        verificationDate: new Date().toISOString(),
        verificationNotes: 'Verified working on global servers.',
        deleted: false,
      });
    }
    setErrorMsg(null);
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      setErrorMsg('Code string is required.');
      return;
    }
    if (!formData.reward.trim()) {
      setErrorMsg('Reward description is required.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);
      await onSubmit({
        ...formData,
        code: formData.code.trim().toUpperCase(),
        expirationDate: formData.expirationDate ? new Date(formData.expirationDate).toISOString() : null,
      });
      onClose();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Failed to save code');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0d1422] border border-[#22314a] p-6 sm:p-8 shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-[#1e2a3e] pb-4">
          <h2 className="text-xl font-black text-white">
            {isEditing ? `Edit Code: ${initialData?.code}` : 'Add New Redeem Code'}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#94a3b8] hover:bg-[#182338] hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#ef4444]/15 border border-[#ef4444]/40 p-3 text-xs font-semibold text-[#ef4444]">
            <AlertCircle size={16} />
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Code String *
              </label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                placeholder="e.g. FCMOBILE2026"
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 mono font-black uppercase text-white outline-none focus:border-[#00ff87]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Status *
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as CodeStatus })}
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 font-bold text-white outline-none focus:border-[#00ff87]"
              >
                <option value="ACTIVE" className="bg-[#141d2f]">ACTIVE (Active & Verified)</option>
                <option value="EXPIRING_SOON" className="bg-[#141d2f]">EXPIRING_SOON (Expiring Soon)</option>
                <option value="EXPIRED" className="bg-[#141d2f]">EXPIRED (Expired)</option>
                <option value="LIMIT_REACHED" className="bg-[#141d2f]">LIMIT_REACHED</option>
                <option value="DISABLED" className="bg-[#141d2f]">DISABLED</option>
                <option value="PENDING_VERIFICATION" className="bg-[#141d2f]">PENDING_VERIFICATION</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
              Reward Description *
            </label>
            <input
              type="text"
              required
              value={formData.reward}
              onChange={(e) => setFormData({ ...formData, reward: e.target.value })}
              placeholder="e.g. 1,000 Coins + Elite Player Pack"
              className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 font-medium text-white outline-none focus:border-[#00ff87]"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Release Date
              </label>
              <input
                type="date"
                value={formData.releaseDate}
                onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Expiration Date (Optional)
              </label>
              <input
                type="date"
                value={formData.expirationDate || ''}
                onChange={(e) => setFormData({ ...formData, expirationDate: e.target.value })}
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Source Name
              </label>
              <input
                type="text"
                value={formData.source || ''}
                onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                placeholder="e.g. EA Official Live Stream"
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Source URL
              </label>
              <input
                type="url"
                value={formData.sourceUrl || ''}
                onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                placeholder="https://twitter.com/..."
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
                Usage Limit (Optional)
              </label>
              <input
                type="number"
                value={formData.usageLimit ?? ''}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    usageLimit: e.target.value ? parseInt(e.target.value, 10) : null,
                  })
                }
                placeholder="e.g. 100000"
                className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#94a3b8] mb-1">
              Internal Notes / Restriction Info
            </label>
            <textarea
              rows={2}
              value={formData.notes || ''}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="e.g. Global servers, minimum account level 5 required..."
              className="w-full rounded-xl border border-[#24334c] bg-[#141d2f] p-2.5 text-white outline-none focus:border-[#00ff87]"
            />
          </div>

          <div className="rounded-xl bg-[#121929] p-4 border border-[#1e2a3e]">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#00ff87] mb-2">
              Verification Record
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="block text-[11px] font-bold text-[#94a3b8] mb-1">
                  Verification Notes
                </label>
                <input
                  type="text"
                  value={formData.verificationNotes || ''}
                  onChange={(e) => setFormData({ ...formData, verificationNotes: e.target.value })}
                  placeholder="Checked and confirmed working."
                  className="w-full rounded-lg border border-[#24334c] bg-[#141d2f] p-2 text-xs text-white outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-[#94a3b8] mb-1">
                  Verification Timestamp
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.verificationDate || 'Not yet verified'}
                  className="w-full rounded-lg border border-[#1e2a3e] bg-[#0c121e] p-2 text-xs text-[#64748b]"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1e2a3e]">
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
              <Save size={15} />
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Code' : 'Create Code'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
