'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, Instagram, Mail, ArrowUpRight } from 'lucide-react';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const scheduleItems = [
  { day: 'Lundi', hours: '09:00 - 19:00' },
  { day: 'Mardi', hours: '09:00 - 19:00' },
  { day: 'Mercredi', hours: '09:00 - 19:00' },
  { day: 'Jeudi', hours: '09:00 - 19:00' },
  { day: 'Vendredi', hours: '09:00 - 19:00' },
  { day: 'Samedi', hours: '09:00 - 16:00' },
  { day: 'Dimanche', hours: 'Fermé' },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const contentRef = useRef<HTMLDivElement>(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-100px' });

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Background */}
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

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: blush }}
          >
            Contact
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight"
          >
            Visitez-nous à{' '}
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
                Informations de Contact
              </h2>

              {/* Address */}
              <div className="mb-10">
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
                    Suisse
                  </p>
                  <a
                    href="https://maps.google.com/?q=Seestrasse+2+8810+Horgen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-3 hover:underline"
                    style={{ color: blush }}
                  >
                    Voir sur Google Maps
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Téléphone</h3>
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

              {/* Social */}
              <div className="mb-10">
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Réseaux Sociaux</h3>
                </div>
                <div className="ml-16 flex gap-3">
                  <a
                    href="https://instagram.com"
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
                  <a
                    href="https://tiktok.com"
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
                    TikTok
                  </a>
                </div>
              </div>

              {/* CTA */}
              <a
                href="https://www.salonkee.ch/salon/glow-aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-colors"
                style={{ backgroundColor: blush }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = blushDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = blush}
              >
                <span className="uppercase tracking-wider">Réserver en Ligne</span>
                <ArrowUpRight size={16} />
              </a>
            </motion.div>

            {/* Hours & Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={contentInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Image */}
              <div className="relative rounded-3xl overflow-hidden mb-10">
                <div className="aspect-video">
                  <img
                    src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
                    alt="Glow Aesthetics interior"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div
                  className="absolute inset-0"
                  style={{ background: `linear-gradient(to top, ${charcoal}4D, transparent)` }}
                />
              </div>

              {/* Hours */}
              <div className="rounded-3xl p-8" style={{ backgroundColor: cream }}>
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: blush }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl" style={{ color: charcoal }}>Heures d'Ouverture</h3>
                </div>
                <div className="space-y-3">
                  {scheduleItems.map((item) => (
                    <div
                      key={item.day}
                      className="flex justify-between py-2 last:border-0"
                      style={{
                        borderBottom: `1px solid ${blush}1A`,
                        color: item.hours === 'Fermé' ? `${charcoal}66` : undefined,
                      }}
                    >
                      <span style={{ color: item.hours === 'Fermé' ? `${charcoal}66` : charcoal }}>
                        {item.day}
                      </span>
                      <span
                        style={{
                          color: item.hours === 'Fermé' ? `${charcoal}66` : blush,
                          fontWeight: item.hours === 'Fermé' ? undefined : 500,
                        }}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
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

        {/* Overlay card */}
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
            Ouvrir dans Google Maps
            <ArrowUpRight size={14} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}
