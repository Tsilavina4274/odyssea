import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Testimonials from '@/components/Testimonials';

const Index = () => {
  return (
    <div className="space-y-0 animate-fade-in">
      <div className="animate-slide-up">
        <Hero />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <Features />
      </div>
      <div className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <Testimonials />
      </div>
    </div>
  );
};

export default Index;
