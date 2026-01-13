'use client';
import Link from 'next/link';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Calendar } from 'lucide-react';

const blush = '#D6B7B4';
const charcoal = '#2D2D2D';

export default function CTABanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-[40px] overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop"
              alt="Beautiful woman portrait"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to right, ${blush}f2, ${blush}cc, ${blush}99)`,
              }}
            />
          </div>

          {/* Decorative shapes */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-60 h-60 bg-white/10 rounded-full blur-2xl"
          />

          {/* Content */}
          <div className="relative px-8 sm:px-12 lg:px-20 py-16 sm:py-20 lg:py-24">
            <div className="max-w-2xl">
              {/* Icon badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-8"
              >
                <Calendar className="w-8 h-8 text-white" />
              </motion.div>

              {/* Heading */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-3xl sm:text-4xl lg:text-5xl font-light text-white leading-tight mb-6"
              >
                Bereit zum Strahlen?
                <br />
                <span className="italic">Ihr Termin wartet auf Sie</span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-white/80 text-lg mb-10 max-w-lg"
              >
                Buchen Sie Ihre Behandlung online in wenigen Sekunden. Ihr Moment des Wohlbefindens
                und der Schönheit ist nur einen Klick entfernt.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="/booking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-white rounded-full hover:shadow-xl hover:shadow-white/20 transition-all duration-300"
                  style={{ color: blush }}
                >
                  <span className="text-sm font-medium uppercase tracking-wider">Jetzt Buchen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="tel:+41766092420"
                  className="inline-flex items-center justify-center px-8 py-4 border border-white/30 text-white rounded-full hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm uppercase tracking-wider">Anrufen</span>
                </a>
              </motion.div>
            </div>
          </div>

          {/* Floating images */}
          <div className="hidden lg:block absolute right-12 top-1/2 -translate-y-1/2">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <div className="w-48 h-64 rounded-[40px] overflow-hidden shadow-2xl transform rotate-6">
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                  alt="Beauty treatment"
                  className="w-full h-full object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-4 -left-8 w-32 h-40 rounded-3xl overflow-hidden shadow-xl transform -rotate-6"
              >
                <img
                  src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop"
                  alt="Eyelash extension"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
