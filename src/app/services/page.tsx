'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, Clock, Euro } from 'lucide-react';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const serviceCategories = [
  {
    id: 'facial',
    title: 'Soins du Visage',
    subtitle: 'Préime Dermafacial',
    description: 'Soins personnalisés pour chaque type de peau. Du nettoyage profond à l\'anti-âge.',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop',
    services: [
      { name: 'Glow Gold', price: 'à partir de 220 CHF', duration: '60-90 min' },
      { name: 'Glow Aging', price: 'à partir de 90 CHF', duration: '45-60 min' },
      { name: 'Glow Cleanse', price: 'à partir de 150 CHF', duration: '60 min' },
      { name: 'Glow Men', price: 'à partir de 120 CHF', duration: '45 min' },
    ],
  },
  {
    id: 'lashes',
    title: 'Wimpernverlängerung',
    subtitle: 'Extensions de Cils',
    description: 'Extensions de cils professionnelles pour un effet wow naturel et durable.',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=2069&auto=format&fit=crop',
    services: [
      { name: 'Set Complet Classic', price: 'à partir de 180 CHF', duration: '120 min' },
      { name: 'Set Complet Volume', price: 'à partir de 220 CHF', duration: '150 min' },
      { name: 'Remplissage Classic', price: 'à partir de 80 CHF', duration: '60 min' },
      { name: 'Remplissage Volume', price: 'à partir de 100 CHF', duration: '75 min' },
    ],
  },
  {
    id: 'microneedling',
    title: 'Microneedling',
    subtitle: 'Rajeunissement Profond',
    description: 'Stimule la production naturelle de collagène pour une peau plus ferme et plus jeune.',
    image: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=2070&auto=format&fit=crop',
    services: [
      { name: 'Microneedling Basique', price: '160 CHF', duration: '60 min' },
      { name: 'Microneedling + Luminothérapie', price: '180 CHF', duration: '75 min' },
      { name: 'Pack 3 Séances', price: '456 CHF', duration: '3x 60 min' },
    ],
  },
  {
    id: 'icoone',
    title: 'Icoone Laser',
    subtitle: 'Technologie de Pointe',
    description: 'Soins avec technologie Icoone pour le raffermissement, le drainage et le remodelage corporel.',
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=2044&auto=format&fit=crop',
    services: [
      { name: '1 Zone', price: '99 CHF', duration: '30 min' },
      { name: '2 Zones', price: '120 CHF', duration: '45 min' },
      { name: '3 Zones', price: '150 CHF', duration: '60 min' },
      { name: '4 Zones', price: '180 CHF', duration: '75 min' },
      { name: 'Gesichtsdrainage', price: '145 CHF', duration: '45 min' },
      { name: 'Anti-Âge Visage', price: '145 CHF', duration: '45 min' },
    ],
  },
  {
    id: 'brows',
    title: 'Augenbrauen',
    subtitle: 'Sourcils Parfaits',
    description: 'Design, teinture et lamination des sourcils pour encadrer votre regard.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=2070&auto=format&fit=crop',
    services: [
      { name: 'Design de sourcils', price: 'à partir de 30 CHF', duration: '20 min' },
      { name: 'Teinture de sourcils', price: 'à partir de 25 CHF', duration: '15 min' },
      { name: 'Lamination', price: 'à partir de 80 CHF', duration: '45 min' },
    ],
  },
];

function ServiceCategory({ category, index }: { category: typeof serviceCategories[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
    >
      {/* Image */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`relative ${isEven ? '' : 'lg:order-2'}`}
      >
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to top, ${charcoal}66, transparent)` }}
          />
        </div>

        {/* Floating number */}
        <div
          className="absolute -top-4 -left-4 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: blush }}
        >
          <span className="text-white text-2xl font-light">0{index + 1}</span>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
        className={isEven ? '' : 'lg:order-1'}
      >
        <span
          className="text-sm uppercase tracking-[0.2em]"
          style={{ color: blush }}
        >
          {category.subtitle}
        </span>
        <h2
          className="text-3xl sm:text-4xl font-light mt-2 mb-4"
          style={{ color: charcoal }}
        >
          {category.title}
        </h2>
        <p style={{ color: `${charcoal}B3` }} className="mb-8">
          {category.description}
        </p>

        {/* Services list */}
        <div className="space-y-4">
          {category.services.map((service, i) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
              className="flex items-center justify-between py-3 border-b group"
              style={{ borderColor: `${blush}1A` }}
            >
              <div>
                <h4
                  className="transition-colors"
                  style={{ color: charcoal }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = blush)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = charcoal)}
                >
                  {service.name}
                </h4>
                <div
                  className="flex items-center gap-4 mt-1 text-sm"
                  style={{ color: `${charcoal}80` }}
                >
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {service.duration}
                  </span>
                </div>
              </div>
              <span className="font-medium" style={{ color: blush }}>{service.price}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          href="https://www.salonkee.ch/salon/glow-aesthetics"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 mt-8 px-6 py-3 text-white rounded-full transition-colors"
          style={{ backgroundColor: blush }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
        >
          <span className="text-sm uppercase tracking-wider">Réserver</span>
          <ArrowUpRight size={16} />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
            alt="Services background"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: `linear-gradient(to bottom, ${blush}CC, ${blush}99)` }}
          />
        </div>

        {/* Decorative elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full"
        />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-6 h-6 bg-white/20 rounded-full"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-block text-white/80 text-sm uppercase tracking-[0.3em] mb-4"
          >
            Nos Services
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-light text-white leading-tight"
          >
            Soins de{' '}
            <span className="italic">Beauté</span>
            <br />
            Professionnels
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-white/80 text-lg max-w-2xl mx-auto"
          >
            Découvrez notre gamme complète de soins conçus pour sublimer votre beauté naturelle
          </motion.p>
        </div>
      </section>

      {/* Services Sections */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 space-y-32">
          {serviceCategories.map((category, index) => (
            <ServiceCategory key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20" style={{ backgroundColor: cream }}>
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2
            className="text-3xl sm:text-4xl font-light mb-6"
            style={{ color: charcoal }}
          >
            Vous ne trouvez pas ce que vous cherchez ?
          </h2>
          <p style={{ color: `${charcoal}B3` }} className="mb-8">
            Visitez notre page de réservation pour voir tous les services et la disponibilité en temps réel.
          </p>
          <a
            href="https://www.salonkee.ch/salon/glow-aesthetics"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-colors"
            style={{ backgroundColor: blush }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
          >
            <span className="text-sm uppercase tracking-wider">Voir Tous les Services</span>
            <ArrowUpRight size={16} />
          </a>
        </div>
      </section>

      <Footer />
      <FloatingCTA />
    </main>
  );
}
