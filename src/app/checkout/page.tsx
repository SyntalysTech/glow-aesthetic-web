'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCart, createBooking, clearCart } from '@/lib/bookings';
import ConsentDocument from '@/components/ConsentDocument';
import { CreditCard, Smartphone, Banknote, Shield, Check, Loader } from 'lucide-react';
import Header from '@/components/Header';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

export default function CheckoutPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [cart, setCart] = useState(getCart());
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'twint' | 'cash'>('card');
  const [showConsent, setShowConsent] = useState(false);
  const [consentSignature, setConsentSignature] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Card details (simulated)
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth');
      return;
    }
    if (cart.length === 0) {
      router.push('/booking');
      return;
    }
  }, [isAuthenticated, cart, router]);

  const totalPrice = cart.reduce((sum, item) => sum + item.service.price, 0);

  const handleConsentSign = (signature: string) => {
    setConsentSignature(signature);
    setShowConsent(false);
  };

  const handlePayment = async () => {
    if (!user || !consentSignature) return;

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = createBooking(
      user.id,
      cart,
      paymentMethod === 'card' ? 'Kreditkarte' : paymentMethod === 'twint' ? 'TWINT' : 'Barzahlung',
      true
    );

    if (result.success) {
      setShowSuccess(true);
      clearCart();
      // Redirect to success page after 3 seconds
      setTimeout(() => {
        router.push('/profile');
      }, 3000);
    }

    setIsProcessing(false);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (!user || cart.length === 0) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen pt-32 pb-20" style={{ backgroundColor: cream }}>
        <div className="max-w-5xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-light mb-4" style={{ color: charcoal }}>
              <span className="italic" style={{ color: blush }}>Sichere</span> Bezahlung
            </h1>
            <p style={{ color: `${charcoal}99` }}>Schließen Sie Ihre Buchung ab</p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Consent Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: consentSignature ? '#4ade8033' : `${blush}33` }}
                    >
                      {consentSignature ? (
                        <Check size={24} style={{ color: '#4ade80' }} />
                      ) : (
                        <Shield size={24} style={{ color: blush }} />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium" style={{ color: charcoal }}>
                        Einverständniserklärung
                      </h3>
                      <p className="text-sm" style={{ color: `${charcoal}66` }}>
                        {consentSignature ? 'Unterschrieben ✓' : 'Bitte unterschreiben Sie das Dokument'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowConsent(true)}
                    className="px-6 py-2 rounded-full font-medium transition-all"
                    style={{
                      backgroundColor: consentSignature ? cream : blush,
                      color: consentSignature ? charcoal : 'white',
                    }}
                  >
                    {consentSignature ? 'Erneut ansehen' : 'Dokument öffnen'}
                  </button>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white rounded-2xl p-8"
                style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
              >
                <h2 className="text-2xl font-light mb-6" style={{ color: charcoal }}>
                  Zahlungs<span className="italic" style={{ color: blush }}>methode</span>
                </h2>

                <div className="grid sm:grid-cols-3 gap-4 mb-8">
                  {[
                    { id: 'card', icon: CreditCard, label: 'Kreditkarte' },
                    { id: 'twint', icon: Smartphone, label: 'TWINT' },
                    { id: 'cash', icon: Banknote, label: 'Bar im Studio' },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id as any)}
                      className="p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2"
                      style={{
                        borderColor: paymentMethod === method.id ? blush : cream,
                        backgroundColor: paymentMethod === method.id ? `${blush}0d` : 'white',
                      }}
                    >
                      <method.icon size={28} style={{ color: paymentMethod === method.id ? blush : charcoal }} />
                      <span className="text-sm font-medium" style={{ color: charcoal }}>
                        {method.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Card Payment Form */}
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                        Kartennummer
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        maxLength={19}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                        style={{ borderColor: cream, backgroundColor: cream }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                        Karteninhaber
                      </label>
                      <input
                        type="text"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value.toUpperCase())}
                        placeholder="MAX MUSTERMANN"
                        className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                        style={{ borderColor: cream, backgroundColor: cream }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                        onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                          Gültig bis
                        </label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                          maxLength={5}
                          placeholder="MM/JJ"
                          className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                          style={{ borderColor: cream, backgroundColor: cream }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                          CVC
                        </label>
                        <input
                          type="text"
                          value={cardCVC}
                          onChange={(e) => setCardCVC(e.target.value.replace(/\D/g, '').slice(0, 3))}
                          maxLength={3}
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-xl border-2 transition-colors"
                          style={{ borderColor: cream, backgroundColor: cream }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = blush)}
                          onBlur={(e) => (e.currentTarget.style.borderColor = cream)}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* TWINT Info */}
                {paymentMethod === 'twint' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 rounded-xl text-center"
                    style={{ backgroundColor: cream }}
                  >
                    <Smartphone size={48} className="mx-auto mb-4" style={{ color: blush }} />
                    <p style={{ color: charcoal }}>
                      Sie werden nach der Bestätigung zum TWINT-Payment weitergeleitet.
                    </p>
                  </motion.div>
                )}

                {/* Cash Info */}
                {paymentMethod === 'cash' && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-6 rounded-xl text-center"
                    style={{ backgroundColor: cream }}
                  >
                    <Banknote size={48} className="mx-auto mb-4" style={{ color: blush }} />
                    <p style={{ color: charcoal }}>
                      Zahlung erfolgt direkt im Studio bei Ihrem Termin.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-2xl p-8 sticky top-32" style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                <h2 className="text-2xl font-light mb-6" style={{ color: charcoal }}>
                  Ihre <span className="italic" style={{ color: blush }}>Buchung</span>
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.map((item, index) => (
                    <div key={index} className="pb-4 border-b" style={{ borderColor: cream }}>
                      <p className="font-medium mb-1" style={{ color: charcoal }}>
                        {item.service.name}
                      </p>
                      <p className="text-sm mb-2" style={{ color: `${charcoal}66` }}>
                        {new Date(item.date).toLocaleDateString('de-CH')} • {item.time}
                      </p>
                      <p className="text-sm font-medium" style={{ color: blush }}>
                        CHF {item.service.price}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t mb-6" style={{ borderColor: cream }}>
                  <div className="flex justify-between items-center mb-2">
                    <span style={{ color: `${charcoal}80` }}>Zwischensumme</span>
                    <span style={{ color: charcoal }}>CHF {totalPrice}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span style={{ color: `${charcoal}80` }}>MwSt. (7.7%)</span>
                    <span style={{ color: charcoal }}>CHF {(totalPrice * 0.077).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xl">
                    <span className="font-medium" style={{ color: charcoal }}>
                      Total
                    </span>
                    <span className="font-medium" style={{ color: blush }}>
                      CHF {(totalPrice * 1.077).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={!consentSignature || isProcessing || (paymentMethod === 'card' && (!cardNumber || !cardName || !cardExpiry || !cardCVC))}
                  className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: consentSignature && !isProcessing ? blush : '#ccc',
                    cursor: consentSignature && !isProcessing ? 'pointer' : 'not-allowed',
                    opacity: consentSignature && !isProcessing ? 1 : 0.5,
                  }}
                >
                  {isProcessing ? (
                    <>
                      <Loader size={20} className="animate-spin" />
                      <span>Wird verarbeitet...</span>
                    </>
                  ) : (
                    <>
                      <Shield size={20} />
                      <span>Jetzt sicher bezahlen</span>
                    </>
                  )}
                </button>

                <p className="text-xs text-center mt-4" style={{ color: `${charcoal}66` }}>
                  Ihre Zahlung wird sicher verschlüsselt übertragen
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Consent Document Modal */}
      <AnimatePresence>
        {showConsent && (
          <ConsentDocument
            userName={`${user.firstName} ${user.lastName}`}
            services={cart.map((item) => item.service.name)}
            onSign={handleConsentSign}
            onCancel={() => setShowConsent(false)}
          />
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white rounded-3xl p-12 max-w-md text-center"
              style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3)' }}
            >
              <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center" style={{ backgroundColor: '#4ade8033' }}>
                <Check size={48} style={{ color: '#4ade80' }} />
              </div>
              <h2 className="text-3xl font-light mb-4" style={{ color: charcoal }}>
                Buchung <span className="italic" style={{ color: blush }}>erfolgreich!</span>
              </h2>
              <p className="mb-6" style={{ color: `${charcoal}66` }}>
                Ihre Termine wurden bestätigt. Wir freuen uns auf Sie!
              </p>
              <div className="flex gap-2">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 h-1 rounded-full" style={{ backgroundColor: blush }} />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
