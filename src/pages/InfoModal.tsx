import React from 'react';
import { X, ShieldCheck, Mail, FileText } from 'lucide-react';

interface InfoModalProps {
  type: 'privacy' | 'terms' | 'contact' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
      <div className="card w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#deded6] pb-4">
          <div className="flex items-center gap-2">
            {type === 'privacy' && <ShieldCheck size={22} className="text-[#1d5f52]" />}
            {type === 'terms' && <FileText size={22} className="text-[#151515]" />}
            {type === 'contact' && <Mail size={22} className="text-[#1d5f52]" />}
            <h2 className="text-xl font-black text-[#151515]">
              {type === 'privacy' && 'Privacy Policy'}
              {type === 'terms' && 'Terms of Service'}
              {type === 'contact' && 'Contact & Code Submissions'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-1.5 text-[#686863] hover:bg-[#f1f1eb] hover:text-[#151515]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-5 text-xs sm:text-sm text-[#686863] leading-relaxed space-y-4">
          {type === 'privacy' && (
            <>
              <p>
                <strong>Last Updated: September 2026</strong>
              </p>
              <p>
                FC Code Locker respects player privacy. We do not collect, store, or transmit your Electronic Arts account credentials, in-game passwords, or personal payment card details.
              </p>
              <p>
                When you click &ldquo;Redeem Now&rdquo;, you are navigated directly to EA&apos;s official portal (<code>redeem.fcm.ea.com</code>), where EA&apos;s own privacy guidelines govern authentication.
              </p>
              <p>
                Local storage is only utilized on your personal browser to record saved favorite codes and clipboard preferences.
              </p>
            </>
          )}

          {type === 'terms' && (
            <>
              <p>
                <strong>Independent Fan Platform Disclaimer</strong>
              </p>
              <p>
                FC Code Locker is an independent player utility. We are not endorsed by, sponsored by, or directly affiliated with Electronic Arts Inc. (EA) or EA SPORTS.
              </p>
              <p>
                Redeem codes provided on this website are distributed publicly by EA Sports or official promotional partners. We make no warranty that all codes will remain active indefinitely, as server quotas and campaign expiration dates are governed solely by EA.
              </p>
              <p>
                All trademarks, logos, and game assets are the property of their respective owners.
              </p>
            </>
          )}

          {type === 'contact' && (
            <>
              <p>
                Have a new FC Mobile redeem code to report, or found an expired drop that needs verification?
              </p>
              <div className="rounded-xl bg-[#f5f5f0] p-4 border border-[#deded6] space-y-2 text-xs">
                <p>
                  <strong>Drop Reports:</strong> submissions@fccodelocker.com
                </p>
                <p>
                  <strong>Admin / Inquiries:</strong> admin@fccodelocker.com
                </p>
                <p>
                  <strong>Discord Community:</strong> Join our Discord drops channel for real-time verification pings.
                </p>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 pt-4 border-t border-[#deded6] text-right">
          <button onClick={onClose} className="btn btn-primary text-xs">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
