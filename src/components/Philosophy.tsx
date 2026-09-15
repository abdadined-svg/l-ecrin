import { RESTAURANT_INFO } from '../data/restaurantData';

export default function Philosophy() {
  return (
    <section id="histoire" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        {/* Asymmetrical Editorial Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Visual Composition: Overlapping warm photography with natural light */}
          <div className="lg:col-span-6 relative">
            <div className="relative">
              {/* Primary vertical portrait with deep warmth */}
              <div className="overflow-hidden aspect-3/4 max-w-md mx-auto lg:max-w-none shadow-xl bg-[#EBE4D8] rounded-xs">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=85"
                  alt="Chef Alexandre de Saint-Germain à L'Écrin"
                  className="w-full h-full object-cover object-top hover:scale-103 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Secondary overlapping detail image with warm table gesture */}
              <div className="hidden sm:block absolute -bottom-10 -right-6 lg:-right-8 w-56 sm:w-64 aspect-4/3 overflow-hidden shadow-2xl border-4 border-[#FAF7F2] rounded-xs bg-[#E2D8C7]">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
                  alt="Le geste en cuisine et la précision des sauces"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Subtle caption */}
            <div className="mt-8 sm:mt-14 text-center sm:text-left">
              <span className="text-[11px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] block font-medium">
                {RESTAURANT_INFO.chefTitle}
              </span>
              <span className="font-serif text-lg text-[#181615]">
                {RESTAURANT_INFO.chefName}
              </span>
            </div>
          </div>

          {/* Editorial Text Column */}
          <div className="lg:col-span-6 space-y-8">
            
            <div className="space-y-4">
              <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
                NOTRE HISTOIRE • L'ÂME DU LIEU
              </span>

              <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-[1.18] tracking-tight">
                Là où le geste devient <span className="italic font-normal">émotion</span> et vérité.
              </h2>
            </div>

            <div className="space-y-5 text-sm sm:text-base text-[#4A433A] font-light leading-relaxed">
              <p>
                Derrière les boiseries d'un hôtel particulier du XVIIIe siècle, sur la mythique Place Vendôme, <span className="font-normal text-[#181615]">L'Écrin</span> est né d'un rêve : débarrasser la grande gastronomie française de toute grandiloquence pour ne célébrer que l'essentiel — la pureté d'un terroir, l'émotion d'un bouillon parfait, et la noblesse de ceux qui cultivent la terre.
              </p>
              <p>
                Chaque matin, la brigade reçoit les poissons de petits bateaux bretons et les légumes cueillis à la rosée chez nos maraîchers partenaires. Rien n'est prévisible, tout est vivant. Les sauces mijotent quarante-huit heures avec patience d'orfèvre, sans artifice ni masque, pour offrir cette persistance aromatique qui reste gravée en mémoire.
              </p>
            </div>

            {/* Handwritten Signature Quote */}
            <div className="pt-6 border-t border-[#E5DAC8] space-y-3">
              <p className="font-script text-3xl sm:text-4xl text-[#181615] leading-snug">
                « La cuisine est un don de soi, un moment suspendu où l'art de recevoir efface le bruit du monde. »
              </p>
              <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#8E6D38] block">
                Alexandre de Saint-Germain
              </span>
            </div>

            {/* Warm sensory touchpoints */}
            <div className="grid grid-cols-2 gap-6 pt-4 text-xs">
              <div className="space-y-1">
                <span className="font-serif text-base text-[#181615] block">Terroirs Sauvages</span>
                <p className="text-[#6D6253] font-light">Pêche côtière de casier, cueillette forestière et maraîchage biodynamique.</p>
              </div>
              <div className="space-y-1">
                <span className="font-serif text-base text-[#181615] block">Table Vivante</span>
                <p className="text-[#6D6253] font-light">Lumière tamisée, nappages de lin brut et attention délicate portée à chaque convive.</p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
