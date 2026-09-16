import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  CheckCircle,
  Edit2,
  Trash2,
  RotateCcw,
  LogOut,
} from 'lucide-react';
import type { CodeItem, CodeFormData, CodeStatus } from '../types/code';
import {
  createCode,
  updateCode,
  verifyCode,
  softDeleteCode,
  restoreCode,
  calculateAdminStats,
} from '../services/codeService';
import { AdminStats } from '../components/admin/AdminStats';
import { CodeFormModal } from '../components/admin/CodeFormModal';
import { VerificationModal } from '../components/admin/VerificationModal';
import { StatusBadge } from '../components/StatusBadge';
import { formatDisplayDate, formatRelativeTime } from '../utils/dateHelpers';

interface AdminDashboardPageProps {
  codes: CodeItem[];
  onBackToHome: () => void;
  onSignOut: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  codes,
  onBackToHome,
  onSignOut,
}) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [showTrash, setShowTrash] = useState(false);

  // Modals state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<CodeItem | null>(null);

  const [isVerifyOpen, setIsVerifyOpen] = useState(false);
  const [verifyingCode, setVerifyingCode] = useState<CodeItem | null>(null);

  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Compute live admin KPI stats
  const stats = useMemo(() => calculateAdminStats(codes), [codes]);

  // Filter codes
  const displayCodes = useMemo(() => {
    return codes.filter((c) => {
      // Trash vs active
      if (showTrash) {
        if (!c.deleted) return false;
      } else {
        if (c.deleted) return false;
      }

      // Status filter
      if (statusFilter !== 'ALL' && c.status !== statusFilter) return false;

      // Search filter
      if (search.trim()) {
        const q = search.toLowerCase();
        const matchesCode = c.code.toLowerCase().includes(q);
        const matchesReward = c.reward.toLowerCase().includes(q);
        const matchesSource = c.source?.toLowerCase().includes(q) || false;
        if (!matchesCode && !matchesReward && !matchesSource) return false;
      }

      return true;
    });
  }, [codes, showTrash, statusFilter, search]);

  const showNotification = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => setFeedbackMsg(null), 3000);
  };

  const handleOpenAddModal = () => {
    setEditingCode(null);
    setIsFormOpen(true);
  };

  const handleOpenEditModal = (item: CodeItem) => {
    setEditingCode(item);
    setIsFormOpen(true);
  };

  const handleOpenVerifyModal = (item: CodeItem) => {
    setVerifyingCode(item);
    setIsVerifyOpen(true);
  };

  const handleFormSubmit = async (data: CodeFormData) => {
    if (editingCode) {
      await updateCode(editingCode.id, data);
      showNotification(`Code ${data.code} updated successfully!`);
    } else {
      await createCode(data);
      showNotification(`Code ${data.code} created successfully!`);
    }
  };

  const handleVerifySubmit = async (id: string, status: CodeStatus, notes: string) => {
    await verifyCode(id, status, notes);
    showNotification('Verification record updated successfully!');
  };

  const handleSoftDelete = async (item: CodeItem) => {
    if (window.confirm(`Are you sure you want to soft-delete ${item.code}?`)) {
      await softDeleteCode(item.id);
      showNotification(`Code ${item.code} moved to deleted history.`);
    }
  };

  const handleRestore = async (item: CodeItem) => {
    await restoreCode(item.id);
    showNotification(`Code ${item.code} restored to active inventory.`);
  };

  return (
    <div className="container-custom py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#1e2a3e] pb-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#00ff87] mb-2">
            <span>ADMINISTRATIVE CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Code Inventory & Verification Manager
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Manage FC Mobile redeem codes, record live verification status, and monitor drop activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onBackToHome}
            className="btn btn-secondary text-xs font-bold"
          >
            View Public Site
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn btn-primary text-xs font-black"
          >
            <Plus size={16} /> Add Code
          </button>
          <button
            onClick={onSignOut}
            className="btn btn-secondary text-xs text-[#ef4444] hover:bg-[#ef4444]/15 hover:border-[#ef4444]/40"
            title="Sign out of administrator console"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {feedbackMsg && (
        <div className="mb-6 rounded-xl bg-[#00ff87]/15 border border-[#00ff87]/40 p-3 text-xs font-bold text-[#00ff87] flex items-center justify-between shadow-lg">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg(null)} className="text-[#00ff87] hover:opacity-80">✕</button>
        </div>
      )}

      {/* KPI Metrics */}
      <AdminStats stats={stats} />

      {/* Table Control Bar */}
      <div className="card p-4 bg-[#121928] border-[#22314a] mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search input */}
          <div className="flex items-center gap-2 rounded-xl border border-[#23334c] px-3 py-1.5 flex-1 max-w-md bg-[#141d2f]">
            <Search size={16} className="text-[#64748b]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code string, reward, source..."
              className="w-full bg-transparent text-xs font-medium text-white outline-none placeholder-[#64748b]"
            />
          </div>

          {/* Status Filter Dropdown & Trash Toggle */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#94a3b8]">
              <Filter size={14} className="text-[#00ff87]" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#23334c] bg-[#141d2f] px-2.5 py-1 text-xs font-bold text-white outline-none focus:border-[#00ff87]"
              >
                <option value="ALL" className="bg-[#141d2f] text-white">ALL STATUSES</option>
                <option value="ACTIVE" className="bg-[#141d2f] text-white">ACTIVE</option>
                <option value="EXPIRING_SOON" className="bg-[#141d2f] text-white">EXPIRING_SOON</option>
                <option value="EXPIRED" className="bg-[#141d2f] text-white">EXPIRED</option>
                <option value="LIMIT_REACHED" className="bg-[#141d2f] text-white">LIMIT_REACHED</option>
                <option value="DISABLED" className="bg-[#141d2f] text-white">DISABLED</option>
                <option value="PENDING_VERIFICATION" className="bg-[#141d2f] text-white">PENDING_VERIFICATION</option>
              </select>
            </div>

            <button
              onClick={() => setShowTrash(!showTrash)}
              className={`btn text-xs py-1.5 px-3 min-h-[34px] ${
                showTrash
                  ? 'bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/40'
                  : 'btn-secondary'
              }`}
            >
              {showTrash ? 'Showing Soft-Deleted Codes' : 'Show Soft-Deleted (History)'}
            </button>
          </div>
        </div>
      </div>

      {/* Code Inventory Data Table */}
      <div className="card overflow-hidden bg-[#101726] border-[#22314a] shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#1e2a3e] bg-[#141d30] text-[11px] font-black uppercase tracking-wider text-[#94a3b8]">
              <tr>
                <th className="px-5 py-3.5">Code</th>
                <th className="px-5 py-3.5">Reward Details</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Verification</th>
                <th className="px-5 py-3.5">Expiration</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e2a3e]">
              {displayCodes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-[#94a3b8]">
                    No codes match the selected criteria. Click &quot;Add Code&quot; to insert real redeem codes.
                  </td>
                </tr>
              ) : (
                displayCodes.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#141c2e] ${
                      item.deleted ? 'bg-[#ef4444]/10 opacity-75' : ''
                    }`}
                  >
                    {/* Code */}
                    <td className="px-5 py-4 font-mono font-black text-sm text-white">
                      <div className="flex items-center gap-1.5">
                        <span>{item.code}</span>
                        {item.deleted && (
                          <span className="rounded bg-[#ef4444]/20 border border-[#ef4444]/40 px-1.5 py-0.5 text-[9px] font-bold text-[#ef4444]">
                            DELETED
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Reward Details */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-bold text-[#e2e8f0] truncate">{item.reward}</div>
                      {item.source && (
                        <div className="text-[10px] text-[#64748b]">
                          Source: {item.source}
                        </div>
                      )}
                    </td>

                    {/* Status Badge */}
                    <td className="px-5 py-4">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    {/* Verification Record */}
                    <td className="px-5 py-4">
                      {item.verificationDate ? (
                        <div>
                          <span className="font-bold text-[#00ff87]">
                            {formatRelativeTime(item.verificationDate)}
                          </span>
                          {item.verificationNotes && (
                            <p className="text-[10px] text-[#94a3b8] truncate max-w-[140px]">
                              {item.verificationNotes}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#64748b]">Unverified</span>
                      )}
                    </td>

                    {/* Expiration Date */}
                    <td className="px-5 py-4 font-semibold text-[#94a3b8]">
                      {item.expirationDate
                        ? formatDisplayDate(item.expirationDate)
                        : 'No Expiration'}
                    </td>

                    {/* Action Triggers */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.deleted ? (
                          <button
                            onClick={() => handleRestore(item)}
                            className="btn btn-secondary text-[11px] py-1 px-2.5 min-h-[30px] text-[#00ff87]"
                            title="Restore soft-deleted code"
                          >
                            <RotateCcw size={13} /> Restore
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleOpenVerifyModal(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px] text-[#00ff87] hover:border-[#00ff87]/50"
                              title="Verify code"
                            >
                              <CheckCircle size={13} /> Verify
                            </button>

                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px] text-white"
                              title="Edit code details"
                            >
                              <Edit2 size={13} />
                            </button>

                            <button
                              onClick={() => handleSoftDelete(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px] text-[#ef4444] hover:bg-[#ef4444]/20"
                              title="Soft delete code"
                            >
                              <Trash2 size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Code Modal */}
      <CodeFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingCode}
      />

      {/* Verification Dialog */}
      <VerificationModal
        isOpen={isVerifyOpen}
        code={verifyingCode}
        onClose={() => setIsVerifyOpen(false)}
        onVerify={handleVerifySubmit}
      />
    </div>
  );
};

