import { useState, useEffect } from 'react';
import { Utensils, Calendar, Gift, Menu as MenuIcon, X, Phone, Compass, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeaderProps {
  onOpenReservation: () => void;
  onOpenVouchers: () => void;
  onOpenMaitreD: () => void;
  onOpenMyReservations: () => void;
}

export default function Header({
  onOpenReservation,
  onOpenVouchers,
  onOpenMaitreD,
  onOpenMyReservations
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'La Maison', href: '#histoire' },
    { label: 'Les Menus', href: '#menus' },
    { label: 'La Cave', href: '#cave' },
    { label: 'Les Salons', href: '#salons' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Avis', href: '#avis' },
    { label: 'Accès', href: '#acces' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Discreet top prestige banner */}
      <div id="top-prestige-bar" className="bg-[#1A1918] text-[#E5D8B8] text-[11px] sm:text-xs py-2 px-4 text-center tracking-[0.2em] uppercase font-sans border-b border-[#33302A] flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="text-[#C59B27]">★★★</span> Guide Michelin 2025
        </span>
        <span className="hidden md:inline text-[#665F52]">•</span>
        <span className="hidden md:inline text-[#D8CEBC]">
          14 Place Vendôme, Paris 1er
        </span>
        <span className="hidden sm:inline text-[#665F52]">•</span>
        <a 
          href={`tel:${RESTAURANT_INFO.phone}`} 
          className="hover:text-white transition-colors duration-200 hidden sm:inline"
        >
          {RESTAURANT_INFO.phone}
        </a>
      </div>

      {/* Main sticky navigation */}
      <header
        id="main-navigation-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-b border-[#E8DFC8]/60 py-3'
            : 'bg-[#FAF8F5] border-b border-[#EFE8D8] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Maison identity */}
          <a
            href="#"
            id="brand-logo-link"
            className="flex flex-col items-start group text-left"
          >
            <span className="font-serif text-2xl sm:text-3xl tracking-[0.15em] font-light text-[#1A1918] group-hover:text-[#9B7516] transition-colors">
              L'ÉCRIN
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-[#8A795D] font-sans -mt-1 font-medium">
              Haute Gastronomie • Paris
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav id="desktop-navigation-links" className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs tracking-[0.15em] uppercase text-[#3D3A35] hover:text-[#9B7516] transition-colors font-medium cursor-pointer py-1 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C59B27] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action buttons */}
          <div className="flex items-center space-x-3">
            {/* Gift vouchers button */}
            <button
              id="gift-voucher-header-btn"
              onClick={onOpenVouchers}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#5A5346] hover:text-[#1A1918] px-3 py-2 border border-[#DFD5C0] hover:border-[#B8860B] transition-all rounded-sm cursor-pointer"
              title="Offrir un coffret dégustation d'exception"
            >
              <Gift className="w-3.5 h-3.5 text-[#B8860B]" />
              <span>Coffrets Cadeaux</span>
            </button>

            {/* My bookings button */}
            <button
              id="my-bookings-header-btn"
              onClick={onOpenMyReservations}
              className="hidden md:inline-flex items-center gap-1.5 text-xs tracking-wider uppercase text-[#5A5346] hover:text-[#1A1918] px-3 py-2 border border-transparent hover:border-[#DFD5C0] transition-all rounded-sm cursor-pointer"
              title="Consulter ou modifier une réservation existante"
            >
              <Calendar className="w-3.5 h-3.5 text-[#8A795D]" />
              <span>Mes Réservations</span>
            </button>

            {/* Primary Reservation CTA button */}
            <button
              id="header-reserve-button"
              onClick={onOpenReservation}
              className="inline-flex items-center gap-2 bg-[#1A1918] hover:bg-[#9B7516] text-[#FAF8F5] text-xs tracking-[0.18em] uppercase px-5 py-2.5 transition-all duration-300 font-medium rounded-sm shadow-xs hover:shadow-md cursor-pointer"
            >
              <Utensils className="w-3.5 h-3.5 text-[#E6CB7E]" />
              <span>Réserver</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#1A1918] hover:text-[#9B7516] focus:outline-none"
              aria-label="Ouvrir le menu de navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-drawer"
            className="lg:hidden bg-[#FAF8F5] border-t border-[#EFE8D8] px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200"
          >
            <div className="flex flex-col space-y-3 pb-4 border-b border-[#E8DFC8]">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href)}
                  className="text-left text-sm tracking-widest uppercase text-[#1A1918] hover:text-[#9B7516] py-1.5 font-serif"
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full text-center bg-[#1A1918] text-[#FAF8F5] py-3 text-xs tracking-widest uppercase font-medium rounded-sm"
              >
                Réserver une Table
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenVouchers();
                }}
                className="w-full flex items-center justify-center gap-2 border border-[#D5C6A8] text-[#2C2A28] py-2.5 text-xs tracking-widest uppercase font-medium rounded-sm"
              >
                <Gift className="w-4 h-4 text-[#B8860B]" />
                Offrir un Coffret Cadeau
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenMyReservations();
                }}
                className="w-full flex items-center justify-center gap-2 text-[#5A5346] py-2 text-xs tracking-wider"
              >
                <Calendar className="w-4 h-4 text-[#8A795D]" />
                Consulter ma Réservation
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
