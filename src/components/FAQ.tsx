import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Where do I officially redeem FC Mobile codes?',
      a: "FC Mobile codes must be redeemed exclusively through Electronic Arts' official redemption portal (redeem.fcm.ea.com). Our 'REDEEM NOW' button directs you there automatically so you never have to guess the correct link.",
    },
    {
      q: 'Are these FC Mobile redeem codes free?',
      a: 'Yes, 100% free! These codes are published by EA Sports during special live streams, community milestones, holiday events, and seasonal promotional tournaments.',
    },
    {
      q: 'Why did my code show "Invalid" or "Already Redeemed"?',
      a: 'Codes typically fail for two reasons: (1) The code has expired or its maximum redemption cap was reached, or (2) You have already claimed that code previously on the same EA Account (most codes are strictly 1 redemption per account).',
    },
    {
      q: 'Do I ever need to enter my EA account credentials here?',
      a: 'NEVER! FC Code Locker is strictly an informational tracker and copy utility. We will never ask for your EA username, password, or security credentials. You only enter your credentials on the official https://redeem.fcm.ea.com/ website.',
    },
    {
      q: 'How frequently are codes checked and updated?',
      a: 'Our administrative team and automated workers check code statuses regularly. Codes that reach their expiration date are immediately moved to Expired, while new drops are verified within minutes.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="container-custom py-12 md:py-16 border-t border-[#1e2a3e]">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#00ff87]">
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Got questions? We have answers.
        </h2>
        <p className="mt-3 text-base text-[#94a3b8]">
          Everything you need to know about FC Mobile redeem codes, verification, and redemption rules.
        </p>
      </div>

      <div className="mt-8 max-w-3xl space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="card bg-[#121928] transition-all overflow-hidden border border-[#22314a] hover:border-[#00ff87]/40"
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left font-black text-white hover:bg-[#162136] focus:outline-none transition-colors"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#00ff87]' : 'text-[#94a3b8]'
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-2 text-xs sm:text-sm text-[#94a3b8] leading-relaxed border-t border-[#1e2a3e]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

