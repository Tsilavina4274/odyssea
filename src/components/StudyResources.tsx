import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, Search, Download, Eye, Star, Filter, 
  FileText, Video, Headphones, Image, ExternalLink,
  Clock, Users, Bookmark
} from 'lucide-react';

interface Resource {
  id: number;
  title: string;
  type: 'pdf' | 'video' | 'audio' | 'image' | 'link';
  category: string;
  subject: string;
  description: string;
  author: string;
  rating: number;
  downloads: number;
  duration?: string;
  size?: string;
  url: string;
  thumbnail: string;
  isFavorite: boolean;
}

const StudyResources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [favorites, setFavorites] = useState<number[]>([]);

  const resources: Resource[] = [
    {
      id: 1,
      title: 'Cours de Mathématiques - Analyse',
      type: 'pdf',
      category: 'Cours',
      subject: 'Mathématiques',
      description: 'Cours complet d\'analyse mathématique niveau L1',
      author: 'Prof. Martin Dubois',
      rating: 4.8,
      downloads: 1250,
      size: '15.2 MB',
      url: '/resources/math-analyse.pdf',
      thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
      isFavorite: false
    },
    {
      id: 2,
      title: 'Introduction à la Physique Quantique',
      type: 'video',
      category: 'Conférence',
      subject: 'Physique',
      description: 'Conférence d\'introduction aux concepts fondamentaux',
      author: 'Dr. Marie Curie',
      rating: 4.9,
      downloads: 892,
      duration: '45:30',
      size: '250 MB',
      url: '/resources/physique-quantique.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400',
      isFavorite: true
    },
    {
      id: 3,
      title: 'Podcast - Histoire de France',
      type: 'audio',
      category: 'Podcast',
      subject: 'Histoire',
      description: 'Série de podcasts sur l\'histoire de France moderne',
      author: 'Radio Université',
      rating: 4.6,
      downloads: 654,
      duration: '25:00',
      size: '35 MB',
      url: '/resources/histoire-france.mp3',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      isFavorite: false
    },
    {
      id: 4,
      title: 'Schémas de Biologie Cellulaire',
      type: 'image',
      category: 'Illustrations',
      subject: 'Biologie',
      description: 'Collection de schémas annotés de biologie cellulaire',
      author: 'Équipe Bio-Sciences',
      rating: 4.7,
      downloads: 1100,
      size: '8.5 MB',
      url: '/resources/bio-cellulaire.zip',
      thumbnail: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=400',
      isFavorite: false
    },
    {
      id: 5,
      title: 'Plateforme de Chimie Interactive',
      type: 'link',
      category: 'Outils',
      subject: 'Chimie',
      description: 'Plateforme en ligne pour simuler des réactions chimiques',
      author: 'ChemLab Online',
      rating: 4.5,
      downloads: 2300,
      url: 'https://chemlab-online.fr',
      thumbnail: 'https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?w=400',
      isFavorite: true
    }
  ];

  const categories = ['Tous', 'Cours', 'Conférence', 'Podcast', 'Illustrations', 'Outils'];
  const subjects = ['Tous', 'Mathématiques', 'Physique', 'Histoire', 'Biologie', 'Chimie'];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === 'Tous' || resource.category === selectedCategory;
    const matchesSubject = !selectedSubject || selectedSubject === 'Tous' || resource.subject === selectedSubject;
    
    return matchesSearch && matchesCategory && matchesSubject;
  });

  const favoriteResources = resources.filter(resource => favorites.includes(resource.id));

  const toggleFavorite = (resourceId: number) => {
    setFavorites(prev => 
      prev.includes(resourceId) 
        ? prev.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="w-5 h-5" />;
      case 'video': return <Video className="w-5 h-5" />;
      case 'audio': return <Headphones className="w-5 h-5" />;
      case 'image': return <Image className="w-5 h-5" />;
      case 'link': return <ExternalLink className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-700';
      case 'video': return 'bg-blue-100 text-blue-700';
      case 'audio': return 'bg-green-100 text-green-700';
      case 'image': return 'bg-purple-100 text-purple-700';
      case 'link': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const ResourceCard = ({ resource }: { resource: Resource }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="relative">
        <img
          src={resource.thumbnail}
          alt={resource.title}
          className="w-full h-48 object-cover rounded-t-lg group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <div className={`p-2 rounded-lg ${getTypeColor(resource.type)}`}>
            {getTypeIcon(resource.type)}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
          onClick={() => toggleFavorite(resource.id)}
        >
          <Bookmark 
            className={`w-4 h-4 ${
              favorites.includes(resource.id) 
                ? 'fill-yellow-500 text-yellow-500' 
                : 'text-gray-600'
            }`} 
          />
        </Button>
      </div>
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant="outline">{resource.category}</Badge>
          <Badge variant="secondary">{resource.subject}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {resource.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>Par {resource.author}</span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-yellow-500" />
            {resource.rating}
          </div>
        </div>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-3">
            <span>📥 {resource.downloads}</span>
            {resource.duration && (
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {resource.duration}
              </div>
            )}
            {resource.size && (
              <span>{resource.size}</span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button size="sm" className="flex-1">
            {resource.type === 'link' ? (
              <>
                <ExternalLink className="w-4 h-4 mr-2" />
                Ouvrir
              </>
            ) : (
              <>
                <Download className="w-4 h-4 mr-2" />
                Télécharger
              </>
            )}
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Ressources d'étude</h1>
        <p className="text-muted-foreground">
          Accédez à une bibliothèque complète de ressources pédagogiques
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher des ressources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtres :</span>
              </div>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'Tous' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
              
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="px-3 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
              >
                {subjects.map(subject => (
                  <option key={subject} value={subject === 'Tous' ? '' : subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Toutes les ressources
          </TabsTrigger>
          <TabsTrigger value="favorites" className="flex items-center gap-2">
            <Bookmark className="w-4 h-4" />
            Favoris ({favorites.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
          
          {filteredResources.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucune ressource trouvée</h3>
              <p className="text-muted-foreground">
                Essayez de modifier vos critères de recherche
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="favorites" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteResources.map((resource, index) => (
              <div
                key={resource.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ResourceCard resource={resource} />
              </div>
            ))}
          </div>
          
          {favoriteResources.length === 0 && (
            <div className="text-center py-12">
              <Bookmark className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Aucun favori</h3>
              <p className="text-muted-foreground">
                Ajoutez des ressources à vos favoris pour les retrouver facilement
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudyResources;
