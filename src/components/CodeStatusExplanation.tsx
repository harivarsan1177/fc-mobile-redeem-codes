import React from 'react';
import { Clock, AlertTriangle, CheckCircle, ShieldOff, Sparkles } from 'lucide-react';

export const CodeStatusExplanation: React.FC = () => {
  const statusGuides = [
    {
      title: 'Active & Verified',
      color: 'border-[#b8dcce] bg-[#e7f1ed]/50 text-[#1d5f52]',
      icon: <CheckCircle size={18} className="text-[#1d5f52]" />,
      desc: 'The code is currently active and has been manually confirmed working on global live servers.',
    },
    {
      title: 'Expiring Soon',
      color: 'border-[#fde047] bg-[#fef8e7]/50 text-[#a16207]',
      icon: <Clock size={18} className="text-[#ca8a04]" />,
      desc: 'The code is approaching its specified expiration window (typically within 48 hours). Redeem immediately.',
    },
    {
      title: 'Limit Reached',
      color: 'border-[#fecaca] bg-[#fef2f2]/50 text-[#b91c1c]',
      icon: <AlertTriangle size={18} className="text-[#dc2626]" />,
      desc: 'The code itself hasn’t expired by calendar date, but Electronic Arts’ total global redemption limit was met.',
    },
    {
      title: 'Expired',
      color: 'border-[#deded6] bg-[#f4f4f0]/50 text-[#787873]',
      icon: <Clock size={18} className="text-[#a8a8a3]" />,
      desc: 'The official campaign window has concluded. EA will no longer accept this code on their servers.',
    },
    {
      title: 'Pending Verification',
      color: 'border-[#bfdbfe] bg-[#eff6ff]/50 text-[#1d4ed8]',
      icon: <Sparkles size={18} className="text-[#3b82f6]" />,
      desc: 'A newly reported code discovered from community streams or creator giveaways awaiting test confirmation.',
    },
    {
      title: 'Disabled',
      color: 'border-[#deded6] bg-[#f4f4f0]/50 text-[#787873]',
      icon: <ShieldOff size={18} className="text-[#a8a8a3]" />,
      desc: 'Temporarily deactivated due to unexpected server bugs or regional access disputes.',
    },
  ];

  return (
    <section id="code-status" className="container-custom py-12 md:py-16 border-t border-[#deded6]">
      <div className="max-w-2xl">
        <div className="pill bg-white text-[#151515] mb-3">
          <span>CODE STATUS PROTOCOLS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#151515]">
          Understanding code status indicators
        </h2>
        <p className="mt-3 text-base text-[#686863]">
          Every FC Mobile code goes through a lifecycle. Here is how our verification protocols categorize code health.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statusGuides.map((guide) => (
          <div key={guide.title} className="card p-5 bg-white border border-[#deded6]">
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-[#f5f5f0]">{guide.icon}</div>
              <h3 className="font-black text-sm text-[#151515]">{guide.title}</h3>
            </div>
            <p className="mt-2.5 text-xs text-[#686863] leading-relaxed">
              {guide.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
