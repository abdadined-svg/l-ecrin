import { useState, FormEvent } from 'react';
import { Calendar, Users, Clock, Sparkles, ArrowRight } from 'lucide-react';
import { TASTING_MENUS } from '../data/restaurantData';

interface ReservationSectionProps {
  onOpenFullReservation: (preselectedMenu?: string) => void;
}

export default function ReservationSection({ onOpenFullReservation }: ReservationSectionProps) {
  const [guests, setGuests] = useState(2);
  const [service, setService] = useState<'dejeuner' | 'diner'>('diner');
  const [menuChoice, setMenuChoice] = useState(TASTING_MENUS[1].name);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onOpenFullReservation(menuChoice);
  };

  return (
    <section id="reservation" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atmospheric Warm Visual */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-4/5 overflow-hidden rounded-xs bg-[#E5DAC8] shadow-2xl relative group">
              <img
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=85"
                alt="Table gastronomique dressée à l'Écrin"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/80 via-[#181615]/20 to-transparent flex flex-col justify-end p-8 text-[#FAF7F2]">
                <div className="flex items-center gap-2 mb-1 text-[#C9A86A]">
                  <Sparkles className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-[0.3em] font-sans">
                    L'Émotion d'un Soir
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F2] font-light">
                  Une table dressée pour vous
                </h3>
                <p className="text-xs text-[#E5DAC8] font-light mt-1 max-w-md">
                  Chaque soir, la brigade s'apprête à faire de votre venue un souvenir indélébile.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Emotional Headline & Clean Spacious Booking Card */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
                RÉSERVATION CONFIDENTIELLE
              </span>
              <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
                Vivre l'expérience L'Écrin
              </h2>
              <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
                Notre salle accueille un nombre restreint de convives par service pour garantir une attention exclusive. Nous vous conseillons de réserver votre table quelques semaines à l'avance.
              </p>
            </div>

            {/* Premium, Spacious Booking Form Card */}
            <form onSubmit={handleSubmit} className="p-8 sm:p-10 bg-[#FAF7F2] border border-[#DFCFA7] rounded-xs shadow-md space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Number of guests */}
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium mb-2">
                    Nombre de Convives
                  </label>
                  <div className="relative">
                    <select
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#D5C7B0] text-sm text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'convive' : 'convives'}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Service type */}
                <div>
                  <label className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium mb-2">
                    Service Souhaité
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value as any)}
                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#D5C7B0] text-sm text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
                  >
                    <option value="diner">Dîner (19h45 – 22h00)</option>
                    <option value="dejeuner">Déjeuner (12h15 – 14h00)</option>
                  </select>
                </div>
              </div>

              {/* Menu Choice */}
              <div>
                <label className="block text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium mb-2">
                  Choix de l'Expérience Gastronomique
                </label>
                <select
                  value={menuChoice}
                  onChange={(e) => setMenuChoice(e.target.value)}
                  className="w-full px-4 py-3 bg-[#FFFDF9] border border-[#D5C7B0] text-sm text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A] cursor-pointer"
                >
                  {TASTING_MENUS.map(m => (
                    <option key={m.id} value={m.name}>
                      {m.name} ({m.coursesCount} créations — {m.price} €)
                    </option>
                  ))}
                  <option value="A la Carte">Choix libre à la carte des saisons</option>
                </select>
              </div>

              {/* Notice */}
              <div className="text-[11px] text-[#7A7061] font-light flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] shrink-0"></span>
                <span>Confirmation instantanée et prise en compte de vos souhaits confidentiels.</span>
              </div>

              {/* Main Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans tracking-[0.25em] uppercase font-semibold transition-all duration-300 rounded-xs shadow-md flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>Réserver une table</span>
                <ArrowRight className="w-4 h-4 text-[#C9A86A]" />
              </button>

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
