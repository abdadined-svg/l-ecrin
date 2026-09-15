import { useState } from 'react';
import { DINING_SPACES } from '../data/restaurantData';
import { DiningSpace } from '../types';
import { Users, Check, ArrowRight } from 'lucide-react';

interface SpacesSectionProps {
  onSelectSpaceForBooking: (spaceTitle: string) => void;
}

export default function SpacesSection({ onSelectSpaceForBooking }: SpacesSectionProps) {
  const [selectedSpace, setSelectedSpace] = useState<DiningSpace>(DINING_SPACES[0]);

  return (
    <section id="salons" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            LES ESPACES CONFIDENTIELS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            L'Atmosphère des Salons
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Quatre écrins singuliers pour vivre un moment d'intimité totale, bercé par l'histoire de la Place Vendôme.
          </p>
        </div>

        {/* Space Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 mb-16 border-b border-[#E5DAC8] pb-4">
          {DINING_SPACES.map((space) => {
            const isSelected = selectedSpace.id === space.id;
            return (
              <button
                key={space.id}
                onClick={() => setSelectedSpace(space)}
                className={`px-4 py-2 text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'text-[#181615] font-medium border-b-2 border-[#C9A86A]'
                    : 'text-[#857B6D] hover:text-[#181615]'
                }`}
              >
                <span>{space.title}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Space Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Space High-Resolution Visual */}
          <div className="lg:col-span-7 relative overflow-hidden rounded-xs bg-[#E5DAC8] shadow-xl aspect-4/3 group">
            <img
              src={selectedSpace.image}
              alt={selectedSpace.title}
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 left-4 px-3 py-1 bg-[#181615]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-medium">
              {selectedSpace.capacity}
            </div>
          </div>

          {/* Space Narrative Content */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                {selectedSpace.subtitle}
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#181615]">
                {selectedSpace.title}
              </h3>
            </div>

            <p className="text-sm text-[#524B40] font-light leading-relaxed">
              {selectedSpace.description}
            </p>

            <blockquote className="font-serif italic text-base text-[#181615] border-l-2 border-[#C9A86A] pl-4 py-1">
              « {selectedSpace.atmosphere} »
            </blockquote>

            <div className="space-y-2 pt-2 border-t border-[#E5DAC8]">
              <span className="text-[10px] font-sans uppercase tracking-widest text-[#8E6D38] font-medium block">
                Privilèges & Atmosphère
              </span>
              <div className="space-y-1.5">
                {selectedSpace.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#4A433A] font-light">
                    <Check className="w-3 h-3 text-[#8E6D38] shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => onSelectSpaceForBooking(selectedSpace.title)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
              >
                <span>Choisir cet espace</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A]" />
              </button>

              <a
                href="mailto:privatisations@lecrin-paris.com"
                className="text-xs uppercase tracking-wider text-[#7A7061] hover:text-[#181615] underline text-center sm:text-left py-2 cursor-pointer"
              >
                Demande de privatisation
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
