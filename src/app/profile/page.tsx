'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { updateUser } from '@/lib/auth';
import { getUserBookings, Booking } from '@/lib/bookings';
import { User, Mail, Phone, MapPin, Calendar, LogOut, Edit2, Save, X, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

// Specialist photos
const specialistPhotos: Record<string, string> = {
  Sofia: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
  Elena: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=687&auto=format&fit=crop',
  Marina: 'https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
};

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth');
      return;
    }

    if (user) {
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone,
        dateOfBirth: user.dateOfBirth || '',
        street: user.address?.street || '',
        city: user.address?.city || '',
        postalCode: user.address?.postalCode || '',
      });

      // Load bookings asynchronously
      const loadBookings = async () => {
        const userBookings = await getUserBookings(user.id);
        setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      };
      loadBookings();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const result = await updateUser({
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      dateOfBirth: formData.dateOfBirth,
      address: {
        street: formData.street,
        city: formData.city,
        postalCode: formData.postalCode,
      },
    });

    if (result.success) {
      await refreshUser();
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#4ade80';
      case 'pending':
        return blush;
      case 'completed':
        return '#60a5fa';
      case 'cancelled':
        return '#f87171';
      default:
        return charcoal;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'Bestätigt';
      case 'pending':
        return 'Ausstehend';
      case 'completed':
        return 'Abgeschlossen';
      case 'cancelled':
        return 'Storniert';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen pt-32 pb-20 flex items-center justify-center" style={{ backgroundColor: cream }}>
          <div className="animate-pulse text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4" style={{ backgroundColor: blush }} />
            <p style={{ color: charcoal }}>Laden...</p>
          </div>
        </div>
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Header />
    <div className="min-h-screen pt-32 pb-20" style={{ backgroundColor: cream }}>
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-4xl sm:text-5xl font-light" style={{ color: charcoal }}>
                Mein <span className="italic" style={{ color: blush }}>Profil</span>
              </h1>
              <p className="mt-2" style={{ color: `${charcoal}99` }}>
                Verwalten Sie Ihre Informationen und Buchungen
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/booking"
                className="px-6 py-3 rounded-full font-medium text-white flex items-center gap-2 transition-all"
                style={{ backgroundColor: blush }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
              >
                <ShoppingBag size={18} />
                <span>Buchen</span>
              </Link>
              <button
                onClick={handleLogout}
                className="px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all"
                style={{ backgroundColor: 'white', color: charcoal }}
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Abmelden</span>
              </button>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-light" style={{ color: charcoal }}>
                  Profil<span className="italic" style={{ color: blush }}>informationen</span>
                </h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full transition-colors"
                    style={{ color: blush }}
                  >
                    <Edit2 size={20} />
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={handleSave}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: '#4ade80' }}
                    >
                      <Save size={20} />
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="p-2 rounded-full transition-colors"
                      style={{ color: '#f87171' }}
                    >
                      <X size={20} />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: `${charcoal}66` }}>
                    <User size={14} className="inline mr-1" />
                    Name
                  </label>
                  {isEditing ? (
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: cream, backgroundColor: cream }}
                        placeholder="Vorname"
                      />
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: cream, backgroundColor: cream }}
                        placeholder="Nachname"
                      />
                    </div>
                  ) : (
                    <p style={{ color: charcoal }}>
                      {user.firstName} {user.lastName}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: `${charcoal}66` }}>
                    <Mail size={14} className="inline mr-1" />
                    E-Mail
                  </label>
                  <p style={{ color: charcoal }}>{user.email}</p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: `${charcoal}66` }}>
                    <Phone size={14} className="inline mr-1" />
                    Telefon
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: cream, backgroundColor: cream }}
                    />
                  ) : (
                    <p style={{ color: charcoal }}>{user.phone}</p>
                  )}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: `${charcoal}66` }}>
                    <Calendar size={14} className="inline mr-1" />
                    Geburtsdatum
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border text-sm"
                      style={{ borderColor: cream, backgroundColor: cream }}
                    />
                  ) : (
                    <p style={{ color: charcoal }}>
                      {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('de-CH') : 'Nicht angegeben'}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div>
                  <label className="block text-xs font-medium mb-1" style={{ color: `${charcoal}66` }}>
                    <MapPin size={14} className="inline mr-1" />
                    Adresse
                  </label>
                  {isEditing ? (
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={formData.street}
                        onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border text-sm"
                        style={{ borderColor: cream, backgroundColor: cream }}
                        placeholder="Strasse & Nummer"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="px-3 py-2 rounded-lg border text-sm"
                          style={{ borderColor: cream, backgroundColor: cream }}
                          placeholder="PLZ"
                        />
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="col-span-2 px-3 py-2 rounded-lg border text-sm"
                          style={{ borderColor: cream, backgroundColor: cream }}
                          placeholder="Stadt"
                        />
                      </div>
                    </div>
                  ) : (
                    <p style={{ color: charcoal }}>
                      {user.address ? (
                        <>
                          {user.address.street}
                          <br />
                          {user.address.postalCode} {user.address.city}
                        </>
                      ) : (
                        'Nicht angegeben'
                      )}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bookings */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
              <h2 className="text-2xl font-light mb-6" style={{ color: charcoal }}>
                Meine <span className="italic" style={{ color: blush }}>Buchungen</span>
              </h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p style={{ color: `${charcoal}66` }} className="mb-4">
                    Sie haben noch keine Buchungen
                  </p>
                  <Link
                    href="/booking"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-white transition-all"
                    style={{ backgroundColor: blush }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
                  >
                    <ShoppingBag size={18} />
                    <span>Jetzt Buchen</span>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 rounded-2xl border-2"
                      style={{ borderColor: cream, backgroundColor: cream }}
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                        <div>
                          <p className="text-sm" style={{ color: `${charcoal}66` }}>
                            Buchung #{booking.id.slice(-8)}
                          </p>
                          <p className="text-xs" style={{ color: `${charcoal}66` }}>
                            {new Date(booking.createdAt).toLocaleDateString('de-CH', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <span
                          className="px-4 py-1 rounded-full text-sm font-medium text-white"
                          style={{ backgroundColor: getStatusColor(booking.status) }}
                        >
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {booking.items.map((item, index) => (
                          <div key={index} className="flex justify-between items-start">
                            <div>
                              <p className="font-medium" style={{ color: charcoal }}>
                                {item.service.name}
                              </p>
                              <p className="text-sm flex items-center gap-2" style={{ color: `${charcoal}66` }}>
                                <img
                                  src={specialistPhotos[item.specialist]}
                                  alt={item.specialist}
                                  className="w-5 h-5 rounded-full object-cover"
                                />
                                <span>{item.specialist} • {new Date(item.date).toLocaleDateString('de-CH')} • {item.time}</span>
                              </p>
                            </div>
                            <p className="font-medium" style={{ color: blush }}>
                              CHF {item.service.price}
                            </p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-4 pt-4 border-t flex justify-between items-center" style={{ borderColor: 'white' }}>
                        <p className="font-medium" style={{ color: charcoal }}>
                          Total
                        </p>
                        <p className="text-xl font-medium" style={{ color: blush }}>
                          CHF {booking.totalPrice}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
    </>
  );
}
