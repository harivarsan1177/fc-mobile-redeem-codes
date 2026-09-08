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
      <div className="relative overflow-hidden rounded-2xl border-2 border-[#151515] bg-[#ffffff] p-5 sm:p-7 shadow-md">
        {/* Top Accent Strip */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#1d5f52]" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#151515] px-3 py-1 text-xs font-black text-white tracking-wider">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                FEATURED CODE
              </span>
              <StatusBadge status={code.status} size="sm" />
              {code.verificationDate && (
                <span className="text-xs font-semibold text-[#1d5f52] bg-[#e7f1ed] px-2 py-0.5 rounded-md">
                  Checked {formatRelativeTime(code.verificationDate)}
                </span>
              )}
            </div>

            {/* Monospace Code Callout */}
            <div className="mono text-3xl sm:text-4xl lg:text-5xl font-black text-[#151515] tracking-tight">
              {code.code}
            </div>

            {/* Reward & Description */}
            <p className="mt-2 text-base sm:text-lg font-bold text-[#151515]">
              {code.reward}
            </p>

            {code.notes && (
              <p className="mt-1 text-xs sm:text-sm text-[#686863]">
                {code.notes}
              </p>
            )}

            {/* Expiration Info */}
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs font-semibold text-[#686863]">
              {code.expirationDate && (
                <span>Expires: {formatDisplayDate(code.expirationDate)}</span>
              )}
              {code.source && (
                <span>Source: {code.source}</span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <button
              onClick={handleCopy}
              className="btn btn-primary text-sm min-w-[160px] shadow-sm"
              aria-label={`Copy code ${code.code}`}
            >
              {copied ? (
                <>
                  <Check size={16} className="text-emerald-400" />
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
              className="btn btn-secondary text-sm min-w-[160px] border-[#151515] hover:bg-[#151515] hover:text-white"
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
