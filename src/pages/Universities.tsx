import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Users, Star, Filter, BookOpen, Calendar, Map } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FormationMap from '@/components/FormationMap';
import InteractiveMap from '@/components/InteractiveMap';
import GoogleMap from '@/components/GoogleMap';

const Universities = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedDomain, setSelectedDomain] = useState('');

  const universities = [
    {
      id: 1,
      name: 'Université Paris Descartes',
      city: 'Paris',
      type: 'Public',
      students: 45000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
      domains: ['Médecine', 'Droit', 'Sciences'],
      description: 'Une des plus prestigieuses universités de France, reconnue pour ses formations en médecine et en droit.',
      formations: 125
    },
    {
      id: 2,
      name: 'INSA Lyon',
      city: 'Lyon',
      type: 'Public',
      students: 6500,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      domains: ['Informatique', 'Ingénierie', 'Sciences'],
      description: 'École d\'ingénieur de renom, leader dans l\'innovation technologique et la recherche.',
      formations: 45
    },
    {
      id: 3,
      name: 'Université Panthéon-Sorbonne',
      city: 'Paris',
      type: 'Public',
      students: 42000,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      domains: ['Droit', 'Économie', 'Gestion'],
      description: 'Institution historique reconnue mondialement pour ses formations en droit et économie.',
      formations: 89
    }
  ];

  const cities = ['Toutes', 'Paris', 'Lyon', 'Marseille', 'Toulouse', 'Bordeaux'];
  const domains = ['Tous', 'Médecine', 'Droit', 'Informatique', 'Ingénierie', 'Sciences', 'Économie'];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.domains.some(domain => domain.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = !selectedCity || selectedCity === 'Toutes' || uni.city === selectedCity;
    const matchesDomain = !selectedDomain || selectedDomain === 'Tous' || 
                         uni.domains.includes(selectedDomain);
    
    return matchesSearch && matchesCity && matchesDomain;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Trouve ton université idéale
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Explore plus de 200 universités et écoles partenaires en France
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-fade-in">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher une université, une formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="universities" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="universities" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Universités
            </TabsTrigger>
            <TabsTrigger value="google-map" className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Carte Google
            </TabsTrigger>
            <TabsTrigger value="map" className="flex items-center gap-2">
              <Map className="w-4 h-4" />
              Carte des formations
            </TabsTrigger>
            <TabsTrigger value="interactive-map" className="flex items-center gap-2">
              <Navigation className="w-4 h-4" />
              Carte interactive
            </TabsTrigger>
          </TabsList>

          <TabsContent value="universities" className="space-y-8">
            {/* Filters */}
            <Card className="animate-fade-in">
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium">Filtres :</span>
                  </div>
                  
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
                  >
                    {cities.map(city => (
                      <option key={city} value={city === 'Toutes' ? '' : city}>{city}</option>
                    ))}
                  </select>
                  
                  <select
                    value={selectedDomain}
                    onChange={(e) => setSelectedDomain(e.target.value)}
                    className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
                  >
                    {domains.map(domain => (
                      <option key={domain} value={domain === 'Tous' ? '' : domain}>{domain}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </Card>

            {/* Universities Grid */}
            <div className="space-y-8">
              <div className="animate-fade-in">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {filteredUniversities.length} universités trouvées
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredUniversities.map((university, index) => (
                  <Card 
                    key={university.id} 
                    className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="relative">
                      <img
                        src={university.image}
                        alt={university.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                        <Badge variant={university.type === 'Public' ? 'default' : 'secondary'}>
                          {university.type}
                        </Badge>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl mb-2">{university.name}</CardTitle>
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {university.city}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500" />
                          {university.rating}
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {university.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {university.domains.slice(0, 3).map((domain) => (
                          <Badge key={domain} variant="outline" className="text-xs">
                            {domain}
                          </Badge>
                        ))}
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {university.students.toLocaleString()} étudiants
                        </div>
                        <div className="flex items-center gap-1">
                          <BookOpen className="w-4 h-4" />
                          {university.formations} formations
                        </div>
                      </div>
                      
                      <Link to={`/university/${university.id}`}>
                        <Button className="w-full odyssea-gradient hover-lift">
                          Découvrir
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="map">
            <FormationMap />
          </TabsContent>

          <TabsContent value="interactive-map">
            <InteractiveMap />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Universities;
