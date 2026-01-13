'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowDown, Star } from 'lucide-react';

const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Background with parallax */}
      <motion.div
        style={{
          y,
          scale,
          position: 'absolute',
          inset: 0,
        }}
      >
        {/* Main background image */}
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?q=80&w=2070&auto=format&fit=crop"
            alt="Luxury spa treatment"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, rgba(255,255,255,0.95), rgba(255,255,255,0.8), transparent)',
            }}
          />
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, transparent, transparent, white)',
            }}
          />
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div
        style={{
          position: 'absolute',
          top: '5rem',
          left: '2.5rem',
          width: '16rem',
          height: '16rem',
          borderRadius: '50%',
          filter: 'blur(48px)',
          backgroundColor: blush,
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10rem',
          right: '5rem',
          width: '24rem',
          height: '24rem',
          borderRadius: '50%',
          filter: 'blur(48px)',
          backgroundColor: blush,
          opacity: 0.1,
        }}
      />

      {/* Content */}
      <motion.div
        style={{
          opacity,
          position: 'relative',
          zIndex: 10,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            width: '100%',
          }}
        >
          <div style={{ maxWidth: '42rem', paddingTop: '8rem' }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '9999px',
                marginBottom: '2rem',
                backgroundColor: `${blush}1a`,
              }}
            >
              <div style={{ display: 'flex' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} style={{ fill: blush, color: blush }} />
                ))}
              </div>
              <span style={{ fontSize: '0.875rem', color: `${charcoal}b3` }}>
                Exzellenz in Schönheit
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h1
                style={{
                  fontSize: 'clamp(3rem, 8vw, 4.5rem)',
                  fontWeight: 300,
                  lineHeight: 1.1,
                  marginBottom: '1.5rem',
                  color: charcoal,
                }}
              >
                Ihr{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  <span style={{ position: 'relative', zIndex: 10 }}>Strahlen</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    style={{
                      position: 'absolute',
                      bottom: '0.5rem',
                      left: 0,
                      width: '100%',
                      height: '0.75rem',
                      backgroundColor: `${blush}4d`,
                      transformOrigin: 'left',
                      zIndex: 0,
                    }}
                  />
                </span>
                <br />
                ist unsere{' '}
                <span style={{ fontStyle: 'italic', color: blush }}>Leidenschaft</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              style={{
                fontSize: '1.125rem',
                fontWeight: 300,
                marginBottom: '2.5rem',
                maxWidth: '32rem',
                color: `${charcoal}b3`,
              }}
            >
              Entdecken Sie professionelle Schönheitsbehandlungen, die Ihre natürliche Schönheit
              in einem exklusiven Ambiente in Horgen unterstreichen.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
              className="sm:flex-row"
            >
              <a
                href="https://www.salonkee.ch/salon/glow-aesthetics"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem 2rem',
                  backgroundColor: blush,
                  color: 'white',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blushDark)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = blush)}
              >
                Jetzt Buchen
              </a>
              <a
                href="#services"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '1rem 2rem',
                  border: `1px solid ${charcoal}33`,
                  color: charcoal,
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = charcoal;
                  e.currentTarget.style.color = 'white';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = charcoal;
                }}
              >
                Services Ansehen
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                marginTop: '4rem',
                display: 'flex',
                gap: '3rem',
              }}
            >
              {[
                { number: '5.0', label: 'Bewertung' },
                { number: '3+', label: 'Services' },
                { number: '100%', label: 'Zufriedenheit' },
              ].map((stat, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.875rem', fontWeight: 300, color: blush }}>
                    {stat.number}
                  </div>
                  <div
                    style={{
                      fontSize: '0.75rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginTop: '0.25rem',
                      color: `${charcoal}80`,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right side image collage - hidden on mobile */}
      <div
        style={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          width: '33%',
        }}
        className="hidden lg:block"
      >
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={{ position: 'relative' }}
        >
          {/* Main image */}
          <div
            style={{
              position: 'relative',
              width: '18rem',
              height: '24rem',
              marginLeft: 'auto',
              marginRight: '5rem',
              overflow: 'hidden',
              borderRadius: '100px',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=2070&auto=format&fit=crop"
              alt="Facial treatment"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>

          {/* Floating smaller image */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: '-2.5rem',
              left: '-2.5rem',
              width: '10rem',
              height: '13rem',
              overflow: 'hidden',
              borderRadius: '60px',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
              alt="Skincare"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </motion.div>

          {/* Decorative ring */}
          <div
            style={{
              position: 'absolute',
              top: '-2.5rem',
              left: '-1.25rem',
              width: '6rem',
              height: '6rem',
              border: `2px solid ${blush}4d`,
              borderRadius: '50%',
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: `${charcoal}66`,
          }}
        >
          Scrollen
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <ArrowDown size={20} style={{ color: blush }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
