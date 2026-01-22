'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const treatments = [
  {
    slug: 'icoone',
    name: 'ICOONE®',
    subtitle: 'Körpermodellierung & Hautstraffung',
    description: 'Revolutionäre Technologie für Körperkonturierung und Cellulite-Behandlung.',
    image: 'https://images.pexels.com/photos/3997989/pexels-photo-3997989.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'dermafacial',
    name: 'Préime DermaFacial',
    subtitle: 'Tiefenreinigung & Hydratation',
    description: 'Premium-Gesichtsbehandlung für strahlende, reine Haut.',
    image: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'wimpern',
    name: 'Lash Extensions',
    subtitle: 'Classic, Volume & Mega Volume',
    description: 'Professionelle Wimpernverlängerungen für jeden gewünschten Look.',
    image: 'https://images.pexels.com/photos/5069611/pexels-photo-5069611.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'microneedling',
    name: 'Microneedling',
    subtitle: 'Hauterneuerung & Anti-Aging',
    description: 'Kollagenstimulation für straffere, jugendlichere Haut.',
    image: 'https://images.pexels.com/photos/3865557/pexels-photo-3865557.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'lash-lifting',
    name: 'Lash & Brow Lifting',
    subtitle: 'Natürliche Schönheit betonen',
    description: 'Wimpern und Brauen auf natürliche Weise anheben und formen.',
    image: 'https://images.pexels.com/photos/3762466/pexels-photo-3762466.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
  {
    slug: 'augenbrauen',
    name: 'Brauenformen',
    subtitle: 'Perfekte Augenbrauen',
    description: 'Professionelles Styling für ausdrucksstarke Augenbrauen.',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop',
  },
];

export default function BehandlungenPage() {
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
              Unsere <span className="italic">Behandlungen</span>
            </h1>
            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">
              Entdecken Sie unsere professionellen Beauty-Behandlungen, durchgeführt
              von zertifizierten Expertinnen mit modernster Technologie.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {treatments.map((treatment, index) => (
              <motion.div
                key={treatment.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link
                  href={`/behandlungen/${treatment.slug}`}
                  className="block bg-white rounded-2xl overflow-hidden shadow-sm group"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={treatment.image}
                      alt={treatment.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <h3 className="text-2xl font-light mb-1">{treatment.name}</h3>
                      <p className="text-sm opacity-80">{treatment.subtitle}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-sm mb-4" style={{ color: `${charcoal}80` }}>
                      {treatment.description}
                    </p>
                    <div
                      className="flex items-center gap-2 text-sm uppercase tracking-wider transition-all group-hover:gap-4"
                      style={{ color: blush }}
                    >
                      <span>Mehr Erfahren</span>
                      <ArrowRight size={16} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-light mb-6" style={{ color: charcoal }}>
              Nicht sicher, welche Behandlung?
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Unsere Expertinnen beraten Sie gerne und finden die perfekte Behandlung für Ihre Bedürfnisse.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-all"
                style={{ backgroundColor: blush }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a69c9e')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
              >
                <span className="uppercase tracking-wider">Termin Buchen</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full transition-all border-2"
                style={{ borderColor: blush, color: blush }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = blush;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = blush;
                }}
              >
                <span className="uppercase tracking-wider">Beratung Anfragen</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
