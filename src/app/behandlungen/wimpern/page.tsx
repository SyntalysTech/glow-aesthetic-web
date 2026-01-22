'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Check, Clock, ArrowRight, Eye } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const lashTypes = [
  {
    name: 'Classic',
    description: 'Eine Verlängerung pro Naturwimper für einen natürlichen, eleganten Look.',
    price: 150,
    duration: '120 Min',
    image: 'https://images.pexels.com/photos/5069611/pexels-photo-5069611.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Volume',
    description: 'Mehrere feine Extensions pro Wimper für mehr Fülle und Dramatik.',
    price: 180,
    duration: '150 Min',
    image: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
  {
    name: 'Mega Volume',
    description: 'Maximale Dichte für einen glamourösen, ausdrucksstarken Look.',
    price: 200,
    duration: '180 Min',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
  },
];

const refills = [
  { name: 'Auffüllen Classic', duration: '60 Min', price: 70 },
  { name: 'Auffüllen Volume', duration: '75 Min', price: 85 },
  { name: 'Entfernung', duration: '30 Min', price: 30 },
];

export default function WimpernPage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5069611/pexels-photo-5069611.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Wimpernverlängerung"
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
              Wimpern
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Lash <span className="italic" style={{ color: blush }}>Extensions</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Professionelle Wimpernverlängerungen von Sofia, unserer Spezialistin
              mit über 8 Jahren Erfahrung. Vom natürlichen Classic Look bis zum
              glamourösen Mega Volume.
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

      {/* Lash Types */}
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
              Unsere <span className="italic" style={{ color: blush }}>Techniken</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${charcoal}80` }}>
              Von natürlich bis glamourös – wir finden den perfekten Look für Sie
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {lashTypes.map((type, index) => (
              <motion.div
                key={type.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={type.image}
                    alt={type.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-light mb-2" style={{ color: charcoal }}>
                    {type.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: `${charcoal}80` }}>
                    {type.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t" style={{ borderColor: cream }}>
                    <div className="flex items-center gap-2 text-sm" style={{ color: `${charcoal}80` }}>
                      <Clock size={16} />
                      <span>{type.duration}</span>
                    </div>
                    <span className="text-2xl font-light" style={{ color: blush }}>
                      CHF {type.price}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Refills */}
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
              Auffüllen & <span className="italic" style={{ color: blush }}>Pflege</span>
            </h2>
          </motion.div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg" style={{ backgroundColor: cream }}>
            {refills.map((service, index) => (
              <div
                key={service.name}
                className={`flex items-center justify-between p-6 bg-white ${
                  index !== refills.length - 1 ? 'border-b' : ''
                }`}
                style={{ borderColor: cream }}
              >
                <div>
                  <h3 className="font-medium mb-1" style={{ color: charcoal }}>
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm" style={{ color: `${charcoal}80` }}>
                    <Clock size={14} />
                    <span>{service.duration}</span>
                  </div>
                </div>
                <span className="text-2xl font-light" style={{ color: blush }}>
                  CHF {service.price}
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

      {/* Care Tips */}
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
              Pflege<span className="italic" style={{ color: blush }}>tipps</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              'Vermeiden Sie Öl-basierte Produkte um die Augen',
              'Waschen Sie Ihre Wimpern täglich mit Lash Cleanser',
              'Schlafen Sie möglichst auf dem Rücken',
              'Kommen Sie alle 2-3 Wochen zum Auffüllen',
              'Reiben Sie nicht an Ihren Augen',
              'Bürsten Sie Ihre Wimpern täglich mit einer Spooly',
            ].map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center gap-3 bg-white p-4 rounded-xl"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${blush}20` }}
                >
                  <Check size={16} style={{ color: blush }} />
                </div>
                <span style={{ color: charcoal }}>{tip}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
