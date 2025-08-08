
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Filter } from 'lucide-react';

const FormationMap = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const formations = [
    {
      id: 1,
      name: 'Informatique et Numérique',
      location: 'Paris',
      universities: 15,
      coordinates: { x: 48.8566, y: 2.3522 },
      region: 'Île-de-France'
    },
    {
      id: 2,
      name: 'Médecine et Santé',
      location: 'Lyon',
      universities: 8,
      coordinates: { x: 45.7640, y: 4.8357 },
      region: 'Auvergne-Rhône-Alpes'
    },
    {
      id: 3,
      name: 'Ingénierie',
      location: 'Toulouse',
      universities: 12,
      coordinates: { x: 43.6047, y: 1.4442 },
      region: 'Occitanie'
    },
    {
      id: 4,
      name: 'Commerce et Gestion',
      location: 'Marseille',
      universities: 10,
      coordinates: { x: 43.2965, y: 5.3698 },
      region: 'Provence-Alpes-Côte d\'Azur'
    }
  ];

  const regions = ['Toutes', 'Île-de-France', 'Auvergne-Rhône-Alpes', 'Occitanie', 'Provence-Alpes-Côte d\'Azur'];

  const filteredFormations = formations.filter(formation => {
    const matchesSearch = formation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         formation.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = !selectedRegion || selectedRegion === 'Toutes' || formation.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="space-y-6">
      {/* Contrôles de recherche */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Recherche par région
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher une formation ou une ville..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 border border-input rounded-md bg-background"
            >
              {regions.map(region => (
                <option key={region} value={region === 'Toutes' ? '' : region}>
                  {region}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Carte interactive simplifiée */}
      <Card>
        <CardHeader>
          <CardTitle>Carte des formations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg h-96 overflow-hidden">
            {/* Simulation d'une carte de France */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22%236366f1%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M20%200L40%2020L20%2040L0%2020z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
            
            {/* Points sur la carte */}
            {filteredFormations.map((formation, index) => (
              <div
                key={formation.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110`}
                style={{
                  left: `${20 + index * 20}%`,
                  top: `${30 + (index % 2) * 20}%`
                }}
              >
                <div className="relative group">
                  <div className="w-4 h-4 bg-primary rounded-full shadow-lg animate-pulse"></div>
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="bg-white p-3 rounded-lg shadow-lg border min-w-48">
                      <h4 className="font-semibold text-sm">{formation.name}</h4>
                      <p className="text-xs text-muted-foreground">{formation.location}</p>
                      <p className="text-xs text-primary">{formation.universities} universités</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Liste des formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormations.map((formation) => (
          <Card key={formation.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">{formation.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4" />
                    {formation.location}
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {formation.universities} universités
                  </Badge>
                </div>
                <Button size="sm" variant="outline">
                  Explorer
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormationMap;
