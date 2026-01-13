// Booking system with localStorage

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number; // in minutes
  description: string;
  specialist?: string;
}

export interface BookingItem {
  service: ServiceItem;
  date: string;
  time: string;
  specialist: string;
}

export interface Booking {
  id: string;
  userId: string;
  items: BookingItem[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  paymentMethod?: string;
  consentSigned: boolean;
}

const BOOKINGS_KEY = 'glow_bookings';
const CART_KEY = 'glow_cart';

// Available services
export const services: ServiceItem[] = [
  {
    id: 'lash_classic',
    name: 'Classic Wimpernverlängerung',
    category: 'Wimpern',
    price: 150,
    duration: 120,
    description: 'Natürlicher Look mit 1:1 Technik',
    specialist: 'Sofia',
  },
  {
    id: 'lash_volume',
    name: 'Volume Wimpernverlängerung',
    category: 'Wimpern',
    price: 180,
    duration: 150,
    description: 'Vollerer Look mit Volumenfächern',
    specialist: 'Sofia',
  },
  {
    id: 'lash_mega',
    name: 'Mega Volume Wimpernverlängerung',
    category: 'Wimpern',
    price: 200,
    duration: 180,
    description: 'Dramatischer, luxuriöser Look',
    specialist: 'Sofia',
  },
  {
    id: 'lash_lifting',
    name: 'Lash Lifting',
    category: 'Wimpern',
    price: 80,
    duration: 60,
    description: 'Natürliche Wimpern anheben und färben',
    specialist: 'Sofia',
  },
  {
    id: 'facial_glow',
    name: 'Glow Gold Gesichtsbehandlung',
    category: 'Gesicht',
    price: 120,
    duration: 75,
    description: 'Luxuriöse Goldbehandlung für strahlende Haut',
    specialist: 'Elena',
  },
  {
    id: 'facial_hydra',
    name: 'HydraFacial',
    category: 'Gesicht',
    price: 150,
    duration: 60,
    description: 'Tiefenreinigung und Hydratation',
    specialist: 'Elena',
  },
  {
    id: 'facial_anti_aging',
    name: 'Anti-Aging Behandlung',
    category: 'Gesicht',
    price: 180,
    duration: 90,
    description: 'Straffung und Verjüngung der Haut',
    specialist: 'Elena',
  },
  {
    id: 'microneedling',
    name: 'Microneedling',
    category: 'Gesicht',
    price: 200,
    duration: 90,
    description: 'Kollagenstimulation für jüngere Haut',
    specialist: 'Elena',
  },
  {
    id: 'icoone_body',
    name: 'Icoone Körperbehandlung',
    category: 'Körper',
    price: 150,
    duration: 60,
    description: 'Hautstraffung und Körpermodellierung',
    specialist: 'Marina',
  },
  {
    id: 'icoone_face',
    name: 'Icoone Gesichtsbehandlung',
    category: 'Körper',
    price: 120,
    duration: 45,
    description: 'Nicht-invasive Gesichtsstraffung',
    specialist: 'Marina',
  },
];

// Get all bookings for a user
export const getUserBookings = (userId: string): Booking[] => {
  if (typeof window === 'undefined') return [];
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  const allBookings: Booking[] = bookings ? JSON.parse(bookings) : [];
  return allBookings.filter(b => b.userId === userId);
};

// Get all bookings (admin)
const getAllBookings = (): Booking[] => {
  if (typeof window === 'undefined') return [];
  const bookings = localStorage.getItem(BOOKINGS_KEY);
  return bookings ? JSON.parse(bookings) : [];
};

// Save bookings
const saveBookings = (bookings: Booking[]) => {
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

// Create new booking
export const createBooking = (
  userId: string,
  items: BookingItem[],
  paymentMethod: string,
  consentSigned: boolean
): { success: boolean; booking?: Booking; error?: string } => {
  if (!consentSigned) {
    return { success: false, error: 'Bitte unterschreiben Sie die Einverständniserklärung' };
  }

  const totalPrice = items.reduce((sum, item) => sum + item.service.price, 0);

  const newBooking: Booking = {
    id: `booking_${Date.now()}`,
    userId,
    items,
    totalPrice,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    paymentMethod,
    consentSigned,
  };

  const bookings = getAllBookings();
  bookings.push(newBooking);
  saveBookings(bookings);

  // Clear cart
  localStorage.removeItem(CART_KEY);

  return { success: true, booking: newBooking };
};

// Cancel booking
export const cancelBooking = (bookingId: string): { success: boolean; error?: string } => {
  const bookings = getAllBookings();
  const bookingIndex = bookings.findIndex(b => b.id === bookingId);

  if (bookingIndex === -1) {
    return { success: false, error: 'Buchung nicht gefunden' };
  }

  bookings[bookingIndex].status = 'cancelled';
  saveBookings(bookings);

  return { success: true };
};

// Cart management
export const getCart = (): BookingItem[] => {
  if (typeof window === 'undefined') return [];
  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
};

export const addToCart = (item: BookingItem) => {
  const cart = getCart();
  cart.push(item);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const removeFromCart = (index: number) => {
  const cart = getCart();
  cart.splice(index, 1);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
};

// Check if time slot is available
export const isTimeSlotAvailable = (date: string, time: string, specialist: string): boolean => {
  const bookings = getAllBookings();
  return !bookings.some(booking =>
    booking.status !== 'cancelled' &&
    booking.items.some(item =>
      item.date === date &&
      item.time === time &&
      item.specialist === specialist
    )
  );
};

// Get available time slots for a date
export const getAvailableSlots = (date: string, specialist: string): string[] => {
  const slots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  return slots.filter(time => isTimeSlotAvailable(date, time, specialist));
};
