'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Instagram, User as UserIcon } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';

const navItems = [
  { name: 'Startseite', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Kontakt', href: '/contact' },
];

export default function Header() {
  const { isAuthenticated, user } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Top bar */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        style={{
          backgroundColor: blush,
          padding: '0.5rem 1rem',
          display: isScrolled ? 'none' : 'block',
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            fontSize: '0.75rem',
            flexWrap: 'wrap',
            gap: '0.5rem',
          }}
          className="lg:text-sm lg:gap-4"
        >
          {/* Mobile: Only phone */}
          <a
            href="tel:+41766092420"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: 'white',
              textDecoration: 'none',
            }}
            className="lg:hidden"
          >
            <Phone size={12} />
            <span>+41 76 609 24 20</span>
          </a>

          {/* Desktop: Phone + Address */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: '1.5rem' }}>
            <a
              href="tel:+41766092420"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              <Phone size={14} />
              <span>+41 76 609 24 20</span>
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={14} />
              <span>Seestrasse 2, 8810 Horgen</span>
            </span>
          </div>

          {/* Mobile + Desktop: Hours + Instagram */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }} className="lg:gap-4">
            <span style={{ opacity: 0.9 }} className="hidden sm:inline">Mo-Fr: 09:00-19:00 | Sa: 09:00-16:00</span>
            <span style={{ opacity: 0.9 }} className="sm:hidden">Mo-Fr: 09-19 | Sa: 09-16</span>
            <a
              href="https://www.instagram.com/glow.aesthet1cs/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'white' }}
            >
              <Instagram size={14} className="lg:w-4 lg:h-4" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Main header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.1 }}
        className="fixed w-full"
        style={{
          transition: 'all 0.5s ease',
          backgroundColor: isScrolled || isMobileMenuOpen ? 'rgba(255, 255, 255, 0.95)' : blush,
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px)' : 'none',
          boxShadow: isScrolled || isMobileMenuOpen ? '0 2px 10px rgba(0,0,0,0.1)' : 'none',
          padding: isScrolled || isMobileMenuOpen ? '0.75rem 0' : '1rem 0',
          top: isScrolled || isMobileMenuOpen ? 0 : '2rem',
          zIndex: 101,
        }}
      >
        <div
          style={{
            maxWidth: '80rem',
            margin: '0 auto',
            padding: '0 1.5rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ position: 'relative', zIndex: 10, textDecoration: 'none' }}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <img
                src={isScrolled || isMobileMenuOpen ? '/images/logo-black.png' : '/images/logo-white.png'}
                alt="Glow Aesthetics"
                style={{
                  height: '48px',
                  width: 'auto',
                  objectFit: 'contain',
                  transition: 'opacity 0.3s ease',
                }}
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '3rem',
            }}
            className="hidden lg:flex"
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Link
                  href={item.href}
                  style={{
                    fontSize: '0.875rem',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    color: isScrolled ? charcoal : 'white',
                    textDecoration: 'none',
                    transition: 'color 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = isScrolled ? blush : 'rgba(255,255,255,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = isScrolled ? charcoal : 'white')}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* User Profile / Login - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45 }}
            className="hidden lg:flex items-center gap-4"
          >
            <Link
              href={isAuthenticated ? '/profile' : '/auth'}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                backgroundColor: 'transparent',
                color: isScrolled || isMobileMenuOpen ? charcoal : 'white',
                fontSize: '0.875rem',
                textDecoration: 'none',
                borderRadius: '9999px',
                border: `2px solid ${isScrolled || isMobileMenuOpen ? blush : 'white'}`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isScrolled || isMobileMenuOpen ? blush : 'white';
                e.currentTarget.style.color = isScrolled || isMobileMenuOpen ? 'white' : blush;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = isScrolled || isMobileMenuOpen ? charcoal : 'white';
              }}
            >
              <UserIcon size={18} />
              <span>{isAuthenticated ? user?.firstName || 'Profil' : 'Anmelden'}</span>
            </Link>

            <Link href="/booking"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: isScrolled || isMobileMenuOpen ? blush : 'white',
                color: isScrolled || isMobileMenuOpen ? 'white' : blush,
                fontSize: '0.875rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                borderRadius: '9999px',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = isScrolled || isMobileMenuOpen ? blushDark : 'rgba(255,255,255,0.9)';
                e.currentTarget.style.transform = 'scale(1.02)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isScrolled || isMobileMenuOpen ? blush : 'white';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Termin Buchen
            </Link>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              display: 'block',
              padding: '0.5rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: isScrolled || isMobileMenuOpen ? charcoal : 'white',
              position: 'relative',
              zIndex: 101,
            }}
            className="lg:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              backgroundColor: 'white',
              paddingTop: '5.5rem',
              overflowY: 'auto',
            }}
            className="lg:hidden"
          >
            {/* Top info bar in mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{
                padding: '1.5rem 2rem',
                backgroundColor: `${blush}1a`,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
                fontSize: '0.875rem',
                color: charcoal,
              }}
            >
              <a href="tel:+41766092420" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'inherit', textDecoration: 'none' }}>
                <Phone size={14} style={{ color: blush }} />
                +41 76 609 24 20
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MapPin size={14} style={{ color: blush }} />
                Seestrasse 2, 8810 Horgen
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Instagram size={14} style={{ color: blush }} />
                Mo-Fr: 09:00-19:00 | Sa: 09:00-16:00
              </span>
            </motion.div>

            <nav style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', padding: '3rem 2rem' }}>
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      fontSize: '1.875rem',
                      fontWeight: 300,
                      color: charcoal,
                      textDecoration: 'none',
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Profile/Login Link - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                style={{ marginTop: '1rem' }}
              >
                <Link
                  href={isAuthenticated ? '/profile' : '/auth'}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '1rem 2rem',
                    backgroundColor: 'transparent',
                    color: charcoal,
                    fontSize: '1.125rem',
                    letterSpacing: '0.05em',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                    border: `2px solid ${blush}`,
                  }}
                >
                  <UserIcon size={20} />
                  <span>{isAuthenticated ? user?.firstName || 'Profil' : 'Anmelden'}</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Link href="/booking"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    backgroundColor: blush,
                    color: 'white',
                    fontSize: '1.125rem',
                    letterSpacing: '0.05em',
                    borderRadius: '9999px',
                    textDecoration: 'none',
                  }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Termin Buchen
                </Link>
              </motion.div>
            </nav>

            {/* Instagram link at bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '2rem',
                fontSize: '0.875rem',
                color: `${charcoal}99`,
              }}
            >
              <a
                href="https://www.instagram.com/glow.aesthet1cs/"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <Instagram size={16} style={{ color: blush }} />
                Folgen Sie uns auf Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
