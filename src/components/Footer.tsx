'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Phone, MapPin, Heart } from 'lucide-react';

const blush = '#D6B7B4';
const charcoal = '#2D2D2D';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: charcoal }}>
      {/* Top wave decoration */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${blush}80, transparent)` }}
      />

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/images/logo-white.png"
                alt="Glow Aesthetics"
                width={140}
                height={56}
                className="w-36 h-auto object-contain"
              />
            </Link>
            <p className="text-white/60 max-w-sm mb-8">
              Votre destination beauté à Horgen. Des soins professionnels qui subliment
              votre beauté naturelle dans un cadre exclusif et relaxant.
            </p>
            <p className="italic text-lg" style={{ color: blush }}>
              Votre Éclat est notre Passion
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-3">
              {[
                { name: 'Accueil', href: '/' },
                { name: 'Services', href: '/services' },
                { name: 'Contact', href: '/contact' },
                { name: 'Prendre Rendez-vous', href: 'https://www.salonkee.ch/salon/glow-aesthetics' },
              ].map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/60 transition-colors text-sm"
                    style={{ '--hover-color': blush } as React.CSSProperties}
                    onMouseEnter={(e) => (e.currentTarget.style.color = blush)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="text-white font-medium mb-6 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+41766092420"
                  className="flex items-center gap-3 text-white/60 transition-colors text-sm"
                  onMouseEnter={(e) => (e.currentTarget.style.color = blush)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  <Phone size={16} style={{ color: blush }} />
                  +41 76 609 24 20
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Seestrasse+2+8810+Horgen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-white/60 transition-colors text-sm"
                  onMouseEnter={(e) => (e.currentTarget.style.color = blush)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '')}
                >
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: blush }} />
                  <span>Seestrasse 2<br />8810 Horgen, Suisse</span>
                </a>
              </li>
              <li className="flex items-center gap-4 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors group"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blush)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <Instagram size={18} className="text-white" />
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center transition-colors group"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = blush)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
                >
                  <svg className="w-[18px] h-[18px] text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Glow Aesthetics. Tous droits réservés.
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1 text-white/40 text-sm"
            >
              Fait avec <Heart size={14} style={{ color: blush, fill: blush }} /> par Syntalys
            </motion.p>
          </div>
        </div>
      </div>
    </footer>
  );
}
