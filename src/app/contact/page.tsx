'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { MapPin, Phone, Clock, Instagram, Mail, ArrowUpRight, Send, Check } from 'lucide-react';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const scheduleItems = [
  { day: 'Montag', hours: '09:00 - 19:00' },
  { day: 'Dienstag', hours: '09:00 - 19:00' },
  { day: 'Mittwoch', hours: '09:00 - 19:00' },
  { day: 'Donnerstag', hours: '09:00 - 19:00' },
  { day: 'Freitag', hours: '09:00 - 19:00' },
  { day: 'Samstag', hours: '09:00 - 16:00' },
  { day: 'Sonntag', hours: 'Geschlossen' },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-100px' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production, you would send this to your email service
    console.log('Form submitted:', formData);

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2072&auto=format&fit=crop"
            alt="Contact background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${charcoal}B3, ${charcoal}80)` }}
          />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: blush }}
          >
            Kontakt
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight"
          >
            Besuchen Sie uns in{' '}
            <span className="italic" style={{ color: blush }}>Horgen</span>
          </motion.h1>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-light mb-8" style={{ color: charcoal }}>
                Kontakt<span className="italic" style={{ color: blush }}>informationen</span>
              </h2>

              {/* Address */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <MapPin className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Adresse</h3>
                </div>
                <div className="ml-16">
                  <p className="text-lg" style={{ color: `${charcoal}B3` }}>
                    Seestrasse 2<br />
                    8810 Horgen<br />
                    Schweiz
                  </p>
                  <a
                    href="https://maps.google.com/?q=Seestrasse+2+8810+Horgen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 hover:underline"
                    style={{ color: blush }}
                  >
                    Auf Google Maps anzeigen
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Telefon</h3>
                </div>
                <div className="ml-16">
                  <a
                    href="tel:+41766092420"
                    className="text-lg transition-colors"
                    style={{ color: `${charcoal}B3` }}
                    onMouseEnter={(e) => e.currentTarget.style.color = blush}
                    onMouseLeave={(e) => e.currentTarget.style.color = `${charcoal}B3`}
                  >
                    +41 76 609 24 20
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Mail className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>E-Mail</h3>
                </div>
                <div className="ml-16">
                  <a
                    href="mailto:info@glow-aesthetics.ch"
                    className="text-lg transition-colors"
                    style={{ color: `${charcoal}B3` }}
                    onMouseEnter={(e) => e.currentTarget.style.color = blush}
                    onMouseLeave={(e) => e.currentTarget.style.color = `${charcoal}B3`}
                  >
                    info@glow-aesthetics.ch
                  </a>
                </div>
              </div>

              {/* Social */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Social Media</h3>
                </div>
                <div className="ml-16 flex gap-3">
                  <a
                    href="https://www.instagram.com/glow.aesthet1cs/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2 rounded-full transition-colors"
                    style={{ border: `1px solid ${blush}33`, color: charcoal }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = blush;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = charcoal;
                    }}
                  >
                    Instagram
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="rounded-3xl p-8 mt-8" style={{ backgroundColor: cream }}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Öffnungszeiten</h3>
                </div>
                <div className="space-y-3">
                  {scheduleItems.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between py-2 last:border-0"
                      style={{
                        borderBottom: `1px solid ${blush}1A`,
                      }}
                    >
                      <span style={{ color: item.hours === 'Geschlossen' ? `${charcoal}66` : charcoal }}>
                        {item.day}
                      </span>
                      <span
                        style={{
                          color: item.hours === 'Geschlossen' ? `${charcoal}66` : blush,
                          fontWeight: item.hours === 'Geschlossen' ? undefined : 500,
                        }}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl font-light mb-8" style={{ color: charcoal }}>
                Nachricht <span className="italic" style={{ color: blush }}>senden</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                      style={{
                        borderColor: `${blush}40`,
                        backgroundColor: cream,
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = blush}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${blush}40`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                      style={{
                        borderColor: `${blush}40`,
                        backgroundColor: cream,
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = blush}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${blush}40`}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                      style={{
                        borderColor: `${blush}40`,
                        backgroundColor: cream,
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = blush}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${blush}40`}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                      Betreff *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none"
                      style={{
                        borderColor: `${blush}40`,
                        backgroundColor: cream,
                        color: charcoal,
                      }}
                      onFocus={(e) => e.currentTarget.style.borderColor = blush}
                      onBlur={(e) => e.currentTarget.style.borderColor = `${blush}40`}
                    >
                      <option value="">Bitte wählen...</option>
                      <option value="booking">Terminanfrage</option>
                      <option value="info">Allgemeine Anfrage</option>
                      <option value="treatment">Behandlungsfragen</option>
                      <option value="products">Produktberatung</option>
                      <option value="other">Sonstiges</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: charcoal }}>
                    Nachricht *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border transition-colors focus:outline-none resize-none"
                    style={{
                      borderColor: `${blush}40`,
                      backgroundColor: cream,
                    }}
                    onFocus={(e) => e.currentTarget.style.borderColor = blush}
                    onBlur={(e) => e.currentTarget.style.borderColor = `${blush}40`}
                    placeholder="Wie können wir Ihnen helfen?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-full font-medium text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    backgroundColor: isSubmitting ? blushDark : blush,
                    opacity: isSubmitting ? 0.8 : 1,
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = blushDark)}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = blush)}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Wird gesendet...</span>
                    </>
                  ) : isSubmitted ? (
                    <>
                      <Check size={20} />
                      <span>Nachricht gesendet!</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      <span>Nachricht senden</span>
                    </>
                  )}
                </button>

                <p className="text-sm text-center" style={{ color: `${charcoal}80` }}>
                  Wir antworten in der Regel innerhalb von 24 Stunden.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundColor: `${blush}1A` }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2706.6797542534733!2d8.595661!3d47.2595!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479aa7d1b7f7a5c1%3A0x0!2sSeestrasse%202%2C%208810%20Horgen!5e0!3m2!1sen!2sch!4v1699999999999!5m2!1sen!2sch"
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'grayscale(100%) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 shadow-xl text-center">
          <h3 className="text-xl mb-2" style={{ color: charcoal }}>Glow Aesthetics</h3>
          <p className="text-sm mb-4" style={{ color: `${charcoal}99` }}>Seestrasse 2, 8810 Horgen</p>
          <a
            href="https://maps.google.com/?q=Seestrasse+2+8810+Horgen"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: blush }}
          >
            In Google Maps öffnen
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
