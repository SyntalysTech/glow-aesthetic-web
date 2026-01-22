'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Award, Users, Sparkles, Star } from 'lucide-react';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const values = [
  {
    icon: Heart,
    title: 'Leidenschaft',
    description: 'Wir lieben, was wir tun. Jede Behandlung führen wir mit Hingabe und Sorgfalt durch.',
  },
  {
    icon: Award,
    title: 'Qualität',
    description: 'Nur die besten Produkte und modernste Technologien für Ihre Schönheit.',
  },
  {
    icon: Users,
    title: 'Persönlichkeit',
    description: 'Individuelle Beratung und massgeschneiderte Behandlungen für jeden Kunden.',
  },
  {
    icon: Sparkles,
    title: 'Innovation',
    description: 'Stets auf dem neuesten Stand der Kosmetik und Ästhetik.',
  },
];

const team = [
  {
    name: 'Sofia',
    role: 'Gründerin & Wimpern-Spezialistin',
    image: 'https://images.pexels.com/photos/3764119/pexels-photo-3764119.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Mit über 8 Jahren Erfahrung in der Wimpernverlängerung ist Sofia eine wahre Künstlerin ihres Fachs.',
  },
  {
    name: 'Elena',
    role: 'Gesichts- & Körper-Expertin',
    image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Elena verbindet traditionelle Techniken mit modernster Technologie für strahlende Ergebnisse.',
  },
  {
    name: 'Marina',
    role: 'Icoone-Technologie-Expertin',
    image: 'https://images.pexels.com/photos/3762940/pexels-photo-3762940.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    description: 'Als zertifizierte Icoone-Spezialistin sorgt Marina für perfekte Körperkonturierung.',
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });
  const valuesRef = useRef<HTMLDivElement>(null);
  const valuesInView = useInView(valuesRef, { once: true, margin: '-100px' });
  const teamRef = useRef<HTMLDivElement>(null);
  const teamInView = useInView(teamRef, { once: true, margin: '-100px' });

  return (
    <main>
      <Header />

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-32">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3997390/pexels-photo-3997390.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop"
            alt="Glow Aesthetics Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-6xl font-light mb-6" style={{ color: charcoal }}>
              Über <span className="italic" style={{ color: blush }}>Uns</span>
            </h1>
            <p className="text-xl font-light leading-relaxed" style={{ color: `${charcoal}b3` }}>
              Willkommen bei Glow Aesthetics – Ihrem exklusiven Beauty-Destination in Horgen.
              Wir verbinden Leidenschaft für Schönheit mit höchster Professionalität.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
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
                Unsere <span className="italic" style={{ color: blush }}>Geschichte</span>
              </h2>
              <div className="space-y-4 text-lg" style={{ color: `${charcoal}b3` }}>
                <p>
                  Glow Aesthetics wurde aus der Vision geboren, einen Ort zu schaffen, an dem sich
                  jeder Kunde besonders fühlt. In unserem Studio in Horgen vereinen wir modernste
                  Technologien mit persönlicher Betreuung.
                </p>
                <p>
                  Unser Team besteht aus hochqualifizierten Spezialistinnen, die ihre Leidenschaft
                  für Schönheit jeden Tag leben. Wir glauben, dass wahre Schönheit von innen kommt
                  – und wir helfen Ihnen, sie nach aussen zu tragen.
                </p>
                <p>
                  Mit Behandlungen wie Wimpernverlängerungen, innovativen Gesichtsbehandlungen
                  und der revolutionären Icoone-Technologie bieten wir Ihnen das Beste, was die
                  moderne Kosmetik zu bieten hat.
                </p>
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
                  src="https://images.pexels.com/photos/3985329/pexels-photo-3985329.jpeg?auto=compress&cs=tinysrgb&w=2070&fit=crop"
                  alt="Glow Aesthetics Behandlung"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-6 -left-6 p-6 rounded-2xl"
                style={{ backgroundColor: blush }}
              >
                <p className="text-white text-2xl font-light italic">
                  "Your Glow is Our Flow"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Unsere <span className="italic" style={{ color: blush }}>Werte</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${charcoal}80` }}>
              Diese Grundsätze leiten uns bei allem, was wir tun.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-8 rounded-2xl"
                style={{ backgroundColor: cream }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
                  style={{ backgroundColor: `${blush}20` }}
                >
                  <value.icon size={28} style={{ color: blush }} />
                </div>
                <h3 className="text-xl font-medium mb-3" style={{ color: charcoal }}>
                  {value.title}
                </h3>
                <p style={{ color: `${charcoal}80` }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-24" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-light mb-4" style={{ color: charcoal }}>
              Unser <span className="italic" style={{ color: blush }}>Team</span>
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: `${charcoal}80` }}>
              Lernen Sie die Expertinnen kennen, die Ihre Schönheit zum Strahlen bringen.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={teamInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="aspect-square">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-medium mb-2" style={{ color: charcoal }}>
                    {member.name}
                  </h3>
                  <p className="text-sm uppercase tracking-wider mb-4" style={{ color: blush }}>
                    {member.role}
                  </p>
                  <p style={{ color: `${charcoal}80` }}>
                    {member.description}
                  </p>
                </div>
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
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} style={{ fill: blush, color: blush }} />
              ))}
            </div>
            <h2 className="text-4xl font-light mb-6" style={{ color: charcoal }}>
              Bereit für Ihr <span className="italic" style={{ color: blush }}>Glow-Erlebnis</span>?
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Vereinbaren Sie jetzt Ihren Termin und lassen Sie sich von unseren Expertinnen verwöhnen.
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
