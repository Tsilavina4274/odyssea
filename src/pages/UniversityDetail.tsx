import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, MapPin, Users, Star, Calendar, Mail, Phone, 
  Globe, BookOpen, Heart, MessageCircle, GraduationCap 
} from 'lucide-react';

const UniversityDetail = () => {
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock data - in real app, fetch based on ID
  const university = {
    id: 1,
    name: 'Université Paris Descartes',
    city: 'Paris',
    address: '12 Rue de l\'École de Médecine, 75006 Paris',
    type: 'Public',
    students: 45000,
    rating: 4.3,
    image: 'https://images.unsplash.com/photo-1564981797816-1043664bf78d?w=800',
    description: 'L\'Université Paris Descartes est une université française située à Paris. Elle est l\'une des treize universités parisiennes, créées suite à la division de l\'université de Paris.',
    website: 'www.parisdescartes.fr',
    email: 'contact@parisdescartes.fr',
    phone: '01 76 53 16 16',
    etablissement: 1970,
    accreditations: ['AACSB', 'EQUIS', 'AMBA']
  };

  const formations = [
    {
      id: 1,
      name: 'Médecine',
      niveau: 'Licence - Master - Doctorat',
      duree: '6-11 ans',
      places: 180,
      description: 'Formation complète en médecine générale et spécialisée'
    },
    {
      id: 2,
      name: 'Droit',
      niveau: 'Licence - Master',
      duree: '3-5 ans',
      places: 250,
      description: 'Formation juridique complète avec spécialisations'
    },
    {
      id: 3,
      name: 'Psychologie',
      niveau: 'Licence - Master',
      duree: '3-5 ans',
      places: 200,
      description: 'Formation en psychologie clinique et cognitive'
    }
  ];

  const events = [
    {
      id: 1,
      title: 'Journée Portes Ouvertes',
      date: '2024-03-15',
      time: '09:00 - 17:00',
      description: 'Découvrez nos formations et rencontrez nos équipes'
    },
    {
      id: 2,
      title: 'Salon de l\'Orientation',
      date: '2024-03-22',
      time: '14:00 - 18:00',
      description: 'Stand d\'information et d\'orientation'
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Marie L.',
      formation: 'Médecine',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellente formation, corps enseignant de qualité et infrastructures modernes.'
    },
    {
      id: 2,
      author: 'Thomas D.',
      formation: 'Droit',
      rating: 4,
      date: '2024-01-10',
      comment: 'Très bonne université avec de nombreuses opportunités de stage.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-purple-100/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/universities">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Retour
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="flex items-start gap-4">
                <img
                  src={university.image}
                  alt={university.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{university.name}</h1>
                    <Badge variant={university.type === 'Public' ? 'default' : 'secondary'}>
                      {university.type}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {university.city}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {university.students.toLocaleString()} étudiants
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {university.rating}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground">{university.description}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <Button 
                      className="w-full odyssea-gradient"
                      onClick={() => {/* Ouvrir messagerie */}}
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Contacter l'université
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => setIsFavorite(!isFavorite)}
                    >
                      <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                      {isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <a href={`https://${university.website}`} className="text-primary hover:underline">
                      {university.website}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>{university.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>{university.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Fondée en {university.etablissement}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="formations" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="formations">Formations</TabsTrigger>
            <TabsTrigger value="evenements">Événements</TabsTrigger>
            <TabsTrigger value="avis">Avis</TabsTrigger>
            <TabsTrigger value="campus">Campus</TabsTrigger>
          </TabsList>
          
          <TabsContent value="formations" className="mt-8">
            <div className="grid gap-6">
              {formations.map((formation) => (
                <Card key={formation.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{formation.name}</CardTitle>
                      <Badge variant="outline">{formation.niveau}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-muted-foreground">Durée</span>
                        <p className="font-medium">{formation.duree}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Places disponibles</span>
                        <p className="font-medium">{formation.places}</p>
                      </div>
                      <div>
                        <span className="text-sm text-muted-foreground">Niveau</span>
                        <p className="font-medium">{formation.niveau}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-4">{formation.description}</p>
                    <Button className="odyssea-gradient">
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Candidater
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="evenements" className="mt-8">
            <div className="grid gap-6">
              {events.map((event) => (
                <Card key={event.id}>
                  <CardHeader>
                    <CardTitle className="text-xl">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(event.date).toLocaleDateString('fr-FR')}
                      </div>
                      <span>{event.time}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <Button variant="outline">S'inscrire</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="avis" className="mt-8">
            <div className="grid gap-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium">{review.author[0]}</span>
                        </div>
                        <div>
                          <p className="font-medium">{review.author}</p>
                          <p className="text-sm text-muted-foreground">{review.formation}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(review.date).toLocaleDateString('fr-FR')}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="campus" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="text-center">
                    <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Localisation du campus</h3>
                    <p className="text-muted-foreground mb-4">{university.address}</p>
                  </div>

                  {/* Campus Map */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Informations pratiques</h4>
                        <div className="space-y-2 text-sm">
                          <p><strong>Adresse :</strong> {university.address}</p>
                          <p><strong>Transport :</strong> Métro ligne 4, RER B</p>
                          <p><strong>Parking :</strong> Disponible sur campus</p>
                          <p><strong>Accessibilité :</strong> PMR accessible</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Services à proximité</h4>
                        <div className="space-y-2 text-sm">
                          <p>🏥 Centre médical - 200m</p>
                          <p>🍽️ Restaurant universitaire - Sur campus</p>
                          <p>📚 Bibliothèque - Bâtiment principal</p>
                          <p>🏃‍♂️ Installations sportives - 300m</p>
                        </div>
                      </div>
                    </div>

                    {/* Map Container */}
                    <div className="relative">
                      <div id="campus-map" className="w-full h-80 bg-gray-100 rounded-lg border">
                        <iframe
                          src={`https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(university.address)}&zoom=15`}
                          width="100%"
                          height="100%"
                          style={{ border: 0, borderRadius: '0.5rem' }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title={`Carte de ${university.name}`}
                        />
                      </div>
                      {!import.meta.env.VITE_GOOGLE_MAPS_API_KEY && (
                        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
                          <div className="text-center p-4">
                            <MapPin className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600 mb-2">Carte non disponible</p>
                            <p className="text-xs text-gray-500">
                              Configuration de la clé API Google Maps requise
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Campus Photos */}
                    <div>
                      <h4 className="font-semibold mb-3">Photos du campus</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {[
                          'https://images.unsplash.com/photo-1562774053-701939374585?w=400',
                          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400',
                          'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400',
                          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
                        ].map((src, index) => (
                          <img
                            key={index}
                            src={src}
                            alt={`Campus ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg hover:opacity-80 transition-opacity cursor-pointer"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UniversityDetail;
