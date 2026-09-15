import { useState } from 'react';
import { MessageCircle, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export default function WhatsAppConcierge() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappBaseUrl = "https://wa.me/33142688000";

  const handleOpenWhatsApp = (message: string) => {
    const url = `${whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 font-sans">
      
      {/* Floating Concierge Dialog */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-[#FAF7F2] border border-[#DFCFA7] rounded-xs shadow-2xl p-6 text-[#181615] animate-in slide-in-from-bottom-3 duration-200">
          
          <div className="flex items-start justify-between border-b border-[#E5DAC8] pb-3 mb-4">
            <div>
              <span className="text-[9px] uppercase tracking-[0.25em] text-[#8E6D38] font-medium block">
                Maison L'Écrin • Paris
              </span>
              <h4 className="font-serif text-lg text-[#181615]">
                Conciergerie Dédiée
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#7A7061] hover:text-[#181615] p-1 cursor-pointer"
              aria-label="Fermer la conciergerie"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-[#524B40] font-light leading-relaxed mb-4">
            Notre Maître d'Hôtel et notre Cheffe Sommelière répondent directement à vos souhaits personnalisés.
          </p>

          <div className="space-y-2">
            <button
              onClick={() => handleOpenWhatsApp("Bonjour, je souhaite réserver une table pour une célébration spéciale.")}
              className="w-full text-left p-3 bg-[#FFFDF9] hover:bg-[#F4ECE0] border border-[#E5DAC8] rounded-xs text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="font-medium text-[#181615]">Demande de réservation sur-mesure</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8E6D38]" />
            </button>

            <button
              onClick={() => handleOpenWhatsApp("Bonjour, je souhaite des renseignements sur la privatisation d'un salon ou de la Table du Chef.")}
              className="w-full text-left p-3 bg-[#FFFDF9] hover:bg-[#F4ECE0] border border-[#E5DAC8] rounded-xs text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="font-medium text-[#181615]">Privatisation & Salons d'exception</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8E6D38]" />
            </button>

            <button
              onClick={() => handleOpenWhatsApp("Bonjour, je souhaiterais commander ou personnaliser un coffret cadeau gastronomique.")}
              className="w-full text-left p-3 bg-[#FFFDF9] hover:bg-[#F4ECE0] border border-[#E5DAC8] rounded-xs text-xs flex items-center justify-between transition-colors cursor-pointer"
            >
              <span className="font-medium text-[#181615]">Coffrets Cadeaux & Bons</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#8E6D38]" />
            </button>
          </div>

          <div className="mt-4 pt-3 border-t border-[#F0EAE0] flex items-center justify-between text-[10px] text-[#7A7061]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-700 animate-pulse"></span>
              En service jusqu'à 22h30
            </span>
            <span>Réponse discrète & rapide</span>
          </div>

        </div>
      )}

      {/* Discrete Floating Luxury Button */}
      <button
        id="luxury-whatsapp-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2.5 px-4 py-3 bg-[#181615] hover:bg-[#8E6D38] border border-[#C9A86A]/60 text-[#FAF7F2] rounded-full shadow-xl transition-all duration-300 group cursor-pointer hover:shadow-2xl"
        title="Contacter la conciergerie"
      >
        <MessageCircle className="w-4 h-4 text-[#C9A86A] group-hover:scale-110 transition-transform" />
        <span className="text-xs font-sans tracking-[0.18em] uppercase font-light hidden sm:inline">
          Conciergerie
        </span>
      </button>

    </div>
  );
}
