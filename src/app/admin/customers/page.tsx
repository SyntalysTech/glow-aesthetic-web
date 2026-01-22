'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Mail, Phone, Calendar, Eye } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

interface Customer {
  id: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  is_admin: boolean;
  created_at: string;
  bookings_count?: number;
}

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerBookings, setCustomerBookings] = useState<any[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    setLoading(true);
    const supabase = getSupabaseClient();

    // Get profiles with booking counts
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading customers:', error);
    } else {
      setCustomers(data || []);
    }
    setLoading(false);
  };

  const loadCustomerBookings = async (customerId: string) => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from('bookings')
      .select('*, services(name)')
      .eq('user_id', customerId)
      .order('booking_date', { ascending: false })
      .limit(10);

    if (!error && data) {
      setCustomerBookings(data);
    }
  };

  const openCustomerDetail = (customer: Customer) => {
    setSelectedCustomer(customer);
    loadCustomerBookings(customer.id);
  };

  const filteredCustomers = customers.filter((customer) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      customer.email.toLowerCase().includes(searchLower) ||
      customer.first_name?.toLowerCase().includes(searchLower) ||
      customer.last_name?.toLowerCase().includes(searchLower) ||
      customer.phone?.includes(search)
    );
  });

  const getCustomerName = (customer: Customer) => {
    if (customer.first_name || customer.last_name) {
      return `${customer.first_name || ''} ${customer.last_name || ''}`.trim();
    }
    return customer.email;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#4ade80';
      case 'pending': return '#f59e0b';
      case 'completed': return '#60a5fa';
      case 'cancelled': return '#f87171';
      default: return charcoal;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-light" style={{ color: charcoal }}>
          <span className="italic" style={{ color: blush }}>Kunden</span> verwalten
        </h1>
        <p className="mt-1" style={{ color: `${charcoal}66` }}>
          {customers.length} registrierte Kunden
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: `${charcoal}50` }} />
        <input
          type="text"
          placeholder="Suchen nach Name, Email, Telefon..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border-2"
          style={{ borderColor: cream, backgroundColor: 'white' }}
        />
      </div>

      {/* Content */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white rounded-2xl p-8 text-center">
              <div className="animate-pulse">
                <div className="w-12 h-12 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
                <p style={{ color: charcoal }}>Laden...</p>
              </div>
            </div>
          ) : filteredCustomers.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center">
              <Users size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
              <p style={{ color: `${charcoal}66` }}>Keine Kunden gefunden</p>
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
                        Kontakt
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                        Registriert
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider" style={{ color: `${charcoal}66` }}>
                        Aktion
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y" style={{ borderColor: cream }}>
                    {filteredCustomers.map((customer) => (
                      <tr
                        key={customer.id}
                        className={`hover:bg-gray-50 cursor-pointer ${
                          selectedCustomer?.id === customer.id ? 'bg-gray-50' : ''
                        }`}
                        onClick={() => openCustomerDetail(customer)}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                              style={{ backgroundColor: blush }}
                            >
                              {(customer.first_name?.[0] || customer.email[0]).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium" style={{ color: charcoal }}>
                                {getCustomerName(customer)}
                              </p>
                              {customer.is_admin && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-purple-100 text-purple-700">
                                  Admin
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm" style={{ color: charcoal }}>{customer.email}</p>
                          {customer.phone && (
                            <p className="text-sm" style={{ color: `${charcoal}66` }}>{customer.phone}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm" style={{ color: `${charcoal}66` }}>
                            {new Date(customer.created_at).toLocaleDateString('de-CH')}
                          </p>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: blush }}
                          >
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Customer Detail */}
        <div className="lg:col-span-1">
          {selectedCustomer ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <div className="text-center mb-6">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-medium mx-auto mb-4"
                  style={{ backgroundColor: blush }}
                >
                  {(selectedCustomer.first_name?.[0] || selectedCustomer.email[0]).toUpperCase()}
                </div>
                <h2 className="text-xl font-medium" style={{ color: charcoal }}>
                  {getCustomerName(selectedCustomer)}
                </h2>
                {selectedCustomer.is_admin && (
                  <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                    Administrator
                  </span>
                )}
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: cream }}>
                  <Mail size={18} style={{ color: blush }} />
                  <div>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>E-Mail</p>
                    <a href={`mailto:${selectedCustomer.email}`} style={{ color: charcoal }}>
                      {selectedCustomer.email}
                    </a>
                  </div>
                </div>

                {selectedCustomer.phone && (
                  <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: cream }}>
                    <Phone size={18} style={{ color: blush }} />
                    <div>
                      <p className="text-xs" style={{ color: `${charcoal}66` }}>Telefon</p>
                      <a href={`tel:${selectedCustomer.phone}`} style={{ color: charcoal }}>
                        {selectedCustomer.phone}
                      </a>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: cream }}>
                  <Calendar size={18} style={{ color: blush }} />
                  <div>
                    <p className="text-xs" style={{ color: `${charcoal}66` }}>Registriert seit</p>
                    <p style={{ color: charcoal }}>
                      {new Date(selectedCustomer.created_at).toLocaleDateString('de-CH', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Recent Bookings */}
              <div className="mt-6">
                <h3 className="font-medium mb-3" style={{ color: charcoal }}>
                  Letzte Buchungen
                </h3>
                {customerBookings.length === 0 ? (
                  <p className="text-sm text-center py-4" style={{ color: `${charcoal}66` }}>
                    Noch keine Buchungen
                  </p>
                ) : (
                  <div className="space-y-2">
                    {customerBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="p-3 rounded-xl text-sm"
                        style={{ backgroundColor: cream }}
                      >
                        <div className="flex items-center justify-between">
                          <span style={{ color: charcoal }}>{booking.services?.name || 'Service'}</span>
                          <span
                            className="px-2 py-0.5 rounded-full text-xs text-white"
                            style={{ backgroundColor: getStatusColor(booking.status) }}
                          >
                            {booking.status}
                          </span>
                        </div>
                        <p className="text-xs mt-1" style={{ color: `${charcoal}66` }}>
                          {new Date(booking.booking_date).toLocaleDateString('de-CH')} um {booking.booking_time}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-2xl p-8 text-center">
              <Eye size={48} className="mx-auto mb-4" style={{ color: `${charcoal}30` }} />
              <p style={{ color: `${charcoal}66` }}>
                Wählen Sie einen Kunden aus der Liste
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
