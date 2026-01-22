'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const treatments = [
  { name: 'Lash Lifting inkl. Färben', duration: '60 Min', price: 80 },
  { name: 'Brow Lifting', duration: '45 Min', price: 65 },
  { name: 'Brow Lamination', duration: '60 Min', price: 75 },
  { name: 'Kombi: Lash + Brow Lifting', duration: '90 Min', price: 130 },
];

export default function LashLiftingPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Lash & Brow Lifting"
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
              Natürliche Schönheit
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Lash & Brow <span className="italic" style={{ color: blush }}>Lifting</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Betonen Sie Ihre natürliche Schönheit mit angehobenen, geschwungenen
              Wimpern und perfekt geformten Augenbrauen – ganz ohne Extensions.
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

      {/* Content */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8"
            >
              <h2 className="text-3xl font-light mb-6" style={{ color: charcoal }}>
                Lash <span className="italic" style={{ color: blush }}>Lifting</span>
              </h2>
              <p className="mb-6" style={{ color: `${charcoal}80` }}>
                Das Lash Lifting hebt Ihre natürlichen Wimpern von der Wurzel an
                und gibt ihnen einen wunderschönen Schwung. Mit der Färbung wirken
                sie voller und definierter.
              </p>
              <ul className="space-y-3">
                {['Hält 6-8 Wochen', 'Keine Pflege notwendig', 'Wasserabweisend', 'Natürliches Ergebnis'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check size={16} style={{ color: blush }} />
                    <span style={{ color: charcoal }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-3xl p-8"
            >
              <h2 className="text-3xl font-light mb-6" style={{ color: charcoal }}>
                Brow <span className="italic" style={{ color: blush }}>Lifting</span>
              </h2>
              <p className="mb-6" style={{ color: `${charcoal}80` }}>
                Beim Brow Lifting werden Ihre Augenbrauen in die gewünschte Form
                gebracht und fixiert. Ideal für widerspenstige Härchen oder
                spärliche Brauen.
              </p>
              <ul className="space-y-3">
                {['Hält 4-6 Wochen', 'Voller aussehende Brauen', 'Perfekte Form', 'Inkl. Styling'].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check size={16} style={{ color: blush }} />
                    <span style={{ color: charcoal }}>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Unsere <span className="italic" style={{ color: blush }}>Preise</span>
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            {treatments.map((treatment, index) => (
              <div
                key={treatment.name}
                className={`flex items-center justify-between p-6 ${
                  index !== treatments.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: cream }}
              >
                <div>
                  <h3 className="font-medium mb-1" style={{ color: charcoal }}>
                    {treatment.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm" style={{ color: `${charcoal}80` }}>
                    <Clock size={14} />
                    <span>{treatment.duration}</span>
                  </div>
                </div>
                <span className="text-2xl font-light" style={{ color: blush }}>
                  CHF {treatment.price}
                </span>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
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
