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
    <section id="faq" className="container-custom py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="pill bg-white text-[#151515] mb-3">
          <span>FREQUENTLY ASKED QUESTIONS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#151515]">
          Got questions? We have answers.
        </h2>
        <p className="mt-3 text-base text-[#686863]">
          Everything you need to know about FC Mobile redeem codes, verification, and redemption rules.
        </p>
      </div>

      <div className="mt-8 max-w-3xl space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="card bg-white transition-all overflow-hidden border border-[#deded6]"
            >
              <button
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between p-5 text-left font-bold text-[#151515] hover:bg-[#fbfbf9] focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="text-sm sm:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#686863] transition-transform duration-200 ${
                    isOpen ? 'rotate-180 text-[#151515]' : ''
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#686863] leading-relaxed border-t border-[#deded6]/40">
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
