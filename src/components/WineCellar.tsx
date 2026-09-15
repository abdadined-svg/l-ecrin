import { useState } from 'react';
import { WINE_SELECTION } from '../data/restaurantData';
import { Wine, Sparkles } from 'lucide-react';

export default function WineCellar() {
  const [filterType, setFilterType] = useState<'all' | 'champagne' | 'blanc' | 'rouge' | 'digestif'>('all');

  const filteredWines = filterType === 'all'
    ? WINE_SELECTION
    : WINE_SELECTION.filter(w => w.type === filterType);

  return (
    <section id="cave" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-t border-[#E5DAC8] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            PATRIMOINE & FLACONS RARES
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            La Cave Voûtée du XVIIIe Siècle
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Plus de 1 800 références patiemment veillées dans le silence des voûtes historiques de la Place Vendôme.
          </p>
        </div>

        {/* Editorial Sommelier Feature: Asymmetric Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-5 relative">
            <div className="aspect-3/4 overflow-hidden rounded-xs bg-[#E5DAC8] shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1000&q=85"
                alt="La Cave Voûtée de l'Écrin"
                className="w-full h-full object-cover hover:scale-103 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                Regard de Cheffe Sommelière
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#181615]">
                Hélène Margaux
              </h3>
            </div>

            <p className="font-serif italic text-lg sm:text-xl text-[#3E3830] leading-relaxed">
              « Un grand vin ne se contente pas d'accompagner une assiette : il raconte le vent, l'argile, le silence des hivers et le dévouement d'un vigneron. Notre rôle est de créer l'accord juste, celui qui fait naître un frisson. »
            </p>

            <p className="text-sm text-[#5A5144] font-light leading-relaxed">
              Notre carte des vins fait la part belle aux allocations directes de vignerons d'exception, aux domaines conduits en biodynamie et aux millésimes anciens d'anthologie. Dégustations au verre assurées par le système Coravin pour préserver la fraîcheur originelle des nectars les plus précieux.
            </p>

            <div className="pt-2 flex flex-wrap gap-8 text-xs text-[#7A7061] font-light border-t border-[#E5DAC8]">
              <div>
                <span className="font-serif text-xl text-[#181615] block">1 800</span>
                <span>Références en cave</span>
              </div>
              <div>
                <span className="font-serif text-xl text-[#181615] block">100%</span>
                <span>Allocations vignerons directes</span>
              </div>
              <div>
                <span className="font-serif text-xl text-[#181615] block">1945</span>
                <span>Plus vieux millésime conservé</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12 border-b border-[#E5DAC8] pb-4">
          {[
            { id: 'all', label: 'Toute la sélection' },
            { id: 'champagne', label: "Champagnes d'exception" },
            { id: 'blanc', label: 'Grands Blancs de Bourgogne' },
            { id: 'rouge', label: 'Grands Rouges & Châteaux' },
            { id: 'digestif', label: 'Nectars & Douceurs' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterType(tab.id as any)}
              className={`px-4 py-2 text-xs font-sans uppercase tracking-[0.18em] transition-all duration-300 cursor-pointer ${
                filterType === tab.id
                  ? 'text-[#181615] font-medium border-b-2 border-[#C9A86A]'
                  : 'text-[#857B6D] hover:text-[#181615]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Clean Editorial Wine Listing */}
        <div className="divide-y divide-[#F0EAE0] max-w-4xl mx-auto">
          {filteredWines.map((wine) => (
            <div key={wine.id} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group">
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-xl text-[#181615] group-hover:text-[#8E6D38] transition-colors">
                    {wine.name}
                  </h4>
                  {wine.isRare && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-sans uppercase tracking-widest text-[#8E6D38] border border-[#C9A86A]/40 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-2.5 h-2.5" /> Flacon Rare
                    </span>
                  )}
                </div>
                
                <p className="text-xs font-serif italic text-[#8E6D38]">
                  {wine.domain} • {wine.region} • Millésime {wine.vintage}
                </p>

                <p className="text-xs text-[#5A5144] font-light leading-relaxed">
                  {wine.notes}
                </p>

                <p className="text-[11px] font-serif italic text-[#7A7061] pt-1">
                  « {wine.sommelierWord} »
                </p>
              </div>

              <div className="sm:text-right shrink-0">
                <span className="font-serif text-lg text-[#181615] block">
                  {wine.bottlePrice} €
                </span>
                {wine.glassPrice && (
                  <span className="text-[10px] text-[#7A7061] uppercase tracking-wider block">
                    Au verre : {wine.glassPrice} €
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sommelier private consultation link */}
        <div className="mt-16 text-center pt-8 border-t border-[#E5DAC8]">
          <p className="text-xs text-[#7A7061] font-light">
            Vous recherchez un flacon millésimé spécifique pour une célébration confidentielle ?
          </p>
          <a
            href="mailto:sommellerie@lecrin-paris.com"
            className="inline-block text-xs uppercase tracking-[0.2em] text-[#8E6D38] hover:text-[#181615] underline mt-2 cursor-pointer"
          >
            Écrire à Hélène Margaux, Cheffe Sommelière
          </a>
        </div>

      </div>
    </section>
  );
}
