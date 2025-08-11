import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  MessageCircle, 
  FileText, 
  BarChart3, 
  Shield, 
  Clock,
  MapPin,
  Users
} from 'lucide-react';
import React, { useEffect } from 'react';

const Features = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes emoji-float {
        0% { transform: translateY(100%) rotate(0deg); opacity: 0; }
        50% { opacity: 1; }
        100% { transform: translateY(-150%) rotate(360deg); opacity: 0; }
      }
      @keyframes emoji-bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      .animate-emoji-float > span {
        animation: emoji-float 6s linear infinite;
        display: inline-block;
        user-select: none;
      }
      .animate-emoji-bounce {
        animation: emoji-bounce 2s ease-in-out infinite;
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const features = [
    {
      icon: Search,
      title: 'Recherche intelligente',
      description: 'Trouve les universités et formations qui correspondent parfaitement à ton profil avec nos filtres avancés.',
      color: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Échange direct',
      description: 'Communique directement avec les universités, pose tes questions et obtiens des réponses personnalisées.',
      color: 'text-green-600'
    },
    {
      icon: FileText,
      title: 'Dossier unifié',
      description: 'Centralise tous tes documents et candidatures en un seul endroit. Plus besoin de tout recommencer !',
      color: 'text-purple-600'
    },
    {
      icon: BarChart3,
      title: 'Suivi en temps réel',
      description: 'Suis l\'évolution de tes candidatures et reçois des notifications pour ne rien manquer.',
      color: 'text-orange-600'
    },
    {
      icon: MapPin,
      title: 'Cartographie',
      description: 'Visualise les universités sur une carte interactive et découvre celles près de chez toi.',
      color: 'text-red-600'
    },
    {
      icon: Users,
      title: 'Communauté',
      description: 'Échange avec d\'autres lycéens et bénéficie des témoignages d\'anciens étudiants.',
      color: 'text-indigo-600'
    },
    {
      icon: Shield,
      title: 'Sécurisé',
      description: 'Tes données sont protégées et conformes au RGPD. Ton orientation en toute sécurité.',
      color: 'text-teal-600'
    },
    {
      icon: Clock,
      title: 'Disponible 24/7',
      description: 'Accède à Odysséa quand tu veux, où tu veux. Ton orientation n\'attend pas !',
      color: 'text-pink-600'
    }
  ];

  // Liste des emojis à faire flotter
  const emojis = ['🎉', '🎈', '🎊', '✨','🎓'];

  return (
    <section className="relative py-20 bg-background overflow-hidden">
      {/* Fond animé emojis avec plusieurs types */}
      <div className="absolute inset-0 pointer-events-none flex flex-wrap gap-2 p-8 animate-emoji-float">
        {Array(40).fill(0).map((_, i) => (
          <span
            key={i}
            className="text-3xl animate-emoji-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          >
            {emojis[i % emojis.length]}
          </span>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Tout ce dont tu as besoin pour ton orientation
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Odysséa regroupe tous les outils nécessaires pour t'accompagner dans ton parcours post-bac
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gray-50 flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
