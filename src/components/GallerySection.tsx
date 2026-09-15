import { useState, useEffect } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryItem } from '../types';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function GallerySection() {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['Tous', 'Plat', 'Geste du Chef', 'Salle', 'Cave'];

  const filteredItems = activeCategory === 'Tous'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex]);

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="galerie" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#F4EFE6] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            GALERIE D'ART CULINAIRE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            L'Instant & La Matière
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Regards photographiques sur les gestes de la brigade, l'intimité des salons et la poésie visuelle de nos créations.
          </p>
        </div>

        {/* Categories Filter */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 text-xs font-sans tracking-[0.2em] uppercase rounded-full transition-all duration-300 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#181615] text-[#FAF7F2] font-medium'
                  : 'bg-transparent text-[#7A7061] hover:text-[#181615] border border-transparent hover:border-[#D5C7B0]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Artistic Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {filteredItems.map((item, idx) => {
            // Calculate asymmetric col-span depending on item aspect
            const colSpan = item.aspect === 'large' 
              ? 'md:col-span-8' 
              : item.aspect === 'vertical' 
                ? 'md:col-span-4' 
                : item.aspect === 'horizontal' 
                  ? 'md:col-span-6' 
                  : 'md:col-span-6';

            const heightClass = item.aspect === 'large' 
              ? 'h-[360px] sm:h-[440px]' 
              : item.aspect === 'vertical' 
                ? 'h-[420px] sm:h-[500px]' 
                : 'h-[320px] sm:h-[380px]';

            return (
              <div
                key={item.id}
                onClick={() => setLightboxIndex(idx)}
                className={`${colSpan} group relative overflow-hidden rounded-xs bg-[#E5DAC8] cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500`}
              >
                <div className={`w-full ${heightClass} overflow-hidden`}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-1000 ease-out"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Subtle artistic overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#181615]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-[#FAF7F2]">
                  <span className="text-[9px] font-sans uppercase tracking-[0.25em] text-[#C9A86A] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#FAF7F2] font-normal leading-snug">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-[#E5DAC8] pt-2 font-light">
                    <Maximize2 className="w-3.5 h-3.5 text-[#C9A86A]" />
                    <span>Agrandir</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* LUXURY LIGHTBOX */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-[#181615]/95 backdrop-blur-md animate-in fade-in duration-200">
          
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 text-[#FAF7F2] hover:text-[#C9A86A] transition-colors z-50 cursor-pointer"
            aria-label="Fermer la vue agrandie"
          >
            <X className="w-7 h-7" />
          </button>

          {/* Previous image */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Photo précédente"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next image */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 text-[#FAF7F2]/70 hover:text-[#FAF7F2] hover:bg-[#FAF7F2]/10 rounded-full transition-colors z-50 cursor-pointer"
            aria-label="Photo suivante"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Active Image and Caption */}
          <div className="max-w-4xl max-h-[85vh] flex flex-col items-center justify-center text-center space-y-4">
            <div className="max-h-[70vh] overflow-hidden rounded-xs shadow-2xl border border-[#FAF7F2]/15">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[70vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="space-y-1 max-w-lg">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#C9A86A]">
                {filteredItems[lightboxIndex].category} • {lightboxIndex + 1} sur {filteredItems.length}
              </span>
              <h3 className="font-serif text-2xl text-[#FAF7F2]">
                {filteredItems[lightboxIndex].title}
              </h3>
              {filteredItems[lightboxIndex].description && (
                <p className="text-xs text-[#D8CEBC] font-light italic">
                  {filteredItems[lightboxIndex].description}
                </p>
              )}
            </div>
          </div>

        </div>
      )}
    </section>
  );
}
