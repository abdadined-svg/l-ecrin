import { Reservation, GiftVoucher } from '../types';
import { INITIAL_RESERVATIONS, INITIAL_GIFT_VOUCHERS } from '../data/restaurantData';

const RESERVATIONS_KEY = 'lecrin_reservations_v1';
const VOUCHERS_KEY = 'lecrin_vouchers_v1';
const NEWSLETTER_KEY = 'lecrin_newsletter_subscribers';

export const storageService = {
  getReservations(): Reservation[] {
    try {
      const data = localStorage.getItem(RESERVATIONS_KEY);
      if (!data) {
        localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(INITIAL_RESERVATIONS));
        return INITIAL_RESERVATIONS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Erreur lecture localStorage réservations:', e);
      return INITIAL_RESERVATIONS;
    }
  },

  saveReservation(reservation: Omit<Reservation, 'id' | 'confirmationCode' | 'createdAt' | 'status'>): Reservation {
    const list = this.getReservations();
    const randomCode = `ECRIN-${Math.floor(1000 + Math.random() * 9000)}`;
    const newReservation: Reservation = {
      ...reservation,
      id: `res-${Date.now()}`,
      confirmationCode: randomCode,
      status: 'confirmée',
      createdAt: new Date().toISOString(),
    };

    const updated = [newReservation, ...list];
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur sauvegarde réservation:', e);
    }
    return newReservation;
  },

  updateReservationStatus(id: string, status: Reservation['status']): Reservation[] {
    const list = this.getReservations();
    const updated = list.map(r => r.id === id ? { ...r, status } : r);
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur mise à jour statut:', e);
    }
    return updated;
  },

  updateReservation(id: string, updates: Partial<Reservation>): Reservation[] {
    const list = this.getReservations();
    const updated = list.map(r => r.id === id ? { ...r, ...updates } : r);
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur mise à jour réservation:', e);
    }
    return updated;
  },

  deleteReservation(id: string): Reservation[] {
    const list = this.getReservations();
    const updated = list.filter(r => r.id !== id);
    try {
      localStorage.setItem(RESERVATIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur suppression réservation:', e);
    }
    return updated;
  },

  getVouchers(): GiftVoucher[] {
    try {
      const data = localStorage.getItem(VOUCHERS_KEY);
      if (!data) {
        localStorage.setItem(VOUCHERS_KEY, JSON.stringify(INITIAL_GIFT_VOUCHERS));
        return INITIAL_GIFT_VOUCHERS;
      }
      return JSON.parse(data);
    } catch (e) {
      console.warn('Erreur lecture vouchers:', e);
      return INITIAL_GIFT_VOUCHERS;
    }
  },

  saveVoucher(voucher: Omit<GiftVoucher, 'id' | 'voucherCode' | 'createdAt' | 'status' | 'expirationDate'>): GiftVoucher {
    const list = this.getVouchers();
    const randomCode = `CADEAU-ECRIN-${Math.floor(100 + Math.random() * 900)}`;
    const expDate = new Date();
    expDate.setFullYear(expDate.getFullYear() + 1);

    const newVoucher: GiftVoucher = {
      ...voucher,
      id: `voucher-${Date.now()}`,
      voucherCode: randomCode,
      status: 'valide',
      expirationDate: expDate.toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
    };

    const updated = [newVoucher, ...list];
    try {
      localStorage.setItem(VOUCHERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur sauvegarde voucher:', e);
    }
    return newVoucher;
  },

  updateVoucherStatus(id: string, status: GiftVoucher['status']): GiftVoucher[] {
    const list = this.getVouchers();
    const updated = list.map(v => v.id === id ? { ...v, status } : v);
    try {
      localStorage.setItem(VOUCHERS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Erreur mise à jour statut voucher:', e);
    }
    return updated;
  },

  subscribeNewsletter(email: string): boolean {
    try {
      const list = JSON.parse(localStorage.getItem(NEWSLETTER_KEY) || '[]');
      if (!list.includes(email)) {
        list.push(email);
        localStorage.setItem(NEWSLETTER_KEY, JSON.stringify(list));
      }
      return true;
    } catch (e) {
      return true;
    }
  }
};
