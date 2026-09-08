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
  return (
    <section className="container-custom pt-10 pb-8 md:pt-16 md:pb-12">
      <div className="max-w-3xl">
        {/* Tracker Pill */}
        <div className="mb-5 inline-flex items-center gap-2 pill bg-white text-[#151515] shadow-xs">
          <ShieldCheck size={16} className="text-[#1d5f52]" />
          <span>INDEPENDENT FC MOBILE CODE TRACKER</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl font-black tracking-tight text-[#151515] sm:text-5xl md:text-6xl leading-[1.08]">
          Find a working code.
          <br />
          <span className="text-[#686863]">Copy it. Redeem it.</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-[#686863] leading-relaxed max-w-2xl">
          The fast, clean place to discover active FC Mobile redeem codes, check real-time verification timestamps, and jump directly to EA&apos;s official redemption page.
        </p>

        {/* Live Active Counter Callout */}
        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#1d5f52]">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1d5f52] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1d5f52]"></span>
          </span>
          <span>{activeCount} verified codes active right now</span>
        </div>
      </div>

      {/* Integrated Search Bar */}
      <div className="card mt-8 flex items-center gap-3 p-2.5 sm:p-3 shadow-xs bg-white transition-all focus-within:ring-2 focus-within:ring-[#1d5f52]/40">
        <Search size={22} className="ml-2 text-[#686863] shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by code (e.g. FCMOBILE2026), rewards, or campaign..."
          className="w-full bg-transparent p-2 text-sm sm:text-base font-medium text-[#151515] placeholder-[#9ca3af] outline-none"
          aria-label="Search redeem codes"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange('')}
            className="mr-2 rounded-full p-1 text-[#686863] hover:bg-[#f1f1eb] hover:text-[#151515]"
            title="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </section>
  );
};
