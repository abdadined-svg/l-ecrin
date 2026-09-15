import { useState, useEffect, FormEvent } from 'react';
import { ArrowRight, ChevronDown, Calendar, Users, Clock, Sparkles, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { DINING_SPACES } from '../data/restaurantData';

interface HeroProps {
  onOpenReservation: (preselectedMenu?: string, preselectedSpace?: string) => void;
  onExploreMenu: () => void;
}

const HERO_SCENES = [
  {
    id: 0,
    title: "L'Orfèvrerie des Tables",
    subtitle: "Grand Salon Cristal & Nappages de Lin",
    tagline: "Un écrin feutré au cœur de la Place Vendôme où le temps suspend son vol.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=2000&q=88",
    detail: "Baccarat, argenterie poinçonnée & lueurs ambrées",
  },
  {
    id: 1,
    title: "La Flamme & Le Geste",
    subtitle: "Alexandre de Saint-Germain au Piano",
    tagline: "L'exigence du geste pur, la réduction d'orfèvre et le respect absolu des récoltes de nos artisans.",
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2000&q=88",
    detail: "Langoustines de casier vivantes & braises de sarments",
  },
  {
    id: 2,
    title: "La Mémoire du Terroir",
    subtitle: "La Cave Voûtée du XVIIIe Siècle",
    tagline: "1 800 flacons rares veillés dans le secret de nos voûtes historiques par Hélène Margaux.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=2000&q=88",
    detail: "Allocations confidentielles & dégustations Coravin",
  },
];

export default function Hero({ onOpenReservation, onExploreMenu }: HeroProps) {
  const [activeScene, setActiveScene] = useState(0);
  const [quickGuests, setQuickGuests] = useState(2);
  const [quickService, setQuickService] = useState<'diner' | 'dejeuner'>('diner');
  const [quickSpace, setQuickSpace] = useState<string>(DINING_SPACES[0].title);

  // Auto-cycle through luxury scenes gently every 8 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveScene((prev) => (prev + 1) % HERO_SCENES.length);
    }, 8500);
    return () => clearInterval(timer);
  }, []);

  const handleQuickBook = (e: FormEvent) => {
    e.preventDefault();
    onOpenReservation(undefined, quickSpace);
  };

  const current = HERO_SCENES[activeScene];

  return (
    <section id="accueil" className="relative min-h-[96vh] flex flex-col justify-between overflow-hidden bg-[#181615] text-[#FAF7F2]">
      
      {/* Dynamic Layered Background Photography */}
      {HERO_SCENES.map((scene, idx) => (
        <div
          key={scene.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === activeScene ? 'opacity-100 z-0' : 'opacity-0 -z-10'
          }`}
        >
          <img
            src={scene.image}
            alt={scene.title}
            className="w-full h-full object-cover object-center scale-103 transition-transform duration-10000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Multi-layered luxury grading and vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#181615] via-[#181615]/50 to-[#181615]/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#181615]/60 via-transparent to-[#181615]"></div>
          <div className="absolute inset-0 bg-radial from-transparent via-[#181615]/30 to-[#181615]/80"></div>
        </div>
      ))}

      {/* Ephemeral Daily Note: Ce Soir à L'Écrin */}
      <div className="relative z-10 w-full pt-20 sm:pt-24 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-4 px-4 sm:px-6 py-2 rounded-full bg-[#181615]/75 backdrop-blur-md border border-[#C9A86A]/30 text-center w-full sm:w-auto mx-auto shadow-xl">
            <span className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.25em] text-[#C9A86A] font-semibold">
              <Sparkles className="w-3 h-3 animate-pulse" />
              Ce Soir à L'Écrin
            </span>
            <span className="hidden sm:inline text-[#C9A86A]/40">•</span>
            <span className="text-[11px] sm:text-xs text-[#FAF7F2]/90 font-serif italic">
              Menu Quintessence & Langoustine Royale au Caviar Osciètre
            </span>
            <span className="hidden md:inline text-[#C9A86A]/40">•</span>
            <span className="text-[10px] uppercase tracking-wider text-[#D8CEBC]/80 hidden md:inline">
              Quelques créneaux privilégiés disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Main Editorial Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 text-center my-auto py-8 sm:py-12 flex flex-col items-center">
        
        {/* Prestige Michelin Badge */}
        <div 
          id="hero-editorial-badge"
          className="inline-flex items-center gap-2.5 sm:gap-3.5 px-4 sm:px-5 py-1.5 border border-[#C9A86A]/50 rounded-full bg-[#181615]/60 backdrop-blur-sm mb-6 sm:mb-8 shadow-lg"
        >
          <div className="flex items-center gap-1 text-[#C9A86A] text-xs tracking-widest">
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#C9A86A]/60"></span>
          <span className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.35em] text-[#E8DFC8] font-medium">
            GUIDE MICHELIN 2025 • RELAIS & CHÂTEAUX
          </span>
        </div>

        {/* Grand Palace Title with Handcrafted Tracking */}
        <div className="space-y-4 sm:space-y-5 max-w-4xl">
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-[0.14em] text-[#FAF7F2] uppercase leading-none drop-shadow-sm">
            L'ÉCRIN
          </h1>

          <p className="font-serif italic text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#E8DFC8] font-light tracking-wide max-w-2xl mx-auto leading-relaxed pt-1">
            « L'émotion pure du geste et la vérité du produit au diapason des saisons. »
          </p>

          <p className="text-xs sm:text-sm font-sans uppercase tracking-[0.3em] text-[#C9A86A] font-medium pt-2">
            Chef Alexandre de Saint-Germain • 14, Place Vendôme, Paris
          </p>
        </div>

        {/* Action CTAs */}
        <div className="pt-8 sm:pt-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto">
          <button
            id="hero-book-table-btn"
            onClick={() => onOpenReservation()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#C9A86A] hover:bg-[#B89355] text-[#181615] px-8 sm:px-10 py-4 text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-xs shadow-xl hover:shadow-[#C9A86A]/20 cursor-pointer"
          >
            <span>Réserver une table</span>
            <ArrowRight className="w-4 h-4 text-[#181615]" />
          </button>

          <button
            id="hero-explore-menu-btn"
            onClick={onExploreMenu}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-[#FAF7F2] hover:text-[#C9A86A] text-xs font-sans tracking-[0.25em] uppercase font-light transition-all py-3.5 px-6 border border-[#FAF7F2]/20 hover:border-[#C9A86A] bg-[#181615]/40 backdrop-blur-xs rounded-xs cursor-pointer"
          >
            <span>Découvrir la carte</span>
          </button>
        </div>

        {/* Scene Switcher Indicators */}
        <div className="mt-8 sm:mt-10 flex items-center justify-center gap-3">
          {HERO_SCENES.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => setActiveScene(idx)}
              className={`group flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-sans uppercase tracking-[0.2em] transition-all cursor-pointer ${
                activeScene === idx
                  ? 'bg-[#C9A86A] text-[#181615] font-semibold shadow-md'
                  : 'bg-[#181615]/60 text-[#D8CEBC]/70 hover:text-[#FAF7F2] border border-[#FAF7F2]/10 hover:border-[#C9A86A]/40'
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${activeScene === idx ? 'bg-[#181615]' : 'bg-[#C9A86A]'}`}></span>
              <span className="hidden md:inline">{scene.title}</span>
              <span className="md:hidden">0{idx + 1}</span>
            </button>
          ))}
        </div>

      </div>

      {/* Interactive Quick-Booking Direct Bar */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-8 -mb-6 sm:-mb-8">
        <form
          onSubmit={handleQuickBook}
          className="p-4 sm:p-5 bg-[#FAF7F2] border border-[#DFCFA7] rounded-xs shadow-2xl text-[#181615] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 items-end"
        >
          {/* Quick Guests */}
          <div>
            <label className="block text-[9px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-semibold mb-1.5">
              Convives
            </label>
            <div className="relative">
              <select
                value={quickGuests}
                onChange={(e) => setQuickGuests(Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
              >
                {[1, 2, 3, 4, 5, 6, 8].map(n => (
                  <option key={n} value={n}>{n} {n === 1 ? 'convive' : 'convives'}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Quick Service */}
          <div>
            <label className="block text-[9px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-semibold mb-1.5">
              Service
            </label>
            <select
              value={quickService}
              onChange={(e) => setQuickService(e.target.value as any)}
              className="w-full px-3 py-2.5 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
            >
              <option value="diner">Dîner (19h45 – 22h00)</option>
              <option value="dejeuner">Déjeuner (12h15 – 14h00)</option>
            </select>
          </div>

          {/* Quick Space */}
          <div>
            <label className="block text-[9px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-semibold mb-1.5">
              Salon Souhaité
            </label>
            <select
              value={quickSpace}
              onChange={(e) => setQuickSpace(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
            >
              {DINING_SPACES.map(s => (
                <option key={s.id} value={s.title}>{s.title}</option>
              ))}
            </select>
          </div>

          {/* Submit Quick Book */}
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans tracking-[0.2em] uppercase font-semibold transition-colors rounded-xs flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <span>Choisir une table</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A]" />
          </button>
        </form>
      </div>

      {/* Bottom Editorial Bar with Prestige Signatures */}
      <div className="relative z-0 w-full border-t border-[#FAF7F2]/10 pt-10 sm:pt-12 pb-6 px-6 sm:px-12 backdrop-blur-xs bg-[#181615]/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-[#D8CEBC]/90 font-light">
          
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A]"></span>
            <span className="tracking-widest uppercase text-[11px] text-[#E8DFC8]">
              14, Place Vendôme • 75001 Paris
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.2em] uppercase text-[#D8CEBC]">
            <span>3 Étoiles Michelin</span>
            <span className="text-[#C9A86A]">•</span>
            <span>19.5/20 Gault & Millau</span>
            <span className="text-[#C9A86A]">•</span>
            <span>Les Grandes Tables du Monde</span>
          </div>

          <button 
            onClick={onExploreMenu}
            className="flex items-center gap-2 text-[11px] tracking-widest uppercase text-[#C9A86A] hover:text-white transition-colors cursor-pointer"
          >
            <span>Découvrir l'univers</span>
            <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
          </button>

        </div>
      </div>

    </section>
  );
}
