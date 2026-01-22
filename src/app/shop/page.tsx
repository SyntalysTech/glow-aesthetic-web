'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion, useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { ShoppingBag, Heart, Star, Filter } from 'lucide-react';

const blush = '#baaeb1';
const charcoal = '#2D2D2D';
const cream = '#f7f7f7';

const categories = ['Alle', 'Pflege', 'Wimpern', 'Augenbrauen', 'Körper'];

const products = [
  {
    id: 1,
    name: 'Lash Serum',
    category: 'Wimpern',
    price: 89,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop',
    description: 'Wachstumsserum für längere, dichtere Wimpern',
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 2,
    name: 'Hydrating Face Cream',
    category: 'Pflege',
    price: 65,
    image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38b15?w=400&h=400&fit=crop',
    description: 'Intensive Feuchtigkeitspflege für jeden Hauttyp',
    rating: 4.8,
    bestseller: true,
  },
  {
    id: 3,
    name: 'Vitamin C Serum',
    category: 'Pflege',
    price: 79,
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop',
    description: 'Antioxidatives Serum für strahlende Haut',
    rating: 4.9,
    bestseller: false,
  },
  {
    id: 4,
    name: 'Brow Growth Serum',
    category: 'Augenbrauen',
    price: 59,
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    description: 'Natürliches Wachstumsserum für vollere Brauen',
    rating: 4.7,
    bestseller: false,
  },
  {
    id: 5,
    name: 'Lash Cleanser',
    category: 'Wimpern',
    price: 29,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop',
    description: 'Sanfte Reinigung für Wimpernverlängerungen',
    rating: 4.8,
    bestseller: false,
  },
  {
    id: 6,
    name: 'Anti-Cellulite Creme',
    category: 'Körper',
    price: 75,
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=400&h=400&fit=crop',
    description: 'Straffende Körpercreme für glatte Haut',
    rating: 4.6,
    bestseller: false,
  },
  {
    id: 7,
    name: 'Retinol Night Cream',
    category: 'Pflege',
    price: 95,
    image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop',
    description: 'Anti-Aging Nachtpflege mit Retinol',
    rating: 4.9,
    bestseller: true,
  },
  {
    id: 8,
    name: 'Silk Eye Pads',
    category: 'Wimpern',
    price: 19,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
    description: 'Hydrogel-Pads für die Augenpflege',
    rating: 4.5,
    bestseller: false,
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('Alle');
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  const filteredProducts = selectedCategory === 'Alle'
    ? products
    : products.filter(p => p.category === selectedCategory);

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
            <h1 className="text-5xl md:text-6xl font-light mb-6">
              Beauty <span className="italic">Shop</span>
            </h1>
            <p className="text-xl font-light opacity-90 max-w-2xl mx-auto">
              Professionelle Pflegeprodukte für Ihre Schönheitsroutine zu Hause.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Products */}
      <section className="py-16" style={{ backgroundColor: cream }}>
        <div className="max-w-7xl mx-auto px-6">
          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            <Filter size={20} style={{ color: charcoal }} />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-6 py-2 rounded-full text-sm uppercase tracking-wider transition-all"
                style={{
                  backgroundColor: selectedCategory === category ? blush : 'white',
                  color: selectedCategory === category ? 'white' : charcoal,
                }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm group"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.bestseller && (
                    <div
                      className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs uppercase tracking-wider text-white"
                      style={{ backgroundColor: blush }}
                    >
                      Bestseller
                    </div>
                  )}
                  <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center transition-all hover:bg-white"
                    style={{ color: charcoal }}
                  >
                    <Heart size={18} />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={14} fill={blush} color={blush} />
                    <span className="text-sm" style={{ color: `${charcoal}80` }}>
                      {product.rating}
                    </span>
                  </div>

                  <h3 className="font-medium mb-2" style={{ color: charcoal }}>
                    {product.name}
                  </h3>
                  <p className="text-sm mb-4" style={{ color: `${charcoal}80` }}>
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-light" style={{ color: blush }}>
                      CHF {product.price}
                    </span>
                    <button
                      className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all"
                      style={{ backgroundColor: cream, color: charcoal }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = blush;
                        e.currentTarget.style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = cream;
                        e.currentTarget.style.color = charcoal;
                      }}
                    >
                      <ShoppingBag size={16} />
                      <span>Kaufen</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-3xl mb-4">🚚</div>
              <h3 className="font-medium mb-2" style={{ color: charcoal }}>
                Kostenloser Versand
              </h3>
              <p className="text-sm" style={{ color: `${charcoal}80` }}>
                Ab CHF 100 Bestellwert
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">💝</div>
              <h3 className="font-medium mb-2" style={{ color: charcoal }}>
                Gratis Proben
              </h3>
              <p className="text-sm" style={{ color: `${charcoal}80` }}>
                Bei jeder Bestellung
              </p>
            </div>
            <div className="p-6">
              <div className="text-3xl mb-4">✨</div>
              <h3 className="font-medium mb-2" style={{ color: charcoal }}>
                Professionelle Beratung
              </h3>
              <p className="text-sm" style={{ color: `${charcoal}80` }}>
                Persönlich im Studio
              </p>
            </div>
          </div>
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
              Persönliche <span className="italic" style={{ color: blush }}>Beratung</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: `${charcoal}80` }}>
              Unsere Expertinnen beraten Sie gerne zu den passenden Produkten für Ihre Bedürfnisse.
              Besuchen Sie uns im Studio!
            </p>
            <a
              href="/contact"
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
              <span className="uppercase tracking-wider">Kontakt Aufnehmen</span>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
