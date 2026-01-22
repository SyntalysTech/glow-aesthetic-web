'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Search, Filter, Check, X, Clock, Eye } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface Booking {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  booking_date: string;
  start_time: string;
  end_time: string;
  status: string;
  service_price: number;
  service_name: string;
  specialist_name: string | null;
  notes: string | null;
  created_at: string;
  services?: { name: string; duration_minutes: number } | null;
  specialists?: { name: string } | null;
  profiles?: { first_name: string; last_name: string; email: string; phone: string } | null;
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    let query = supabase
      .from('bookings')
      .select('*, services(name, duration_minutes), specialists(name), profiles(first_name, last_name, email, phone)')
      .order('booking_date', { ascending: false })
      .order('start_time', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error loading bookings:', error);
    } else {
      setBookings(data || []);
    }
    setLoading(false);
  };

  const updateStatus = async (bookingId: string, newStatus: string) => {
    const supabase = getSupabaseClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('bookings')
      .update({ status: newStatus })
      .eq('id', bookingId);

    if (error) {
      console.error('Error updating booking status:', error);
      return;
    }

    loadBookings();
    setSelectedBooking(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4ade80';
      case 'pending': return '#f59e0b';
      case 'completed': return '#60a5fa';
      case 'cancelled': return '#f87171';
      case 'no_show': return '#9ca3af';
      default: return charcoal;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Bestätigt';
      case 'pending': return 'Ausstehend';
      case 'completed': return 'Abgeschlossen';
      case 'cancelled': return 'Storniert';
      case 'no_show': return 'Nicht erschienen';
      default: return status;
    }
  };

  const filteredBookings = bookings.filter((booking) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      booking.customer_name?.toLowerCase().includes(searchLower) ||
      booking.customer_email?.toLowerCase().includes(searchLower) ||
      booking.services?.name.toLowerCase().includes(searchLower) ||
      booking.profiles?.first_name?.toLowerCase().includes(searchLower) ||
      booking.profiles?.last_name?.toLowerCase().includes(searchLower)
    );
  });

  const getCustomerName = (booking: Booking) => {
    if (booking.profiles) {
      return `${booking.profiles.first_name || ''} ${booking.profiles.last_name || ''}`.trim() || booking.profiles.email;
    }
    return booking.customer_name || booking.customer_email || 'Unbekannt';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light" style={{ color: charcoal }}>
            <span className="italic" style={{ color: blush }}>Buchungen</span> verwalten
          </h1>
          <p className="mt-1" style={{ color: `${charcoal}66` }}>
            {filteredBookings.length} Buchungen gefunden
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: `${charcoal}50` }} />
          <input
            type="text"
            placeholder="Suchen nach Name, Email, Service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
            style={{ borderColor: cream, backgroundColor: 'white' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter size={20} style={{ color: `${charcoal}50` }} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border-2"
            style={{ borderColor: cream, backgroundColor: 'white', color: charcoal }}
          >
            <option value="all">Alle Status</option>
            <option value="pending">Ausstehend</option>
            <option value="confirmed">Bestätigt</option>
            <option value="completed">Abgeschlossen</option>
            <option value="cancelled">Storniert</option>
            <option value="no_show">Nicht erschienen</option>
          </select>
        </div>
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-center">
            <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
            <p style={{ color: charcoal }}>Buchungen werden geladen...</p>
          </div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Calendar size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
          <p style={{ color: `${charcoal}66` }}>Keine Buchungen gefunden</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ backgroundColor: cream }}>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Kunde
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Behandlung
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Datum & Zeit
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Preis
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Status
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                    Aktionen
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: cream }}>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <p className="font-medium" style={{ color: charcoal }}>
                        {getCustomerName(booking)}
                      </p>
                      <p className="text-sm" style={{ color: `${charcoal}66` }}>
                        {booking.profiles?.email || booking.customer_email}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p style={{ color: charcoal }}>{booking.services?.name || 'N/A'}</p>
                      <p className="text-sm" style={{ color: `${charcoal}66` }}>
                        {booking.specialists?.name || 'N/A'}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p style={{ color: charcoal }}>
                        {new Date(booking.booking_date).toLocaleDateString('de-CH')}
                      </p>
                      <p className="text-sm" style={{ color: `${charcoal}66` }}>
                        {booking.start_time}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium" style={{ color: blush }}>
                        CHF {booking.service_price}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedBooking(booking)}
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: blush }}
                          title="Details anzeigen"
                        >
                          <Eye size={18} />
                        </button>
                        {booking.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateStatus(booking.id, 'confirmed')}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#22c55e' }}
                              title="Bestätigen"
                            >
                              <Check size={18} />
                            </button>
                            <button
                              onClick={() => updateStatus(booking.id, 'cancelled')}
                              className="p-2 rounded-lg transition-colors"
                              style={{ color: '#f87171' }}
                              title="Stornieren"
                            >
                              <X size={18} />
                            </button>
                          </>
                        )}
                        {booking.status === 'confirmed' && (
                          <button
                            onClick={() => updateStatus(booking.id, 'completed')}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#3b82f6' }}
                            title="Abschließen"
                          >
                            <Check size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-light" style={{ color: charcoal }}>
                Buchungs<span className="italic" style={{ color: blush }}>details</span>
              </h2>
              <button onClick={() => setSelectedBooking(null)} style={{ color: `${charcoal}66` }}>
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <p className="text-sm font-medium" style={{ color: `${charcoal}66` }}>Kunde</p>
                <p className="font-medium" style={{ color: charcoal }}>{getCustomerName(selectedBooking)}</p>
                <p className="text-sm" style={{ color: charcoal }}>
                  {selectedBooking.profiles?.email || selectedBooking.customer_email}
                </p>
                <p className="text-sm" style={{ color: charcoal }}>
                  {selectedBooking.profiles?.phone || selectedBooking.customer_phone}
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <p className="text-sm font-medium" style={{ color: `${charcoal}66` }}>Behandlung</p>
                <p className="font-medium" style={{ color: charcoal }}>{selectedBooking.services?.name}</p>
                <p className="text-sm" style={{ color: charcoal }}>
                  Spezialist: {selectedBooking.specialists?.name}
                </p>
                <p className="text-sm" style={{ color: charcoal }}>
                  Dauer: {selectedBooking.services?.duration_minutes} Min.
                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <p className="text-sm font-medium" style={{ color: `${charcoal}66` }}>Termin</p>
                <p className="font-medium" style={{ color: charcoal }}>
                  {new Date(selectedBooking.booking_date).toLocaleDateString('de-CH', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-sm" style={{ color: charcoal }}>um {selectedBooking.start_time} Uhr</p>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl" style={{ backgroundColor: cream }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: `${charcoal}66` }}>Preis</p>
                  <p className="text-xl font-semibold" style={{ color: blush }}>CHF {selectedBooking.service_price}</p>
                </div>
                <span
                  className="px-4 py-2 rounded-full text-sm font-medium text-white"
                  style={{ backgroundColor: getStatusColor(selectedBooking.status) }}
                >
                  {getStatusText(selectedBooking.status)}
                </span>
              </div>

              {selectedBooking.notes && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: cream }}>
                  <p className="text-sm font-medium" style={{ color: `${charcoal}66` }}>Notizen</p>
                  <p style={{ color: charcoal }}>{selectedBooking.notes}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                {selectedBooking.status === 'pending' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                      className="flex-1 py-3 rounded-xl font-medium text-white"
                      style={{ backgroundColor: '#22c55e' }}
                    >
                      Bestätigen
                    </button>
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                      className="flex-1 py-3 rounded-xl font-medium text-white"
                      style={{ backgroundColor: '#f87171' }}
                    >
                      Stornieren
                    </button>
                  </>
                )}
                {selectedBooking.status === 'confirmed' && (
                  <>
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'completed')}
                      className="flex-1 py-3 rounded-xl font-medium text-white"
                      style={{ backgroundColor: '#3b82f6' }}
                    >
                      Als erledigt markieren
                    </button>
                    <button
                      onClick={() => updateStatus(selectedBooking.id, 'no_show')}
                      className="flex-1 py-3 rounded-xl font-medium text-white"
                      style={{ backgroundColor: '#9ca3af' }}
                    >
                      Nicht erschienen
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
