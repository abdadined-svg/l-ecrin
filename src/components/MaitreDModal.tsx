import { useState, useEffect, FormEvent } from 'react';
import { Reservation, GiftVoucher } from '../types';
import { storageService } from '../services/storage';
import { 
  Users, Calendar, Search, CheckCircle, Clock, AlertTriangle, X, Plus, 
  Filter, Wine, Lock, Unlock, Printer, Sparkles, UtensilsCrossed, Phone, 
  Mail, Edit3, Trash2, Gift, Check, ChevronRight, Compass, Shield, Award
} from 'lucide-react';
import { DINING_SPACES, TASTING_MENUS } from '../data/restaurantData';

interface MaitreDModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Fixed tables configuration for the 3-star dining room
const RESTAURANT_TABLES = [
  { id: 'T1', name: 'Table 1', space: 'Grand Salon Cristal', capacity: 2, pos: 'Côté Mur Cristal' },
  { id: 'T2', name: 'Table 2', space: 'Grand Salon Cristal', capacity: 4, pos: 'Centre Salon' },
  { id: 'T3', name: 'Table 3', space: 'Grand Salon Cristal', capacity: 2, pos: 'Vue Fenêtre Place Vendôme' },
  { id: 'T4', name: 'Table 4', space: 'Grand Salon Cristal', capacity: 6, pos: 'Table Ronde d\'Apparat' },
  { id: 'T5', name: 'Table du Chef', space: 'La Table du Chef', capacity: 6, pos: 'Face au Piano de Cuisson' },
  { id: 'T6', name: 'Table 6', space: 'La Verrière d\'Hiver', capacity: 2, pos: 'Sous la Verrière Romantique' },
  { id: 'T7', name: 'Table 7', space: 'La Verrière d\'Hiver', capacity: 4, pos: 'Jardin Intérieur' },
  { id: 'T8', name: 'Table Sommelier', space: 'Le Salon Sommelier', capacity: 8, pos: 'Cave Voûtée & Flacons Rares' },
];

export default function MaitreDModal({ isOpen, onClose }: MaitreDModalProps) {
  // Authentication state (default PIN: 1728)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [pinInput, setPinInput] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'cahier' | 'plan' | 'briefing' | 'cadeaux' | 'nouvelle'>('cahier');

  // Data states
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [vouchers, setVouchers] = useState<GiftVoucher[]>([]);

  // Filters for Cahier
  const [filterDate, setFilterDate] = useState<'today' | 'tomorrow' | 'all'>('all');
  const [filterService, setFilterService] = useState<'all' | 'dejeuner' | 'diner'>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected reservation for detailed inspector
  const [selectedRes, setSelectedRes] = useState<Reservation | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [editingTable, setEditingTable] = useState<string>('');

  // New reservation form state
  const [newRes, setNewRes] = useState({
    civility: 'M.' as const,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '20:00',
    service: 'diner' as 'dejeuner' | 'diner',
    guests: 2,
    menuChoice: TASTING_MENUS[1].name,
    winePairingRequested: true,
    tablePreference: 'salle' as any,
    tableNumber: 'T1',
    occasion: 'Dîner Gastronomique',
    dietaryRestrictions: '',
    specialRequests: '',
    maitreDNotes: '',
  });

  const refreshData = () => {
    setReservations(storageService.getReservations());
    setVouchers(storageService.getVouchers());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle PIN authentication
  const handlePinSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (pinInput === '1728' || pinInput.trim() === '') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Code PIN incorrect (Code par défaut de brigade : 1728)');
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  // Filtering reservations
  const filteredReservations = reservations.filter((r) => {
    if (filterDate === 'today' && r.date !== todayStr) return false;
    if (filterDate === 'tomorrow' && r.date !== tomorrowStr) return false;
    if (filterService !== 'all' && r.service !== filterService) return false;
    if (filterStatus !== 'all' && r.status !== filterStatus) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = r.lastName.toLowerCase().includes(q) ||
                    r.firstName.toLowerCase().includes(q) ||
                    r.confirmationCode.toLowerCase().includes(q) ||
                    (r.phone && r.phone.includes(q));
      if (!match) return false;
    }
    return true;
  });

  // KPI Calculations
  const activeBookings = filteredReservations.filter(r => r.status !== 'annulée');
  const totalCovers = activeBookings.reduce((sum, r) => sum + r.guests, 0);
  const winePairingsCount = activeBookings.filter(r => r.winePairingRequested).length;
  const allergiesCount = activeBookings.filter(r => r.dietaryRestrictions && r.dietaryRestrictions.trim() !== '').length;

  // Estimated Revenue Calculation
  const estimatedRevenue = activeBookings.reduce((total, r) => {
    const menu = TASTING_MENUS.find(m => m.name === r.menuChoice) || TASTING_MENUS[1];
    let resPrice = menu.price * r.guests;
    if (r.winePairingRequested) {
      resPrice += menu.winePairingPrice * r.guests;
    }
    return total + resPrice;
  }, 0);

  const handleStatusChange = (id: string, newStatus: Reservation['status']) => {
    storageService.updateReservationStatus(id, newStatus);
    refreshData();
    if (selectedRes && selectedRes.id === id) {
      setSelectedRes({ ...selectedRes, status: newStatus });
    }
  };

  const handleSaveInspectorChanges = () => {
    if (!selectedRes) return;
    storageService.updateReservation(selectedRes.id, {
      tableNumber: editingTable,
      maitreDNotes: editingNotes,
    });
    refreshData();
    setSelectedRes({
      ...selectedRes,
      tableNumber: editingTable,
      maitreDNotes: editingNotes,
    });
  };

  const handleVoucherStatusToggle = (id: string, currentStatus: GiftVoucher['status']) => {
    const nextStatus = currentStatus === 'valide' ? 'utilisé' : 'valide';
    storageService.updateVoucherStatus(id, nextStatus);
    refreshData();
  };

  const handleCreateNewReservation = (e: FormEvent) => {
    e.preventDefault();
    if (!newRes.lastName) return;

    storageService.saveReservation({
      date: newRes.date,
      time: newRes.time,
      service: newRes.service,
      guests: Number(newRes.guests),
      menuChoice: newRes.menuChoice,
      civility: newRes.civility,
      firstName: newRes.firstName || 'Client',
      lastName: newRes.lastName,
      email: newRes.email || 'conciergerie@lecrin-paris.com',
      phone: newRes.phone || '+33 1 42 68 80 00',
      occasion: newRes.occasion,
      dietaryRestrictions: newRes.dietaryRestrictions,
      specialRequests: newRes.specialRequests,
      winePairingRequested: newRes.winePairingRequested,
      tablePreference: newRes.tablePreference,
      tableNumber: newRes.tableNumber,
      maitreDNotes: newRes.maitreDNotes,
    });

    refreshData();
    setActiveTab('cahier');
    setNewRes({
      ...newRes,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dietaryRestrictions: '',
      specialRequests: '',
      maitreDNotes: '',
    });
  };

  const printBriefing = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#181615]/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#FAF7F2] border border-[#DFCFA7] w-full max-w-6xl max-h-[94vh] overflow-hidden rounded-xs shadow-2xl relative flex flex-col text-[#181615]">
        
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#E5DAC8] bg-[#FAF7F2] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#181615] text-[#C9A86A] flex items-center justify-center font-serif text-lg font-bold border border-[#C9A86A]/40 shadow-xs">
              É
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-bold">
                  Direction de Salle & Brigade
                </span>
                <span className="text-xs text-[#C9A86A]">★★★</span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl text-[#181615] tracking-wide">
                Console du Maître d'Hôtel & Direction
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAuthenticated(!isAuthenticated)}
              title={isAuthenticated ? 'Verrouiller la console' : 'Déverrouiller'}
              className="p-2 text-[#7A6F5C] hover:text-[#181615] hover:bg-[#EFE7D8] rounded-xs transition-colors cursor-pointer"
            >
              {isAuthenticated ? <Unlock className="w-4 h-4 text-[#8E6D38]" /> : <Lock className="w-4 h-4" />}
            </button>

            <button
              onClick={onClose}
              className="p-2 text-[#7A6F5C] hover:text-[#181615] hover:bg-[#EFE7D8] rounded-xs transition-colors cursor-pointer"
              aria-label="Fermer la console"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PIN Security Gate if locked */}
        {!isAuthenticated ? (
          <div className="flex-1 p-8 sm:p-16 flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#181615] border border-[#C9A86A] flex items-center justify-center text-[#C9A86A] shadow-lg">
              <Lock className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-2xl text-[#181615] mb-2">Accès Restreint Brigade</h3>
              <p className="text-xs text-[#7A6F5C] leading-relaxed">
                Veuillez saisir votre code d'accès de service pour accéder au cahier de réservations, à l'attribution des tables et au dossier convives.
              </p>
            </div>

            <form onSubmit={handlePinSubmit} className="w-full space-y-4">
              <input
                type="password"
                maxLength={6}
                placeholder="Code PIN (1728)"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                className="w-full text-center text-xl tracking-[0.5em] py-3 bg-[#FFFDF9] border border-[#D5C7B0] text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                autoFocus
              />
              {pinError && <p className="text-xs text-[#A33] font-medium">{pinError}</p>}
              
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs transition-colors cursor-pointer"
                >
                  Déverrouiller
                </button>
                <button
                  type="button"
                  onClick={() => setIsAuthenticated(true)}
                  className="px-4 py-3 border border-[#C9A86A] text-[#8E6D38] hover:bg-[#F2EDE1] text-xs uppercase tracking-wider rounded-xs cursor-pointer"
                >
                  Accès Rapide
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {/* KPI Performance Bar */}
            <div className="px-4 sm:px-6 py-3 bg-[#F4EFE6] border-b border-[#E5DAC8] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-xs border border-[#DFCFA7] text-[#8E6D38]">
                  <Users className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Couverts Prévus</span>
                  <span className="font-serif text-base font-bold text-[#181615]">{totalCovers} convives</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-xs border border-[#DFCFA7] text-[#8E6D38]">
                  <Wine className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Accords Sommellerie</span>
                  <span className="font-serif text-base font-bold text-[#181615]">{winePairingsCount} tables</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-xs border border-[#DFCFA7] text-[#A33]">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Alertes Allergènes</span>
                  <span className="font-serif text-base font-bold text-[#A33]">{allergiesCount} signalements</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#FAF7F2] rounded-xs border border-[#DFCFA7] text-[#34592B]">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">CA Estimé Service</span>
                  <span className="font-serif text-base font-bold text-[#181615]">{estimatedRevenue.toLocaleString('fr-FR')} €</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="px-4 sm:px-6 border-b border-[#E5DAC8] bg-[#FAF7F2] flex items-center justify-between overflow-x-auto shrink-0">
              <div className="flex items-center gap-1 sm:gap-2">
                {[
                  { id: 'cahier', label: 'Cahier de Salle', icon: Calendar },
                  { id: 'plan', label: 'Plan des Tables', icon: Compass },
                  { id: 'briefing', label: 'Briefing Cuisine', icon: UtensilsCrossed },
                  { id: 'cadeaux', label: 'Bons Cadeaux', icon: Gift },
                  { id: 'nouvelle', label: '+ Prise Téléphonique VIP', icon: Plus },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`inline-flex items-center gap-2 py-3 px-3 sm:px-4 text-xs font-sans uppercase tracking-wider border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                        isActive
                          ? 'border-[#8E6D38] text-[#181615] font-bold bg-[#F4EFE6]/60'
                          : 'border-transparent text-[#7A6F5C] hover:text-[#181615] hover:bg-[#F8F4EC]'
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#8E6D38]' : 'text-[#7A6F5C]'}`} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {activeTab === 'briefing' && (
                <button
                  onClick={printBriefing}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-[11px] uppercase tracking-wider rounded-xs cursor-pointer transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Imprimer la feuille de service</span>
                </button>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#FAF7F2]">
              
              {/* TAB 1: CAHIER DE SALLE */}
              {activeTab === 'cahier' && (
                <div className="space-y-4">
                  {/* Filters Bar */}
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-[#F8F4EC] p-3 border border-[#E5DAC8] rounded-xs">
                    
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#7A6F5C] font-semibold">Date :</span>
                      {[
                        { id: 'all', label: 'Toutes' },
                        { id: 'today', label: "Aujourd'hui" },
                        { id: 'tomorrow', label: 'Demain' },
                      ].map((d) => (
                        <button
                          key={d.id}
                          onClick={() => setFilterDate(d.id as any)}
                          className={`px-2.5 py-1 text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                            filterDate === d.id ? 'bg-[#181615] text-[#FAF7F2] font-semibold' : 'bg-[#FFFDF9] text-[#554C3E] border border-[#D5C7B0]'
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}

                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#7A6F5C] font-semibold ml-2">Service :</span>
                      {[
                        { id: 'all', label: 'Tous' },
                        { id: 'dejeuner', label: 'Midi' },
                        { id: 'diner', label: 'Soir' },
                      ].map((s) => (
                        <button
                          key={s.id}
                          onClick={() => setFilterService(s.id as any)}
                          className={`px-2.5 py-1 text-xs uppercase tracking-wider rounded-xs cursor-pointer transition-colors ${
                            filterService === s.id ? 'bg-[#181615] text-[#FAF7F2] font-semibold' : 'bg-[#FFFDF9] text-[#554C3E] border border-[#D5C7B0]'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}

                      <span className="text-[10px] font-sans uppercase tracking-wider text-[#7A6F5C] font-semibold ml-2">Statut :</span>
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-2 py-1 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs cursor-pointer"
                      >
                        <option value="all">Tous les statuts</option>
                        <option value="confirmée">Confirmée</option>
                        <option value="installée">Installée</option>
                        <option value="honorée">Honorée</option>
                        <option value="annulée">Annulée</option>
                      </select>
                    </div>

                    {/* Search Input */}
                    <div className="w-full md:w-64 relative">
                      <Search className="w-3.5 h-3.5 text-[#7A6F5C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Nom, téléphone, réf..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-8 pr-3 py-1.5 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                      />
                    </div>

                  </div>

                  {/* Table View */}
                  <div className="border border-[#E5DAC8] rounded-xs overflow-hidden bg-[#FFFDF9] shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-[#4F473D]">
                        <thead className="bg-[#F4EFE6] border-b border-[#E5DAC8] text-[10px] uppercase tracking-widest text-[#7A6F5C]">
                          <tr>
                            <th className="p-3 font-semibold">Réf.</th>
                            <th className="p-3 font-semibold">Table</th>
                            <th className="p-3 font-semibold">Convive & Contact</th>
                            <th className="p-3 font-semibold">Service</th>
                            <th className="p-3 font-semibold">Couverts</th>
                            <th className="p-3 font-semibold">Menu & Vins</th>
                            <th className="p-3 font-semibold">Allergies / Particularités</th>
                            <th className="p-3 font-semibold">Statut</th>
                            <th className="p-3 font-semibold text-right">Dossier</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#EFE7D8]">
                          {filteredReservations.length === 0 ? (
                            <tr>
                              <td colSpan={9} className="p-8 text-center text-[#7A6F5C]">
                                Aucune réservation trouvée pour cette sélection.
                              </td>
                            </tr>
                          ) : (
                            filteredReservations.map((r) => (
                              <tr key={r.id} className="hover:bg-[#FAF7F2] transition-colors">
                                <td className="p-3 font-mono text-[#8E6D38] font-bold">
                                  {r.confirmationCode}
                                </td>
                                <td className="p-3">
                                  <span className="inline-block px-2 py-0.5 bg-[#F2EDE1] text-[#181615] font-semibold border border-[#D5C7B0] rounded-xs text-[10px]">
                                    {r.tableNumber || 'Non assignée'}
                                  </span>
                                </td>
                                <td className="p-3">
                                  <span className="font-serif text-sm text-[#181615] font-semibold block">
                                    {r.civility} {r.firstName} {r.lastName}
                                  </span>
                                  <span className="text-[11px] text-[#7A6F5C] flex items-center gap-1">
                                    <Phone className="w-2.5 h-2.5" /> {r.phone}
                                  </span>
                                  {r.occasion && (
                                    <span className="block text-[10px] text-[#8E6D38] italic font-serif">
                                      {r.occasion}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3">
                                  <span className="font-medium text-[#181615]">{r.date}</span>
                                  <span className="block text-[11px] text-[#7A6F5C]">{r.time} ({r.service === 'diner' ? 'Dîner' : 'Déjeuner'})</span>
                                </td>
                                <td className="p-3 font-serif text-sm text-[#181615] font-medium">
                                  {r.guests} {r.guests === 1 ? 'couvert' : 'couverts'}
                                </td>
                                <td className="p-3 max-w-[200px]">
                                  <span className="font-medium text-[#181615] block truncate text-[11px]">
                                    {r.menuChoice}
                                  </span>
                                  {r.winePairingRequested ? (
                                    <span className="text-[10px] text-[#8E6D38] flex items-center gap-1 font-semibold">
                                      <Wine className="w-3 h-3" /> Accord Sommellerie
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#7A6F5C]">Sans accord</span>
                                  )}
                                </td>
                                <td className="p-3 max-w-[200px]">
                                  {r.dietaryRestrictions ? (
                                    <span className="inline-flex items-center gap-1 text-[10px] text-[#A33] font-bold bg-[#FBEBEB] px-1.5 py-0.5 rounded-xs border border-[#EAA]">
                                      <AlertTriangle className="w-2.5 h-2.5" /> {r.dietaryRestrictions}
                                    </span>
                                  ) : (
                                    <span className="text-[10px] text-[#7A6F5C] italic">Aucune</span>
                                  )}
                                  {r.maitreDNotes && (
                                    <span className="block text-[10px] text-[#8E6D38] truncate mt-0.5" title={r.maitreDNotes}>
                                      Note : {r.maitreDNotes}
                                    </span>
                                  )}
                                </td>
                                <td className="p-3">
                                  <select
                                    value={r.status}
                                    onChange={(e) => handleStatusChange(r.id, e.target.value as any)}
                                    className={`text-[10px] uppercase tracking-wider font-semibold border rounded-xs px-2 py-1 cursor-pointer ${
                                      r.status === 'confirmée' ? 'bg-[#EBF3E8] text-[#34592B] border-[#B7D8AF]' :
                                      r.status === 'installée' ? 'bg-[#FEF3C7] text-[#92400E] border-[#FCD34D]' :
                                      r.status === 'honorée' ? 'bg-[#E3EBF5] text-[#2C4A7A] border-[#B2C6E2]' :
                                      r.status === 'annulée' ? 'bg-[#FBEBEB] text-[#8C2C2C] border-[#F2B6B6]' :
                                      'bg-[#F5F0E6] text-[#8C764D] border-[#D5C7B0]'
                                    }`}
                                  >
                                    <option value="confirmée">Confirmée</option>
                                    <option value="installée">Installée</option>
                                    <option value="honorée">Honorée</option>
                                    <option value="annulée">Annulée</option>
                                  </select>
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    onClick={() => {
                                      setSelectedRes(r);
                                      setEditingNotes(r.maitreDNotes || '');
                                      setEditingTable(r.tableNumber || 'T1');
                                    }}
                                    className="px-2.5 py-1 text-xs text-[#8E6D38] hover:text-[#181615] bg-[#F4EFE6] hover:bg-[#E5DAC8] border border-[#DFCFA7] rounded-xs font-medium cursor-pointer"
                                  >
                                    Ouvrir
                                  </button>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: PLAN DE TABLE INTERACTIF */}
              {activeTab === 'plan' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between bg-[#F8F4EC] p-3 border border-[#E5DAC8] rounded-xs">
                    <div>
                      <h3 className="font-serif text-base text-[#181615]">Disposition & Statut des Tables en Direct</h3>
                      <p className="text-[11px] text-[#7A6F5C]">Affectation des convives aux tables selon les 4 salons d'exception de la Maison.</p>
                    </div>
                    <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#34592B]"></span> Disponible</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#8E6D38]"></span> Réservée</span>
                      <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-[#92400E]"></span> Installée</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {RESTAURANT_TABLES.map((table) => {
                      const assignedRes = reservations.find(r => r.tableNumber === table.name && r.status !== 'annulée');
                      return (
                        <div
                          key={table.id}
                          className={`p-4 border rounded-xs transition-all relative ${
                            assignedRes
                              ? assignedRes.status === 'installée'
                                ? 'bg-[#FEF9EE] border-[#F59E0B]'
                                : 'bg-[#FFFDF9] border-[#8E6D38]'
                              : 'bg-[#F9FBF8] border-[#A3C293]/60'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-serif text-lg font-bold text-[#181615]">{table.name}</span>
                            <span className="text-[10px] uppercase tracking-widest font-sans px-2 py-0.5 rounded-full bg-[#181615]/5 text-[#7A6F5C]">
                              {table.capacity} pers. max
                            </span>
                          </div>

                          <span className="text-[10px] uppercase tracking-wider text-[#8E6D38] block font-semibold mb-1">
                            {table.space}
                          </span>
                          <span className="text-[11px] text-[#7A6F5C] italic block mb-3">
                            {table.pos}
                          </span>

                          {assignedRes ? (
                            <div className="pt-2 border-t border-[#E5DAC8] space-y-1">
                              <span className="text-[9px] uppercase tracking-wider text-[#7A6F5C] block">Convive Assigné :</span>
                              <span className="font-serif text-sm font-semibold text-[#181615] block">
                                {assignedRes.civility} {assignedRes.lastName} ({assignedRes.guests}p)
                              </span>
                              <span className="text-[10px] text-[#8E6D38] block font-mono">
                                Service {assignedRes.time} • {assignedRes.service}
                              </span>
                              {assignedRes.dietaryRestrictions && (
                                <span className="text-[10px] text-[#A33] block font-semibold truncate">
                                  Allergie : {assignedRes.dietaryRestrictions}
                                </span>
                              )}
                              <button
                                onClick={() => {
                                  setSelectedRes(assignedRes);
                                  setEditingNotes(assignedRes.maitreDNotes || '');
                                  setEditingTable(assignedRes.tableNumber || table.name);
                                }}
                                className="w-full mt-2 py-1 text-center text-[10px] uppercase tracking-wider bg-[#181615] text-[#FAF7F2] hover:bg-[#8E6D38] rounded-xs cursor-pointer"
                              >
                                Gérer la table
                              </button>
                            </div>
                          ) : (
                            <div className="pt-3 border-t border-[#A3C293]/40 text-center">
                              <span className="text-xs text-[#34592B] font-medium flex items-center justify-center gap-1">
                                <Check className="w-3.5 h-3.5" /> Table Disponible
                              </span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 3: BRIEFING CUISINE & BRIGADE */}
              {activeTab === 'briefing' && (
                <div className="bg-[#FFFDF9] border border-[#E5DAC8] p-6 sm:p-8 rounded-xs space-y-6 max-w-4xl mx-auto shadow-sm">
                  
                  {/* Briefing Header */}
                  <div className="text-center border-b border-[#E5DAC8] pb-6">
                    <div className="flex items-center justify-center gap-2 text-xs tracking-widest uppercase text-[#8E6D38] mb-1">
                      <span>L'ÉCRIN • 14, PLACE VENDÔME</span>
                    </div>
                    <h3 className="font-serif text-3xl text-[#181615] font-light">
                      Feuille de Service & Briefing de Brigade
                    </h3>
                    <p className="text-xs text-[#7A6F5C] italic mt-1">
                      À l'attention du Chef Alexandre de Saint-Germain, de la Cheffe Sommelière Hélène Margaux et du Maître d'Hôtel
                    </p>
                  </div>

                  {/* Service Stats Summary */}
                  <div className="grid grid-cols-3 gap-4 text-center p-4 bg-[#F8F4EC] border border-[#DFCFA7] rounded-xs">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Total Couverts</span>
                      <span className="font-serif text-2xl font-bold text-[#181615]">{totalCovers}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Accords Vins Demandés</span>
                      <span className="font-serif text-2xl font-bold text-[#8E6D38]">{winePairingsCount}</span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C] block">Régimes Spécifiques</span>
                      <span className="font-serif text-2xl font-bold text-[#A33]">{allergiesCount}</span>
                    </div>
                  </div>

                  {/* Critical Dietary Alerts for Kitchen */}
                  <div>
                    <h4 className="font-serif text-lg text-[#181615] flex items-center gap-2 mb-3 border-b border-[#E5DAC8] pb-1">
                      <AlertTriangle className="w-4 h-4 text-[#A33]" />
                      <span>Alertes Régimes & Allergies (Avis Cuisine Prioritaire)</span>
                    </h4>

                    {activeBookings.filter(r => r.dietaryRestrictions && r.dietaryRestrictions.trim() !== '').length === 0 ? (
                      <p className="text-xs text-[#7A6F5C] italic">Aucune allergie alimentaire signalée pour ce service.</p>
                    ) : (
                      <div className="space-y-2">
                        {activeBookings
                          .filter(r => r.dietaryRestrictions && r.dietaryRestrictions.trim() !== '')
                          .map(r => (
                            <div key={r.id} className="p-3 bg-[#FBEBEB] border-l-4 border-[#A33] text-xs flex items-center justify-between">
                              <div>
                                <span className="font-serif font-bold text-[#181615] mr-2">
                                  {r.tableNumber || 'Table à assigner'} — {r.civility} {r.lastName} ({r.guests}p) :
                                </span>
                                <span className="font-semibold text-[#A33]">{r.dietaryRestrictions}</span>
                              </div>
                              <span className="text-[10px] font-mono text-[#7A6F5C]">{r.time} ({r.service})</span>
                            </div>
                          ))
                        }
                      </div>
                    )}
                  </div>

                  {/* Table by Table Service Run */}
                  <div>
                    <h4 className="font-serif text-lg text-[#181615] flex items-center gap-2 mb-3 border-b border-[#E5DAC8] pb-1">
                      <UtensilsCrossed className="w-4 h-4 text-[#8E6D38]" />
                      <span>Déroulé des Tables & Menus Choisis</span>
                    </h4>

                    <div className="divide-y divide-[#E5DAC8] text-xs">
                      {activeBookings.map(r => (
                        <div key={r.id} className="py-2.5 flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="font-serif font-bold text-sm text-[#181615] mr-2">
                              {r.tableNumber || 'Table libre'} • {r.civility} {r.lastName} ({r.guests}p)
                            </span>
                            <span className="text-[11px] text-[#7A6F5C] block">
                              {r.menuChoice} {r.winePairingRequested && '• Avec Accord Mets & Vins'}
                            </span>
                            {r.maitreDNotes && (
                              <span className="text-[10px] text-[#8E6D38] italic block">
                                Note Maître d'Hôtel : {r.maitreDNotes}
                              </span>
                            )}
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-xs font-semibold text-[#181615] block">{r.time}</span>
                            <span className="text-[10px] uppercase tracking-wider text-[#7A6F5C]">{r.service}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 4: BONS CADEAUX & VOUCHERS */}
              {activeTab === 'cadeaux' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-[#F8F4EC] p-3 border border-[#E5DAC8] rounded-xs">
                    <div>
                      <h3 className="font-serif text-base text-[#181615]">Suivi des Coffrets & Invitations Gastronomiques</h3>
                      <p className="text-[11px] text-[#7A6F5C]">Gestion et encaissement en salle des bons cadeaux émis par nos convives.</p>
                    </div>
                  </div>

                  <div className="border border-[#E5DAC8] rounded-xs overflow-hidden bg-[#FFFDF9]">
                    <table className="w-full text-left text-xs text-[#4F473D]">
                      <thead className="bg-[#F4EFE6] border-b border-[#E5DAC8] text-[10px] uppercase tracking-widest text-[#7A6F5C]">
                        <tr>
                          <th className="p-3 font-semibold">Code Invitation</th>
                          <th className="p-3 font-semibold">Expérience Offerte</th>
                          <th className="p-3 font-semibold">Bénéficiaire</th>
                          <th className="p-3 font-semibold">Offert par</th>
                          <th className="p-3 font-semibold">Valeur</th>
                          <th className="p-3 font-semibold">Validité</th>
                          <th className="p-3 font-semibold">Statut</th>
                          <th className="p-3 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#EFE7D8]">
                        {vouchers.length === 0 ? (
                          <tr>
                            <td colSpan={8} className="p-8 text-center text-[#7A6F5C]">
                              Aucun bon cadeau émis actuellement.
                            </td>
                          </tr>
                        ) : (
                          vouchers.map(v => (
                            <tr key={v.id} className="hover:bg-[#FAF7F2] transition-colors">
                              <td className="p-3 font-mono font-bold text-[#8E6D38]">
                                {v.voucherCode}
                              </td>
                              <td className="p-3 font-medium text-[#181615]">
                                {v.experienceName}
                                {v.includeWinePairing && (
                                  <span className="block text-[10px] text-[#8E6D38]">+ Accord Vins Inclus</span>
                                )}
                              </td>
                              <td className="p-3 font-serif text-sm font-semibold text-[#181615]">
                                {v.recipientName}
                              </td>
                              <td className="p-3 text-[11px] text-[#7A6F5C]">
                                {v.purchaserName} ({v.purchaserEmail})
                              </td>
                              <td className="p-3 font-serif font-bold text-[#181615]">
                                {v.price} €
                              </td>
                              <td className="p-3 text-[11px] text-[#7A6F5C]">
                                {v.expirationDate}
                              </td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                                  v.status === 'valide'
                                    ? 'bg-[#EBF3E8] text-[#34592B]'
                                    : 'bg-[#F2EDE1] text-[#7A6F5C] line-through'
                                }`}>
                                  {v.status}
                                </span>
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => handleVoucherStatusToggle(v.id, v.status)}
                                  className={`px-3 py-1 text-[10px] uppercase tracking-wider rounded-xs font-semibold cursor-pointer transition-colors ${
                                    v.status === 'valide'
                                      ? 'bg-[#8E6D38] hover:bg-[#181615] text-[#FAF7F2]'
                                      : 'bg-[#E5DAC8] hover:bg-[#D5C7B0] text-[#181615]'
                                  }`}
                                >
                                  {v.status === 'valide' ? 'Marquer Utilisé' : 'Réactiver'}
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 5: NOUVELLE RÉSERVATION VIP TÉLÉPHONIQUE */}
              {activeTab === 'nouvelle' && (
                <div className="bg-[#FFFDF9] border border-[#DFCFA7] p-6 rounded-xs max-w-3xl mx-auto shadow-sm">
                  <div className="border-b border-[#E5DAC8] pb-4 mb-6">
                    <span className="text-[10px] font-sans uppercase tracking-[0.3em] text-[#8E6D38] font-bold block">
                      Enregistrement Direct
                    </span>
                    <h3 className="font-serif text-2xl text-[#181615]">
                      Prise de Réservation Téléphonique VIP
                    </h3>
                  </div>

                  <form onSubmit={handleCreateNewReservation} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Civilité</label>
                        <select
                          value={newRes.civility}
                          onChange={(e) => setNewRes({ ...newRes, civility: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        >
                          <option value="M.">M.</option>
                          <option value="Mme">Mme</option>
                          <option value="Autre">Autre</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Prénom</label>
                        <input
                          type="text"
                          placeholder="Prénom du convive..."
                          value={newRes.firstName}
                          onChange={(e) => setNewRes({ ...newRes, firstName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Nom (Obligatoire)</label>
                        <input
                          type="text"
                          placeholder="Nom de famille..."
                          value={newRes.lastName}
                          onChange={(e) => setNewRes({ ...newRes, lastName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Téléphone de contact</label>
                        <input
                          type="tel"
                          placeholder="+33 6 ..."
                          value={newRes.phone}
                          onChange={(e) => setNewRes({ ...newRes, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Email</label>
                        <input
                          type="email"
                          placeholder="convive@domaine.com"
                          value={newRes.email}
                          onChange={(e) => setNewRes({ ...newRes, email: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Date</label>
                        <input
                          type="date"
                          value={newRes.date}
                          onChange={(e) => setNewRes({ ...newRes, date: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Service</label>
                        <select
                          value={newRes.service}
                          onChange={(e) => setNewRes({ ...newRes, service: e.target.value as any })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        >
                          <option value="diner">Dîner</option>
                          <option value="dejeuner">Déjeuner</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Heure</label>
                        <input
                          type="time"
                          value={newRes.time}
                          onChange={(e) => setNewRes({ ...newRes, time: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Couverts</label>
                        <select
                          value={newRes.guests}
                          onChange={(e) => setNewRes({ ...newRes, guests: Number(e.target.value) })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        >
                          {[1, 2, 3, 4, 5, 6, 8].map(n => (
                            <option key={n} value={n}>{n} {n === 1 ? 'couvert' : 'couverts'}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Menu Dégustation</label>
                        <select
                          value={newRes.menuChoice}
                          onChange={(e) => setNewRes({ ...newRes, menuChoice: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        >
                          {TASTING_MENUS.map(m => (
                            <option key={m.id} value={m.name}>{m.name} ({m.price} €)</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">Table Assignée</label>
                        <select
                          value={newRes.tableNumber}
                          onChange={(e) => setNewRes({ ...newRes, tableNumber: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                        >
                          {RESTAURANT_TABLES.map(t => (
                            <option key={t.id} value={t.name}>{t.name} ({t.space})</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 py-1">
                      <input
                        type="checkbox"
                        id="vip-wine-pairing"
                        checked={newRes.winePairingRequested}
                        onChange={(e) => setNewRes({ ...newRes, winePairingRequested: e.target.checked })}
                        className="rounded-xs text-[#8E6D38]"
                      />
                      <label htmlFor="vip-wine-pairing" className="text-xs text-[#181615] font-medium cursor-pointer">
                        Ajouter l'Accord Mets & Vins de la Cheffe Sommelière
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#A33] font-bold mb-1">
                        Allergies & Restrictions Alimentaires (Signalement Cuisine)
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Allergie sévère crustacés, sans gluten, sans alcool..."
                        value={newRes.dietaryRestrictions}
                        onChange={(e) => setNewRes({ ...newRes, dietaryRestrictions: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:border-[#A33]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">
                        Notes Confidentielles du Maître d'Hôtel
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Client régulier, souhaite une table discrète, anniversaire de mariage..."
                        value={newRes.maitreDNotes}
                        onChange={(e) => setNewRes({ ...newRes, maitreDNotes: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF7F2] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs"
                      />
                    </div>

                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#E5DAC8]">
                      <button
                        type="button"
                        onClick={() => setActiveTab('cahier')}
                        className="px-4 py-2.5 text-xs text-[#7A6F5C] hover:text-[#181615] uppercase tracking-wider"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs uppercase tracking-[0.2em] font-semibold rounded-xs cursor-pointer shadow-md"
                      >
                        Enregistrer au Cahier de Salle
                      </button>
                    </div>
                  </form>
                </div>
              )}

            </div>
          </>
        )}

        {/* Detailed Inspector Slide-over Modal for Selected Reservation */}
        {selectedRes && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#181615]/70 backdrop-blur-xs">
            <div className="bg-[#FAF7F2] border border-[#DFCFA7] rounded-xs max-w-lg w-full p-6 space-y-4 shadow-2xl animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-[#E5DAC8] pb-3">
                <div>
                  <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#8E6D38] font-bold">
                    Dossier Convive Privilégié
                  </span>
                  <h4 className="font-serif text-xl text-[#181615]">
                    {selectedRes.civility} {selectedRes.firstName} {selectedRes.lastName}
                  </h4>
                </div>
                <button
                  onClick={() => setSelectedRes(null)}
                  className="p-1 text-[#7A6F5C] hover:text-[#181615]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-2 bg-[#F8F4EC] p-3 border border-[#E5DAC8] rounded-xs">
                  <div>
                    <span className="text-[10px] text-[#7A6F5C] uppercase block">Référence :</span>
                    <span className="font-mono font-bold text-[#8E6D38]">{selectedRes.confirmationCode}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6F5C] uppercase block">Contact :</span>
                    <span className="font-medium">{selectedRes.phone}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6F5C] uppercase block">Service :</span>
                    <span>{selectedRes.date} à {selectedRes.time}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#7A6F5C] uppercase block">Couverts :</span>
                    <span className="font-bold">{selectedRes.guests} convives</span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] text-[#7A6F5C] uppercase block font-semibold">Menu sélectionné :</span>
                  <span className="font-serif text-sm font-semibold text-[#181615] block">{selectedRes.menuChoice}</span>
                  {selectedRes.winePairingRequested && (
                    <span className="text-[11px] text-[#8E6D38] flex items-center gap-1 mt-0.5">
                      <Wine className="w-3 h-3" /> Accord Sommellerie Inclus
                    </span>
                  )}
                </div>

                {selectedRes.dietaryRestrictions && (
                  <div className="p-2.5 bg-[#FBEBEB] border border-[#EAA] rounded-xs">
                    <span className="text-[10px] uppercase font-bold text-[#A33] block flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" /> Attention Cuisine :
                    </span>
                    <span className="font-medium text-[#181615]">{selectedRes.dietaryRestrictions}</span>
                  </div>
                )}

                {/* Table assignment selector */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">
                    Affectation de la Table :
                  </label>
                  <select
                    value={editingTable}
                    onChange={(e) => setEditingTable(e.target.value)}
                    className="w-full px-3 py-2 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs font-semibold"
                  >
                    {RESTAURANT_TABLES.map(t => (
                      <option key={t.id} value={t.name}>{t.name} — {t.space} ({t.capacity}p)</option>
                    ))}
                  </select>
                </div>

                {/* Notes from Maître d'Hôtel */}
                <div>
                  <label className="block text-[10px] uppercase tracking-wider text-[#7A6F5C] font-semibold mb-1">
                    Notes Confidentielles du Maître d'Hôtel :
                  </label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Préférences de table, habitudes, champagne favori..."
                    className="w-full p-2.5 bg-[#FFFDF9] border border-[#D5C7B0] text-xs text-[#181615] rounded-xs focus:outline-none focus:border-[#C9A86A]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E5DAC8]">
                <button
                  onClick={() => {
                    handleStatusChange(selectedRes.id, 'annulée');
                    setSelectedRes(null);
                  }}
                  className="text-xs text-[#A33] hover:underline"
                >
                  Annuler la réservation
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedRes(null)}
                    className="px-3 py-1.5 text-xs text-[#7A6F5C] hover:text-[#181615]"
                  >
                    Fermer
                  </button>
                  <button
                    onClick={() => {
                      handleSaveInspectorChanges();
                      setSelectedRes(null);
                    }}
                    className="px-4 py-1.5 bg-[#181615] hover:bg-[#8E6D38] text-[#FAF7F2] text-xs uppercase tracking-wider font-semibold rounded-xs cursor-pointer"
                  >
                    Enregistrer
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
