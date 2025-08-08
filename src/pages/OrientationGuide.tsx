import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  GraduationCap, 
  Compass, 
  Target, 
  Users, 
  TrendingUp,
  Clock,
  CheckCircle
} from 'lucide-react';

const OrientationGuide = () => {
  const guides = [
    {
      id: 1,
      title: 'Choisir sa filière après le bac',
      category: 'Orientation',
      duration: '15 min',
      level: 'Débutant',
      description: 'Guide complet pour t\'aider à choisir la bonne filière selon tes intérêts et compétences.',
      steps: 5,
      completed: false
    },
    {
      id: 2,
      title: 'Comprendre Parcoursup',
      category: 'Procédures',
      duration: '20 min',
      level: 'Intermédiaire',
      description: 'Tout ce qu\'il faut savoir sur la plateforme Parcoursup et comment optimiser ses candidatures.',
      steps: 7,
      completed: false
    },
    {
      id: 3,
      title: 'Rédiger sa lettre de motivation',
      category: 'Candidature',
      duration: '25 min',
      level: 'Intermédiaire',
      description: 'Conseils et exemples pour rédiger une lettre de motivation qui fait la différence.',
      steps: 6,
      completed: true
    },
    {
      id: 4,
      title: 'Préparer son entretien',
      category: 'Candidature',
      duration: '30 min',
      level: 'Avancé',
      description: 'Comment se préparer efficacement aux entretiens de motivation et d\'admission.',
      steps: 8,
      completed: false
    }
  ];

  const categories = ['Tous', 'Orientation', 'Procédures', 'Candidature'];
  const levels = ['Tous', 'Débutant', 'Intermédiaire', 'Avancé'];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Débutant':
        return 'bg-green-100 text-green-800';
      case 'Intermédiaire':
        return 'bg-yellow-100 text-yellow-800';
      case 'Avancé':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Orientation':
        return <Compass className="w-4 h-4" />;
      case 'Procédures':
        return <Target className="w-4 h-4" />;
      case 'Candidature':
        return <GraduationCap className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Guide d'orientation
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Des guides pratiques pour t'accompagner dans ton orientation
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="text-center animate-fade-in">
            <CardContent className="pt-6">
              <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">12</div>
              <div className="text-sm text-muted-foreground">Guides disponibles</div>
            </CardContent>
          </Card>
          <Card className="text-center animate-fade-in">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">2.5k</div>
              <div className="text-sm text-muted-foreground">Étudiants aidés</div>
            </CardContent>
          </Card>
          <Card className="text-center animate-fade-in">
            <CardContent className="pt-6">
              <TrendingUp className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">95%</div>
              <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
            </CardContent>
          </Card>
          <Card className="text-center animate-fade-in">
            <CardContent className="pt-6">
              <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">3h</div>
              <div className="text-sm text-muted-foreground">Temps moyen</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Catégorie :</span>
                <select className="px-3 py-1 border border-input rounded-md bg-background">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Niveau :</span>
                <select className="px-3 py-1 border border-input rounded-md bg-background">
                  {levels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guides.map((guide, index) => (
            <Card 
              key={guide.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getCategoryIcon(guide.category)}
                    <Badge variant="outline">{guide.category}</Badge>
                  </div>
                  {guide.completed && (
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Terminé
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl">{guide.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-sm">{guide.description}</p>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {guide.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {guide.steps} étapes
                    </div>
                  </div>
                  <Badge className={getLevelColor(guide.level)}>
                    {guide.level}
                  </Badge>
                </div>
                
                <Button className="w-full odyssea-gradient hover-lift">
                  {guide.completed ? 'Revoir le guide' : 'Commencer le guide'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default OrientationGuide;
