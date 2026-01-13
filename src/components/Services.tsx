'use client';
import Link from 'next/link';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

// Color constants
const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const services = [
  {
    id: 1,
    title: 'Wimpernverlängerung',
    subtitle: 'Wimpern Extensions',
    description: 'Erhalten Sie einen dauerhaften Wow-Effekt mit natürlich aussehenden Wimpern, die Ihren Blick betonen.',
    image: 'https://images.unsplash.com/photo-1583001931096-959e9a1a6223?q=80&w=2187&auto=format&fit=crop',
    accent: 'top-right',
  },
  {
    id: 2,
    title: 'Gesichtsbehandlungen',
    subtitle: 'Gesichtspflege',
    description: 'Strahlende Haut durch personalisierte Pflegekonzepte. Von Glow Gold bis Anti-Aging.',
    image: 'https://images.unsplash.com/photo-1596178060671-7a80dc8059ea?q=80&w=2070&auto=format&fit=crop',
    accent: 'bottom-left',
  },
  {
    id: 3,
    title: 'Icoone Laser',
    subtitle: 'Innovative Technologie',
    description: 'Spitzentechnologie für Hautstraffung und Körpermodellierung mit sichtbaren Ergebnissen.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop',
    accent: 'top-left',
  },
  {
    id: 4,
    title: 'Microneedling',
    subtitle: 'Tiefenwirksame Verjüngung',
    description: 'Stimuliert die natürliche Kollagenproduktion für straffere und jüngere Haut.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop',
    accent: 'bottom-right',
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="services" ref={containerRef} className="py-32 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div
        className="absolute top-0 left-0 w-full h-32"
        style={{ background: 'linear-gradient(to bottom, #FDFCFB, transparent)' }}
      />
      <div
        className="absolute top-40 right-0 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ backgroundColor: `${blush}0D` }}
      />
      <div
        className="absolute bottom-40 left-0 w-[400px] h-[400px] rounded-full blur-3xl"
        style={{ backgroundColor: `${blush}0D` }}
      />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: blush }}
          >
            Unsere Services
          </motion.span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light" style={{ color: charcoal }}>
            Exklusive{' '}
            <span className="italic" style={{ color: blush }}>Behandlungen</span>
          </h2>
          <div
            className="w-24 h-[1px] mx-auto mt-8"
            style={{ background: `linear-gradient(to right, transparent, ${blush}, transparent)` }}
          />
        </motion.div>

        {/* Services grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="group relative"
            >
              <div className="relative overflow-hidden rounded-3xl" style={{ backgroundColor: cream }}>
                {/* Image container with aspect ratio */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Overlay gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${charcoal}DD, ${charcoal}66, transparent)` }}
                  />

                  {/* Floating accent shape */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    className={`absolute w-20 h-20 rounded-full blur-xl ${
                      service.accent === 'top-right'
                        ? 'top-4 right-4'
                        : service.accent === 'top-left'
                        ? 'top-4 left-4'
                        : service.accent === 'bottom-right'
                        ? 'bottom-20 right-4'
                        : 'bottom-20 left-4'
                    }`}
                    style={{ backgroundColor: `${blush}33` }}
                  />

                  {/* Service number */}
                  <span className="absolute top-6 left-6 text-white/30 text-7xl font-light">
                    0{service.id}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="text-xs uppercase tracking-widest" style={{ color: blush }}>
                        {service.subtitle}
                      </span>
                      <h3 className="text-2xl sm:text-3xl font-light text-white mt-2">
                        {service.title}
                      </h3>
                      <p className="text-white/70 mt-3 max-w-sm text-sm sm:text-base font-light">
                        {service.description}
                      </p>
                    </div>

                    {/* Arrow button */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <Link href="/booking"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300"
                        style={{ ['--hover-bg' as string]: blush }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blush)}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)')}
                      >
                        <ArrowUpRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <Link href="/booking"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 transition-colors group"
            style={{ color: charcoal }}
            onMouseEnter={(e) => (e.currentTarget.style.color = blush)}
            onMouseLeave={(e) => (e.currentTarget.style.color = charcoal)}
          >
            <span className="text-sm uppercase tracking-widest">Voir Tous les Services</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
