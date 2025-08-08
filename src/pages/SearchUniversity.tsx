import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Filter, Users, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const SearchUniversity = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const universities = [
    {
      id: 1,
      name: 'Université Paris Descartes',
      city: 'Paris',
      region: 'Île-de-France',
      type: 'Public',
      students: 45000,
      rating: 4.3,
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    },
    {
      id: 2,
      name: 'INSA Lyon',
      city: 'Lyon',
      region: 'Auvergne-Rhône-Alpes',
      type: 'Public',
      students: 6500,
      rating: 4.5,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      coordinates: { lat: 45.7640, lng: 4.8357 }
    },
    {
      id: 3,
      name: 'Université Panthéon-Sorbonne',
      city: 'Paris',
      region: 'Île-de-France',
      type: 'Public',
      students: 42000,
      rating: 4.2,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400',
      coordinates: { lat: 48.8566, lng: 2.3522 }
    }
  ];

  const regions = ['Toutes', 'Île-de-France', 'Auvergne-Rhône-Alpes', 'Provence-Alpes-Côte d\'Azur'];
  const types = ['Tous', 'Public', 'Privé'];

  const filteredUniversities = universities.filter(uni => {
    const matchesSearch = uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         uni.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || selectedRegion === 'Toutes' || uni.region === selectedRegion;
    const matchesType = !selectedType || selectedType === 'Tous' || uni.type === selectedType;
    
    return matchesSearch && matchesRegion && matchesType;
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Rechercher une université
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Trouve l'université parfaite pour ton parcours
            </p>
            
            <div className="relative max-w-2xl mx-auto animate-fade-in">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Rechercher une université, une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-14 text-lg border-2 border-primary/20 focus:border-primary hover-lift"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="animate-fade-in mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 items-center justify-center">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filtres :</span>
              </div>
              
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
              >
                {regions.map(region => (
                  <option key={region} value={region === 'Toutes' ? '' : region}>{region}</option>
                ))}
              </select>
              
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2 border border-input rounded-md bg-background hover:bg-accent transition-colors"
              >
                {types.map(type => (
                  <option key={type} value={type === 'Tous' ? '' : type}>{type}</option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

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
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {university.students.toLocaleString()} étudiants
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

      <Footer />
    </div>
  );
};

export default SearchUniversity;
