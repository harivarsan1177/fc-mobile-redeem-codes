import React, { useState, useMemo } from 'react';
import {
  Plus,
  Search,
  Filter,
  Star,
  CheckCircle,
  Edit2,
  Trash2,
  RotateCcw,
  Database,
  LogOut,
} from 'lucide-react';
import type { CodeItem, CodeFormData, CodeStatus } from '../types/code';
import {
  createCode,
  updateCode,
  verifyCode,
  toggleFeaturedCode,
  softDeleteCode,
  restoreCode,
  seedFirestoreDatabase,
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

  const handleToggleFeatured = async (item: CodeItem) => {
    await toggleFeaturedCode(item.id, !item.featured);
    showNotification(`Code ${item.code} featured status toggled.`);
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

  const handleSeedDatabase = async () => {
    if (window.confirm('Seed development demo codes into database?')) {
      const count = await seedFirestoreDatabase();
      showNotification(`Seeded ${count} sample codes into database.`);
    }
  };

  return (
    <div className="container-custom py-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#deded6] pb-6 mb-8">
        <div>
          <div className="pill bg-[#e7f1ed] text-[#1d5f52] mb-2">
            <span>ADMINISTRATIVE CONSOLE</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#151515]">
            Code Inventory & Verification Manager
          </h1>
          <p className="text-xs text-[#686863]">
            Manage FC Mobile redeem codes, record live verification status, and monitor drop activity.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onBackToHome}
            className="btn btn-secondary text-xs"
          >
            View Public Site
          </button>
          <button
            onClick={handleOpenAddModal}
            className="btn btn-primary text-xs"
          >
            <Plus size={16} /> Add Code
          </button>
          <button
            onClick={onSignOut}
            className="btn btn-secondary text-xs text-[#dc2626] hover:bg-[#fee2e2]"
            title="Sign out of administrator console"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </div>

      {/* Floating Notification */}
      {feedbackMsg && (
        <div className="mb-6 rounded-xl bg-[#e7f1ed] border border-[#b8dcce] p-3 text-xs font-bold text-[#1d5f52] flex items-center justify-between">
          <span>{feedbackMsg}</span>
          <button onClick={() => setFeedbackMsg(null)} className="text-[#1d5f52]">✕</button>
        </div>
      )}

      {/* KPI Metrics */}
      <AdminStats stats={stats} />

      {/* Table Control Bar */}
      <div className="card p-4 bg-white mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search input */}
          <div className="flex items-center gap-2 rounded-xl border border-[#deded6] px-3 py-1.5 flex-1 max-w-md bg-[#fbfbf9]">
            <Search size={16} className="text-[#686863]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search code string, reward, source..."
              className="w-full bg-transparent text-xs font-medium outline-none"
            />
          </div>

          {/* Status Filter Dropdown & Trash Toggle */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-[#686863]">
              <Filter size={14} />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-[#deded6] bg-white px-2.5 py-1 text-xs font-semibold text-[#151515] outline-none"
              >
                <option value="ALL">ALL STATUSES</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="EXPIRING_SOON">EXPIRING_SOON</option>
                <option value="EXPIRED">EXPIRED</option>
                <option value="LIMIT_REACHED">LIMIT_REACHED</option>
                <option value="DISABLED">DISABLED</option>
                <option value="PENDING_VERIFICATION">PENDING_VERIFICATION</option>
              </select>
            </div>

            <button
              onClick={() => setShowTrash(!showTrash)}
              className={`btn text-xs py-1.5 px-3 min-h-[34px] ${
                showTrash
                  ? 'bg-[#fee2e2] text-[#dc2626] border-[#fca5a5]'
                  : 'btn-secondary'
              }`}
            >
              {showTrash ? 'Showing Soft-Deleted Codes' : 'Show Soft-Deleted (History)'}
            </button>

            <button
              onClick={handleSeedDatabase}
              className="btn btn-secondary text-xs py-1.5 px-3 min-h-[34px]"
              title="Seed development demo codes"
            >
              <Database size={14} />
              Seed Demo Data
            </button>
          </div>
        </div>
      </div>

      {/* Code Inventory Data Table */}
      <div className="card overflow-hidden bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#deded6] bg-[#f5f5f0] text-[11px] font-black uppercase tracking-wider text-[#686863]">
              <tr>
                <th className="px-5 py-3.5">Code</th>
                <th className="px-5 py-3.5">Reward Details</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5">Verification</th>
                <th className="px-5 py-3.5">Expiration</th>
                <th className="px-5 py-3.5">Featured</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#deded6]">
              {displayCodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-10 text-center text-sm text-[#686863]">
                    No codes match the selected criteria.
                  </td>
                </tr>
              ) : (
                displayCodes.map((item) => (
                  <tr
                    key={item.id}
                    className={`transition-colors hover:bg-[#fbfbf9] ${
                      item.deleted ? 'bg-[#fef2f2]/30 opacity-75' : ''
                    }`}
                  >
                    {/* Code */}
                    <td className="px-5 py-4 font-mono font-black text-sm text-[#151515]">
                      <div className="flex items-center gap-1.5">
                        <span>{item.code}</span>
                        {item.deleted && (
                          <span className="rounded bg-[#fee2e2] px-1.5 py-0.5 text-[9px] font-bold text-[#dc2626]">
                            DELETED
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Reward Details */}
                    <td className="px-5 py-4 max-w-xs">
                      <div className="font-bold text-[#151515] truncate">{item.reward}</div>
                      {item.source && (
                        <div className="text-[10px] text-[#686863]">
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
                          <span className="font-semibold text-[#1d5f52]">
                            {formatRelativeTime(item.verificationDate)}
                          </span>
                          {item.verificationNotes && (
                            <p className="text-[10px] text-[#686863] truncate max-w-[140px]">
                              {item.verificationNotes}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-[#a8a8a3]">Unverified</span>
                      )}
                    </td>

                    {/* Expiration Date */}
                    <td className="px-5 py-4 font-semibold text-[#686863]">
                      {item.expirationDate
                        ? formatDisplayDate(item.expirationDate)
                        : 'No Expiration'}
                    </td>

                    {/* Featured Toggle */}
                    <td className="px-5 py-4">
                      <button
                        onClick={() => handleToggleFeatured(item)}
                        disabled={item.deleted}
                        className={`rounded-lg p-1.5 transition-colors ${
                          item.featured
                            ? 'bg-amber-100 text-amber-600'
                            : 'text-[#deded6] hover:text-[#a8a8a3]'
                        }`}
                        title={item.featured ? 'Unfeature code' : 'Feature code'}
                      >
                        <Star size={17} fill={item.featured ? 'currentColor' : 'none'} />
                      </button>
                    </td>

                    {/* Action Triggers */}
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {item.deleted ? (
                          <button
                            onClick={() => handleRestore(item)}
                            className="btn btn-secondary text-[11px] py-1 px-2.5 min-h-[30px] text-[#1d5f52]"
                            title="Restore soft-deleted code"
                          >
                            <RotateCcw size={13} /> Restore
                          </button>
                        ) : (
                          <>
                            <button
                              onClick={() => handleOpenVerifyModal(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px] text-[#1d5f52] hover:bg-[#e7f1ed]"
                              title="Verify code"
                            >
                              <CheckCircle size={13} /> Verify
                            </button>

                            <button
                              onClick={() => handleOpenEditModal(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px]"
                              title="Edit code details"
                            >
                              <Edit2 size={13} />
                            </button>

                            <button
                              onClick={() => handleSoftDelete(item)}
                              className="btn btn-secondary text-[11px] py-1 px-2 min-h-[30px] text-[#dc2626] hover:bg-[#fee2e2]"
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
