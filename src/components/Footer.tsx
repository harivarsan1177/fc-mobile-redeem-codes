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
    <footer className="border-t border-[#deded6] bg-[#f5f5f0] py-12 text-[#686863]">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#deded6]">
          {/* Logo & Brief */}
          <div>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#151515] text-white font-black text-xs">
                FC
              </div>
              <span className="font-black text-base tracking-tight text-[#151515]">
                FC CODE LOCKER
              </span>
            </div>
            <p className="mt-2 text-xs max-w-md text-[#686863] leading-relaxed">
              Your trusted, independent destination for real-time verified FC Mobile redeem codes, reward drops, and redemption status updates.
            </p>
          </div>

          {/* Nav Links */}
          <div className="flex flex-wrap gap-y-2 gap-x-6 text-xs font-bold text-[#151515]">
            <a href="#active-codes" className="hover:text-[#1d5f52] transition-colors">
              Active Codes
            </a>
            <button onClick={onOpenHowToRedeem} className="hover:text-[#1d5f52] transition-colors font-bold text-xs">
              How to Redeem
            </button>
            <a href="#code-status" className="hover:text-[#1d5f52] transition-colors">
              Status Protocols
            </a>
            <a href="#faq" className="hover:text-[#1d5f52] transition-colors">
              FAQ
            </a>
          </div>
        </div>

        {/* Legal Disclaimer & Policies */}
        <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs text-[#787873]">
          <p className="max-w-2xl leading-relaxed">
            FC Code Locker is an independent fan tracker. EA SPORTS and FC Mobile are registered trademarks of Electronic Arts Inc. All game content, trademarks, and logos are property of their respective owners.
          </p>

          <div className="flex flex-wrap items-center gap-4 font-semibold text-[#151515]">
            <button onClick={onOpenPrivacy} className="hover:underline">
              Privacy
            </button>
            <span>•</span>
            <button onClick={onOpenTerms} className="hover:underline">
              Terms
            </button>
            <span>•</span>
            <button onClick={onOpenContact} className="hover:underline">
              Contact
            </button>
            <span>•</span>
            <span className="text-[#787873]">© 2026 FC Code Locker</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
