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
      icon: <KeyRound size={20} className="text-[#1d5f52]" />,
    },
    {
      num: '02',
      title: 'Open EA Official Portal',
      desc: "Click REDEEM NOW to launch Electronic Arts' official redemption portal directly.",
      icon: <ExternalLink size={20} className="text-[#1d5f52]" />,
    },
    {
      num: '03',
      title: 'Log in with Your EA Account',
      desc: 'Sign in securely on EA’s website with the EA Account linked to your FC Mobile in-game profile.',
      icon: <Shield size={20} className="text-[#1d5f52]" />,
    },
    {
      num: '04',
      title: 'Paste the Code & Submit',
      desc: 'Paste the copied code into the EA redemption form and click the Redeem button.',
      icon: <CheckCircle2 size={20} className="text-[#1d5f52]" />,
    },
    {
      num: '05',
      title: 'Claim In-Game Rewards',
      desc: 'Launch the FC Mobile app on your mobile device. Your player packs or coins will arrive in your in-game mailbox.',
      icon: <Smartphone size={20} className="text-[#1d5f52]" />,
    },
  ];

  return (
    <section id="how-to-redeem" className="container-custom py-12 md:py-20">
      <div className="max-w-2xl">
        <div className="pill bg-white text-[#151515] mb-3">
          <span>STEP-BY-STEP REDEMPTION GUIDE</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#151515]">
          How to redeem FC Mobile codes
        </h2>
        <p className="mt-3 text-base text-[#686863]">
          Follow these simple steps to ensure your free rewards, coins, and player packs are safely credited to your EA account.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step) => (
          <div key={step.num} className="card p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="mono text-sm font-black text-[#1d5f52] bg-[#e7f1ed] px-2.5 py-1 rounded-md">
                  {step.num}
                </span>
                <div className="p-2 bg-[#f5f5f0] rounded-xl">{step.icon}</div>
              </div>
              <h3 className="mt-4 text-base font-bold text-[#151515]">{step.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#686863] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}

        {/* Action Link Card */}
        <div className="card p-6 bg-[#151515] text-white flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Official Redemption Portal
            </span>
            <h3 className="mt-3 text-lg font-black">Ready to redeem your code?</h3>
            <p className="mt-2 text-xs text-[#deded6] leading-relaxed">
              Never share your EA account password with third-party sites. Only redeem codes on EA’s official portal.
            </p>
          </div>
          <a
            href={officialRedeemUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary mt-6 w-full text-xs font-bold bg-white text-[#151515] hover:bg-[#deded6]"
          >
            Launch Official EA Portal <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
