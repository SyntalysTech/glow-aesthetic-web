'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight, Droplets, Sparkles, Shield } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const steps = [
  {
    icon: Droplets,
    title: 'Tiefenreinigung',
    description: 'Sanfte Entfernung von Unreinheiten und abgestorbenen Hautzellen.',
  },
  {
    icon: Sparkles,
    title: 'Exfoliation',
    description: 'Enzymatisches Peeling für ein ebenmässiges Hautbild.',
  },
  {
    icon: Shield,
    title: 'Hydratation',
    description: 'Intensive Feuchtigkeitsversorgung mit Hyaluronsäure.',
  },
];

const benefits = [
  'Sofort sichtbare Ergebnisse',
  'Keine Ausfallzeit',
  'Für alle Hauttypen geeignet',
  'Verfeinerte Poren',
  'Strahlender Teint',
  'Anti-Aging Wirkung',
];

export default function DermaFacialPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Préime DermaFacial"
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
              Gesichtsbehandlung
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Préime <span className="italic" style={{ color: blush }}>DermaFacial</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Die Premium-Gesichtsbehandlung für sofort sichtbare Ergebnisse.
              Tiefenreinigung, Exfoliation und intensive Hydratation in einer Behandlung.
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

      {/* Steps Section */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Der <span className="italic" style={{ color: blush }}>Ablauf</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${charcoal}80` }}>
              Drei Schritte zu strahlender Haut
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 bg-white rounded-2xl"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${blush}20` }}
                >
                  <step.icon size={28} style={{ color: blush }} />
                </div>
                <div
                  className="text-sm uppercase tracking-wider mb-2"
                  style={{ color: blush }}
                >
                  Schritt {index + 1}
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: charcoal }}>
                  {step.title}
                </h3>
                <p style={{ color: `${charcoal}80` }}>{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3985330/pexels-photo-3985330.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                  alt="DermaFacial Ergebnis"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1 lg:order-2"
            >
              <h2 className="text-4xl font-light mb-6" style={{ color: charcoal }}>
                Ihre <span className="italic" style={{ color: blush }}>Vorteile</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: `${charcoal}b3` }}>
                Das Préime DermaFacial bietet eine einzigartige Kombination aus
                professioneller Reinigung und intensiver Pflege für sofort sichtbare,
                langanhaltende Ergebnisse.
              </p>

              <div className="grid grid-cols-2 gap-4">
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
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-12 text-center"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Préime DermaFacial
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <Clock size={20} style={{ color: `${charcoal}80` }} />
              <span style={{ color: `${charcoal}80` }}>60 Minuten</span>
            </div>
            <div className="text-5xl font-light mb-8" style={{ color: blush }}>
              CHF 150
            </div>
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
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
