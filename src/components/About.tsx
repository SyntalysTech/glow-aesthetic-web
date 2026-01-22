'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Heart, Award, Clock } from 'lucide-react';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const features = [
  {
    icon: Sparkles,
    title: 'Premium Behandlungen',
    description: 'Spitzentechnologie für außergewöhnliche Ergebnisse',
  },
  {
    icon: Heart,
    title: 'Persönliche Betreuung',
    description: 'Jede Behandlung an Ihre einzigartigen Bedürfnisse angepasst',
  },
  {
    icon: Award,
    title: 'Experten-Profis',
    description: 'Zertifiziertes Team mit jahrelanger Erfahrung',
  },
  {
    icon: Clock,
    title: 'Flexible Öffnungszeiten',
    description: 'Termine von Montag bis Samstag für Ihren Komfort',
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden bg-white">
      {/* Background patterns */}
      <div className="absolute inset-0 dot-pattern opacity-30" />

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image composition */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Main image */}
            <motion.div
              style={{ y: y2, boxShadow: `0 25px 50px -12px ${blush}33` }}
              className="relative z-10 rounded-[40px] overflow-hidden"
            >
              <div className="aspect-[4/5]">
                <img
                  src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
                  alt="Professional beauty treatment"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Secondary image */}
            <motion.div
              style={{ y: y1 }}
              className="absolute -bottom-10 -right-10 w-48 sm:w-64 rounded-3xl overflow-hidden shadow-xl z-20"
            >
              <div className="aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
                  alt="Skincare products"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div
              className="absolute -top-6 -left-6 w-32 h-32 rounded-full"
              style={{ border: `2px solid ${blush}33` }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute top-1/2 -left-16 w-32 h-32"
            >
              <div
                className="w-full h-full rounded-full"
                style={{ border: `1px dashed ${blush}4D` }}
              />
            </motion.div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 -right-4 bg-white rounded-2xl p-4 z-30"
              style={{ boxShadow: `0 10px 15px -3px ${blush}1A` }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${blush}1A` }}
                >
                  <Sparkles className="w-5 h-5" style={{ color: blush }} />
                </div>
                <div>
                  <div className="text-xs" style={{ color: `${charcoal}80` }}>Verifiziert</div>
                  <div className="text-sm font-medium" style={{ color: charcoal }}>5.0 Bewertung</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <span
              className="inline-block text-sm uppercase tracking-[0.3em] mb-4"
              style={{ color: blush }}
            >
              Über Uns
            </span>
            <h2 className="text-4xl sm:text-5xl font-light leading-tight mb-6" style={{ color: charcoal }}>
              Ihr Wohlbefinden ist{' '}
              <span className="italic" style={{ color: blush }}>unsere Leidenschaft</span>
            </h2>

            <div className="space-y-6 mb-10" style={{ color: `${charcoal}B3` }}>
              <p>
                Bei Glow Aesthetics glauben wir, dass jeder Mensch es verdient, sich strahlend zu fühlen.
                Im Herzen von Horgen gelegen, bieten wir eine Oase der Ruhe,
                wo Spitzentechnologie auf personalisierte Pflege trifft.
              </p>
              <p>
                Unser Team zertifizierter Profis widmet sich der Verschönerung
                Ihrer natürlichen Schönheit mit Behandlungen von Wimpernverlängerungen
                bis hin zu innovativen Behandlungen mit der Icoone Laser Technologie.
              </p>
            </div>

            {/* Features grid */}
            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <FeatureItem
                  key={feature.title}
                  feature={feature}
                  index={index}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  feature,
  index,
  isInView,
}: {
  feature: { icon: React.ElementType; title: string; description: string };
  index: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      className="flex items-start gap-4 group"
    >
      <div
        className="flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:bg-[#baaeb1]"
        style={{ backgroundColor: `${blush}1A` }}
      >
        <feature.icon
          className="w-5 h-5 transition-colors duration-300 group-hover:text-white"
          style={{ color: blush }}
        />
      </div>
      <div>
        <h4 className="font-medium mb-1" style={{ color: charcoal }}>{feature.title}</h4>
        <p className="text-sm" style={{ color: `${charcoal}99` }}>{feature.description}</p>
      </div>
    </motion.div>
  );
}
