'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Check, Sparkles } from 'lucide-react';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const subscriptionCategories = [
  {
    id: 'microneedling',
    label: 'Microneedling',
  },
  {
    id: 'icoone',
    label: 'Icoone Laser',
  },
  {
    id: 'facial',
    label: 'Facial',
  },
];

const subscriptions = {
  microneedling: [
    {
      name: 'Microneedling',
      sessions: 3,
      price: 456,
      originalPrice: 480,
      discount: 5,
      features: ['3x Soins complets', 'Stimulation du collagène', 'Peau plus ferme'],
    },
    {
      name: 'Microneedling + Light',
      sessions: 3,
      price: 513,
      originalPrice: 540,
      discount: 5,
      features: ['3x Soins avec Luminothérapie', 'Double action rajeunissante', 'Résultats visibles'],
      popular: true,
    },
  ],
  icoone: [
    {
      name: 'Icoone 1 Zone',
      sessions: 10,
      price: 990,
      originalPrice: null,
      discount: null,
      features: ['10x Traitement individuel', 'Une zone corporelle', 'Raffermissement efficace'],
    },
    {
      name: 'Icoone 2 Zones',
      sessions: 10,
      price: 850,
      originalPrice: 1200,
      discount: 29,
      features: ['10x Traitement individuel', 'Deux zones corporelles', 'Économie maximale'],
      popular: true,
    },
    {
      name: 'Icoone 4 Zones',
      sessions: 10,
      price: 1690,
      originalPrice: 1800,
      discount: 6,
      features: ['10x Traitement individuel', 'Quatre zones corporelles', 'Soin complet'],
    },
  ],
  facial: [
    {
      name: 'Gesichtsdrainage',
      sessions: 6,
      price: 725,
      originalPrice: 870,
      discount: 17,
      features: ['6x Icoone Drainage Visage', 'Drainage lymphatique facial', 'Visage décongestionnné'],
    },
    {
      name: 'Anti-Aging',
      sessions: 6,
      price: 725,
      originalPrice: 870,
      discount: 17,
      features: ['6x Icoone Anti-Âge', 'Rajeunissement facial', 'Réduction des rides'],
      popular: true,
    },
    {
      name: 'Gesichtsstraffung',
      sessions: 6,
      price: 725,
      originalPrice: 870,
      discount: 17,
      features: ['6x Icoone Raffermissement', 'Tenseur facial', 'Lifting naturel'],
    },
  ],
};

export default function Subscriptions() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('microneedling');

  const currentSubscriptions = subscriptions[activeCategory as keyof typeof subscriptions];

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, white, ${cream}, white)` }}
      />

      {/* Decorative shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
        className="absolute -top-40 -right-40 w-80 h-80 rounded-full"
        style={{ border: `1px solid ${blush}33` }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
        className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full"
        style={{ border: `1px solid ${blush}1a` }}
      />

      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span
            className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
            style={{ color: blush }}
          >
            Abonnements
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light" style={{ color: charcoal }}>
            Économisez avec nos{' '}
            <span className="italic" style={{ color: blush }}>Forfaits</span>
          </h2>
          <p className="mt-6 max-w-xl mx-auto" style={{ color: `${charcoal}99` }}>
            Des soins premium avec des réductions exclusives. Investissez dans votre beauté de manière intelligente.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center gap-2 sm:gap-4 mb-16 flex-wrap"
        >
          {subscriptionCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="px-6 py-3 rounded-full text-sm tracking-wide transition-all duration-300"
              style={
                activeCategory === category.id
                  ? { backgroundColor: blush, color: 'white' }
                  : { backgroundColor: 'white', color: charcoal, border: `1px solid ${blush}33` }
              }
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = `${blush}1a`;
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        {/* Subscriptions display */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentSubscriptions.map((sub, index) => (
            <motion.div
              key={sub.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group ${sub.popular ? 'lg:-mt-4 lg:mb-4' : ''}`}
            >
              {/* Popular badge */}
              {sub.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="flex items-center gap-1 px-4 py-1 text-white text-xs uppercase tracking-wider rounded-full"
                    style={{ backgroundColor: blush }}
                  >
                    <Sparkles size={12} />
                    Popular
                  </div>
                </div>
              )}

              <div
                className={`relative h-full p-8 rounded-3xl transition-all duration-500 ${
                  sub.popular
                    ? 'bg-white shadow-xl'
                    : 'bg-white/80 hover:shadow-lg'
                }`}
                style={
                  sub.popular
                    ? { boxShadow: `0 25px 50px -12px ${blush}1a`, border: `2px solid ${blush}4d` }
                    : { border: `1px solid ${blush}1a` }
                }
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-medium mb-2" style={{ color: charcoal }}>{sub.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-light" style={{ color: blush }}>{sub.price}</span>
                    <span style={{ color: `${charcoal}80` }}>CHF</span>
                  </div>
                  {sub.originalPrice && (
                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-sm line-through" style={{ color: `${charcoal}66` }}>{sub.originalPrice} CHF</span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: `${blush}1a`, color: blush }}
                      >
                        -{sub.discount}%
                      </span>
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div
                  className="w-full h-[1px] mb-6"
                  style={{ background: `linear-gradient(to right, transparent, ${blush}4d, transparent)` }}
                />

                {/* Sessions */}
                <div className="text-center mb-6">
                  <span className="text-3xl font-light" style={{ color: charcoal }}>{sub.sessions}x</span>
                  <span className="ml-2" style={{ color: `${charcoal}80` }}>séances</span>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {sub.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                        style={{ backgroundColor: `${blush}1a` }}
                      >
                        <Check size={12} style={{ color: blush }} />
                      </div>
                      <span className="text-sm" style={{ color: `${charcoal}b3` }}>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="https://www.salonkee.ch/salon/glow-aesthetics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-4 text-center text-sm uppercase tracking-wider rounded-full transition-all duration-300"
                  style={
                    sub.popular
                      ? { backgroundColor: blush, color: 'white' }
                      : { backgroundColor: `${blush}1a`, color: blush }
                  }
                  onMouseEnter={(e) => {
                    if (sub.popular) {
                      e.currentTarget.style.backgroundColor = blushDark;
                    } else {
                      e.currentTarget.style.backgroundColor = blush;
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (sub.popular) {
                      e.currentTarget.style.backgroundColor = blush;
                    } else {
                      e.currentTarget.style.backgroundColor = `${blush}1a`;
                      e.currentTarget.style.color = blush;
                    }
                  }}
                >
                  Acheter Maintenant
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
