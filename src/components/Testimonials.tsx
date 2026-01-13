'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

// Color constants
const blush = '#D6B7B4';
const blushDark = '#C4A5A2';
const charcoal = '#2D2D2D';
const cream = '#F9F5F4';

const testimonials = [
  {
    id: 1,
    name: 'Maja',
    date: '6. Januar 2026',
    rating: 5,
    text: 'Bin perfekt beraten worden. Und bin jetzt endlich glücklich mit meinen Wimpern.',
    translation: 'Ich wurde perfekt beraten. Und bin jetzt endlich glücklich mit meinen Wimpern.',
    service: 'Wimpernverlängerung',
  },
  {
    id: 2,
    name: 'Sevcan',
    date: '16. Juni 2025',
    rating: 5,
    text: 'Sehr empfehlenswert! Sehr sympathisch und herzliches Team. Super Wohlfühloase',
    translation: 'Sehr empfehlenswert! Sehr sympathisch und herzliches Team. Super Wohlfühloase',
    service: 'Gesichtsbehandlung',
  },
  {
    id: 3,
    name: 'Kübra',
    date: '8. April 2025',
    rating: 5,
    text: 'Heute war ich bei der lieben Acelya zur Icoone Laser Behandlung – und ich bin super happy! Sie hat sich viel Zeit genommen, alles verständlich erklärt und die Behandlung war total angenehm.',
    translation: 'Heute war ich bei der lieben Acelya zur Icoone Laser Behandlung – und ich bin super happy! Sie hat sich viel Zeit genommen, alles verständlich erklärt und die Behandlung war total angenehm.',
    service: 'Icoone Laser',
  },
  {
    id: 4,
    name: 'Nilu',
    date: '29. März 2025',
    rating: 5,
    text: 'Bin super zufrieden, sehr nettes Personal, die ihr Beruf mit Liebe & zu fairen Preisen machen. Ich freue mich auf meinen nächsten Termin!',
    translation: 'Bin super zufrieden, sehr nettes Personal, die ihr Beruf mit Liebe & zu fairen Preisen machen. Ich freue mich auf meinen nächsten Termin!',
    service: 'Beauty Behandlung',
  },
];

export default function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextTestimonial();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2070&auto=format&fit=crop"
          alt="Spa atmosphere"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ backgroundColor: blush, opacity: 0.9 }} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 left-20 w-40 h-40 border border-white/10 rounded-full" />
      <div className="absolute bottom-20 right-20 w-60 h-60 border border-white/10 rounded-full" />
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/20 rounded-full"
      />

      <div className="max-w-5xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block text-sm uppercase tracking-[0.3em] text-white/70 mb-4">
            Erfahrungen
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-white">
            Was unsere{' '}
            <span className="italic">Kunden sagen</span>
          </h2>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="fill-white text-white" />
            ))}
          </div>
          <span className="text-white/80">Clientes satisfaites</span>
        </motion.div>

        {/* Testimonial carousel */}
        <div className="relative min-h-[400px] flex items-center justify-center">
          {/* Quote icon */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Quote size={80} className="text-white/10" />
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="text-center max-w-3xl mx-auto px-8"
            >
              {/* Service badge */}
              <span className="inline-block px-4 py-1 bg-white/10 text-white/80 text-xs uppercase tracking-wider rounded-full mb-8">
                {testimonials[currentIndex].service}
              </span>

              {/* Testimonial text */}
              <p className="text-xl sm:text-2xl lg:text-3xl font-light text-white leading-relaxed mb-6">
                &ldquo;{testimonials[currentIndex].text}&rdquo;
              </p>

              {/* Translation */}
              <p className="text-white/60 italic mb-8">
                {testimonials[currentIndex].translation}
              </p>

              {/* Author info */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl font-light text-white">
                    {testimonials[currentIndex].name[0]}
                  </span>
                </div>
                <span className="text-white font-medium">{testimonials[currentIndex].name}</span>
                <span className="text-white/50 text-sm mt-1">{testimonials[currentIndex].date}</span>
                <div className="flex mt-3">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={14} className="fill-white text-white" />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
