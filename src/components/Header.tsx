import React, { useState } from 'react';
import { LogIn, UserCheck, Menu, X } from 'lucide-react';
import type { User } from 'firebase/auth';

interface HeaderProps {
  currentUser: User | null;
  onNavigateAdmin: () => void;
  onNavigateHome: () => void;
  onSignOut: () => void;
  currentView: 'home' | 'admin-login' | 'admin-dashboard' | 'how-to-redeem';
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onNavigateAdmin,
  onNavigateHome,
  onSignOut,
  currentView,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#deded6] bg-[#f5f5f0]/95 backdrop-blur-md">
      <div className="container-custom flex min-h-16 items-center justify-between py-3">
        {/* Brand Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left transition-opacity hover:opacity-85 focus:outline-none"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#151515] text-white shadow-sm">
            <span className="font-black text-sm tracking-tighter">FC</span>
          </div>
          <div>
            <span className="font-black text-lg tracking-tight text-[#151515]">FC CODE LOCKER</span>
            <span className="hidden sm:inline-block ml-2 rounded bg-[#e7f1ed] px-1.5 py-0.5 text-[10px] font-bold text-[#1d5f52]">
              2026 EDITION
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-[#686863]">
          <a href="#active-codes" className="transition-colors hover:text-[#151515]">
            Active Codes
          </a>
          <a href="#how-to-redeem" className="transition-colors hover:text-[#151515]">
            How to Redeem
          </a>
          <a href="#code-status" className="transition-colors hover:text-[#151515]">
            Status Guide
          </a>
          <a href="#faq" className="transition-colors hover:text-[#151515]">
            FAQ
          </a>
        </nav>

        {/* Admin Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          {currentUser ? (
            <div className="flex items-center gap-2">
              <button
                onClick={onNavigateAdmin}
                className={`btn text-xs font-bold ${
                  currentView === 'admin-dashboard' ? 'btn-primary' : 'btn-secondary'
                }`}
              >
                <UserCheck size={15} />
                Admin Dashboard
              </button>
              <button
                onClick={onSignOut}
                className="btn btn-secondary text-xs px-3 text-[#dc2626] hover:bg-[#fee2e2]"
                title="Sign out"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={onNavigateAdmin}
              className="btn btn-secondary text-sm shadow-sm hover:border-[#151515]"
            >
              <LogIn size={15} />
              Admin Login
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="rounded-lg border border-[#deded6] p-2 text-[#151515] hover:bg-white"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-[#deded6] bg-white px-4 py-5 shadow-lg md:hidden">
          <div className="flex flex-col gap-3 text-sm font-semibold">
            <a
              href="#active-codes"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#151515]"
            >
              Active Codes
            </a>
            <a
              href="#how-to-redeem"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#151515]"
            >
              How to Redeem
            </a>
            <a
              href="#code-status"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#151515]"
            >
              Status Guide
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-[#151515]"
            >
              FAQ
            </a>
            <hr className="my-2 border-[#deded6]" />
            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onNavigateAdmin();
                  }}
                  className="btn btn-primary w-full text-sm"
                >
                  <UserCheck size={16} /> Admin Dashboard
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onSignOut();
                  }}
                  className="btn btn-secondary w-full text-sm text-[#dc2626]"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onNavigateAdmin();
                }}
                className="btn btn-secondary w-full text-sm"
              >
                <LogIn size={16} /> Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
