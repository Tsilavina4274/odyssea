
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

const Features = () => {
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

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
