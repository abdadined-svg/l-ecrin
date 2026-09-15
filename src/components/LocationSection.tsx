import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Clock, Phone, Navigation, MessageCircle, Car } from 'lucide-react';

interface LocationSectionProps {
  onOpenReservation: () => void;
}

export default function LocationSection({ onOpenReservation }: LocationSectionProps) {
  const whatsappUrl = `https://wa.me/33142688000?text=${encodeURIComponent("Bonjour, je souhaite contacter la conciergerie du restaurant L'Écrin concernant une réservation ou une demande sur-mesure.")}`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("14 Place Vendome 75001 Paris France")}`;

  return (
    <section id="acces" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] border-t border-[#E5DAC8] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            ACCÈS & CONCIERGERIE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            14, Place Vendôme
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Au cœur du 1er arrondissement de Paris, notre hôtel particulier vous accueille dans un cadre intime et feutré.
          </p>
        </div>

        {/* Visual Composition Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Practical info in luxury editorial style */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#F4ECE0] border border-[#DFCFA7] flex items-center justify-center text-[#8E6D38] shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#181615]">
                    L'Adresse
                  </h3>
                  <p className="text-sm text-[#4A433A] font-light mt-1">
                    {RESTAURANT_INFO.address.street}, {RESTAURANT_INFO.address.postalCode} {RESTAURANT_INFO.address.city}, France
                  </p>
                  <p className="text-xs text-[#7A7061] font-light mt-0.5">
                    Métro : Tuileries (Ligne 1), Concorde (Lignes 1, 8, 12), Opéra (Lignes 3, 7, 8).
                  </p>
                </div>
              </div>

              {/* Horaires */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#F4ECE0] border border-[#DFCFA7] flex items-center justify-center text-[#8E6D38] shrink-0 mt-0.5">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#181615]">
                    Services & Horaires
                  </h3>
                  <div className="text-sm text-[#4A433A] font-light mt-1 space-y-0.5">
                    <p>Du Mardi au Samedi</p>
                    <p className="text-xs text-[#6B6152]">Déjeuner : 12h15 – 14h00 (dernière commande à 13h15)</p>
                    <p className="text-xs text-[#6B6152]">Dîner : 19h45 – 22h00 (dernière commande à 21h15)</p>
                    <p className="text-xs text-[#8E6D38] italic pt-1">Fermeture hebdomadaire : Dimanche et Lundi</p>
                  </div>
                </div>
              </div>

              {/* Voiturier & Accueil */}
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-full bg-[#F4ECE0] border border-[#DFCFA7] flex items-center justify-center text-[#8E6D38] shrink-0 mt-0.5">
                  <Car className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-xl text-[#181615]">
                    Voiturier Privé & Accueil
                  </h3>
                  <p className="text-xs text-[#4A433A] font-light mt-1">
                    Notre équipe de voituriers prend en charge votre véhicule dès votre arrivée sur la Place Vendôme.
                  </p>
                  <p className="text-xs text-[#7A7061] font-light mt-0.5">
                    {RESTAURANT_INFO.dressCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Action buttons: Google Maps & WhatsApp Concierge */}
            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 text-[#C9A86A]" />
                <span>Itinéraire Google Maps</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C9A86A] text-[#181615] hover:bg-[#F4ECE0] text-xs font-sans uppercase tracking-[0.2em] rounded-xs transition-colors cursor-pointer"
              >
                <MessageCircle className="w-3.5 h-3.5 text-[#8E6D38]" />
                <span>Conciergerie WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Right Column: Beautiful atmospheric place visual with interactive map framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-xs overflow-hidden shadow-xl border border-[#E5DAC8] aspect-4/3 group">
              <img
                src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85"
                alt="Place Vendôme à Paris au crépuscule"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />

              {/* Atmospheric overlay with discrete pinpoint */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/80 via-transparent to-transparent flex flex-col justify-end p-6 text-[#FAF7F2]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C9A86A] animate-ping"></span>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#C9A86A]">
                    Hôtel Particulier d'Orsay
                  </span>
                </div>
                <p className="font-serif text-xl sm:text-2xl text-[#FAF7F2]">
                  L'Écrin — 14, Place Vendôme
                </p>
                <p className="text-xs text-[#E5DAC8] font-light">
                  Façade classée aux Monuments Historiques
                </p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
