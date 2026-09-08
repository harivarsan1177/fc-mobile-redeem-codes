import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, Sparkles, Star, Layers } from 'lucide-react';
import type { AdminStats as AdminStatsType } from '../../types/code';

interface AdminStatsProps {
  stats: AdminStatsType;
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Active Codes',
      value: stats.total,
      icon: <Layers size={18} className="text-[#151515]" />,
      bg: 'bg-white',
    },
    {
      title: 'Verified Active',
      value: stats.active,
      icon: <ShieldCheck size={18} className="text-[#1d5f52]" />,
      bg: 'bg-[#e7f1ed]/50',
    },
    {
      title: 'Expiring Soon',
      value: stats.expiringSoon,
      icon: <Clock size={18} className="text-[#ca8a04]" />,
      bg: 'bg-[#fef8e7]/50',
    },
    {
      title: 'Expired / Limit',
      value: stats.expired,
      icon: <AlertTriangle size={18} className="text-[#dc2626]" />,
      bg: 'bg-[#fee2e2]/40',
    },
    {
      title: 'Pending Verification',
      value: stats.pendingVerification,
      icon: <Sparkles size={18} className="text-[#3b82f6]" />,
      bg: 'bg-[#eff6ff]/50',
    },
    {
      title: 'Featured Drops',
      value: stats.featured,
      icon: <Star size={18} className="text-amber-500 fill-amber-500" />,
      bg: 'bg-white',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 mb-8">
      {cards.map((c) => (
        <div key={c.title} className={`card p-4.5 ${c.bg} border border-[#deded6]`}>
          <div className="flex items-center justify-between text-[#686863]">
            <span className="text-xs font-bold uppercase tracking-wider">{c.title}</span>
            <div className="p-1.5 rounded-lg bg-white shadow-xs">{c.icon}</div>
          </div>
          <div className="mono text-2xl sm:text-3xl font-black text-[#151515] mt-2">
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
};
