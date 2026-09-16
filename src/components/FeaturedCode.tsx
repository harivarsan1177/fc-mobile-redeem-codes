import React, { useState } from 'react';
import { Star, Copy, Check, ExternalLink } from 'lucide-react';
import type { CodeItem } from '../types/code';
import { StatusBadge } from './StatusBadge';
import { formatRelativeTime, formatDisplayDate } from '../utils/dateHelpers';

interface FeaturedCodeProps {
  code: CodeItem;
  officialRedeemUrl: string;
}

export const FeaturedCode: React.FC<FeaturedCodeProps> = ({ code, officialRedeemUrl }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code.code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = code.code;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const handleRedeem = () => {
    window.open(officialRedeemUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="container-custom mb-10">
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#00ff87]/40 bg-gradient-to-br from-[#131b2c] via-[#0f1524] to-[#162035] p-5 sm:p-7 shadow-[0_0_35px_rgba(0,255,135,0.12)]">
        {/* Top Voltage Green Strip */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00ff87] via-[#00f0ff] to-[#00ff87]" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fbbf24]/15 border border-[#fbbf24]/40 px-3 py-1 text-xs font-black text-[#fbbf24] tracking-wider">
                <Star size={13} className="fill-[#fbbf24] text-[#fbbf24]" />
                FEATURED DROP
              </span>
              <StatusBadge status={code.status} size="sm" />
              {code.verificationDate && (
                <span className="text-xs font-bold text-[#00ff87] bg-[#00ff87]/10 border border-[#00ff87]/20 px-2.5 py-0.5 rounded-full">
                  Checked {formatRelativeTime(code.verificationDate)}
                </span>
              )}
            </div>

            {/* Monospace Code Callout */}
            <div className="mono text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-sm">
              {code.code}
            </div>

            {/* Reward & Description */}
            <p className="mt-2 text-base sm:text-lg font-black text-[#00f0ff]">
              {code.reward}
            </p>

            {code.notes && (
              <p className="mt-1 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {code.notes}
              </p>
            )}

            {/* Expiration Info */}
            <div className="mt-3.5 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#64748b]">
              {code.expirationDate && (
                <span className="text-[#94a3b8]">Expires: {formatDisplayDate(code.expirationDate)}</span>
              )}
              {code.source && (
                <span className="text-[#64748b]">Source: {code.source}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="btn btn-primary text-sm min-w-[160px]"
              aria-label={`Copy code ${code.code}`}
            >
              {copied ? (
                <>
                  <Check size={16} />
                  COPIED!
                </>
              ) : (
                <>
                  <Copy size={16} />
                  COPY CODE
                </>
              )}
            </button>

            <button
              onClick={handleRedeem}
              className="btn btn-secondary text-sm min-w-[160px]"
            >
              REDEEM NOW
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

