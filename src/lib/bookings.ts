// Booking system with Supabase
import { getSupabaseClient } from './supabase';
import type { Service, Specialist, Booking as DbBooking } from './supabase/types';

export interface ServiceItem {
  id: string;
  name: string;
  category: string;
  price: number;
  duration: number;
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

const CART_KEY = 'glow_cart';

// Convert database booking to frontend booking format
const convertDbBooking = (dbBooking: DbBooking & { services?: Service }): Booking => ({
  id: dbBooking.id,
  userId: dbBooking.user_id || '',
  items: [{
    service: {
      id: dbBooking.service_id || '',
      name: dbBooking.service_name || '',
      category: dbBooking.services?.category_id || '',
      price: dbBooking.service_price,
      duration: dbBooking.services?.duration_minutes || 0,
      description: dbBooking.services?.description || '',
    },
    date: dbBooking.booking_date,
    time: dbBooking.start_time,
    specialist: dbBooking.specialist_id || '',
  }],
  totalPrice: dbBooking.service_price,
  status: dbBooking.status as Booking['status'],
  createdAt: dbBooking.created_at,
  paymentMethod: undefined,
  consentSigned: true,
});

// Fetch services from database
export const getServices = async (): Promise<ServiceItem[]> => {
  const supabase = getSupabaseClient();

  const { data: services, error } = await supabase
    .from('services')
    .select(`
      *,
      service_categories (name),
      service_specialists (
        specialist_id,
        specialists (name)
      )
    `)
    .eq('is_active', true)
    .order('name');

  if (error || !services) {
    console.error('Error fetching services:', error);
    return [];
  }

  return services.map((service: Service & {
    service_categories?: { name: string } | null;
    service_specialists?: Array<{ specialists?: { name: string } | null }>;
  }) => ({
    id: service.id,
    name: service.name,
    category: service.service_categories?.name || '',
    price: service.price,
    duration: service.duration_minutes,
    description: service.description || '',
    specialist: service.service_specialists?.[0]?.specialists?.name,
  }));
};

// Fetch specialists from database
export const getSpecialists = async (): Promise<Specialist[]> => {
  const supabase = getSupabaseClient();

  const { data: specialists, error } = await supabase
    .from('specialists')
    .select('*')
    .eq('is_active', true)
    .order('name');

  if (error || !specialists) {
    console.error('Error fetching specialists:', error);
    return [];
  }

  return specialists;
};

// Get specialists for a specific service
export const getSpecialistsForService = async (serviceId: string): Promise<Specialist[]> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('service_specialists')
    .select(`
      specialists (*)
    `)
    .eq('service_id', serviceId);

  if (error || !data) {
    console.error('Error fetching specialists for service:', error);
    return [];
  }

  return data
    .filter((item: { specialists: Specialist | null }) => item.specialists !== null)
    .map((item: { specialists: Specialist | null }) => item.specialists as Specialist);
};

// Get all bookings for a user
export const getUserBookings = async (userId: string): Promise<Booking[]> => {
  const supabase = getSupabaseClient();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false });

  if (error || !bookings) {
    console.error('Error fetching user bookings:', error);
    return [];
  }

  return bookings.map((b: DbBooking & { services?: Service }) => convertDbBooking(b));
};

// For backward compatibility - sync version that returns empty array
// (components should be updated to use async version)
export const getUserBookingsSync = (userId: string): Booking[] => {
  return [];
};

// Create new booking
export const createBooking = async (
  userId: string,
  items: BookingItem[],
  paymentMethod: string,
  consentSigned: boolean,
  customerInfo?: { name: string; email: string; phone: string }
): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
  if (!consentSigned) {
    return { success: false, error: 'Bitte unterschreiben Sie die Einverständniserklärung' };
  }

  const supabase = getSupabaseClient();

  // Create bookings for each item
  const bookingsToCreate = items.map(item => {
    // Calculate end time based on start time and duration
    const startTimeParts = item.time.split(':');
    const startDate = new Date();
    startDate.setHours(parseInt(startTimeParts[0]), parseInt(startTimeParts[1]), 0);
    const endDate = new Date(startDate.getTime() + item.service.duration * 60000);
    const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

    return {
      user_id: userId || null,
      service_id: item.service.id,
      specialist_id: item.specialist || null,
      service_name: item.service.name,
      service_price: item.service.price,
      specialist_name: item.specialist || null,
      booking_date: item.date,
      start_time: item.time,
      end_time: endTime,
      duration_minutes: item.service.duration,
      status: 'pending' as const,
      customer_name: customerInfo?.name || 'Guest',
      customer_email: customerInfo?.email || '',
      customer_phone: customerInfo?.phone || null,
    };
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase as any)
    .from('bookings')
    .insert(bookingsToCreate)
    .select(`
      *,
      services (*)
    `);

  if (error) {
    console.error('Error creating booking:', error);
    return { success: false, error: 'Buchung konnte nicht erstellt werden' };
  }

  // Clear cart
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CART_KEY);
  }

  const totalPrice = items.reduce((sum, item) => sum + item.service.price, 0);

  return {
    success: true,
    booking: {
      id: data[0].id,
      userId,
      items,
      totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString(),
      paymentMethod,
      consentSigned,
    }
  };
};

// Create booking for guest (no user ID)
export const createGuestBooking = async (
  items: BookingItem[],
  customerInfo: { name: string; email: string; phone: string },
  consentSigned: boolean
): Promise<{ success: boolean; booking?: Booking; error?: string }> => {
  if (!consentSigned) {
    return { success: false, error: 'Bitte unterschreiben Sie die Einverständniserklärung' };
  }

  return createBooking('', items, 'vor_ort', consentSigned, customerInfo);
};

// Cancel booking
export const cancelBooking = async (bookingId: string): Promise<{ success: boolean; error?: string }> => {
  const supabase = getSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId);

  if (error) {
    console.error('Error cancelling booking:', error);
    return { success: false, error: 'Buchung konnte nicht storniert werden' };
  }

  return { success: true };
};

// Update booking status (admin)
export const updateBookingStatus = async (
  bookingId: string,
  status: Booking['status']
): Promise<{ success: boolean; error?: string }> => {
  const supabase = getSupabaseClient();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('bookings')
    .update({ status })
    .eq('id', bookingId);

  if (error) {
    console.error('Error updating booking status:', error);
    return { success: false, error: 'Status konnte nicht aktualisiert werden' };
  }

  return { success: true };
};

// Cart management (still uses localStorage for simplicity)
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
export const isTimeSlotAvailable = async (
  date: string,
  time: string,
  specialistId: string
): Promise<boolean> => {
  const supabase = getSupabaseClient();

  const { data, error } = await supabase
    .from('booked_slots')
    .select('*')
    .eq('booking_date', date)
    .eq('booking_time', time)
    .eq('specialist_id', specialistId);

  if (error) {
    console.error('Error checking slot availability:', error);
    return false;
  }

  return !data || data.length === 0;
};

// Get available time slots for a date
export const getAvailableSlots = async (date: string, specialistId: string): Promise<string[]> => {
  const allSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  ];

  const supabase = getSupabaseClient();

  const { data: bookedSlots, error } = await supabase
    .from('booked_slots')
    .select('booking_time')
    .eq('booking_date', date)
    .eq('specialist_id', specialistId);

  if (error) {
    console.error('Error fetching booked slots:', error);
    return allSlots;
  }

  const bookedTimes = new Set(bookedSlots?.map((s: { booking_time: string }) => s.booking_time) || []);
  return allSlots.filter(time => !bookedTimes.has(time));
};

// Get all bookings (admin)
export const getAllBookings = async (): Promise<Booking[]> => {
  const supabase = getSupabaseClient();

  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      services (*),
      specialists (*)
    `)
    .order('created_at', { ascending: false });

  if (error || !bookings) {
    console.error('Error fetching all bookings:', error);
    return [];
  }

  return bookings.map((b: DbBooking & { services?: Service; specialists?: Specialist }) => ({
    ...convertDbBooking(b),
    items: [{
      ...convertDbBooking(b).items[0],
      specialist: b.specialists?.name || b.specialist_id || '',
    }],
  }));
};

// Fallback services for when database is not available
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
