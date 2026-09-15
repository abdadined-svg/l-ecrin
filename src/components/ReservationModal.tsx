import { useState, useEffect, FormEvent } from 'react';
import { Reservation } from '../types';
import { storageService } from '../services/storage';
import { TASTING_MENUS, RESTAURANT_INFO } from '../data/restaurantData';
import { Calendar as CalendarIcon, Clock, Users, Utensils, CheckCircle, AlertCircle, X, ArrowRight, ArrowLeft, Printer, Search } from 'lucide-react';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedMenu?: string;
  preselectedSpace?: string;
  mode?: 'new' | 'lookup';
}

export default function ReservationModal({
  isOpen,
  onClose,
  preselectedMenu,
  preselectedSpace,
  mode = 'new'
}: ReservationModalProps) {
  const [activeMode, setActiveMode] = useState<'new' | 'lookup'>(mode);
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [guests, setGuests] = useState<number>(2);
  const [service, setService] = useState<'dejeuner' | 'diner'>('diner');
  
  // Calculate default valid date (tomorrow or next open day)
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    // If Sunday (0) or Monday (1), jump to Tuesday (2)
    if (d.getDay() === 0) d.setDate(d.getDate() + 2);
    if (d.getDay() === 1) d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState<string>(getTomorrowDate());
  const [time, setTime] = useState<string>('20:00');
  const [menuChoice, setMenuChoice] = useState<string>(preselectedMenu || TASTING_MENUS[1].name);
  const [winePairing, setWinePairing] = useState<boolean>(true);
  const [tablePreference, setTablePreference] = useState<'salle' | 'jardin' | 'table_chef' | 'indifférent'>('indifférent');
  const [occasion, setOccasion] = useState<string>('');
  const [allergies, setAllergies] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');
  
  // Guest contacts
  const [civility, setCivility] = useState<'M.' | 'Mme' | 'Autre'>('M.');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  // Confirmation state
  const [confirmedReservation, setConfirmedReservation] = useState<Reservation | null>(null);

  // Lookup state
  const [lookupQuery, setLookupQuery] = useState<string>('');
  const [lookupResults, setLookupResults] = useState<Reservation[]>([]);
  const [lookupSearched, setLookupSearched] = useState<boolean>(false);

  useEffect(() => {
    if (preselectedMenu) {
      setMenuChoice(preselectedMenu);
    }
  }, [preselectedMenu]);

  useEffect(() => {
    if (preselectedSpace) {
      if (preselectedSpace.toLowerCase().includes('jardin') || preselectedSpace.toLowerCase().includes('verrière')) {
        setTablePreference('jardin');
      } else if (preselectedSpace.toLowerCase().includes('table du chef')) {
        setTablePreference('table_chef');
      } else {
        setTablePreference('salle');
      }
    }
  }, [preselectedSpace]);

  useEffect(() => {
    setActiveMode(mode);
  }, [mode]);

  if (!isOpen) return null;

  const lunchTimeSlots = ['12:15', '12:30', '13:00', '13:15'];
  const dinnerTimeSlots = ['19:45', '20:00', '20:30', '21:00'];

  const availableTimeSlots = service === 'dejeuner' ? lunchTimeSlots : dinnerTimeSlots;

  const handleNextStep = () => {
    // Basic validation
    if (step === 1) {
      const selectedDay = new Date(date).getDay();
      if (selectedDay === 0 || selectedDay === 1) {
        alert("L'Écrin est fermé le dimanche et le lundi. Veuillez sélectionner un jour du mardi au samedi.");
        return;
      }
    }
    if (step === 3 && (!firstName || !lastName || !email || !phone)) {
      alert("Veuillez renseigner vos coordonnées complètes afin de garantir votre réservation.");
      return;
    }
    setStep((prev) => Math.min(prev + 1, 4) as any);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1) as any);
  };

  const handleSubmitReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!firstName || !lastName || !email || !phone) {
      alert("Veuillez renseigner vos coordonnées complètes.");
      return;
    }

    const saved = storageService.saveReservation({
      date,
      time,
      service,
      guests,
      menuChoice,
      civility,
      firstName,
      lastName,
      email,
      phone,
      occasion,
      dietaryRestrictions: allergies,
      specialRequests,
      winePairingRequested: winePairing,
      tablePreference,
    });

    setConfirmedReservation(saved);
  };

  const handleLookup = () => {
    const all = storageService.getReservations();
    const query = lookupQuery.trim().toLowerCase();
    if (!query) {
      setLookupResults([]);
      setLookupSearched(true);
      return;
    }

    const results = all.filter(r => 
      r.confirmationCode.toLowerCase().includes(query) ||
      r.email.toLowerCase().includes(query) ||
      r.lastName.toLowerCase().includes(query)
    );

    setLookupResults(results);
    setLookupSearched(true);
  };

  const handleCancelReservation = (id: string) => {
    if (confirm("Êtes-vous certain de vouloir annuler cette réservation auprès de L'Écrin ?")) {
      storageService.updateReservationStatus(id, 'annulée');
      handleLookup();
    }
  };

  const handleResetForm = () => {
    setConfirmedReservation(null);
    setStep(1);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1A1918]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="reservation-modal-container"
        className="bg-[#FAF8F5] border border-[#DFD5C0] w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-xs shadow-2xl relative flex flex-col"
      >
        {/* Modal Top Bar */}
        <div className="p-6 sm:p-8 border-b border-[#E8DFC8] flex items-center justify-between sticky top-0 bg-[#FAF8F5]/98 backdrop-blur-md z-20">
          <div>
            <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#9B7516] font-medium block">
              Maison L'Écrin • 14 Place Vendôme
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1A1918] font-normal">
              {activeMode === 'new' ? 'Réserver une Table' : 'Consulter ma Réservation'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex border border-[#DFD5C0] rounded-xs p-0.5 bg-[#F2EDE1]">
              <button
                onClick={() => { setActiveMode('new'); setConfirmedReservation(null); }}
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-xs cursor-pointer ${
                  activeMode === 'new' ? 'bg-[#1A1918] text-[#FAF8F5]' : 'text-[#63594A]'
                }`}
              >
                Nouvelle
              </button>
              <button
                onClick={() => setActiveMode('lookup')}
                className={`px-3 py-1 text-xs uppercase tracking-wider rounded-xs cursor-pointer ${
                  activeMode === 'lookup' ? 'bg-[#1A1918] text-[#FAF8F5]' : 'text-[#63594A]'
                }`}
              >
                Rechercher
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-[#7A6F5C] hover:text-[#1A1918] cursor-pointer"
              aria-label="Fermer la fenêtre"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-10 flex-1">
          
          {/* LOOKUP MODE */}
          {activeMode === 'lookup' && (
            <div className="space-y-8 max-w-xl mx-auto py-4">
              <div className="text-center space-y-2">
                <p className="text-xs sm:text-sm text-[#5A5144] font-light">
                  Renseignez votre référence de réservation (ex : <span className="font-mono text-[#1A1918] font-medium">ECRIN-9821</span>) ou votre adresse email pour accéder aux détails de votre table.
                </p>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Code de réservation ou email..."
                  value={lookupQuery}
                  onChange={(e) => setLookupQuery(e.target.value)}
                  className="flex-1 px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                />
                <button
                  onClick={handleLookup}
                  className="px-6 py-3 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-widest hover:bg-[#9B7516] transition-colors rounded-xs cursor-pointer flex items-center gap-2"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Chercher</span>
                </button>
              </div>

              {lookupSearched && (
                <div className="space-y-4 pt-4 border-t border-[#E8DFC8]">
                  {lookupResults.length === 0 ? (
                    <div className="p-6 text-center bg-[#F8F4EC] rounded-xs text-xs text-[#7A6F5C]">
                      Aucune réservation trouvée pour cette recherche.
                    </div>
                  ) : (
                    lookupResults.map((res) => (
                      <div key={res.id} className="p-6 bg-[#FDFCFB] border border-[#E8DFC8] rounded-xs space-y-4">
                        <div className="flex items-center justify-between border-b border-[#F0EBE0] pb-3">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-[#9B7516] font-medium block">
                              Code : {res.confirmationCode}
                            </span>
                            <h4 className="font-serif text-lg text-[#1A1918]">
                              {res.civility} {res.firstName} {res.lastName}
                            </h4>
                          </div>

                          <span className={`px-3 py-1 rounded-full text-xs font-serif ${
                            res.status === 'confirmée' ? 'bg-[#EBF3E8] text-[#34592B] border border-[#C6DFC0]' :
                            res.status === 'annulée' ? 'bg-[#FBEBEB] text-[#8C2C2C] border border-[#ECC0C0]' :
                            'bg-[#F5F0E6] text-[#8C764D]'
                          }`}>
                            {res.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs text-[#524B40]">
                          <div>
                            <span className="text-[#8C764D] block">Date & Heure :</span>
                            <span className="font-medium text-[#1A1918]">{res.date} à {res.time} ({res.service === 'dejeuner' ? 'Déjeuner' : 'Dîner'})</span>
                          </div>
                          <div>
                            <span className="text-[#8C764D] block">Convives :</span>
                            <span className="font-medium text-[#1A1918]">{res.guests} personnes</span>
                          </div>
                          <div className="col-span-2">
                            <span className="text-[#8C764D] block">Menu & Expérience :</span>
                            <span className="font-medium text-[#1A1918]">{res.menuChoice} {res.winePairingRequested && '(avec accord vins)'}</span>
                          </div>
                          {res.dietaryRestrictions && (
                            <div className="col-span-2">
                              <span className="text-[#8C764D] block">Allergies notées :</span>
                              <span>{res.dietaryRestrictions}</span>
                            </div>
                          )}
                        </div>

                        {res.status !== 'annulée' && (
                          <div className="pt-3 border-t border-[#F0EBE0] flex justify-end">
                            <button
                              onClick={() => handleCancelReservation(res.id)}
                              className="text-xs text-[#993333] hover:text-[#771111] underline cursor-pointer"
                            >
                              Annuler cette réservation
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          )}

          {/* NEW RESERVATION MODE */}
          {activeMode === 'new' && (
            <>
              {/* SUCCESS / CONFIRMATION SCREEN */}
              {confirmedReservation ? (
                <div className="space-y-8 text-center max-w-lg mx-auto py-6 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 bg-[#F5F0E6] border border-[#B8860B] rounded-full flex items-center justify-center mx-auto text-[#9B7516]">
                    <CheckCircle className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs uppercase tracking-[0.3em] text-[#9B7516] font-medium block">
                      Réservation Confirmée
                    </span>
                    <h3 className="font-serif text-3xl text-[#1A1918]">
                      Nous aurons le plaisir de vous accueillir
                    </h3>
                    <p className="text-xs text-[#635848] font-light">
                      Un email de confirmation récapitulatif a été simulé et enregistré.
                    </p>
                  </div>

                  {/* Confirmation Ticket Card */}
                  <div className="p-6 bg-[#FDFCFB] border border-[#DFCFA7] rounded-xs text-left space-y-4 shadow-sm relative">
                    <div className="border-b border-[#EFE8D8] pb-4 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase tracking-widest text-[#7A6F5C]">
                          Référence de table
                        </span>
                        <p className="font-mono text-xl font-medium text-[#1A1918]">
                          {confirmedReservation.confirmationCode}
                        </p>
                      </div>
                      <span className="text-xs font-serif text-[#9B7516] tracking-widest">
                        ★★★ MICHELIN
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-xs text-[#4F473D]">
                      <div>
                        <span className="text-[#8C764D] block text-[11px]">Convive :</span>
                        <p className="font-medium text-[#1A1918]">{confirmedReservation.civility} {confirmedReservation.firstName} {confirmedReservation.lastName}</p>
                      </div>
                      <div>
                        <span className="text-[#8C764D] block text-[11px]">Date & Heure :</span>
                        <p className="font-medium text-[#1A1918]">{confirmedReservation.date} à {confirmedReservation.time}</p>
                      </div>
                      <div>
                        <span className="text-[#8C764D] block text-[11px]">Couvert(s) :</span>
                        <p className="font-medium text-[#1A1918]">{confirmedReservation.guests} personnes</p>
                      </div>
                      <div>
                        <span className="text-[#8C764D] block text-[11px]">Table préférée :</span>
                        <p className="font-medium text-[#1A1918] capitalize">{confirmedReservation.tablePreference || 'Indifférent'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#8C764D] block text-[11px]">Expérience choisie :</span>
                        <p className="font-medium text-[#1A1918]">{confirmedReservation.menuChoice}</p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-[#EFE8D8] text-[11px] text-[#7A6F5C] italic">
                      Tenue soignée exigée. Notre voiturier vous accueillera dès votre arrivée Place Vendôme.
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-2 px-6 py-3 border border-[#D5C6A8] text-[#1A1918] text-xs uppercase tracking-wider hover:bg-[#F2ECE1] transition-colors rounded-xs cursor-pointer"
                    >
                      <Printer className="w-4 h-4 text-[#8C764D]" />
                      <span>Imprimer le Billet</span>
                    </button>

                    <button
                      onClick={onClose}
                      className="px-8 py-3 bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-widest hover:bg-[#9B7516] transition-colors rounded-xs cursor-pointer"
                    >
                      Terminer
                    </button>
                  </div>
                </div>
              ) : (
                /* MULTI-STEP BOOKING FLOW */
                <div>
                  {/* Step indicator */}
                  <div className="flex items-center justify-between max-w-md mx-auto mb-8 border-b border-[#E8DFC8] pb-4">
                    {[
                      { num: 1, title: 'Date & Heure' },
                      { num: 2, title: 'Expérience' },
                      { num: 3, title: 'Coordonnées' },
                      { num: 4, title: 'Vérification' },
                    ].map((s) => (
                      <div key={s.num} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-serif ${
                          step === s.num
                            ? 'bg-[#1A1918] text-[#FAF8F5]'
                            : step > s.num
                            ? 'bg-[#B8860B] text-[#FAF8F5]'
                            : 'bg-[#EAE2D2] text-[#63594A]'
                        }`}>
                          {s.num}
                        </div>
                        <span className={`text-[11px] uppercase tracking-wider hidden sm:inline ${
                          step === s.num ? 'font-medium text-[#1A1918]' : 'text-[#7A6F5C]'
                        }`}>
                          {s.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSubmitReservation} className="space-y-6">
                    
                    {/* STEP 1: DATE, GUESTS & TIME */}
                    {step === 1 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        
                        {/* Guests selection */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                            Nombre de Couverts
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                              <button
                                type="button"
                                key={num}
                                onClick={() => setGuests(num)}
                                className={`py-3 text-center border font-serif text-sm transition-all rounded-xs cursor-pointer ${
                                  guests === num
                                    ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                                    : 'bg-[#FDFCFB] border-[#D8CCB5] text-[#3D372F] hover:bg-[#F2ECE1]'
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                          {guests >= 6 && (
                            <p className="text-[11px] text-[#8C764D] mt-2 italic">
                              Pour les tables de 6 convives et plus, un menu identique sera servi pour l'harmonie du service.
                            </p>
                          )}
                        </div>

                        {/* Service (Lunch / Dinner) */}
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            type="button"
                            onClick={() => { setService('dejeuner'); setTime('12:30'); }}
                            className={`p-4 border text-left rounded-xs transition-all cursor-pointer ${
                              service === 'dejeuner'
                                ? 'bg-[#F5F0E6] border-[#B8860B] ring-1 ring-[#B8860B]'
                                : 'bg-[#FDFCFB] border-[#D8CCB5] text-[#3D372F]'
                            }`}
                          >
                            <span className="text-[10px] uppercase tracking-widest text-[#9B7516] font-medium block">
                              Service de Midi
                            </span>
                            <span className="font-serif text-lg text-[#1A1918] block">
                              Déjeuner d'Affaires & Éveil
                            </span>
                            <span className="text-xs text-[#7A6F5C]">12h15 – 14h00</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => { setService('diner'); setTime('20:00'); }}
                            className={`p-4 border text-left rounded-xs transition-all cursor-pointer ${
                              service === 'diner'
                                ? 'bg-[#F5F0E6] border-[#B8860B] ring-1 ring-[#B8860B]'
                                : 'bg-[#FDFCFB] border-[#D8CCB5] text-[#3D372F]'
                            }`}
                          >
                            <span className="text-[10px] uppercase tracking-widest text-[#9B7516] font-medium block">
                              Service du Soir
                            </span>
                            <span className="font-serif text-lg text-[#1A1918] block">
                              Dîner Gastronomique
                            </span>
                            <span className="text-xs text-[#7A6F5C]">19h45 – 22h00</span>
                          </button>
                        </div>

                        {/* Date selection */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Date de Réservation
                            </label>
                            <input
                              type="date"
                              min={getTomorrowDate()}
                              value={date}
                              onChange={(e) => setDate(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                              required
                            />
                            <span className="text-[10px] text-[#7A6F5C] mt-1 block italic">
                              Fermé dimanche & lundi
                            </span>
                          </div>

                          {/* Time selection */}
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Créneau d'Arrivée
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                              {availableTimeSlots.map((slot) => (
                                <button
                                  type="button"
                                  key={slot}
                                  onClick={() => setTime(slot)}
                                  className={`py-2.5 px-3 border text-center text-xs font-medium rounded-xs transition-all cursor-pointer ${
                                    time === slot
                                      ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                                      : 'bg-[#FDFCFB] border-[#D8CCB5] text-[#4F473D] hover:bg-[#F2ECE1]'
                                  }`}
                                >
                                  {slot}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                      </div>
                    )}

                    {/* STEP 2: EXPERIENCE & MENU CHOICE */}
                    {step === 2 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-3">
                            Expérience Gastronomique
                          </label>
                          <div className="space-y-3">
                            {TASTING_MENUS.map((m) => (
                              <div
                                key={m.id}
                                onClick={() => setMenuChoice(m.name)}
                                className={`p-4 border rounded-xs cursor-pointer flex items-center justify-between transition-all ${
                                  menuChoice === m.name
                                    ? 'bg-[#F5F0E6] border-[#B8860B] ring-1 ring-[#B8860B]'
                                    : 'bg-[#FDFCFB] border-[#D8CCB5] hover:bg-[#F2ECE1]'
                                }`}
                              >
                                <div>
                                  <span className="font-serif text-base text-[#1A1918] block font-medium">
                                    {m.name} ({m.coursesCount} temps)
                                  </span>
                                  <span className="text-xs text-[#635848] font-light">
                                    {m.subtitle}
                                  </span>
                                </div>
                                <span className="font-serif text-lg text-[#1A1918] shrink-0 pl-4">
                                  {m.price} €
                                </span>
                              </div>
                            ))}

                            <div
                              onClick={() => setMenuChoice("Choix à la carte le jour même")}
                              className={`p-4 border rounded-xs cursor-pointer flex items-center justify-between transition-all ${
                                menuChoice.includes("à la carte")
                                  ? 'bg-[#F5F0E6] border-[#B8860B] ring-1 ring-[#B8860B]'
                                  : 'bg-[#FDFCFB] border-[#D8CCB5] hover:bg-[#F2ECE1]'
                              }`}
                            >
                              <div>
                                <span className="font-serif text-base text-[#1A1918] block font-medium">
                                  Choix À la Carte
                                </span>
                                <span className="text-xs text-[#635848] font-light">
                                  Sélection libre d'entrées, plats et desserts lors de votre venue
                                </span>
                              </div>
                              <span className="text-xs text-[#7A6F5C] uppercase tracking-wider">
                                Selon choix
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Wine Pairing Checkbox */}
                        <div className="p-4 bg-[#F8F4EC] border border-[#DFCFA7] rounded-xs flex items-center justify-between">
                          <div>
                            <span className="font-serif text-sm text-[#1A1918] block font-medium">
                              Accords Mets & Vins par la Cheffe Sommelière
                            </span>
                            <span className="text-xs text-[#635848] font-light">
                              Flacons d'exception sélectionnés pour chaque plat du menu
                            </span>
                          </div>
                          <input
                            type="checkbox"
                            checked={winePairing}
                            onChange={(e) => setWinePairing(e.target.checked)}
                            className="w-5 h-5 accent-[#9B7516] rounded cursor-pointer"
                          />
                        </div>

                        {/* Table Preference */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                            Atmosphère Souhaitée
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'salle', label: 'Grand Salon Cristal' },
                              { id: 'jardin', label: 'Verrière & Jardin' },
                              { id: 'table_chef', label: 'Table du Chef' },
                              { id: 'indifférent', label: 'Indifférent' },
                            ].map((pref) => (
                              <button
                                type="button"
                                key={pref.id}
                                onClick={() => setTablePreference(pref.id as any)}
                                className={`p-2.5 text-center text-xs font-serif rounded-xs border transition-all cursor-pointer ${
                                  tablePreference === pref.id
                                    ? 'bg-[#1A1918] text-[#FAF8F5] border-[#1A1918]'
                                    : 'bg-[#FDFCFB] border-[#D8CCB5] text-[#4F473D]'
                                }`}
                              >
                                {pref.label}
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>
                    )}

                    {/* STEP 3: CONTACT & SPECIAL REQUESTS */}
                    {step === 3 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        
                        {/* Civility, First Name, Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                          <div className="sm:col-span-3">
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Civilité
                            </label>
                            <select
                              value={civility}
                              onChange={(e) => setCivility(e.target.value as any)}
                              className="w-full px-3 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs"
                            >
                              <option value="M.">M.</option>
                              <option value="Mme">Mme</option>
                              <option value="Autre">Autre</option>
                            </select>
                          </div>

                          <div className="sm:col-span-4">
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Prénom *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="ex: Alexandre"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                            />
                          </div>

                          <div className="sm:col-span-5">
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Nom de Famille *
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="ex: de Saint-Germain"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                            />
                          </div>
                        </div>

                        {/* Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Adresse Email *
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="votre.email@domaine.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                            />
                          </div>

                          <div>
                            <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                              Téléphone Portable *
                            </label>
                            <input
                              type="tel"
                              required
                              placeholder="+33 6 12 34 56 78"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="w-full px-4 py-3 bg-[#FDFCFB] border border-[#D8CCB5] text-sm text-[#1A1918] rounded-xs focus:outline-none focus:border-[#9B7516]"
                            />
                          </div>
                        </div>

                        {/* Occasion */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                            Occasion Particulière
                          </label>
                          <input
                            type="text"
                            placeholder="ex : Anniversaire, Dîner romantique, Fiançailles, Rendez-vous d'affaires..."
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#FDFCFB] border border-[#D8CCB5] text-xs text-[#1A1918] rounded-xs"
                          />
                        </div>

                        {/* Allergies & Dietary */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                            Allergies ou Régimes Alimentaires
                          </label>
                          <input
                            type="text"
                            placeholder="ex : Sans gluten, aucun fruit de mer, végétarien..."
                            value={allergies}
                            onChange={(e) => setAllergies(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#FDFCFB] border border-[#D8CCB5] text-xs text-[#1A1918] rounded-xs"
                          />
                        </div>

                        {/* Special requests to maitre d */}
                        <div>
                          <label className="block text-xs uppercase tracking-widest text-[#8C764D] font-medium mb-2">
                            Note Personnelle pour le Maître d'Hôtel
                          </label>
                          <textarea
                            rows={2}
                            placeholder="Toute attention particulière souhaitée pour votre venue..."
                            value={specialRequests}
                            onChange={(e) => setSpecialRequests(e.target.value)}
                            className="w-full px-4 py-2.5 bg-[#FDFCFB] border border-[#D8CCB5] text-xs text-[#1A1918] rounded-xs resize-none"
                          />
                        </div>

                      </div>
                    )}

                    {/* STEP 4: RECAPITULATIF & VALIDATION */}
                    {step === 4 && (
                      <div className="space-y-6 animate-in fade-in duration-200">
                        <div className="text-center space-y-2">
                          <span className="text-xs uppercase tracking-[0.25em] text-[#9B7516] font-medium block">
                            Dernière Étape
                          </span>
                          <h3 className="font-serif text-2xl text-[#1A1918]">
                            Vérification de votre Table
                          </h3>
                        </div>

                        <div className="p-6 bg-[#FDFCFB] border border-[#DFCFA7] rounded-xs space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Convive</span>
                              <span className="font-medium text-sm text-[#1A1918]">{civility} {firstName} {lastName}</span>
                            </div>
                            <div>
                              <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Contact</span>
                              <span className="font-medium text-xs text-[#1A1918]">{phone} • {email}</span>
                            </div>
                            <div>
                              <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Date & Service</span>
                              <span className="font-medium text-sm text-[#1A1918]">{date} à {time}</span>
                            </div>
                            <div>
                              <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Couverts</span>
                              <span className="font-medium text-sm text-[#1A1918]">{guests} personne(s)</span>
                            </div>
                            <div className="col-span-2 pt-2 border-t border-[#F0EBE0]">
                              <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Expérience choisie</span>
                              <span className="font-medium text-sm text-[#1A1918]">{menuChoice}</span>
                              {winePairing && (
                                <span className="text-xs text-[#9B7516] block font-serif italic">
                                  + Accords Mets & Vins demandés
                                </span>
                              )}
                            </div>
                            {allergies && (
                              <div className="col-span-2">
                                <span className="text-[#8C764D] block uppercase tracking-wider text-[10px]">Allergies déclarées</span>
                                <span className="text-xs text-[#1A1918]">{allergies}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="p-4 bg-[#F8F4EC] border border-[#E0D4BA] rounded-xs text-[11px] text-[#615647] leading-relaxed">
                          En confirmant votre réservation, vous certifiez l'exactitude de vos coordonnées. Notre équipe de réception vous accueillera personnellement au 14 Place Vendôme.
                        </div>
                      </div>
                    )}

                    {/* Step navigation buttons */}
                    <div className="pt-6 border-t border-[#E8DFC8] flex items-center justify-between">
                      {step > 1 ? (
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#D5C6A8] text-xs uppercase tracking-wider text-[#4F473D] hover:bg-[#F2ECE1] transition-colors rounded-xs cursor-pointer"
                        >
                          <ArrowLeft className="w-3.5 h-3.5" />
                          <span>Précédent</span>
                        </button>
                      ) : (
                        <div></div>
                      )}

                      {step < 4 ? (
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="inline-flex items-center gap-2 px-7 py-3 bg-[#1A1918] hover:bg-[#9B7516] text-[#FAF8F5] text-xs uppercase tracking-[0.2em] font-medium transition-colors rounded-xs cursor-pointer"
                        >
                          <span>Suivant</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#E6CB7E]" />
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#9B7516] hover:bg-[#1A1918] text-[#FAF8F5] text-xs uppercase tracking-[0.22em] font-medium transition-colors rounded-xs shadow-md cursor-pointer"
                        >
                          <CheckCircle className="w-4 h-4 text-[#FAF8F5]" />
                          <span>Confirmer ma Table</span>
                        </button>
                      )}
                    </div>

                  </form>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
}
