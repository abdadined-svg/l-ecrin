export interface Dish {
  id: string;
  name: string;
  subname?: string;
  description: string;
  category: 'entree' | 'plat' | 'fromage' | 'dessert';
  price?: number; // en euros si à la carte
  allergens?: string[];
  isSignature?: boolean;
  isVegetarian?: boolean;
  winePairing?: string;
  origin?: string;
  imageUrl?: string;
}

export interface TastingMenu {
  id: string;
  name: string;
  subtitle: string;
  coursesCount: number;
  price: number;
  winePairingPrice: number;
  description: string;
  service: 'dejeuner' | 'diner' | 'les_deux';
  steps: {
    sequence: string;
    dishTitle: string;
    dishSubtitle?: string;
    description: string;
    winePairing?: string;
  }[];
  isPopular?: boolean;
}

export interface WineItem {
  id: string;
  name: string;
  domain: string;
  vintage: string | number;
  region: string;
  country: string;
  notes: string;
  sommelierWord: string;
  bottlePrice: number;
  glassPrice?: number;
  type: 'rouge' | 'blanc' | 'champagne' | 'digestif';
  isRare?: boolean;
}

export interface DiningSpace {
  id: string;
  title: string;
  subtitle: string;
  capacity: string;
  atmosphere: string;
  description: string;
  image: string;
  features: string[];
}

export interface Reservation {
  id: string;
  confirmationCode: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  service: 'dejeuner' | 'diner';
  guests: number;
  menuChoice: string;
  civility: 'M.' | 'Mme' | 'Autre';
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  occasion?: string;
  dietaryRestrictions?: string;
  specialRequests?: string;
  winePairingRequested: boolean;
  status: 'confirmée' | 'en attente' | 'installée' | 'honorée' | 'annulée';
  tablePreference?: 'salle' | 'jardin' | 'table_chef' | 'indifférent';
  tableNumber?: string;
  maitreDNotes?: string;
  createdAt: string;
}

export interface GiftVoucher {
  id: string;
  voucherCode: string;
  title: string;
  experienceName: string;
  guestsCount: number;
  price: number;
  purchaserName: string;
  purchaserEmail: string;
  recipientName: string;
  personalMessage: string;
  includeWinePairing: boolean;
  expirationDate: string;
  status: 'valide' | 'utilisé';
  createdAt: string;
}

export interface PressReview {
  id: string;
  guideOrMedia: string;
  ratingOrAward: string;
  quote: string;
  criticName?: string;
  year: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Plat' | 'Geste du Chef' | 'Salle' | 'Cave';
  imageUrl: string;
  aspect: 'vertical' | 'horizontal' | 'large' | 'carre';
  description?: string;
}

export interface GuestTestimonial {
  id: string;
  author: string;
  city?: string;
  rating: number;
  date: string;
  context: string;
  content: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  michelinStars: number;
  chefName: string;
  chefTitle: string;
  sommelierName: string;
  headPastryChef: string;
  address: {
    street: string;
    postalCode: string;
    city: string;
    country: string;
  };
  phone: string;
  email: string;
  hours: {
    dayRange: string;
    lunch: string;
    dinner: string;
    closed: string;
  }[];
  dressCode: string;
  valetService: boolean;
}
