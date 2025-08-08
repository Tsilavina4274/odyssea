
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Navigation, Maximize2 } from 'lucide-react';

const InteractiveMap = () => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<any>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<any>(null);

  const universities = [
    {
      id: 1,
      name: 'Université Paris Descartes',
      city: 'Paris',
      address: '12 Rue de l\'École de Médecine, 75006 Paris',
      coordinates: [2.3522, 48.8566],
      formations: ['Médecine', 'Droit', 'Sciences'],
      students: 45000,
      type: 'Public'
    },
    {
      id: 2,
      name: 'INSA Lyon',
      city: 'Lyon',
      address: '20 Avenue Albert Einstein, 69621 Villeurbanne',
      coordinates: [4.8357, 45.7640],
      formations: ['Informatique', 'Ingénierie', 'Sciences'],
      students: 6500,
      type: 'Public'
    },
    {
      id: 3,
      name: 'Université Panthéon-Sorbonne',
      city: 'Paris',
      address: '12 Place du Panthéon, 75005 Paris',
      coordinates: [2.3462, 48.8462],
      formations: ['Droit', 'Économie', 'Gestion'],
      students: 42000,
      type: 'Public'
    },
    {
      id: 4,
      name: 'Université de Bordeaux',
      city: 'Bordeaux',
      address: '351 Cours de la Libération, 33405 Talence',
      coordinates: [-0.5792, 44.8378],
      formations: ['Sciences', 'Lettres', 'Médecine'],
      students: 57000,
      type: 'Public'
    }
  ];

  const initializeMap = () => {
    if (!mapboxToken || !mapContainer.current) return;

    // Simulate Mapbox map initialization
    console.log('Initializing map with token:', mapboxToken);
    
    // For demonstration, we'll create a visual representation
    const mapElement = mapContainer.current;
    mapElement.innerHTML = `
      <div style="
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        position: relative;
        border-radius: 8px;
        overflow: hidden;
      ">
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          color: #666;
        ">
          <div style="font-size: 48px; margin-bottom: 16px;">🗺️</div>
          <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">Carte Interactive</div>
          <div style="font-size: 14px;">Cliquez sur les marqueurs pour voir les détails</div>
        </div>
      </div>
    `;

    // Add university markers
    universities.forEach((uni, index) => {
      const marker = document.createElement('div');
      marker.innerHTML = `
        <div style="
          position: absolute;
          top: ${30 + (index % 2) * 40}%;
          left: ${20 + index * 15}%;
          width: 24px;
          height: 24px;
          background: #6366f1;
          border-radius: 50%;
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          z-index: 10;
          transition: transform 0.2s;
        " onmouseover="this.style.transform='scale(1.2)'" onmouseout="this.style.transform='scale(1)'" onclick="selectUniversity(${uni.id})">
        </div>
      `;
      mapElement.appendChild(marker);
    });

    // Make selectUniversity function globally accessible
    (window as any).selectUniversity = (id: number) => {
      const university = universities.find(uni => uni.id === id);
      setSelectedUniversity(university);
    };
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }
  }, [mapboxToken]);

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.formations.some(formation => formation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Mapbox Token Input */}
      {!mapboxToken && (
        <Card className="border-2 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Configuration de la carte
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Pour utiliser la carte interactive, veuillez entrer votre clé API Mapbox. 
              Vous pouvez l'obtenir gratuitement sur{' '}
              <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                mapbox.com
              </a>
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="Votre clé API Mapbox..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                type="password"
              />
              <Button onClick={() => initializeMap()} disabled={!mapboxToken}>
                Activer
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Rechercher une université, ville ou formation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Map Container */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Navigation className="w-5 h-5" />
                Carte des universités
              </CardTitle>
              <Button variant="outline" size="sm">
                <Maximize2 className="w-4 h-4 mr-1" />
                Plein écran
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div
              ref={mapContainer}
              className="w-full h-96 rounded-lg border"
            />
          </CardContent>
        </Card>

        {/* University Details / List */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedUniversity ? 'Détails' : 'Universités'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUniversity ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedUniversity.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUniversity.address}</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Type :</span>
                    <Badge variant="outline">{selectedUniversity.type}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Étudiants :</span>
                    <span className="text-sm font-medium">{selectedUniversity.students.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Formations :</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedUniversity.formations.map((formation: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {formation}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-4">
                  <Button className="w-full odyssea-gradient">
                    Voir les formations
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contacter
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredUniversities.map((uni) => (
                  <div
                    key={uni.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-accent transition-colors"
                    onClick={() => setSelectedUniversity(uni)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{uni.name}</h4>
                        <p className="text-xs text-muted-foreground">{uni.city}</p>
                        <div className="flex gap-1 mt-1">
                          {uni.formations.slice(0, 2).map((formation, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {formation}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <MapPin className="w-4 h-4 text-primary mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default InteractiveMap;
