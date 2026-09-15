import { useState, FormEvent } from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { storageService } from '../services/storage';
import { MapPin, Phone, Mail, Clock, Shield, Check, Utensils, Gift, Calendar, KeyRound } from 'lucide-react';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenVouchers: () => void;
  onOpenMaitreD: () => void;
  onOpenMyReservations: () => void;
}

export default function Footer({
  onOpenReservation,
  onOpenVouchers,
  onOpenMaitreD,
  onOpenMyReservations
}: FooterProps) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    storageService.subscribeNewsletter(newsletterEmail);
    setNewsletterSubmitted(true);
    setNewsletterEmail('');
  };

  return (
    <footer id="contact" className="bg-[#1A1918] text-[#D8CEBC] pt-20 pb-12 border-t border-[#33302A] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#2D2A26]">
          
          {/* Col 1: Maison Brand & Michelin Stars */}
          <div className="lg:col-span-4 space-y-5">
            <div className="space-y-1">
              <span className="font-serif text-3xl sm:text-4xl tracking-[0.18em] text-[#FAF8F5] block font-light">
                L'ÉCRIN
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#C59B27] block font-medium">
                Haute Gastronomie • Table Étoilée
              </span>
            </div>

            <p className="text-xs text-[#A89E8C] leading-relaxed font-light max-w-sm">
              L'excellence de la haute cuisine française au 14 Place Vendôme. Trois étoiles au Guide Michelin et cinq toques au Gault & Millau.
            </p>

            <div className="pt-2 flex items-center gap-3 text-xs text-[#E6CB7E] font-serif">
              <span className="text-base tracking-widest">★★★</span>
              <span className="text-[11px] uppercase tracking-widest text-[#B3A690]">
                Guide Michelin 2025
              </span>
            </div>
          </div>

          {/* Col 2: Horaires & Coordonnées */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59B27] block font-medium">
              Horaires & Réservations
            </span>

            <div className="space-y-2 text-[#B8AE9D] font-light">
              <p className="text-white font-normal">Du Mardi au Samedi</p>
              <p>Déjeuner : 12h15 – 14h00</p>
              <p>Dîner : 19h45 – 22h00</p>
              <p className="text-[#8A8070] italic pt-1">Fermé Dimanche et Lundi</p>
            </div>

            <div className="pt-3 space-y-1 text-[#B8AE9D]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <span>14, Place Vendôme, 75001 Paris</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.phone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C59B27] shrink-0" />
                <a href={`mailto:${RESTAURANT_INFO.email}`} className="hover:text-white transition-colors">
                  {RESTAURANT_INFO.email}
                </a>
              </p>
            </div>
          </div>

          {/* Col 3: Informations Pratiques */}
          <div className="lg:col-span-2 space-y-4 text-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59B27] block font-medium">
              Savoir-Vivre
            </span>

            <ul className="space-y-2 text-[#A89E8C] font-light">
              <li>Service Voiturier privé</li>
              <li>Veste de rigueur pour les messieurs</li>
              <li>Salons privatisables</li>
              <li>Accès personnes à mobilité réduite</li>
              <li>Conciergerie dédiée</li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="text-xs uppercase tracking-widest text-[#E6CB7E] hover:text-white underline decoration-[#C59B27] underline-offset-4 cursor-pointer"
              >
                Réserver en ligne
              </button>
            </div>
          </div>

          {/* Col 4: La Lettre de la Maison (Newsletter) */}
          <div className="lg:col-span-3 space-y-4 text-xs">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#C59B27] block font-medium">
              La Lettre de L'Écrin
            </span>
            <p className="text-[#A89E8C] font-light leading-relaxed">
              Recevez en avant-première l'ouverture des réservations pour les saisons nouvelles et les créations du Chef.
            </p>

            {newsletterSubmitted ? (
              <div className="p-3 bg-[#24221F] border border-[#473F33] text-[#E6CB7E] rounded-xs text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-[#C59B27]" />
                <span>Votre adresse a été enregistrée avec nos égards.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="votre.email@domaine.com"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#24221F] border border-[#403B33] text-xs text-[#FAF8F5] rounded-xs focus:outline-none focus:border-[#C59B27] placeholder-[#6D6556]"
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-[#2D2A26] hover:bg-[#C59B27] hover:text-[#1A1918] text-[#E6CB7E] text-[11px] uppercase tracking-[0.2em] font-medium transition-colors rounded-xs cursor-pointer"
                >
                  S'inscrire
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar with discrete Staff Access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7162]">
          <div>
            © {new Date().getFullYear()} Restaurant L'Écrin • Tous droits réservés.
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={onOpenVouchers}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Coffrets Cadeaux
            </button>
            <button
              onClick={onOpenMyReservations}
              className="hover:text-[#FAF8F5] transition-colors cursor-pointer"
            >
              Consulter ma Réservation
            </button>
            
            {/* Discrete Maitre d'Hotel login / view */}
            <button
              id="footer-maitre-d-access-btn"
              onClick={onOpenMaitreD}
              className="hover:text-[#E6CB7E] flex items-center gap-1 transition-colors cursor-pointer"
              title="Accès réservé à l'équipe de salle et au maître d'hôtel"
            >
              <KeyRound className="w-3 h-3 text-[#C59B27]" />
              <span>Espace Maître d'Hôtel</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
