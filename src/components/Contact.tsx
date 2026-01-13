'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { MapPin, Phone, Clock, Instagram, ExternalLink } from 'lucide-react';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const scheduleItems = [
  { day: 'Lundi - Vendredi', hours: '09:00 - 19:00' },
  { day: 'Samedi', hours: '09:00 - 16:00' },
  { day: 'Dimanche', hours: 'Fermé' },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: cream }}
    >
      {/* Decorative background */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full"
        style={{ background: `linear-gradient(to left, ${blush}1A, transparent)` }}
      />
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl"
        style={{ backgroundColor: `${blush}0D` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span
            className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: blush }}
          >
            Contact
          </span>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-light"
            style={{ color: charcoal }}
          >
            Visitez-nous à{' '}
            <span className="italic" style={{ color: blush }}>Horgen</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Map / Image side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl"
              style={{ boxShadow: `0 25px 50px -12px ${blush}1A` }}
            >
              {/* Salon interior image */}
              <div className="aspect-[4/3]">
                <img
                  src="https://images.unsplash.com/photo-1600948836101-f9ffda59d250?q=80&w=2072&auto=format&fit=crop"
                  alt="Glow Aesthetics salon interior"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Location overlay */}
              <div
                className="absolute bottom-0 left-0 right-0 p-6"
                style={{ background: `linear-gradient(to top, ${charcoal}CC, transparent)` }}
              >
                <div className="flex items-center gap-3 text-white">
                  <MapPin className="w-5 h-5" />
                  <span>Seestrasse 2, 8810 Horgen, Suisse</span>
                </div>
              </div>
            </div>

            {/* Floating location card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-5 shadow-xl"
              style={{ boxShadow: `0 20px 25px -5px ${blush}1A` }}
            >
              <a
                href="https://maps.google.com/?q=Seestrasse+2+8810+Horgen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:opacity-80"
                style={{ color: charcoal }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${blush}1A` }}
                >
                  <ExternalLink className="w-5 h-5" style={{ color: blush }} />
                </div>
                <span className="text-sm font-medium">Voir sur Google Maps</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Contact info side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-10"
          >
            {/* Address block */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: blush }}
                >
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium" style={{ color: charcoal }}>Adresse</h3>
              </div>
              <p className="pl-[52px]" style={{ color: `${charcoal}B3` }}>
                Seestrasse 2<br />
                8810 Horgen<br />
                Suisse
              </p>
            </div>

            {/* Phone block */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: blush }}
                >
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium" style={{ color: charcoal }}>Téléphone</h3>
              </div>
              <a
                href="tel:+41766092420"
                className="pl-[52px] transition-colors inline-block hover:opacity-80"
                style={{ color: `${charcoal}B3` }}
              >
                +41 76 609 24 20
              </a>
            </div>

            {/* Hours block */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: blush }}
                >
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-xl font-medium" style={{ color: charcoal }}>Horaires</h3>
              </div>
              <div className="pl-[52px] space-y-2">
                {scheduleItems.map((item) => (
                  <div key={item.day} className="flex justify-between max-w-xs">
                    <span style={{ color: `${charcoal}B3` }}>{item.day}</span>
                    <span className="font-medium" style={{ color: charcoal }}>{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social links */}
            <div className="pl-[52px] pt-4">
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow group"
                >
                  <Instagram
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    style={{ color: blush }}
                  />
                  <span className="text-sm" style={{ color: charcoal }}>Instagram</span>
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow group"
                >
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ color: blush }}
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                  <span className="text-sm" style={{ color: charcoal }}>TikTok</span>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="pl-[52px] pt-4">
              <a
                href="https://www.salonkee.ch/salon/glow-aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 text-white rounded-full transition-colors group"
                style={{ backgroundColor: blush }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = blushDark}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = blush}
              >
                <span className="text-sm uppercase tracking-wider">Réserver Votre Rendez-vous</span>
                <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
