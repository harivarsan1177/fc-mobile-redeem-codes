import React from 'react';
import { Shield, KeyRound, ExternalLink, Smartphone, CheckCircle2 } from 'lucide-react';

interface HowToRedeemProps {
  officialRedeemUrl: string;
}

export const HowToRedeem: React.FC<HowToRedeemProps> = ({ officialRedeemUrl }) => {
  const steps = [
    {
      num: '01',
      title: 'Find & Copy an Active Code',
      desc: 'Browse our verified list above and click the COPY CODE button to copy the exact code string.',
      icon: <KeyRound size={20} className="text-[#00ff87]" />,
    },
    {
      num: '02',
      title: 'Open EA Official Portal',
      desc: "Click REDEEM NOW to launch Electronic Arts' official redemption portal directly.",
      icon: <ExternalLink size={20} className="text-[#00ff87]" />,
    },
    {
      num: '03',
      title: 'Log in with Your EA Account',
      desc: 'Sign in securely on EA’s website with the EA Account linked to your FC Mobile in-game profile.',
      icon: <Shield size={20} className="text-[#00ff87]" />,
    },
    {
      num: '04',
      title: 'Paste the Code & Submit',
      desc: 'Paste the copied code into the EA redemption form and click the Redeem button.',
      icon: <CheckCircle2 size={20} className="text-[#00ff87]" />,
    },
    {
      num: '05',
      title: 'Claim In-Game Rewards',
      desc: 'Launch the FC Mobile app on your mobile device. Your player packs or coins will arrive in your in-game mailbox.',
      icon: <Smartphone size={20} className="text-[#00ff87]" />,
    },
  ];

  return (
    <section id="how-to-redeem" className="container-custom py-12 md:py-20 border-t border-[#1e2a3e]">
      <div className="max-w-2xl">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#00ff87]/30 bg-[#00ff87]/10 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-[#00ff87]">
          <span>STEP-BY-STEP REDEMPTION GUIDE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          How to redeem FC Mobile codes
        </h2>
        <p className="mt-3 text-base text-[#94a3b8]">
          Follow these simple steps to ensure your free rewards, coins, and player packs are safely credited to your EA account.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num} className="card p-6 bg-[#121928] border-[#22314a] hover:border-[#00ff87]/40 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="mono text-xs font-black text-[#00ff87] bg-[#00ff87]/15 border border-[#00ff87]/30 px-2.5 py-1 rounded-md">
                  {step.num}
                </span>
                <div className="p-2 bg-[#19243a] rounded-xl">{step.icon}</div>
              </div>
              <h3 className="mt-4 text-base font-black text-white">{step.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Action Link Card */}
        <div className="card p-6 bg-gradient-to-br from-[#121929] via-[#0e1524] to-[#151f33] border-2 border-[#00ff87]/40 shadow-[0_0_25px_rgba(0,255,135,0.1)] flex flex-col justify-between">
          <div>
            <span className="text-xs font-black text-[#fbbf24] uppercase tracking-wider">
              Official Redemption Portal
            </span>
            <h3 className="mt-3 text-lg font-black text-white">Ready to redeem your code?</h3>
            <p className="mt-2 text-xs text-[#94a3b8] leading-relaxed">
              Never share your EA account password with third-party sites. Only redeem codes on EA’s official portal.
            </p>
          </div>
          <a
            href={officialRedeemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary mt-6 w-full text-xs font-black"
          >
            Launch Official EA Portal <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

