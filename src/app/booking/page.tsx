'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { services, addToCart, getCart, BookingItem, getAvailableSlots } from '@/lib/bookings';
import { Calendar, Clock, User, ShoppingCart, Plus, ArrowRight, Filter } from 'lucide-react';
import Header from '@/components/Header';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

// Specialist photos
const specialistPhotos: Record<string, string> = {
  Sofia: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces',
  Elena: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=faces',
  Marina: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=400&fit=crop&crop=faces',
};

export default function BookingPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = ['all', 'Wimpern', 'Gesicht', 'Körper'];

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    // Update cart count
    setCartCount(getCart().length);
  }, []);

  useEffect(() => {
    if (selectedDate && selectedService) {
      const service = services.find((s) => s.id === selectedService);
      if (service) {
        const slots = getAvailableSlots(selectedDate, service.specialist || '');
        setAvailableSlots(slots);
      }
    }
  }, [selectedDate, selectedService]);

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  const handleAddToCart = () => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const service = services.find((s) => s.id === selectedService);
    if (!service) return;

    const item: BookingItem = {
      service,
      date: selectedDate,
      time: selectedTime,
      specialist: service.specialist || '',
    };

    addToCart(item);
    setCartCount(getCart().length);
    setShowSuccess(true);

    // Reset selection
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');

    // Hide success message after 3 seconds
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Generate next 30 days
  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push(date.toISOString().split('T')[0]);
      }
    }
    return dates;
  };

  const availableDates = generateAvailableDates();

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
    <div className="min-h-screen pt-32 pb-20" style={{ backgroundColor: cream }}>
      <div className="max-w-7xl mx-auto px-6">
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
                Termin <span className="italic" style={{ color: blush }}>Buchen</span>
              </h1>
              <p className="mt-2" style={{ color: `${charcoal}99` }}>
                Wählen Sie Ihre gewünschten Services und Termine
              </p>
            </div>
            <button
              onClick={() => router.push('/cart')}
              className="px-6 py-3 rounded-full font-medium text-white flex items-center gap-2 transition-all relative"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              <ShoppingCart size={18} />
              <span>Warenkorb</span>
              {cartCount > 0 && (
                <span
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: charcoal, color: 'white' }}
                >
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </motion.div>

        {/* Success notification */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 right-6 z-50 px-6 py-4 rounded-2xl text-white font-medium shadow-lg"
              style={{ backgroundColor: '#4ade80' }}
            >
              ✓ Zum Warenkorb hinzugefügt!
            </motion.div>
          )}
        </AnimatePresence>

        {/* Category filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Filter size={20} style={{ color: blush }} />
            <span className="font-medium" style={{ color: charcoal }}>
              Kategorie
            </span>
          </div>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full font-medium transition-all"
                style={{
                  backgroundColor: selectedCategory === category ? blush : 'white',
                  color: selectedCategory === category ? 'white' : charcoal,
                  border: `2px solid ${selectedCategory === category ? blush : cream}`,
                }}
              >
                {category === 'all' ? 'Alle Services' : category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedService(service.id)}
              className="bg-white rounded-2xl p-6 cursor-pointer transition-all"
              style={{
                boxShadow: selectedService === service.id ? `0 0 0 3px ${blush}` : '0 4px 20px rgba(0,0,0,0.05)',
                border: `2px solid ${selectedService === service.id ? blush : 'transparent'}`,
              }}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: `${blush}1a`, color: blush }}>
                  {service.category}
                </span>
                <span className="text-xl font-medium" style={{ color: blush }}>
                  CHF {service.price}
                </span>
              </div>

              <h3 className="text-xl font-medium mb-2" style={{ color: charcoal }}>
                {service.name}
              </h3>

              <p className="text-sm mb-4" style={{ color: `${charcoal}66` }}>
                {service.description}
              </p>

              <div className="flex items-center gap-4 text-sm" style={{ color: `${charcoal}80` }}>
                <span className="flex items-center gap-1">
                  <Clock size={16} />
                  {service.duration} Min
                </span>
                {service.specialist && (
                  <span className="flex items-center gap-2">
                    <img
                      src={specialistPhotos[service.specialist]}
                      alt={service.specialist}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span>{service.specialist}</span>
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Booking Form */}
        <AnimatePresence>
          {selectedService && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white rounded-3xl p-8 mb-12"
              style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
            >
              <h2 className="text-2xl font-light mb-6" style={{ color: charcoal }}>
                Termin <span className="italic" style={{ color: blush }}>wählen</span>
              </h2>

              {/* Date Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3 flex items-center gap-2" style={{ color: charcoal }}>
                  <Calendar size={18} style={{ color: blush }} />
                  Datum auswählen
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
                  {availableDates.map((date) => {
                    const dateObj = new Date(date);
                    return (
                      <button
                        key={date}
                        onClick={() => {
                          setSelectedDate(date);
                          setSelectedTime('');
                        }}
                        className="p-3 rounded-xl font-medium text-sm transition-all"
                        style={{
                          backgroundColor: selectedDate === date ? blush : cream,
                          color: selectedDate === date ? 'white' : charcoal,
                        }}
                      >
                        <div>{dateObj.getDate()}</div>
                        <div className="text-xs opacity-70">
                          {dateObj.toLocaleDateString('de-CH', { weekday: 'short' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <label className="block text-sm font-medium mb-3 flex items-center gap-2" style={{ color: charcoal }}>
                    <Clock size={18} style={{ color: blush }} />
                    Zeit auswählen
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className="p-3 rounded-xl font-medium text-sm transition-all"
                          style={{
                            backgroundColor: selectedTime === time ? blush : cream,
                            color: selectedTime === time ? 'white' : charcoal,
                          }}
                        >
                          {time}
                        </button>
                      ))
                    ) : (
                      <p className="col-span-full text-center py-4" style={{ color: `${charcoal}66` }}>
                        Keine verfügbaren Zeiten für diesen Tag
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Add to Cart Button */}
              {selectedDate && selectedTime && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={handleAddToCart}
                  className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all"
                  style={{ backgroundColor: blush }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
                >
                  <Plus size={20} />
                  <span>Zum Warenkorb hinzufügen</span>
                </motion.button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    </>
  );
}
