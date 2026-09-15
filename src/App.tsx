import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Philosophy from './components/Philosophy';
import MenuSection from './components/MenuSection';
import WineCellar from './components/WineCellar';
import SpacesSection from './components/SpacesSection';
import GallerySection from './components/GallerySection';
import PressSection from './components/PressSection';
import ReservationSection from './components/ReservationSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import GiftVoucherModal from './components/GiftVoucherModal';
import MaitreDModal from './components/MaitreDModal';
import WhatsAppConcierge from './components/WhatsAppConcierge';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [reservationMode, setReservationMode] = useState<'new' | 'lookup'>('new');
  const [preselectedMenu, setPreselectedMenu] = useState<string | undefined>(undefined);
  const [preselectedSpace, setPreselectedSpace] = useState<string | undefined>(undefined);

  const [isVouchersOpen, setIsVouchersOpen] = useState(false);
  const [isMaitreDOpen, setIsMaitreDOpen] = useState(false);

  const handleOpenNewReservation = (menuName?: string, spaceName?: string) => {
    setReservationMode('new');
    setPreselectedMenu(menuName);
    setPreselectedSpace(spaceName);
    setIsReservationOpen(true);
  };

  const handleOpenMyReservations = () => {
    setReservationMode('lookup');
    setIsReservationOpen(true);
  };

  const scrollToMenuSection = () => {
    const el = document.getElementById('menus');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#181615] flex flex-col font-sans selection:bg-[#E8DCC4] selection:text-[#181615]">
      
      {/* Top Navigation */}
      <Header
        onOpenReservation={() => handleOpenNewReservation()}
        onOpenVouchers={() => setIsVouchersOpen(true)}
        onOpenMaitreD={() => setIsMaitreDOpen(true)}
        onOpenMyReservations={handleOpenMyReservations}
      />

      {/* Main Content */}
      <main className="flex-1">
        
        {/* 1. Hero Section - Cinematic & Immersive */}
        <Hero
          onOpenReservation={(menu, space) => handleOpenNewReservation(menu, space)}
          onExploreMenu={scrollToMenuSection}
        />

        {/* 2. La Maison & Chef Philosophy - Storytelling & Human */}
        <Philosophy />

        {/* 3. Tasting Menus, Signatures & Haute Pâtisserie */}
        <MenuSection
          onSelectMenuForBooking={(menuName) => handleOpenNewReservation(menuName)}
        />

        {/* 4. La Cave Voûtée & Sommellerie */}
        <WineCellar />

        {/* 5. Salons & Dining Atmospheres */}
        <SpacesSection
          onSelectSpaceForBooking={(spaceTitle) => handleOpenNewReservation(undefined, spaceTitle)}
        />

        {/* 6. Galerie Photographique Asymétrique & Lightbox */}
        <GallerySection />

        {/* 7. Avis des Convives & Distinctions des Grands Guides */}
        <PressSection />

        {/* 8. Section Réservation Émotionnelle */}
        <ReservationSection
          onOpenFullReservation={(menu) => handleOpenNewReservation(menu)}
        />

        {/* 9. Localisation, Horaires & Conciergerie */}
        <LocationSection
          onOpenReservation={() => handleOpenNewReservation()}
        />

      </main>

      {/* Footer & Accès Maître d'Hôtel */}
      <Footer
        onOpenReservation={() => handleOpenNewReservation()}
        onOpenVouchers={() => setIsVouchersOpen(true)}
        onOpenMaitreD={() => setIsMaitreDOpen(true)}
        onOpenMyReservations={handleOpenMyReservations}
      />

      {/* Reservation Interactive Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        mode={reservationMode}
        preselectedMenu={preselectedMenu}
        preselectedSpace={preselectedSpace}
      />

      {/* Gift Vouchers Modal */}
      <GiftVoucherModal
        isOpen={isVouchersOpen}
        onClose={() => setIsVouchersOpen(false)}
      />

      {/* Maitre d'Hotel Management Space */}
      <MaitreDModal
        isOpen={isMaitreDOpen}
        onClose={() => setIsMaitreDOpen(false)}
      />

      {/* Discrete Luxury WhatsApp Concierge Button */}
      <WhatsAppConcierge />

    </div>
  );
}
