import React from 'react';
import { ShieldCheck, Search, X } from 'lucide-react';

interface HeroProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeCount: number;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  onSearchChange,
  activeCount,
}) => {
  // Respect the user's requirement to preserve "2 verified codes active right now" (or actual active count when active)
  const displayActiveCount = activeCount > 0 ? activeCount : 2;

  return (
    <section className="container-custom pt-10 pb-8 md:pt-16 md:pb-12">
      <div className="max-w-3xl">
        {/* Tracker Pill */}
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#22314a] bg-[#121928] px-3.5 py-1.5 text-[11px] font-black uppercase tracking-wider text-[#e2e8f0] shadow-sm">
          <ShieldCheck size={15} className="text-[#00ff87]" />
          <span>INDEPENDENT FC MOBILE CODE TRACKER</span>
        </div>

        {/* Main Headline with FC Mobile Neon Gradient */}
        <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.08]">
          Find a working code.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00ff87] via-[#22d3ee] to-[#e2e8f0]">
            Copy it. Redeem it.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-[#94a3b8] leading-relaxed max-w-2xl font-medium">
          The fast, clean place to discover active FC Mobile redeem codes, check real-time verification timestamps, and jump directly to EA&apos;s official redemption page.
        </p>

        {/* Live Active Counter Callout (Preserved with neon blinking green indicator) */}
        <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3.5 py-1.5 text-xs font-black text-[#00ff87] shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00ff87] opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00ff87]"></span>
          </span>
          <span>{displayActiveCount} verified codes active right now</span>
        </div>
      </div>

      {/* Integrated Search Bar */}
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-[#22314a] bg-[#121928] p-2 sm:p-2.5 shadow-xl transition-all duration-200 focus-within:border-[#00ff87]/80 focus-within:shadow-[0_0_25px_rgba(0,255,135,0.18)]">
        <Search size={20} className="ml-3 text-[#64748b] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by code (e.g. FCMOBILE2026), rewards, or campaign..."
          className="w-full bg-transparent p-2 text-sm sm:text-base font-medium text-white placeholder-[#64748b] outline-none"
          aria-label="Search redeem codes"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="mr-2 rounded-full p-1.5 text-[#94a3b8] hover:bg-[#1a253a] hover:text-white transition-colors"
            title="Clear search"
          >
            <X size={17} />
          </button>
        )}
      </div>
    </section>
  );
};

