import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { User } from 'firebase/auth';

interface HeaderProps {
  currentUser?: User | null;
  onNavigateAdmin?: () => void;
  onNavigateHome: () => void;
  onSignOut?: () => void;
  currentView?: 'home' | 'admin-login' | 'admin-dashboard' | 'how-to-redeem';
}

export const Header: React.FC<HeaderProps> = ({
  onNavigateHome,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#1e2a3e] bg-[#090d16]/90 backdrop-blur-md">
      <div className="container-custom flex min-h-16 items-center justify-between py-3">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-90 focus:outline-none cursor-pointer"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ff87] to-[#00df73] text-[#060a12] shadow-[0_0_15px_rgba(0,255,135,0.3)] font-black text-sm tracking-tighter">
            FC
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-white">FC CODE LOCKER</span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-bold uppercase tracking-wider text-[#94a3b8]">
          <a href="#active-codes" className="transition-colors hover:text-[#00ff87]">
            Active Codes
          </a>
          <a href="#how-to-redeem" className="transition-colors hover:text-[#00ff87]">
            How to Redeem
          </a>
          <a href="#faq" className="transition-colors hover:text-[#00ff87]">
            FAQ
          </a>
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-xl border border-[#22314a] bg-[#121928] p-2 text-white hover:border-[#00ff87]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#1e2a3e] bg-[#0c121e] px-5 py-5 shadow-2xl md:hidden">
          <div className="flex flex-col gap-3 text-sm font-bold">
            <a
              href="#active-codes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-white hover:text-[#00ff87]"
            >
              Active Codes
            </a>
            <a
              href="#how-to-redeem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-white hover:text-[#00ff87]"
            >
              How to Redeem
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-white hover:text-[#00ff87]"
            >
              FAQ
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

