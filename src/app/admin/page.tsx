'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Package, ShoppingBag, Users, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface DashboardStats {
  totalBookings: number;
  pendingBookings: number;
  todayBookings: number;
  totalCustomers: number;
  totalServices: number;
  totalProducts: number;
  pendingContacts: number;
  pendingReviews: number;
}

interface RecentBooking {
  id: string;
  customer_name: string | null;
  customer_email: string | null;
  booking_date: string;
  booking_time: string;
  status: string;
  total_price: number;
  services?: { name: string } | null;
  specialists?: { name: string } | null;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    todayBookings: 0,
    totalCustomers: 0,
    totalServices: 0,
    totalProducts: 0,
    pendingContacts: 0,
    pendingReviews: 0,
  });
  const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    const supabase = getSupabaseClient();
    const today = new Date().toISOString().split('T')[0];

    try {
      // Load stats in parallel
      const [
        bookingsResult,
        pendingBookingsResult,
        todayBookingsResult,
        customersResult,
        servicesResult,
        productsResult,
        contactsResult,
        reviewsResult,
        recentResult,
      ] = await Promise.all([
        supabase.from('bookings').select('id', { count: 'exact', head: true }),
        supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
        supabase.from('bookings').select('id', { count: 'exact', head: true }).eq('booking_date', today),
        supabase.from('profiles').select('id', { count: 'exact', head: true }),
        supabase.from('services').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('products').select('id', { count: 'exact', head: true }).eq('is_active', true),
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).eq('is_read', false),
        supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('is_approved', false),
        supabase
          .from('bookings')
          .select('*, services(name), specialists(name)')
          .order('created_at', { ascending: false })
          .limit(5),
      ]);

      setStats({
        totalBookings: bookingsResult.count || 0,
        pendingBookings: pendingBookingsResult.count || 0,
        todayBookings: todayBookingsResult.count || 0,
        totalCustomers: customersResult.count || 0,
        totalServices: servicesResult.count || 0,
        totalProducts: productsResult.count || 0,
        pendingContacts: contactsResult.count || 0,
        pendingReviews: reviewsResult.count || 0,
      });

      setRecentBookings(recentResult.data || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4ade80';
      case 'pending': return blush;
      case 'completed': return '#60a5fa';
      case 'cancelled': return '#f87171';
      default: return charcoal;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Bestätigt';
      case 'pending': return 'Ausstehend';
      case 'completed': return 'Abgeschlossen';
      case 'cancelled': return 'Storniert';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
          <p style={{ color: charcoal }}>Dashboard wird geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light" style={{ color: charcoal }}>
          Willkommen im <span className="italic" style={{ color: blush }}>Admin-Bereich</span>
        </h1>
        <p className="mt-2" style={{ color: `${charcoal}66` }}>
          Hier sehen Sie eine Übersicht Ihres Geschäfts.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: `${blush}20` }}>
              <Calendar size={24} style={{ color: blush }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: `${charcoal}66` }}>Heutige Buchungen</p>
              <p className="text-2xl font-semibold" style={{ color: charcoal }}>{stats.todayBookings}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#fef3c720' }}>
              <Clock size={24} style={{ color: '#f59e0b' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: `${charcoal}66` }}>Ausstehend</p>
              <p className="text-2xl font-semibold" style={{ color: charcoal }}>{stats.pendingBookings}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#dcfce720' }}>
              <Users size={24} style={{ color: '#22c55e' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: `${charcoal}66` }}>Kunden</p>
              <p className="text-2xl font-semibold" style={{ color: charcoal }}>{stats.totalCustomers}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-sm"
        >
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl" style={{ backgroundColor: '#dbeafe20' }}>
              <TrendingUp size={24} style={{ color: '#3b82f6' }} />
            </div>
            <div>
              <p className="text-sm" style={{ color: `${charcoal}66` }}>Gesamt Buchungen</p>
              <p className="text-2xl font-semibold" style={{ color: charcoal }}>{stats.totalBookings}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-medium" style={{ color: charcoal }}>
                Neueste Buchungen
              </h2>
              <Link
                href="/admin/bookings"
                className="text-sm px-4 py-2 rounded-lg transition-colors"
                style={{ color: blush, backgroundColor: `${blush}20` }}
              >
                Alle anzeigen
              </Link>
            </div>

            {recentBookings.length === 0 ? (
              <p className="text-center py-8" style={{ color: `${charcoal}66` }}>
                Noch keine Buchungen vorhanden
              </p>
            ) : (
              <div className="space-y-4">
                {recentBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-xl"
                    style={{ backgroundColor: cream }}
                  >
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: charcoal }}>
                        {booking.customer_name || booking.customer_email || 'Unbekannt'}
                      </p>
                      <p className="text-sm" style={{ color: `${charcoal}66` }}>
                        {booking.services?.name || 'Service'} • {booking.specialists?.name || 'Specialist'}
                      </p>
                      <p className="text-xs" style={{ color: `${charcoal}50` }}>
                        {new Date(booking.booking_date).toLocaleDateString('de-CH')} um {booking.booking_time}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-medium" style={{ color: blush }}>
                        CHF {booking.total_price}
                      </span>
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium text-white"
                        style={{ backgroundColor: getStatusColor(booking.status) }}
                      >
                        {getStatusText(booking.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </motion.div>

        {/* Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-medium mb-6" style={{ color: charcoal }}>
              Aktionen erforderlich
            </h2>

            <div className="space-y-4">
              {stats.pendingBookings > 0 && (
                <Link
                  href="/admin/bookings?status=pending"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                  style={{ backgroundColor: '#fef3c720' }}
                >
                  <Clock size={20} style={{ color: '#f59e0b' }} />
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: charcoal }}>
                      {stats.pendingBookings} ausstehende Buchungen
                    </p>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>
                      Warten auf Bestätigung
                    </p>
                  </div>
                </Link>
              )}

              {stats.pendingContacts > 0 && (
                <Link
                  href="/admin/contacts"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                  style={{ backgroundColor: `${blush}20` }}
                >
                  <AlertCircle size={20} style={{ color: blush }} />
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: charcoal }}>
                      {stats.pendingContacts} neue Kontaktanfragen
                    </p>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>
                      Ungelesene Nachrichten
                    </p>
                  </div>
                </Link>
              )}

              {stats.pendingReviews > 0 && (
                <Link
                  href="/admin/reviews"
                  className="flex items-center gap-3 p-4 rounded-xl transition-colors"
                  style={{ backgroundColor: '#dbeafe20' }}
                >
                  <CheckCircle size={20} style={{ color: '#3b82f6' }} />
                  <div className="flex-1">
                    <p className="font-medium text-sm" style={{ color: charcoal }}>
                      {stats.pendingReviews} Bewertungen zu prüfen
                    </p>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>
                      Warten auf Genehmigung
                    </p>
                  </div>
                </Link>
              )}

              {stats.pendingBookings === 0 && stats.pendingContacts === 0 && stats.pendingReviews === 0 && (
                <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: '#dcfce720' }}>
                  <CheckCircle size={20} style={{ color: '#22c55e' }} />
                  <p className="text-sm" style={{ color: charcoal }}>
                    Alles erledigt! Keine offenen Aufgaben.
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Link
          href="/admin/services"
          className="bg-white rounded-2xl p-6 shadow-sm text-center transition-all hover:shadow-md"
        >
          <Package size={32} className="mx-auto mb-3" style={{ color: blush }} />
          <p className="font-medium" style={{ color: charcoal }}>{stats.totalServices} Behandlungen</p>
        </Link>
        <Link
          href="/admin/products"
          className="bg-white rounded-2xl p-6 shadow-sm text-center transition-all hover:shadow-md"
        >
          <ShoppingBag size={32} className="mx-auto mb-3" style={{ color: blush }} />
          <p className="font-medium" style={{ color: charcoal }}>{stats.totalProducts} Produkte</p>
        </Link>
        <Link
          href="/admin/customers"
          className="bg-white rounded-2xl p-6 shadow-sm text-center transition-all hover:shadow-md"
        >
          <Users size={32} className="mx-auto mb-3" style={{ color: blush }} />
          <p className="font-medium" style={{ color: charcoal }}>{stats.totalCustomers} Kunden</p>
        </Link>
        <Link
          href="/admin/bookings"
          className="bg-white rounded-2xl p-6 shadow-sm text-center transition-all hover:shadow-md"
        >
          <Calendar size={32} className="mx-auto mb-3" style={{ color: blush }} />
          <p className="font-medium" style={{ color: charcoal }}>{stats.totalBookings} Buchungen</p>
        </Link>
      </div>
    </div>
  );
}
