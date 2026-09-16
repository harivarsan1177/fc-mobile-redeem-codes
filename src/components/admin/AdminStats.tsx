import React from 'react';
import { ShieldCheck, Clock, AlertTriangle, Sparkles, Layers } from 'lucide-react';
import type { AdminStats as AdminStatsType } from '../../types/code';

interface AdminStatsProps {
  stats: AdminStatsType;
}

export const AdminStats: React.FC<AdminStatsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Active Codes',
      value: stats.total,
      icon: <Layers size={18} className="text-[#00ff87]" />,
      bg: 'bg-[#121928] border-[#22314a]',
    },
    {
      title: 'Verified Active',
      value: stats.active,
      icon: <ShieldCheck size={18} className="text-[#00ff87]" />,
      bg: 'bg-[#00ff87]/10 border-[#00ff87]/30',
    },
    {
      title: 'Expiring Soon',
      value: stats.expiringSoon,
      icon: <Clock size={18} className="text-[#fbbf24]" />,
      bg: 'bg-[#fbbf24]/10 border-[#fbbf24]/30',
    },
    {
      title: 'Expired / Limit',
      value: stats.expired,
      icon: <AlertTriangle size={18} className="text-[#ef4444]" />,
      bg: 'bg-[#ef4444]/10 border-[#ef4444]/30',
    },
    {
      title: 'Pending Check',
      value: stats.pendingVerification,
      icon: <Sparkles size={18} className="text-[#38bdf8]" />,
      bg: 'bg-[#38bdf8]/10 border-[#38bdf8]/30',
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mb-8">
      {cards.map((c) => (
        <div key={c.title} className={`card p-4.5 ${c.bg}`}>
          <div className="flex items-center justify-between text-[#94a3b8]">
            <span className="text-xs font-black uppercase tracking-wider">{c.title}</span>
            <div className="p-1.5 rounded-lg bg-[#182338]">{c.icon}</div>
          </div>
          <div className="mono text-2xl sm:text-3xl font-black text-white mt-2">
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
};

