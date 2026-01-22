'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const benefits = [
  'Kollagenstimulation',
  'Faltenreduktion',
  'Verbesserte Hauttextur',
  'Narbenbehandlung',
  'Poren verfeinern',
  'Pigmentflecken reduzieren',
];

const treatments = [
  { name: 'Microneedling Gesicht', duration: '90 Min', price: 200 },
  { name: 'Microneedling Gesicht + Hals', duration: '120 Min', price: 280 },
  { name: 'Microneedling Körper (pro Zone)', duration: '60 Min', price: 180 },
];

export default function MicroneedlingPage() {
  return (
    <main>
      <Header />

      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5069453/pexels-photo-5069453.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Microneedling"
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
              Anti-Aging
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Micro<span className="italic" style={{ color: blush }}>needling</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Die natürliche Hauterneuerung durch kontrollierte Mikroverletzungen.
              Stimuliert die Kollagenproduktion für straffere, jugendlichere Haut.
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

      {/* About */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-light mb-6" style={{ color: charcoal }}>
                Wie <span className="italic" style={{ color: blush }}>funktioniert</span> es?
              </h2>
              <div className="space-y-4 text-lg" style={{ color: `${charcoal}b3` }}>
                <p>
                  Beim Microneedling werden mit feinen Nadeln kontrollierte Mikroverletzungen
                  in der Haut erzeugt. Dies aktiviert den natürlichen Heilungsprozess und
                  stimuliert die Produktion von Kollagen und Elastin.
                </p>
                <p>
                  Das Ergebnis ist eine straffere, glattere Haut mit verfeinertem Hautbild.
                  Ideal bei Falten, Narben, Pigmentflecken und vergrösserten Poren.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${blush}20` }}
                    >
                      <Check size={14} style={{ color: blush }} />
                    </div>
                    <span style={{ color: charcoal }}>{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3997993/pexels-photo-3997993.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="Microneedling Behandlung"
                  className="w-full h-full object-cover"
                />
              </div>
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
