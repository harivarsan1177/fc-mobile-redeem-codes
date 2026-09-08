import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Heart, Clock, Info } from 'lucide-react';
import type { CodeItem } from '../types/code';
import { StatusBadge } from './StatusBadge';
import { formatDisplayDate, formatRelativeTime } from '../utils/dateHelpers';

interface CodeCardProps {
  item: CodeItem;
  officialRedeemUrl: string;
}

export const CodeCard: React.FC<CodeCardProps> = ({ item, officialRedeemUrl }) => {
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const isExpired = item.status === 'EXPIRED';
  const isLimitReached = item.status === 'LIMIT_REACHED';
  const isDisabled = item.status === 'DISABLED';
  const isInactive = isExpired || isLimitReached || isDisabled;

  const handleCopy = async () => {
    if (isInactive) return;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(item.code);
      } else {
        const ta = document.createElement('textarea');
        ta.value = item.code;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        ta.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleRedeem = () => {
    if (isInactive) return;
    window.open(officialRedeemUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <article
      className={`card p-5 sm:p-6 transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
        isInactive ? 'opacity-65 bg-[#fbfbf9]' : 'bg-white'
      }`}
    >
      <div>
        {/* Card Header: REDEEM CODE label & Status Pill */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] font-black uppercase tracking-widest text-[#686863]">
              REDEEM CODE
            </div>
            {/* Monospace Code */}
            <div className="mono text-2xl sm:text-3xl font-black text-[#151515] mt-1.5 tracking-tight break-all">
              {item.code}
            </div>
          </div>
          <StatusBadge status={item.status} size="sm" />
        </div>

        {/* Reward Description */}
        <p className="mt-3.5 text-base font-bold text-[#151515] leading-snug">
          {item.reward}
        </p>

        {item.notes && (
          <p className="mt-1.5 text-xs text-[#686863] leading-relaxed">
            {item.notes}
          </p>
        )}

        {/* Verification & Expiration Metadata */}
        <div className="mt-4 pt-3 border-t border-[#deded6]/60 flex flex-wrap items-center gap-y-1.5 gap-x-4 text-xs font-semibold text-[#686863]">
          {item.verificationDate ? (
            <span className="inline-flex items-center gap-1 text-[#1d5f52]">
              <Check size={13} className="stroke-[2.5]" />
              Checked {formatRelativeTime(item.verificationDate)}
            </span>
          ) : (
            <span className="text-[#a8a8a3]">Pending verification check</span>
          )}

          {item.expirationDate && (
            <span className="inline-flex items-center gap-1 text-[#686863]">
              <Clock size={12} />
              Expires {formatDisplayDate(item.expirationDate)}
            </span>
          )}
        </div>

        {item.verificationNotes && (
          <div className="mt-2 rounded-lg bg-[#f5f5f0] px-2.5 py-1.5 text-[11px] text-[#686863] flex items-center gap-1.5">
            <Info size={13} className="shrink-0 text-[#1d5f52]" />
            <span className="truncate">{item.verificationNotes}</span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-6 pt-2">
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleCopy}
            disabled={isInactive}
            className={`btn flex-1 text-xs sm:text-sm ${
              isInactive
                ? 'btn-secondary cursor-not-allowed opacity-50'
                : copied
                ? 'bg-[#1d5f52] text-white'
                : 'btn-primary'
            }`}
            aria-label={`Copy code ${item.code}`}
          >
            {copied ? (
              <>
                <Check size={16} />
                COPIED!
              </>
            ) : (
              <>
                <Copy size={15} />
                COPY CODE
              </>
            )}
          </button>

          <button
            onClick={handleRedeem}
            disabled={isInactive}
            className={`btn btn-secondary text-xs sm:text-sm ${
              isInactive ? 'cursor-not-allowed opacity-50' : 'hover:border-[#151515]'
            }`}
            title="Open official redemption site"
          >
            REDEEM NOW
            <ExternalLink size={14} />
          </button>

          <button
            onClick={() => setSaved(!saved)}
            className={`btn btn-secondary px-3 ${
              saved ? 'text-[#dc2626] bg-[#fee2e2] border-[#fca5a5]' : 'text-[#686863]'
            }`}
            aria-label={saved ? 'Remove from saved' : 'Save code'}
            title={saved ? 'Saved' : 'Save code'}
          >
            <Heart size={16} fill={saved ? 'currentColor' : 'none'} />
          </button>
        </div>

        <p className="mt-2.5 text-[11px] text-[#686863] text-center">
          Redeem opens EA&apos;s official FC Mobile redemption portal.
        </p>
      </div>
    </article>
  );
};
