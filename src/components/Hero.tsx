
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Star, Users, GraduationCap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import Counter from './Counter';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  const stats = [
    { label: "Établissements", value: "150+", change: "+15 ce mois", trend: "up" as const },
    { label: "Formations", value: "2,500+", change: "+200 ce mois", trend: "up" as const },
    { label: "Étudiants", value: "50,000+", change: "+5,000 ce mois", trend: "up" as const },
    { label: "Taux de réussite", value: "85%", change: "+3% cette année", trend: "up" as const },
  ];
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-blue-50/30 py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221.5%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Star className="w-4 h-4 mr-2" />
            Plateforme d'orientation #1 en France
          </div>

          {/* Main heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Trouve ton{' '}
            <span className="odyssea-text-gradient">université idéale</span>
            <br />
            en quelques clics
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-in">
            Odysséa connecte lycéens et universités pour faciliter ton orientation post-bac. 
            Découvre, échange et candidate en toute simplicité.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 animate-fade-in">
            {isAuthenticated ? (
              <Link to="/student-dashboard">
                <Button size="lg" className="odyssea-gradient text-lg px-8 py-3 hover-lift">
                  Accéder à mon espace
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/register">
                <Button size="lg" className="odyssea-gradient text-lg px-8 py-3 hover-lift">
                  Commencer maintenant
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            )}
            <Link to="/universities">
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover-lift">
                <Play className="mr-2 w-5 h-5" />
                Découvrir les formations
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center animate-bounce-in">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                <Counter end={50000} suffix="+" duration={2500} />
              </div>
              <div className="text-sm text-muted-foreground">Lycéens accompagnés</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                <Counter end={200} suffix="+" duration={2000} />
              </div>
              <div className="text-sm text-muted-foreground">Universités partenaires</div>
            </div>
            <div className="text-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-primary/10">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                <Counter end={95} suffix="%" duration={1800} />
              </div>
              <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
