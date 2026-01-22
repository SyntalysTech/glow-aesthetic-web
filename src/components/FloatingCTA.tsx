'use client';
import Link from 'next/link';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, X, Phone } from 'lucide-react';

const blush = '#baaeb1';
const blushDark = '#a69c9e';
const charcoal = '#2D2D2D';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHoveredBook, setIsHoveredBook] = useState(false);
  const [isHoveredPhone, setIsHoveredPhone] = useState(false);
  const [isHoveredMain, setIsHoveredMain] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          className="fixed bottom-6 right-6 z-50"
        >
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-3xl shadow-2xl p-6 min-w-[280px]"
                style={{ boxShadow: `0 25px 50px -12px ${blush}33` }}
              >
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-4 right-4 p-1 transition-colors"
                  style={{ color: `${charcoal}66` }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = charcoal)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = `${charcoal}66`)}
                >
                  <X size={20} />
                </button>

                <h4
                  className="text-lg font-medium mb-4"
                  style={{ color: charcoal }}
                >
                  Prête à rayonner ?
                </h4>

                <div className="space-y-3">
                  <Link href="/booking"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 w-full px-4 py-3 text-white rounded-xl transition-colors"
                    style={{ backgroundColor: isHoveredBook ? blushDark : blush }}
                    onMouseEnter={() => setIsHoveredBook(true)}
                    onMouseLeave={() => setIsHoveredBook(false)}
                  >
                    <Calendar size={18} />
                    <span className="text-sm">Réserver en Ligne</span>
                  </Link>
                  <a
                    href="tel:+41766092420"
                    className="flex items-center gap-3 w-full px-4 py-3 border rounded-xl transition-colors"
                    style={{
                      borderColor: `${blush}33`,
                      color: charcoal,
                      backgroundColor: isHoveredPhone ? `${blush}1A` : 'transparent',
                    }}
                    onMouseEnter={() => setIsHoveredPhone(true)}
                    onMouseLeave={() => setIsHoveredPhone(false)}
                  >
                    <Phone size={18} style={{ color: blush }} />
                    <span className="text-sm">+41 76 609 24 20</span>
                  </a>
                </div>
              </motion.div>
            ) : (
              <motion.button
                key="collapsed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setIsExpanded(true)}
                onMouseEnter={() => setIsHoveredMain(true)}
                onMouseLeave={() => setIsHoveredMain(false)}
                className="group relative flex items-center gap-3 px-6 py-4 text-white rounded-full transition-all"
                style={{
                  backgroundColor: blush,
                  boxShadow: isHoveredMain
                    ? `0 20px 25px -5px ${blush}66, 0 8px 10px -6px ${blush}66`
                    : `0 10px 15px -3px ${blush}4D, 0 4px 6px -4px ${blush}4D`,
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full"
                />
                <Calendar size={20} />
                <span className="text-sm font-medium uppercase tracking-wider">Réserver</span>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
