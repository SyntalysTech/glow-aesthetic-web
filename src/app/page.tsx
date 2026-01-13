import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import About from '@/components/About';
import Subscriptions from '@/components/Subscriptions';
import Gallery from '@/components/Gallery';
import Testimonials from '@/components/Testimonials';
import CTABanner from '@/components/CTABanner';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingCTA from '@/components/FloatingCTA';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <About />
      <Subscriptions />
      <Gallery />
      <Testimonials />
      <CTABanner />
      <Contact />
      <Footer />
      <FloatingCTA />
    </main>
  );
}
