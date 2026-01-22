'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const treatments = [
  { name: 'Augenbrauen Formen', duration: '20 Min', price: 25, description: 'Perfekte Form mit Pinzette und Wachs' },
  { name: 'Augenbrauen Färben', duration: '15 Min', price: 20, description: 'Intensive Farbe für definierte Brauen' },
  { name: 'Augenbrauen Komplett', duration: '45 Min', price: 55, description: 'Formen, Färben & Styling' },
  { name: 'Brow Lifting', duration: '45 Min', price: 65, description: 'Langanhaltende Form für volle Brauen' },
  { name: 'Brow Lamination', duration: '60 Min', price: 75, description: 'Premium-Behandlung mit extra Pflege' },
];

export default function AugenbrauenPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Augenbrauen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-sm uppercase tracking-wider mb-4" style={{ color: blush }}>
              Augenbrauen
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Brauen<span className="italic" style={{ color: blush }}>formen</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Perfekt geformte Augenbrauen rahmen das Gesicht und verleihen Ihrem
              Blick Ausdruck. Von einfachem Styling bis zur luxuriösen Lamination.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-all"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a69c9e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              <span className="uppercase tracking-wider">Jetzt Buchen</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Unsere <span className="italic" style={{ color: blush }}>Leistungen</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1" style={{ color: charcoal }}>
                      {treatment.name}
                    </h3>
                    <p className="text-sm mb-2" style={{ color: `${charcoal}80` }}>
                      {treatment.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm" style={{ color: `${charcoal}60` }}>
                      <Clock size={14} />
                      <span>{treatment.duration}</span>
                    </div>
                  </div>
                  <span className="text-2xl font-light" style={{ color: blush }}>
                    CHF {treatment.price}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-all"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a69c9e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              <span className="uppercase tracking-wider">Termin Buchen</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
