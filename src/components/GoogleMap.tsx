import React, { useEffect, useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Search, Navigation, Maximize2, Settings } from 'lucide-react';

interface University {
  id: number;
  name: string;
  city: string;
  address: string;
  lat: number;
  lng: number;
  type: string;
  students: number;
  rating: number;
  formations: string[];
  image: string;
}

const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUniversity, setSelectedUniversity] = useState<University | null>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const universities: University[] = [
    {
      id: 1,
      name: 'Université Paris Descartes',
      city: 'Paris',
      address: '12 Rue de l\'École de Médecine, 75006 Paris',
      lat: 48.8534,
      lng: 2.3488,
      type: 'Public',
      students: 45000,
      rating: 4.3,
      formations: ['Médecine', 'Droit', 'Sciences'],
      image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=400'
    },
    {
      id: 2,
      name: 'INSA Lyon',
      city: 'Lyon',
      address: '20 Avenue Albert Einstein, 69621 Villeurbanne',
      lat: 45.7833,
      lng: 4.8667,
      type: 'Public',
      students: 6500,
      rating: 4.5,
      formations: ['Informatique', 'Ingénierie', 'Sciences'],
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400'
    },
    {
      id: 3,
      name: 'Université Panthéon-Sorbonne',
      city: 'Paris',
      address: '12 Place du Panthéon, 75005 Paris',
      lat: 48.8462,
      lng: 2.3464,
      type: 'Public',
      students: 42000,
      rating: 4.2,
      formations: ['Droit', 'Économie', 'Gestion'],
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400'
    }
  ];

  const filteredUniversities = universities.filter(uni =>
    uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.formations.some(formation => formation.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const loadGoogleMaps = () => {
    if (window.google) {
      initializeMap();
      return;
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsMapLoaded(true);
      initializeMap();
    };
    script.onerror = () => {
      console.error('Failed to load Google Maps');
      // Fallback to OpenStreetMap
      initializeOpenStreetMap();
    };
    document.head.appendChild(script);
  };

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const mapOptions = {
      center: { lat: 46.2276, lng: 2.2137 }, // Center of France
      zoom: 6,
      styles: [
        {
          featureType: 'poi.school',
          elementType: 'geometry',
          stylers: [{ color: '#f3f4f6' }]
        }
      ]
    };

    const newMap = new window.google.maps.Map(mapRef.current, mapOptions);
    setMap(newMap);

    // Add markers for universities
    universities.forEach(university => {
      const marker = new window.google.maps.Marker({
        position: { lat: university.lat, lng: university.lng },
        map: newMap,
        title: university.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#2563eb" stroke="#ffffff" stroke-width="2"/>
              <text x="16" y="20" text-anchor="middle" fill="white" font-size="12" font-family="Arial">🎓</text>
            </svg>
          `)
        }
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: createInfoWindowContent(university)
      });

      marker.addListener('click', () => {
        setSelectedUniversity(university);
        infoWindow.open(newMap, marker);
      });
    });
  };

  const initializeOpenStreetMap = () => {
    if (!mapRef.current) return;

    // Fallback to a simple interactive map using OpenStreetMap
    mapRef.current.innerHTML = `
      <div class="w-full h-full bg-gray-100 rounded-lg flex flex-col">
        <div class="bg-blue-500 text-white p-4 rounded-t-lg">
          <h3 class="font-semibold">Carte des Universités</h3>
          <p class="text-sm opacity-90">Mode offline - Cliquez sur les universités ci-dessous</p>
        </div>
        <div class="flex-1 p-4 space-y-3 overflow-y-auto">
          ${universities.map(uni => `
            <div class="bg-white p-3 rounded-lg shadow cursor-pointer hover:bg-gray-50 transition-colors" onclick="selectUniversity(${uni.id})">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">🎓</div>
                <div>
                  <h4 class="font-medium">${uni.name}</h4>
                  <p class="text-sm text-gray-600">${uni.city}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  };

  const createInfoWindowContent = (university: University) => {
    return `
      <div class="p-3 max-w-sm">
        <img src="${university.image}" alt="${university.name}" class="w-full h-32 object-cover rounded-lg mb-3">
        <h3 class="font-bold text-lg mb-2">${university.name}</h3>
        <p class="text-gray-600 text-sm mb-2">${university.address}</p>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">${university.type}</span>
          <span class="text-xs text-gray-500">⭐ ${university.rating}</span>
        </div>
        <div class="space-y-1">
          <p class="text-xs text-gray-500">${university.students.toLocaleString()} étudiants</p>
          <div class="flex flex-wrap gap-1">
            ${university.formations.slice(0, 3).map(formation => 
              `<span class="text-xs bg-gray-100 text-gray-700 px-1 py-0.5 rounded">${formation}</span>`
            ).join('')}
          </div>
        </div>
        <button class="w-full mt-3 bg-blue-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-blue-600 transition-colors">
          Voir les détails
        </button>
      </div>
    `;
  };

  useEffect(() => {
    loadGoogleMaps();
  }, []);

  return (
    <div className="space-y-6">
      {/* Search and Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Carte des Universités
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher une université, ville, formation..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" size="sm">
              <Navigation className="w-4 h-4 mr-2" />
              Ma position
            </Button>
            <Button variant="outline" size="sm">
              <Maximize2 className="w-4 h-4 mr-2" />
              Plein écran
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Map and Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <Card className="lg:col-span-2">
          <CardContent className="p-0">
            <div ref={mapRef} className="w-full h-96 rounded-lg" />
            {!isMapLoaded && !window.google && (
              <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Settings className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Chargement de la carte...</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Si la carte ne se charge pas, vérifiez votre clé API Google Maps
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sidebar */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">
              {selectedUniversity ? 'Détails' : 'Universités'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedUniversity ? (
              <div className="space-y-4">
                <img
                  src={selectedUniversity.image}
                  alt={selectedUniversity.name}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg">{selectedUniversity.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUniversity.city}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={selectedUniversity.type === 'Public' ? 'default' : 'secondary'}>
                    {selectedUniversity.type}
                  </Badge>
                  <span className="text-sm text-muted-foreground">⭐ {selectedUniversity.rating}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    {selectedUniversity.students.toLocaleString()} étudiants
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {selectedUniversity.formations.map((formation, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {formation}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button className="w-full" onClick={() => setSelectedUniversity(null)}>
                  Voir les détails
                </Button>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredUniversities.map((uni) => (
                  <div
                    key={uni.id}
                    className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedUniversity(uni)}
                  >
                    <div className="flex justify-between items-start">
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

export default GoogleMap;
