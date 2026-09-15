import { useState, FormEvent } from 'react';
import { GiftVoucher } from '../types';
import { storageService } from '../services/storage';
import { Gift, Sparkles, Check, Printer, X, Heart, Wine } from 'lucide-react';

interface GiftVoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GiftVoucherModal({ isOpen, onClose }: GiftVoucherModalProps) {
  const [experienceType, setExperienceType] = useState<'initiation' | 'symphonie' | 'chef'>('symphonie');
  const [includeWinePairing, setIncludeWinePairing] = useState<boolean>(true);
  const [purchaserName, setPurchaserName] = useState<string>('');
  const [purchaserEmail, setPurchaserEmail] = useState<string>('');
  const [recipientName, setRecipientName] = useState<string>('');
  const [personalMessage, setPersonalMessage] = useState<string>('Pour un moment inoubliable sous les dorures de la Place Vendôme.');
  const [createdVoucher, setCreatedVoucher] = useState<GiftVoucher | null>(null);

  if (!isOpen) return null;

  const packages = {
    initiation: {
      title: "Coffret Éveil des Sens pour Deux",
      experience: "Menu Dégustation en 5 temps pour 2 convives",
      basePrice: 195 * 2,
      winePrice: 120 * 2,
    },
    symphonie: {
      title: "Coffret Symphonie Céleste pour Deux",
      experience: "Menu Haute Couture en 7 temps pour 2 convives",
      basePrice: 280 * 2,
      winePrice: 175 * 2,
    },
    chef: {
      title: "Immersion à la Table du Chef Privilégiée",
      experience: "Menu Quintessence en 9 temps face aux cuisines pour 2 convives",
      basePrice: 360 * 2,
      winePrice: 240 * 2,
    },
  };

  const selectedPkg = packages[experienceType];
  const totalPrice = selectedPkg.basePrice + (includeWinePairing ? selectedPkg.winePrice : 0);

  const handleCreateVoucher = (e: FormEvent) => {
    e.preventDefault();
    if (!purchaserName || !purchaserEmail || !recipientName) {
      alert("Veuillez renseigner le nom de l'acheteur, son email et le nom du destinataire.");
      return;
    }

    const saved = storageService.saveVoucher({
      title: selectedPkg.title,
      experienceName: `${selectedPkg.experience} ${includeWinePairing ? 'avec accords mets & vins de prestige' : ''}`,
      guestsCount: 2,
      price: totalPrice,
      purchaserName,
      purchaserEmail,
      recipientName,
      personalMessage,
      includeWinePairing,
    });

    setCreatedVoucher(saved);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1918]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#DFD5C0] w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl relative flex flex-col">
        
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 bg-[#FAF8F5]/98 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#9B7516] font-medium block">
              Maison L'Écrin • L'Art d'Offrir
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918]">
              Coffrets Cadeaux d'Exception
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#7A6F5C] hover:text-[#1A1918] cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-10 flex-1">
          {createdVoucher ? (
            /* VOUCHER TICKET READY */
            <div className="space-y-8 text-center max-w-xl mx-auto py-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#F5F0E6] border border-[#B8860B] rounded-full flex items-center justify-center mx-auto text-[#9B7516]">
                <Sparkles className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-[#9B7516] font-medium block">
                  Bon Cadeau Officiel Émis
                </span>
                <h3 className="font-serif text-3xl text-[#1A1918]">
                  Votre invitation gastronomique est prête
                </h3>
                <p className="text-xs text-[#635848] font-light">
                  Ce bon est valable pendant un an à compter de ce jour auprès de notre conciergerie.
                </p>
              </div>

              {/* Luxury Certificate Card Preview */}
              <div className="p-8 bg-[#FDFCFB] border-2 border-[#D5C6A8] rounded-xs text-left shadow-lg space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FAF8F5] border-b border-l border-[#E2D5BE] flex items-center justify-center -rotate-45 translate-x-8 -translate-y-8">
                  <span className="text-[9px] uppercase tracking-widest text-[#9B7516] font-bold">★★★</span>
                </div>

                <div className="border-b border-[#EFE8D8] pb-4">
                  <span className="font-serif text-2xl text-[#1A1918] tracking-[0.15em] block">
                    L'ÉCRIN
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#8A795D]">
                    14, Place Vendôme • Paris
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#9B7516] block font-medium">
                    Invitation Personnalisée Pour
                  </span>
                  <h4 className="font-serif text-2xl text-[#1A1918]">
                    {createdVoucher.recipientName}
                  </h4>
                  <p className="font-serif italic text-sm text-[#4A433A] pt-1">
                    « {createdVoucher.personalMessage} »
                  </p>
                </div>

                <div className="p-4 bg-[#F8F4EC] border border-[#E0D4BA] rounded-xs space-y-2">
                  <span className="text-[10px] uppercase tracking-widest text-[#8C764D] block font-medium">
                    Prestation Offerte
                  </span>
                  <p className="font-serif text-base text-[#1A1918]">
                    {createdVoucher.title}
                  </p>
                  <p className="text-xs text-[#615647] font-light">
                    {createdVoucher.experienceName}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs pt-2 border-t border-[#F0EBE0]">
                  <div>
                    <span className="text-[#8C764D] block text-[10px]">Numéro de Bon Unique :</span>
                    <span className="font-mono text-sm font-medium text-[#1A1918]">{createdVoucher.voucherCode}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[#8C764D] block text-[10px]">Date de validité :</span>
                    <span className="text-[#1A1918]">Jusqu'au {createdVoucher.expirationDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#D5C6A8] text-[#1A1918] text-xs uppercase tracking-wider hover:bg-[#F2ECE1] transition-colors rounded-xs cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#8C764D]" />
                  <span>Imprimer le Bon Cadeau</span>
                </button>

                <button
                  onClick={() => { setCreatedVoucher(null); onClose(); }}
                  className="px-8 py-3 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-widest hover:bg-[#9B7516] transition-colors rounded-xs cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>
          ) : (
            /* CREATION FORM */
            <form onSubmit={handleCreateVoucher} className="space-y-8 max-w-2xl mx-auto">
              {/* Package selector */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-3">
                  Choisissez l'Expérience Gastronomique
                </label>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'initiation', title: 'Éveil des Sens', courses: '5 temps', price: 390 },
                    { id: 'symphonie', title: 'Symphonie Céleste', courses: '7 temps (Signature)', price: 560 },
                    { id: 'chef', title: 'Table du Chef', courses: '9 temps Privilège', price: 720 },
                  ].map((pkg) => (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setExperienceType(pkg.id as any)}
                      className={`p-4 text-left border rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                        experienceType === pkg.id
                          ? 'bg-[#F5F0E6] border-[#B8860B] ring-1 ring-[#B8860B]'
                          : 'bg-[#FDFCFB] border-[#D8CCB5] hover:bg-[#F2ECE1]'
                      }`}
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#9B7516] font-medium block">
                          Pour 2 personnes
                        </span>
                        <span className="font-serif text-base text-[#1A1918] block mt-1">
                          {pkg.title}
                        </span>
                        <span className="text-xs text-[#7A6F5C] block mt-0.5">
                          {pkg.courses}
                        </span>
                      </div>
                      <span className="font-serif text-lg text-[#1A1918] mt-3 block">
                        Dès {pkg.price} €
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Wine Pairing Toggle */}
              <div className="p-4 bg-[#F8F4EC] border border-[#DFCFA7] rounded-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wine className="w-5 h-5 text-[#B8860B] shrink-0" />
                  <div>
                    <span className="font-serif text-sm text-[#1A1918] block font-medium">
                      Inclure les Accords Mets & Vins pour 2 (+{selectedPkg.winePrice} €)
                    </span>
                    <span className="text-xs text-[#635848] font-light">
                      Sélection de grands crus orchestrée par notre Cheffe Sommelière
                    </span>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={includeWinePairing}
                  onChange={(e) => setIncludeWinePairing(e.target.checked)}
                  className="w-5 h-5 accent-[#9B7516] rounded cursor-pointer"
                />
              </div>

              {/* Personalization Inputs */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                    Nom et Prénom du Destinataire *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="ex : Madame et Monsieur Jean de La Roche"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                    Votre Message Personnalisé
                  </label>
                  <textarea
                    rows={2}
                    value={personalMessage}
                    onChange={(e) => setPersonalMessage(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#FDFCFB] border border-[#D8CCB5] text-xs text-[#1A1918] rounded-xs resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                      Votre Nom (Acheteur) *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="ex : Marie Dujardin"
                      value={purchaserName}
                      onChange={(e) => setPurchaserName(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                      Votre Adresse Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="votre.email@domaine.com"
                      value={purchaserEmail}
                      onChange={(e) => setPurchaserEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                    />
                  </div>
                </div>
              </div>

              {/* Price breakdown & Order CTA */}
              <div className="pt-6 border-t border-[#E8DFC8] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-[#7A6F5C] uppercase tracking-wider block">
                    Montant total du coffret
                  </span>
                  <span className="font-serif text-3xl text-[#1A1918] font-normal">
                    {totalPrice} €
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#1A1918] hover:bg-[#9B7516] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium px-8 py-3.5 rounded-sm transition-colors cursor-pointer shadow-md"
                >
                  <Gift className="w-4 h-4 text-[#E6CB7E]" />
                  <span>Générer le Coffret Cadeau</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
