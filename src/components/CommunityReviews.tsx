import React from 'react';
import { Star, CheckCircle } from 'lucide-react';

export const CommunityReviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: 'Rohan M.',
      role: 'FC Mobile Champion I',
      comment: 'Finally a site that actually tests the codes instead of reposting expired ones from 6 months ago! Got the 1,000 coins code in minutes.',
      stars: 5,
      date: '2 hours ago',
      verified: true,
    },
    {
      id: 2,
      name: 'Alex K.',
      role: 'Legendary Division Player',
      comment: 'The copy button and direct redirect to EA redemption makes it so smooth on mobile. Saved me so much time trying broken codes.',
      stars: 5,
      date: 'Yesterday',
      verified: true,
    },
    {
      id: 3,
      name: 'Vikram S.',
      role: 'FC Mobile Enthusiast',
      comment: 'Clean UI without annoying popups. Status badges help you see which code is expiring today before it runs out.',
      stars: 5,
      date: '3 days ago',
      verified: true,
    },
  ];

  return (
    <section className="container-custom py-12 md:py-16">
      <div className="max-w-2xl">
        <div className="pill bg-white text-[#151515] mb-3">
          <span>PLAYER TESTIMONIALS</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#151515]">
          Trusted by the FC Mobile community
        </h2>
        <p className="mt-3 text-base text-[#686863]">
          See what fellow managers and players say about our real-time verification and tracker.
        </p>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div key={r.id} className="card p-6 bg-white flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex text-amber-400">
                  {[...Array(r.stars)].map((_, i) => (
                    <Star key={i} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="text-[11px] font-semibold text-[#686863]">{r.date}</span>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-[#151515] leading-relaxed italic">
                &ldquo;{r.comment}&rdquo;
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-[#deded6] flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-[#151515]">{r.name}</h3>
                <p className="text-[11px] text-[#686863]">{r.role}</p>
              </div>
              {r.verified && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#1d5f52]">
                  <CheckCircle size={13} /> Verified
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
