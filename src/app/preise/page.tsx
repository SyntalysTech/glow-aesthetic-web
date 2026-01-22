'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const priceCategories = [
  {
    name: 'Wimpern',
    description: 'Verlängerungen & Lifting',
    services: [
      { name: 'Classic Wimpernverlängerung', duration: '120 Min', price: 150 },
      { name: 'Volume Wimpernverlängerung', duration: '150 Min', price: 180 },
      { name: 'Mega Volume Wimpernverlängerung', duration: '180 Min', price: 200 },
      { name: 'Lash Lifting inkl. Färben', duration: '60 Min', price: 80 },
      { name: 'Wimpern Auffüllen Classic', duration: '60 Min', price: 70 },
      { name: 'Wimpern Auffüllen Volume', duration: '75 Min', price: 85 },
      { name: 'Wimpern Entfernung', duration: '30 Min', price: 30 },
    ],
  },
  {
    name: 'Gesicht',
    description: 'Behandlungen & Pflege',
    services: [
      { name: 'Glow Gold Gesichtsbehandlung', duration: '75 Min', price: 120 },
      { name: 'Préime DermaFacial', duration: '60 Min', price: 150 },
      { name: 'HydraFacial', duration: '60 Min', price: 150 },
      { name: 'Anti-Aging Behandlung', duration: '90 Min', price: 180 },
      { name: 'Microneedling Gesicht', duration: '90 Min', price: 200 },
      { name: 'Microneedling Gesicht + Hals', duration: '120 Min', price: 280 },
      { name: 'Chemical Peeling', duration: '45 Min', price: 120 },
    ],
  },
  {
    name: 'Augenbrauen',
    description: 'Styling & Lifting',
    services: [
      { name: 'Brow Lifting', duration: '45 Min', price: 65 },
      { name: 'Brow Lamination', duration: '60 Min', price: 75 },
      { name: 'Augenbrauen Formen', duration: '20 Min', price: 25 },
      { name: 'Augenbrauen Färben', duration: '15 Min', price: 20 },
      { name: 'Augenbrauen Komplett', duration: '45 Min', price: 55 },
    ],
  },
  {
    name: 'Körper',
    description: 'ICOONE® & Behandlungen',
    services: [
      { name: 'ICOONE® Körperbehandlung', duration: '60 Min', price: 150 },
      { name: 'ICOONE® Gesichtsbehandlung', duration: '45 Min', price: 120 },
      { name: 'ICOONE® Körper Paket (5x)', duration: '5x 60 Min', price: 650 },
      { name: 'ICOONE® Körper Paket (10x)', duration: '10x 60 Min', price: 1200 },
      { name: 'Anti-Cellulite Behandlung', duration: '60 Min', price: 130 },
      { name: 'Körperwickel', duration: '60 Min', price: 100 },
    ],
  },
];

export default function PreisePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16" style={{ backgroundColor: blush }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              Unsere <span className="italic">Preise</span>
            </h1>
            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">
              Transparente Preisgestaltung für alle unsere Behandlungen.
              Qualität, die sich sehen lassen kann.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Price Lists */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="space-y-16">
            {priceCategories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
              >
                <div className="flex items-end gap-4 mb-8">
                  <h2 className="text-3xl font-light" style={{ color: charcoal }}>
                    {category.name}
                  </h2>
                  <span className="text-lg pb-1" style={{ color: blush }}>
                    {category.description}
                  </span>
                </div>

                <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                  {category.services.map((service, index) => (
                    <div
                      key={service.name}
                      className={`flex items-center justify-between p-6 ${
                        index !== category.services.length - 1 ? 'border-b' : ''
                      }`}
                      style={{ borderColor: cream }}
                    >
                      <div className="flex-1">
                        <h3 className="font-medium mb-1" style={{ color: charcoal }}>
                          {service.name}
                        </h3>
                        <div className="flex items-center gap-2 text-sm" style={{ color: `${charcoal}80` }}>
                          <Clock size={14} />
                          <span>{service.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-light" style={{ color: blush }}>
                          CHF {service.price}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl" style={{ backgroundColor: cream }}>
              <h3 className="text-xl font-medium mb-4" style={{ color: charcoal }}>
                Zahlungsmethoden
              </h3>
              <ul className="space-y-2" style={{ color: `${charcoal}80` }}>
                <li>• Bargeld</li>
                <li>• Kreditkarten (Visa, Mastercard)</li>
                <li>• TWINT</li>
                <li>• Überweisung</li>
              </ul>
            </div>

            <div className="p-8 rounded-2xl" style={{ backgroundColor: cream }}>
              <h3 className="text-xl font-medium mb-4" style={{ color: charcoal }}>
                Wichtige Hinweise
              </h3>
              <ul className="space-y-2" style={{ color: `${charcoal}80` }}>
                <li>• Alle Preise inkl. MwSt.</li>
                <li>• Terminabsagen bitte 24h vorher</li>
                <li>• Geschenkgutscheine erhältlich</li>
                <li>• Rabatte für Stammkunden</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6" style={{ color: charcoal }}>
              Bereit für Ihre <span className="italic" style={{ color: blush }}>Behandlung</span>?
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Buchen Sie jetzt Ihren Termin online und profitieren Sie von unserer
              professionellen Beratung.
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

      <Footer />
    </main>
  );
}
