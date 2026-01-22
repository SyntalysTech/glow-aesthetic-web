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
  'Cellulite-Reduktion',
  'Hautstraffung',
  'Körperkonturierung',
  'Lymphdrainage',
  'Verbesserte Durchblutung',
  'Schmerzfrei & entspannend',
];

const treatments = [
  { name: 'ICOONE® Körperbehandlung', duration: '60 Min', price: 150 },
  { name: 'ICOONE® Gesichtsbehandlung', duration: '45 Min', price: 120 },
  { name: 'ICOONE® Körper Paket (5x)', duration: '5x 60 Min', price: 650 },
  { name: 'ICOONE® Körper Paket (10x)', duration: '10x 60 Min', price: 1200 },
];

export default function IcoonePage() {
  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1920&h=1080&fit=crop"
            alt="ICOONE Behandlung"
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
              Körperbehandlung
            </p>
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              ICOONE<span className="text-2xl align-top">®</span>
            </h1>
            <p className="text-xl font-light leading-relaxed mb-8" style={{ color: `${charcoal}b3` }}>
              Die revolutionäre Multi-Mikro-Alveolar-Stimulation für Körperkonturierung,
              Cellulite-Behandlung und Hautstraffung. Wissenschaftlich belegt, schmerzfrei
              und hochwirksam.
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

      {/* Benefits Section */}
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
                Was ist <span className="italic" style={{ color: blush }}>ICOONE®</span>?
              </h2>
              <div className="space-y-4 text-lg" style={{ color: `${charcoal}b3` }}>
                <p>
                  ICOONE® ist eine patentierte italienische Technologie, die mit Multi-Mikro-Stimulation
                  arbeitet. Über 21.600 Mikrostimulationen pro Minute aktivieren das Gewebe sanft
                  aber intensiv.
                </p>
                <p>
                  Die Behandlung fördert die Kollagenproduktion, verbessert die Durchblutung und
                  aktiviert den Lymphfluss. Das Ergebnis: straffere Haut, reduzierte Cellulite
                  und eine verbesserte Körperkontur.
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
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=800&h=1000&fit=crop"
                  alt="ICOONE Ergebnisse"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
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
            <p style={{ color: `${charcoal}80` }}>
              Wählen Sie die passende Behandlung für Ihre Bedürfnisse
            </p>
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

      {/* FAQ Section */}
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
              Häufige <span className="italic" style={{ color: blush }}>Fragen</span>
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Wie viele Behandlungen sind empfohlen?',
                a: 'Für optimale Ergebnisse empfehlen wir einen Kurs von 8-10 Behandlungen, 2x pro Woche. Die Ergebnisse sind bereits nach 3-4 Behandlungen sichtbar.',
              },
              {
                q: 'Ist die Behandlung schmerzhaft?',
                a: 'Nein, ICOONE® ist eine angenehme, entspannende Behandlung. Viele Kundinnen beschreiben sie als sanfte Massage.',
              },
              {
                q: 'Wie lange halten die Ergebnisse?',
                a: 'Mit einer gesunden Lebensweise und monatlichen Erhaltungsbehandlungen können die Ergebnisse langfristig erhalten bleiben.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6"
              >
                <h3 className="font-medium mb-2" style={{ color: charcoal }}>
                  {faq.q}
                </h3>
                <p style={{ color: `${charcoal}80` }}>{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
