import { useState } from 'react';
import { TASTING_MENUS, A_LA_CARTE_DISHES } from '../data/restaurantData';
import { Dish, TastingMenu } from '../types';
import { Wine, Info, ArrowRight, X, Sparkles, Check } from 'lucide-react';

interface MenuSectionProps {
  onSelectMenuForBooking: (menuName: string) => void;
}

export default function MenuSection({ onSelectMenuForBooking }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState<'signatures' | 'degustation' | 'carte' | 'desserts'>('signatures');
  const [selectedTastingMenu, setSelectedTastingMenu] = useState<TastingMenu>(TASTING_MENUS[1]);
  const [selectedDishModal, setSelectedDishModal] = useState<Dish | null>(null);

  // Chef signature dishes
  const signatures = A_LA_CARTE_DISHES.filter(d => d.isSignature);
  const entrees = A_LA_CARTE_DISHES.filter(d => d.category === 'entree');
  const plats = A_LA_CARTE_DISHES.filter(d => d.category === 'plat');
  const fromages = A_LA_CARTE_DISHES.filter(d => d.category === 'fromage');
  const desserts = A_LA_CARTE_DISHES.filter(d => d.category === 'dessert');

  return (
    <section id="menus" className="py-28 sm:py-36 px-6 sm:px-10 lg:px-16 bg-[#FAF7F2] relative">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20 space-y-4">
          <span className="text-[11px] font-sans uppercase tracking-[0.35em] text-[#8E6D38] font-medium block">
            LA CARTE DES SAISONS
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl text-[#181615] font-light leading-tight">
            L'Écrin des Saveurs
          </h2>
          <div className="w-10 h-[1px] bg-[#C9A86A] mx-auto my-3"></div>
          <p className="text-sm sm:text-base text-[#524B40] font-light leading-relaxed">
            Chaque partition culinaire célèbre l'alliance des récoltes sauvages, des pêches côtières durables et des accords de haute sommellerie.
          </p>
        </div>

        {/* Art-Directed Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mb-16 sm:mb-24 border-b border-[#E5DAC8] pb-4">
          {[
            { id: 'signatures', label: 'Les Signatures du Chef' },
            { id: 'degustation', label: 'Menus Dégustation' },
            { id: 'carte', label: 'La Carte des Mets' },
            { id: 'desserts', label: 'Haute Pâtisserie' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2 text-xs sm:text-sm font-sans tracking-[0.2em] uppercase transition-all duration-300 relative cursor-pointer ${
                activeTab === tab.id
                  ? 'text-[#181615] font-medium'
                  : 'text-[#857B6D] hover:text-[#181615] font-light'
              }`}
            >
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#C9A86A] -mb-[5px]"></div>
              )}
            </button>
          ))}
        </div>

        {/* 1. LES SIGNATURES DU CHEF — SPECTACULAR EDITORIAL FEATURE */}
        {activeTab === 'signatures' && (
          <div className="space-y-24 animate-in fade-in duration-500">
            
            {/* Signature 1: Langoustine Royale */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 relative group overflow-hidden rounded-xs bg-[#EAE3D5] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=85"
                  alt="Langoustine Royale de Casier"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#181615]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-medium">
                  Création Emblématique
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                    Pêche Côtière Bretonne
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181615] font-normal leading-snug">
                    Langoustine Royale de Casier & Caviar Osciètre
                  </h3>
                </div>

                <p className="text-sm text-[#524B40] font-light leading-relaxed">
                  Raidie en quelques secondes au beurre de baratte noisette, reposée sur une mousseline soyeuse de panais infusée à la vanille Bourbon de Madagascar. Voile de caviar impérial et réduction de carapaces toastées au poivre de Timut.
                </p>

                <div className="pt-2 border-t border-[#E5DAC8] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#6B6152] font-serif italic">
                    <Wine className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                    <span>Meursault Premier Cru 'Les Charmes' 2020, Domaine Lafon</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-sm font-sans text-[#7A7061] tracking-wider">
                      À la carte • 120 €
                    </span>
                    <button
                      onClick={() => setSelectedDishModal(signatures[0] || entrees[0])}
                      className="text-xs uppercase tracking-[0.2em] text-[#181615] hover:text-[#8E6D38] underline underline-offset-4 cursor-pointer"
                    >
                      Détails de création
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature 2: Pigeon de Vendée */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-5 lg:order-1 order-2 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                    Élevage d'Excellence en Liberté
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181615] font-normal leading-snug">
                    Pigeon de Vendée Rôti en Casserole
                  </h3>
                </div>

                <p className="text-sm text-[#524B40] font-light leading-relaxed">
                  Poitrine saignante laquée au jus de genièvre et miel de châtaignier, cuisse confite croustillante en pastilla d'abats, étuvée de morilles fraîches étuvées au savagnin et jus corsé perlé d'huile d'herbes amères.
                </p>

                <div className="pt-2 border-t border-[#E5DAC8] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#6B6152] font-serif italic">
                    <Wine className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                    <span>Hermitage Rouge 2018, Domaine Jean-Louis Chave</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-sm font-sans text-[#7A7061] tracking-wider">
                      À la carte • 135 €
                    </span>
                    <button
                      onClick={() => setSelectedDishModal(signatures[1] || plats[1])}
                      className="text-xs uppercase tracking-[0.2em] text-[#181615] hover:text-[#8E6D38] underline underline-offset-4 cursor-pointer"
                    >
                      Détails de création
                    </button>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 lg:order-2 order-1 relative group overflow-hidden rounded-xs bg-[#EAE3D5] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1400&q=85"
                  alt="Pigeon de Vendée rôti"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-[#181615]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-medium">
                  Grand Classique Réinventé
                </div>
              </div>
            </div>

            {/* Signature 3: Haute Pâtisserie Guanaja */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              <div className="lg:col-span-7 relative group overflow-hidden rounded-xs bg-[#EAE3D5] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=1400&q=85"
                  alt="Haute pâtisserie au chocolat Guanaja"
                  className="w-full h-[380px] sm:h-[460px] object-cover object-center group-hover:scale-103 transition-transform duration-1000 ease-out"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-[#181615]/80 backdrop-blur-xs text-[#FAF7F2] text-[10px] uppercase tracking-[0.25em] font-medium">
                  Cheffe Pâtissière Claire Valmont
                </div>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                    Orfèvrerie Sucrée
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#181615] font-normal leading-snug">
                    La Sphère Guanaja 70% & Or 24 Carats
                  </h3>
                </div>

                <p className="text-sm text-[#524B40] font-light leading-relaxed">
                  Coque fine dentelée à la feuille d'or comestible, crémeux au grué de cacao torréfié sur place, cœur coulant au praliné noisette du Piémont et glace au lait cru infusée à la fève tonka.
                </p>

                <div className="pt-2 border-t border-[#E5DAC8] space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#6B6152] font-serif italic">
                    <Wine className="w-3.5 h-3.5 text-[#C9A86A] shrink-0" />
                    <span>Porto Vintage 2003, Quinta do Noval</span>
                  </div>
                  <div className="flex items-baseline justify-between pt-2">
                    <span className="text-sm font-sans text-[#7A7061] tracking-wider">
                      À la carte • 42 €
                    </span>
                    <button
                      onClick={() => setSelectedDishModal(desserts[0])}
                      className="text-xs uppercase tracking-[0.2em] text-[#181615] hover:text-[#8E6D38] underline underline-offset-4 cursor-pointer"
                    >
                      Détails de création
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* 2. MENUS DÉGUSTATION */}
        {activeTab === 'degustation' && (
          <div className="space-y-16 animate-in fade-in duration-300">
            
            {/* Menu Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {TASTING_MENUS.map((menu) => {
                const isSelected = selectedTastingMenu.id === menu.id;
                return (
                  <button
                    key={menu.id}
                    onClick={() => setSelectedTastingMenu(menu)}
                    className={`p-8 text-left border rounded-xs transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#F4ECE0] border-[#C9A86A] shadow-md'
                        : 'bg-[#FAF7F2] border-[#E5DAC8] hover:border-[#C9A86A]/60'
                    }`}
                  >
                    <div>
                      <div className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] mb-1">
                        {menu.coursesCount} Mouvements
                      </div>
                      <h3 className="font-serif text-2xl text-[#181615] font-normal mb-2">
                        {menu.name}
                      </h3>
                      <p className="text-xs text-[#6B6152] font-light leading-relaxed mb-6">
                        {menu.subtitle}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[#E5DAC8] flex items-baseline justify-between w-full">
                      <span className="font-serif text-2xl text-[#181615]">
                        {menu.price} €
                      </span>
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#857B6D]">
                        par convive
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Detailed Presentation of Active Tasting Menu */}
            <div className="p-8 sm:p-14 bg-[#FFFDF9] border border-[#E5DAC8] rounded-xs shadow-xs space-y-10">
              
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#E5DAC8] pb-8 gap-4">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block mb-1">
                    {selectedTastingMenu.coursesCount} Créations Poétiques • Servies pour toute la table
                  </span>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#181615]">
                    {selectedTastingMenu.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5E5445] font-light mt-2 max-w-xl">
                    {selectedTastingMenu.description}
                  </p>
                </div>

                <div className="sm:text-right shrink-0">
                  <span className="font-serif text-3xl text-[#181615] block">
                    {selectedTastingMenu.price} €
                  </span>
                  <span className="text-xs text-[#7A7061] font-light block">
                    Accords Mets & Vins Rares : +{selectedTastingMenu.winePairingPrice} €
                  </span>

                  <button
                    onClick={() => onSelectMenuForBooking(selectedTastingMenu.name)}
                    className="mt-4 inline-flex items-center gap-2 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans tracking-[0.2em] uppercase px-6 py-3 rounded-xs transition-colors cursor-pointer"
                  >
                    <span>Choisir ce menu</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#C9A86A]" />
                  </button>
                </div>
              </div>

              {/* Steps Sequence */}
              <div className="space-y-6">
                {selectedTastingMenu.steps.map((step, idx) => (
                  <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-baseline pb-5 border-b border-[#F2EDE3] last:border-0">
                    <div className="md:col-span-3 text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium">
                      {step.sequence}
                    </div>
                    <div className="md:col-span-9 space-y-1">
                      <h4 className="font-serif text-lg text-[#181615] font-medium">
                        {step.dishTitle}
                      </h4>
                      <p className="text-xs text-[#524B40] font-light leading-relaxed">
                        {step.description}
                      </p>
                      {step.winePairing && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[#7A7061] font-serif italic pt-0.5">
                          <Wine className="w-3 h-3 text-[#C9A86A]" />
                          <span>Accord Sommelier : {step.winePairing}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* 3. LA CARTE DES METS */}
        {activeTab === 'carte' && (
          <div className="space-y-20 animate-in fade-in duration-300 max-w-4xl mx-auto">
            
            {/* Entrées */}
            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E5DAC8] pb-3">
                <h3 className="font-serif text-2xl text-[#181615] italic">
                  Les Entrées en Clarté
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#857B6D]">
                  Selon les arrivages matinaux
                </span>
              </div>

              <div className="divide-y divide-[#F0EAE0]">
                {entrees.map((dish) => (
                  <div key={dish.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-3">
                        <h4 className="font-serif text-lg text-[#181615] group-hover:text-[#8E6D38] transition-colors">
                          {dish.name}
                        </h4>
                        {dish.isSignature && (
                          <span className="text-[9px] uppercase tracking-widest text-[#8E6D38] border border-[#C9A86A]/50 px-2 py-0.5 rounded-full font-sans">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5E5445] font-light leading-relaxed">
                        {dish.description}
                      </p>
                      {dish.winePairing && (
                        <span className="text-[11px] font-serif italic text-[#7A7061] block">
                          Accord : {dish.winePairing}
                        </span>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0">
                      <span className="font-serif text-base text-[#181615]">
                        {dish.price} €
                      </span>
                      <button
                        onClick={() => setSelectedDishModal(dish)}
                        className="text-[10px] uppercase tracking-wider text-[#8E6D38] hover:text-[#181615] underline cursor-pointer"
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Plats de résistance */}
            <div className="space-y-6">
              <div className="flex items-baseline justify-between border-b border-[#E5DAC8] pb-3">
                <h3 className="font-serif text-2xl text-[#181615] italic">
                  Poissons Côtiers & Pièces de Chasse
                </h3>
                <span className="text-[10px] uppercase tracking-widest text-[#857B6D]">
                  Cuissons à la braise & réductions d'orfèvre
                </span>
              </div>

              <div className="divide-y divide-[#F0EAE0]">
                {plats.map((dish) => (
                  <div key={dish.id} className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 group">
                    <div className="space-y-1 max-w-xl">
                      <div className="flex items-center gap-3">
                        <h4 className="font-serif text-lg text-[#181615] group-hover:text-[#8E6D38] transition-colors">
                          {dish.name}
                        </h4>
                        {dish.isSignature && (
                          <span className="text-[9px] uppercase tracking-widest text-[#8E6D38] border border-[#C9A86A]/50 px-2 py-0.5 rounded-full font-sans">
                            Signature
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#5E5445] font-light leading-relaxed">
                        {dish.description}
                      </p>
                      {dish.winePairing && (
                        <span className="text-[11px] font-serif italic text-[#7A7061] block">
                          Accord : {dish.winePairing}
                        </span>
                      )}
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0">
                      <span className="font-serif text-base text-[#181615]">
                        {dish.price} €
                      </span>
                      <button
                        onClick={() => setSelectedDishModal(dish)}
                        className="text-[10px] uppercase tracking-wider text-[#8E6D38] hover:text-[#181615] underline cursor-pointer"
                      >
                        En savoir plus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chariot de fromages d'alpage */}
            <div className="p-8 bg-[#FAF2E6] border border-[#E5D6BD] rounded-xs space-y-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium block">
                    Le Chariot Impérial
                  </span>
                  <h4 className="font-serif text-xl text-[#181615]">
                    Sélection de Fromages d'Alpage Affinés par Bernard Antony
                  </h4>
                </div>
                <span className="font-serif text-lg text-[#181615]">36 €</span>
              </div>
              <p className="text-xs text-[#5E5445] font-light leading-relaxed">
                Comté Garde Royale 42 mois, Beaufort d'été de chalet d'alpage, Reblochon fermier coulant au lait cru et Sainte-Maure de Touraine cendré, accompagnés de pains aux fruits secs cuits au feu de bois.
              </p>
            </div>

          </div>
        )}

        {/* 4. HAUTE PÂTISSERIE */}
        {activeTab === 'desserts' && (
          <div className="space-y-16 animate-in fade-in duration-300 max-w-4xl mx-auto">
            
            <div className="text-center space-y-2 mb-8">
              <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-medium block">
                Créations de Claire Valmont
              </span>
              <h3 className="font-serif text-3xl text-[#181615] italic">
                L'Instant Sucré & Les Douceurs Impériales
              </h3>
            </div>

            <div className="divide-y divide-[#F0EAE0]">
              {desserts.map((dish) => (
                <div key={dish.id} className="py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 group">
                  <div className="space-y-1 max-w-xl">
                    <div className="flex items-center gap-3">
                      <h4 className="font-serif text-xl text-[#181615] group-hover:text-[#8E6D38] transition-colors">
                        {dish.name}
                      </h4>
                      {dish.isSignature && (
                        <span className="text-[9px] uppercase tracking-widest text-[#8E6D38] border border-[#C9A86A]/50 px-2 py-0.5 rounded-full font-sans">
                          Signature
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5E5445] font-light leading-relaxed">
                      {dish.description}
                    </p>
                    {dish.winePairing && (
                      <span className="text-[11px] font-serif italic text-[#7A7061] block">
                        Accord d'exception : {dish.winePairing}
                      </span>
                    )}
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 pt-2 sm:pt-0">
                    <span className="font-serif text-base text-[#181615]">
                      {dish.price} €
                    </span>
                    <button
                      onClick={() => setSelectedDishModal(dish)}
                      className="text-[10px] uppercase tracking-wider text-[#8E6D38] hover:text-[#181615] underline cursor-pointer"
                    >
                      Détails de création
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>

      {/* DISH DETAIL MODAL */}
      {selectedDishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#181615]/75 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF7F2] border border-[#E5DAC8] max-w-lg w-full rounded-xs shadow-2xl p-6 sm:p-8 relative space-y-6">
            
            <button
              onClick={() => setSelectedDishModal(null)}
              className="absolute top-4 right-4 p-2 text-[#7A7061] hover:text-[#181615] cursor-pointer"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>

            {selectedDishModal.imageUrl && (
              <div className="aspect-16/9 overflow-hidden rounded-xs bg-[#EAE3D5]">
                <img
                  src={selectedDishModal.imageUrl}
                  alt={selectedDishModal.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            )}

            <div className="space-y-2">
              <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-medium block">
                {selectedDishModal.category === 'entree' ? 'Entrée de Saison' :
                 selectedDishModal.category === 'plat' ? 'Grand Plat de Résistance' :
                 selectedDishModal.category === 'fromage' ? "Affinage d'Exception" : 'Haute Pâtisserie'}
              </span>
              <h3 className="font-serif text-2xl text-[#181615]">
                {selectedDishModal.name}
              </h3>
              {selectedDishModal.subname && (
                <p className="text-xs font-serif italic text-[#8E6D38]">
                  {selectedDishModal.subname}
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-[#524B40] font-light leading-relaxed">
              {selectedDishModal.description}
            </p>

            {selectedDishModal.winePairing && (
              <div className="p-3 bg-[#F4ECE0] border border-[#DFCFA7] rounded-xs text-xs space-y-1">
                <span className="font-sans uppercase text-[10px] tracking-widest text-[#8E6D38] block font-medium">
                  Accord Sommelier Conseillé
                </span>
                <p className="font-serif italic text-[#181615]">
                  {selectedDishModal.winePairing}
                </p>
              </div>
            )}

            <div className="pt-3 border-t border-[#E5DAC8] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#7A7061] uppercase tracking-wider block">Tarif à la carte</span>
                <span className="font-serif text-xl text-[#181615]">{selectedDishModal.price} €</span>
              </div>

              <button
                onClick={() => {
                  setSelectedDishModal(null);
                  onSelectMenuForBooking(selectedDishModal.name);
                }}
                className="px-5 py-2.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs font-sans tracking-[0.18em] uppercase rounded-xs transition-colors cursor-pointer"
              >
                Réserver pour ce plat
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}
