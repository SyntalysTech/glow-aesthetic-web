'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';

const images = [
  {
    src: 'https://images.pexels.com/photos/5069611/pexels-photo-5069611.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Eyelash treatment',
  },
  {
    src: 'https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Facial treatment',
  },
  {
    src: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Beauty portrait',
  },
  {
    src: 'https://images.pexels.com/photos/3757954/pexels-photo-3757954.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Skincare',
  },
  {
    src: 'https://images.pexels.com/photos/3985330/pexels-photo-3985330.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Face treatment',
  },
  {
    src: 'https://images.pexels.com/photos/3997391/pexels-photo-3997391.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop',
    alt: 'Spa experience',
  },
];

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-white">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-6"
      >
        <span
          className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
          style={{ color: blush }}
        >
          Galerie
        </span>
        <h2
          className="text-4xl sm:text-5xl lg:text-6xl font-light"
          style={{ color: charcoal }}
        >
          Momente der{' '}
          <span className="italic" style={{ color: blush }}>Schönheit</span>
        </h2>
      </motion.div>

      {/* Scrolling gallery */}
      <div className="space-y-6 overflow-hidden">
        {/* Row 1 - scrolls left */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-6"
        >
          {[...images, ...images].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>

        {/* Row 2 - scrolls right */}
        <motion.div
          style={{ x: x2 }}
          className="flex gap-6 -ml-20"
        >
          {[...images.reverse(), ...images].map((image, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-72 sm:w-80 md:w-96 aspect-[4/5] rounded-3xl overflow-hidden"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Instagram CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-16"
      >
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 rounded-full transition-colors"
          style={{ backgroundColor: `${blush}1A` }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${blush}33`}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${blush}1A`}
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ color: blush }}
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
          <span className="text-sm" style={{ color: charcoal }}>Folgen Sie uns auf Instagram</span>
        </a>
      </motion.div>
    </section>
  );
}
