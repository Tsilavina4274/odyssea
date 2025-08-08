import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, MessageCircle, BookOpen, Video, ChevronDown, 
  ChevronRight, Phone, Mail, Clock, Users 
} from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      id: 1,
      question: "Comment créer mon dossier de candidature ?",
      answer: "Pour créer votre dossier, connectez-vous à votre espace personnel et cliquez sur 'Mon dossier'. Suivez ensuite les étapes pour ajouter vos bulletins, lettres de motivation et autres documents requis.",
      category: "Candidature"
    },
    {
      id: 2,
      question: "Combien de candidatures puis-je déposer ?",
      answer: "Il n'y a pas de limite au nombre de candidatures que vous pouvez déposer sur Odysséa. Nous encourageons les lycéens à explorer plusieurs options pour maximiser leurs chances.",
      category: "Candidature"
    },
    {
      id: 3,
      question: "Comment contacter une université ?",
      answer: "Vous pouvez contacter une université directement via notre système de messagerie intégré. Rendez-vous sur la fiche de l'université et cliquez sur 'Contacter'.",
      category: "Communication"
    },
    {
      id: 4,
      question: "Mes données personnelles sont-elles sécurisées ?",
      answer: "Oui, Odysséa prend la sécurité de vos données très au sérieux. Nous sommes conformes au RGPD et utilisons un chiffrement de bout en bout pour protéger vos informations.",
      category: "Sécurité"
    },
    {
      id: 5,
      question: "Comment suivre l'état de mes candidatures ?",
      answer: "Toutes vos candidatures sont visibles dans votre tableau de bord. Vous recevrez également des notifications par email et dans l'application à chaque mise à jour de statut.",
      category: "Suivi"
    }
  ];

  const guides = [
    {
      id: 1,
      title: "Guide complet : Première candidature",
      description: "Découvrez étape par étape comment déposer votre première candidature sur Odysséa",
      duration: "5 min",
      type: "article",
      category: "Débutant"
    },
    {
      id: 2,
      title: "Optimiser son profil lycéen",
      description: "Conseils pour rendre votre profil attractif aux yeux des universités",
      duration: "8 min",
      type: "video",
      category: "Conseils"
    },
    {
      id: 3,
      title: "Comprendre les différents statuts de candidature",
      description: "Apprenez à interpréter les différents statuts et étapes de vos candidatures",
      duration: "3 min",
      type: "article",
      category: "Suivi"
    }
  ];

  const contactOptions = [
    {
      title: "Chat en direct",
      description: "Disponible du lundi au vendredi de 9h à 18h",
      icon: MessageCircle,
      action: "Démarrer une conversation",
      available: true
    },
    {
      title: "Support téléphonique",
      description: "01 23 45 67 89 - Du lundi au vendredi de 9h à 17h",
      icon: Phone,
      action: "Appeler maintenant",
      available: true
    },
    {
      title: "Email",
      description: "Réponse sous 24h en moyenne",
      icon: Mail,
      action: "Envoyer un email",
      available: true
    }
  ];

  const filteredFaq = faqItems.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Comment pouvons-nous vous aider ?
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Trouvez rapidement les réponses à vos questions ou contactez notre équipe
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher dans l'aide..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Questions fréquentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFaq.map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === item.id ? null : item.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{item.question}</span>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        {expandedFaq === item.id ? 
                          <ChevronDown className="w-5 h-5 text-muted-foreground" /> : 
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        }
                      </button>
                      {expandedFaq === item.id && (
                        <div className="px-4 pb-4 text-muted-foreground">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Guides Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Guides et tutoriels</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {guides.map((guide) => (
                    <div key={guide.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            {guide.type === 'video' ? 
                              <Video className="w-5 h-5 text-primary" /> : 
                              <BookOpen className="w-5 h-5 text-primary" />
                            }
                          </div>
                          <div>
                            <h3 className="font-semibold mb-1">{guide.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">{guide.description}</p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {guide.category}
                              </Badge>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {guide.duration}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {guide.type === 'video' ? 'Regarder' : 'Lire'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Options */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Contactez-nous</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactOptions.map((option, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <option.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{option.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{option.description}</p>
                        <Button 
                          size="sm" 
                          className={option.available ? "odyssea-gradient" : ""}
                          variant={option.available ? "default" : "outline"}
                          disabled={!option.available}
                        >
                          {option.action}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Notre support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">&lt; 2h</div>
                  <div className="text-sm text-muted-foreground">Temps de réponse moyen</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">98%</div>
                  <div className="text-sm text-muted-foreground">Taux de satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">FAQ disponible</div>
                </div>
              </CardContent>
            </Card>

            {/* Community */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Forum des lycéens
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Groupes d'entraide
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Témoignages d'étudiants
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
