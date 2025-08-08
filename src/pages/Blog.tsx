import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, User, Eye, MessageCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const articles = [
    {
      id: 1,
      title: 'Comment choisir sa filière universitaire en 2024',
      excerpt: 'Guide complet pour t\'aider à faire le bon choix d\'orientation après le baccalauréat.',
      category: 'Orientation',
      author: 'Marie Dubois',
      date: '2024-01-15',
      readTime: '5 min',
      views: 1250,
      comments: 12,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400',
      featured: true
    },
    {
      id: 2,
      title: 'Les nouvelles formations du numérique à découvrir',
      excerpt: 'Découvrez les formations émergentes dans le domaine du numérique et leurs débouchés.',
      category: 'Formations',
      author: 'Pierre Martin',
      date: '2024-01-12',
      readTime: '7 min',
      views: 980,
      comments: 8,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      featured: false
    },
    {
      id: 3,
      title: 'Réussir son entretien de motivation : nos conseils',
      excerpt: 'Tous nos conseils pour briller lors de votre entretien de motivation.',
      category: 'Conseils',
      author: 'Sophie Leroux',
      date: '2024-01-10',
      readTime: '6 min',
      views: 1500,
      comments: 15,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      featured: false
    },
    {
      id: 4,
      title: 'Parcoursup 2024 : ce qui change cette année',
      excerpt: 'Zoom sur les nouveautés de la plateforme Parcoursup pour la rentrée 2024.',
      category: 'Parcoursup',
      author: 'Jean Dupont',
      date: '2024-01-08',
      readTime: '4 min',
      views: 2100,
      comments: 25,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400',
      featured: true
    },
    {
      id: 5,
      title: 'Étudier à l\'étranger : mode d\'emploi',
      excerpt: 'Guide pratique pour préparer ses études à l\'international.',
      category: 'International',
      author: 'Emma Wilson',
      date: '2024-01-05',
      readTime: '8 min',
      views: 750,
      comments: 6,
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9d1?w=400',
      featured: false
    },
    {
      id: 6,
      title: 'Les métiers d\'avenir selon les experts',
      excerpt: 'Découvrez les secteurs porteurs et les métiers de demain.',
      category: 'Carrière',
      author: 'Thomas Bernard',
      date: '2024-01-03',
      readTime: '10 min',
      views: 1800,
      comments: 22,
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400',
      featured: false
    }
  ];

  const categories = ['Tous', 'Orientation', 'Formations', 'Conseils', 'Parcoursup', 'International', 'Carrière'];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  return (
    <div className="bg-background">
      
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Blog Odysséa
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Conseils, actualités et guides pour réussir ton orientation
            </p>
            
            <div className="relative max-w-2xl mx-auto animate-fade-in">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher un article..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories Filter */}
        <Card className="mb-8 animate-fade-in">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category || (category === 'Tous' && !selectedCategory) ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(category === 'Tous' ? '' : category)}
                  className="hover-lift"
                >
                  {category}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 animate-fade-in">Articles à la une</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article, index) => (
                <Card 
                  key={article.id} 
                  className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="odyssea-gradient">{article.category}</Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl line-clamp-2">{article.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground line-clamp-2">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {article.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(article.date).toLocaleDateString('fr-FR')}
                        </div>
                      </div>
                      <span>{article.readTime}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {article.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {article.comments}
                        </div>
                      </div>
                      
                      <Button variant="ghost" size="sm" className="hover-lift">
                        Lire la suite
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div>
          <h2 className="text-2xl font-bold mb-6 animate-fade-in">Tous les articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article, index) => (
              <Card 
                key={article.id} 
                className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary">{article.category}</Badge>
                  </div>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  <p className="text-muted-foreground text-sm line-clamp-2">{article.excerpt}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{article.author}</span>
                    <span>{article.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {article.views}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="w-3 h-3" />
                        {article.comments}
                      </div>
                    </div>
                    
                    <Button variant="ghost" size="sm" className="text-xs hover-lift">
                      Lire
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Blog;
