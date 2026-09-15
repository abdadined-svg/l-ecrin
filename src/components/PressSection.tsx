import { useState } from 'react';
import { PRESS_REVIEWS, GUEST_TESTIMONIALS } from '../data/restaurantData';
import { Quote } from 'lucide-react';

export default function PressSection() {
  const [activeTab, setActiveTab] = useState<'convives' | 'guides'>('convives');

  return (
    <section id="avis" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            ÉLOGES & INSTANTS DE GRÂCE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            Ils ont vécu l'expérience
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Paroles de convives émus et regards des critiques gastronomiques les plus respectés.
          </p>
        </div>

        {/* Subtle switcher */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <button
            onClick={() => setActiveTab('convives')}
            className={`text-xs font-sans uppercase tracking-[0.2em] pb-1 cursor-pointer transition-colors ${
              activeTab === 'convives'
                ? 'text-[#181615] border-b border-[#C9A86A] font-medium'
                : 'text-[#857B6D] hover:text-[#181615]'
            }`}
          >
            Témoignages de nos Convives
          </button>
          <span className="text-[#C9A86A]">•</span>
          <button
            onClick={() => setActiveTab('guides')}
            className={`text-xs font-sans uppercase tracking-[0.2em] pb-1 cursor-pointer transition-colors ${
              activeTab === 'guides'
                ? 'text-[#181615] border-b border-[#C9A86A] font-medium'
                : 'text-[#857B6D] hover:text-[#181615]'
            }`}
          >
            Les Grands Guides Gastronomiques
          </button>
        </div>

        {/* Tab 1: Convives Authentiques */}
        {activeTab === 'convives' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            {/* Featured quote */}
            <div className="text-center max-w-3xl mx-auto space-y-6">
              <Quote className="w-10 h-10 text-[#C9A86A]/50 mx-auto" />
              <blockquote className="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-[#181615] leading-relaxed font-light">
                « {GUEST_TESTIMONIALS[0].content} »
              </blockquote>
              <div className="pt-2">
                <span className="font-serif text-lg text-[#181615] block">
                  {GUEST_TESTIMONIALS[0].author}
                </span>
                <span className="text-xs font-sans uppercase tracking-widest text-[#8E6D38] block mt-1">
                  {GUEST_TESTIMONIALS[0].context}
                </span>
              </div>
            </div>

            {/* Two secondary guest reviews in warm asymmetric layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-[#E5DAC8]">
              {GUEST_TESTIMONIALS.slice(1).map((item) => (
                <div key={item.id} className="space-y-4">
                  <div className="flex items-center gap-1 text-[#C9A86A] text-xs">
                    {'★'.repeat(item.rating)}
                  </div>
                  <p className="font-serif italic text-base sm:text-lg text-[#3E3830] leading-relaxed">
                    « {item.content} »
                  </p>
                  <div className="pt-2">
                    <span className="font-serif text-base text-[#181615] block font-medium">
                      {item.author} ({item.city})
                    </span>
                    <span className="text-[11px] font-sans text-[#7A7061] block">
                      {item.context}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Guides & Critiques */}
        {activeTab === 'guides' && (
          <div className="space-y-12 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {PRESS_REVIEWS.map((review) => (
                <div key={review.id} className="p-8 bg-[#FFFDF9] border border-[#E5DAC8] rounded-xs space-y-5">
                  <div className="flex items-baseline justify-between border-b border-[#F0EAE0] pb-3">
                    <span className="font-serif text-xl text-[#181615] font-medium">
                      {review.guideOrMedia}
                    </span>
                    <span className="text-xs font-serif italic text-[#8E6D38] border border-[#C9A86A]/40 px-2.5 py-0.5 rounded-full">
                      {review.ratingOrAward}
                    </span>
                  </div>
                  <blockquote className="font-serif text-base text-[#423C33] leading-relaxed italic">
                    « {review.quote} »
                  </blockquote>
                  {review.criticName && (
                    <span className="text-[11px] font-sans uppercase tracking-widest text-[#857B6D] block">
                      {review.criticName} • {review.year}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Refined prestige institutions bar */}
        <div className="mt-20 pt-10 border-t border-[#E5DAC8] flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs uppercase tracking-[0.25em] text-[#7A7061]">
          <span>Guide Michelin 2025</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Relais & Châteaux</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Les Grandes Tables du Monde</span>
          <span className="text-[#C9A86A]">•</span>
          <span>Gault & Millau 5 Toques</span>
        </div>

      </div>
    </section>
  );
}
