
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen animate-fade-in">
      <Header />
      <main className="space-y-0">
        <div className="animate-slide-up">
          <Hero />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Features />
        </div>
        <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
          <Testimonials />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
