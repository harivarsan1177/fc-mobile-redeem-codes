import React from 'react';

interface FooterProps {
  onOpenHowToRedeem: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenHowToRedeem,
  onOpenTerms,
  onOpenPrivacy,
  onOpenContact,
}) => {
  return (
    <footer className="border-t border-[#1e2a3e] bg-[#070b13] py-12 text-[#94a3b8]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#1e2a3e]">
          {/* Logo & Brief */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-[#00ff87] to-[#00df73] text-[#060a12] font-black text-xs shadow-[0_0_12px_rgba(0,255,135,0.25)]">
                FC
              </div>
              <span className="font-black text-base tracking-tight text-white">
                FC CODE LOCKER
              </span>
            </div>
            <p className="mt-2 text-xs max-w-md text-[#94a3b8] leading-relaxed">
              Your trusted, independent destination for real-time verified FC Mobile redeem codes, reward drops, and redemption status updates.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs font-bold text-white uppercase tracking-wider">
            <a href="#active-codes" className="hover:text-[#00ff87] transition-colors">
              Active Codes
            </a>
            <button onClick={onOpenHowToRedeem} className="hover:text-[#00ff87] transition-colors font-bold text-xs uppercase tracking-wider cursor-pointer">
              How to Redeem
            </button>
            <a href="#faq" className="hover:text-[#00ff87] transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Policies */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#64748b]">
          <p className="max-w-2xl leading-relaxed">
            FC Code Locker is an independent fan tracker. EA SPORTS and FC Mobile are registered trademarks of Electronic Arts Inc. All game content, trademarks, and logos are property of their respective owners.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-semibold text-[#94a3b8]">
            <button onClick={onOpenPrivacy} className="hover:text-[#00ff87] transition-colors cursor-pointer">
              Privacy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:text-[#00ff87] transition-colors cursor-pointer">
              Terms
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:text-[#00ff87] transition-colors cursor-pointer">
              Contact
            </button>
            <span>•</span>
            <span className="text-[#64748b]">© 2026 FC Code Locker</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

