'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCart, removeFromCart, BookingItem } from '@/lib/bookings';
import { Trash2, Calendar, Clock, User, ArrowRight, ShoppingCart } from 'lucide-react';
import Header from '@/components/Header';
import Link from 'next/link';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

export default function CartPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState<BookingItem[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    setCart(getCart());
  }, [isAuthenticated, router]);

  const handleRemove = (index: number) => {
    removeFromCart(index);
    setCart(getCart());
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.service.price, 0);
  const totalDuration = cart.reduce((sum, item) => sum + item.service.duration, 0);

  if (!isAuthenticated) return null;

  return (
    <>
      <Header />
    <div className="min-h-screen pt-32 pb-20" style={{ backgroundColor: cream }}>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-light mb-4" style={{ color: charcoal }}>
            Ihr <span className="italic" style={{ color: blush }}>Warenkorb</span>
          </h1>
          <p style={{ color: `${charcoal}99` }}>
            {cart.length} {cart.length === 1 ? 'Service' : 'Services'} ausgewählt
          </p>
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-12 text-center"
            style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
          >
            <ShoppingCart size={64} className="mx-auto mb-6" style={{ color: `${charcoal}33` }} />
            <h2 className="text-2xl font-light mb-4" style={{ color: charcoal }}>
              Ihr Warenkorb ist leer
            </h2>
            <p className="mb-8" style={{ color: `${charcoal}66` }}>
              Fügen Sie Services hinzu, um mit der Buchung fortzufahren
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-white transition-all"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              Services Durchsuchen
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <AnimatePresence>
                {cart.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl p-6"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <h3 className="text-xl font-medium" style={{ color: charcoal }}>
                            {item.service.name}
                          </h3>
                          <button
                            onClick={() => handleRemove(index)}
                            className="p-2 rounded-lg transition-colors"
                            style={{ color: '#f87171' }}
                            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee')}
                            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p className="text-sm mb-4" style={{ color: `${charcoal}66` }}>
                          {item.service.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="flex items-center gap-2" style={{ color: `${charcoal}80` }}>
                            <Calendar size={16} style={{ color: blush }} />
                            <span>{new Date(item.date).toLocaleDateString('de-CH', { weekday: 'short', day: 'numeric', month: 'short' })}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: `${charcoal}80` }}>
                            <Clock size={16} style={{ color: blush }} />
                            <span>{item.time}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: `${charcoal}80` }}>
                            <User size={16} style={{ color: blush }} />
                            <span>{item.specialist}</span>
                          </div>
                          <div className="flex items-center gap-2" style={{ color: `${charcoal}80` }}>
                            <Clock size={16} style={{ color: blush }} />
                            <span>{item.service.duration} Min</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t flex justify-between items-center" style={{ borderColor: cream }}>
                      <span className="text-sm font-medium" style={{ color: charcoal }}>
                        Preis
                      </span>
                      <span className="text-2xl font-medium" style={{ color: blush }}>
                        CHF {item.service.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-8 sticky top-32" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 className="text-2xl font-light mb-6" style={{ color: charcoal }}>
                  Zusammen<span className="italic" style={{ color: blush }}>fassung</span>
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span style={{ color: `${charcoal}80` }}>Services</span>
                    <span style={{ color: charcoal }}>{cart.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span style={{ color: `${charcoal}80` }}>Gesamtdauer</span>
                    <span style={{ color: charcoal }}>{totalDuration} Min</span>
                  </div>
                  <div className="h-px" style={{ backgroundColor: cream }} />
                  <div className="flex justify-between items-center">
                    <span className="font-medium" style={{ color: charcoal }}>
                      Gesamt
                    </span>
                    <span className="text-3xl font-medium" style={{ color: blush }}>
                      CHF {totalPrice}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all mb-4"
                  style={{ backgroundColor: blush }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
                >
                  Zur Kasse
                  <ArrowRight size={20} />
                </button>

                <Link
                  href="/booking"
                  className="block text-center text-sm py-3 rounded-full transition-colors"
                  style={{ color: blush }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = cream)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                >
                  Weitere Services hinzufügen
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
