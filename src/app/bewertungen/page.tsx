'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Star, Quote } from 'lucide-react';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const reviews = [
  {
    name: 'Anna M.',
    rating: 5,
    date: 'Januar 2025',
    treatment: 'Volume Wimpernverlängerung',
    text: 'Ich bin absolut begeistert! Sofia hat mir wunderschöne Wimpern gezaubert. Das Ergebnis ist natürlich und gleichzeitig glamourös. Der gesamte Ablauf war professionell und entspannend.',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Sandra K.',
    rating: 5,
    date: 'Dezember 2024',
    treatment: 'ICOONE® Körperbehandlung',
    text: 'Nach 5 Behandlungen mit ICOONE kann ich bereits deutliche Verbesserungen sehen. Marina erklärt alles sehr gut und geht auf individuelle Wünsche ein. Sehr empfehlenswert!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Lisa B.',
    rating: 5,
    date: 'Dezember 2024',
    treatment: 'Préime DermaFacial',
    text: 'Meine Haut hat noch nie so gut ausgesehen! Elena ist eine wahre Expertin. Die Behandlung war entspannend und das Ergebnis ist einfach fantastisch. Meine neue Lieblingsbehandlung!',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Maria T.',
    rating: 5,
    date: 'November 2024',
    treatment: 'Lash Lifting',
    text: 'Perfektes Ergebnis! Meine natürlichen Wimpern sehen jetzt so viel voller und geschwungener aus. Der Effekt hält wirklich lange und die Pflege ist minimal.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Julia W.',
    rating: 5,
    date: 'November 2024',
    treatment: 'Microneedling',
    text: 'Nach meinem Microneedling bei Elena ist meine Haut so viel straffer und frischer. Die Beratung war umfassend und ich fühlte mich bestens aufgehoben.',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Nicole H.',
    rating: 5,
    date: 'Oktober 2024',
    treatment: 'Mega Volume Wimpernverlängerung',
    text: 'WOW! Ich bin sprachlos. Die Mega Volume Wimpern sind ein Traum! Sofia hat genau verstanden, was ich wollte. Das Studio ist wunderschön und das Team super freundlich.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Petra S.',
    rating: 5,
    date: 'Oktober 2024',
    treatment: 'Anti-Aging Behandlung',
    text: 'Eine absolute Wohlfühloase! Die Anti-Aging Behandlung war himmlisch entspannend und die Ergebnisse sprechen für sich. Meine Haut strahlt wie lange nicht mehr.',
    image: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=100&h=100&fit=crop&crop=faces',
  },
  {
    name: 'Sabine L.',
    rating: 5,
    date: 'September 2024',
    treatment: 'Brow Lifting',
    text: 'Endlich perfekte Augenbrauen! Das Brow Lifting hat mein Gesicht komplett verwandelt. Ich spare jetzt so viel Zeit beim Schminken. Danke an das tolle Team!',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=100&h=100&fit=crop&crop=faces',
  },
];

const stats = [
  { number: '500+', label: 'Zufriedene Kunden' },
  { number: '4.9', label: 'Durchschnittliche Bewertung' },
  { number: '98%', label: 'Weiterempfehlungsrate' },
  { number: '3+', label: 'Jahre Erfahrung' },
];

export default function BewertungenPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const reviewsRef = useRef<HTMLDivElement>(null);
  const reviewsInView = useInView(reviewsRef, { once: true, margin: '-100px' });

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
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={32} fill="white" color="white" />
              ))}
            </div>
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              Kunden<span className="italic">bewertungen</span>
            </h1>
            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">
              Was unsere Kunden über ihre Erfahrungen bei Glow Aesthetics sagen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-light mb-2" style={{ color: blush }}>
                  {stat.number}
                </div>
                <div className="text-sm uppercase tracking-wider" style={{ color: `${charcoal}80` }}>
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Grid */}
      <section ref={reviewsRef} className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 30 }}
                animate={reviewsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={review.image}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-medium" style={{ color: charcoal }}>
                      {review.name}
                    </h3>
                    <p className="text-sm" style={{ color: `${charcoal}80` }}>
                      {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} fill={blush} color={blush} />
                  ))}
                </div>

                <p className="text-sm uppercase tracking-wider mb-3" style={{ color: blush }}>
                  {review.treatment}
                </p>

                <div className="relative">
                  <Quote
                    size={24}
                    className="absolute -top-2 -left-2 opacity-10"
                    style={{ color: charcoal }}
                  />
                  <p className="text-sm leading-relaxed pl-4" style={{ color: `${charcoal}b3` }}>
                    "{review.text}"
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews Link */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-light mb-6" style={{ color: charcoal }}>
              Bewerten Sie uns auf <span className="italic" style={{ color: blush }}>Google</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Ihre Meinung ist uns wichtig! Teilen Sie Ihre Erfahrungen und helfen Sie
              anderen, uns zu finden.
            </p>
            <a
              href="https://g.page/r/glow-aesthetics-horgen/review"
              target="_blank"
              rel="noopener noreferrer"
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
              <Star size={18} />
              <span className="uppercase tracking-wider">Bewertung Schreiben</span>
            </a>
          </motion.div>
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
              Überzeugen Sie sich <span className="italic" style={{ color: blush }}>selbst</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Werden Sie Teil unserer zufriedenen Kundschaft und erleben Sie den Glow Aesthetics Unterschied.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-3 px-8 py-4 text-white rounded-full transition-all"
              style={{ backgroundColor: blush }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#a69c9e')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
            >
              <span className="uppercase tracking-wider">Termin Buchen</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
