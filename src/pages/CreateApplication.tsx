import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Upload, CheckCircle, Clock, AlertCircle } from 'lucide-react';

const CreateApplication = () => {
  const [selectedFormation, setSelectedFormation] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    address: ''
  });
  const [motivation, setMotivation] = useState('');
  const [documents, setDocuments] = useState<string[]>([]);

  const formations = [
    { id: 1, name: 'Médecine', university: 'Université Paris Descartes' },
    { id: 2, name: 'Informatique', university: 'INSA Lyon' },
    { id: 3, name: 'Droit', university: 'Université Panthéon-Sorbonne' }
  ];

  const requiredDocuments = [
    'Relevé de notes du baccalauréat',
    'Lettre de motivation',
    'CV',
    'Certificat de scolarité',
    'Pièce d\'identité'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Application submitted:', { selectedFormation, personalInfo, motivation, documents });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <section className="bg-gradient-to-br from-primary/10 to-purple-100/20 py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4 animate-fade-in">
              Créer mon dossier
            </h1>
            <p className="text-xl text-muted-foreground mb-8 animate-slide-up">
              Postule aux formations qui t'intéressent
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
          {/* Formation Selection */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Choix de formation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <select
                value={selectedFormation}
                onChange={(e) => setSelectedFormation(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-md bg-background focus:border-primary"
                required
              >
                <option value="">Sélectionner une formation</option>
                {formations.map(formation => (
                  <option key={formation.id} value={formation.id}>
                    {formation.name} - {formation.university}
                  </option>
                ))}
              </select>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Informations personnelles</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Prénom"
                value={personalInfo.firstName}
                onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                required
              />
              <Input
                placeholder="Nom"
                value={personalInfo.lastName}
                onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={personalInfo.email}
                onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                required
              />
              <Input
                type="tel"
                placeholder="Téléphone"
                value={personalInfo.phone}
                onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                required
              />
              <Input
                type="date"
                placeholder="Date de naissance"
                value={personalInfo.birthDate}
                onChange={(e) => setPersonalInfo({...personalInfo, birthDate: e.target.value})}
                required
              />
              <Input
                placeholder="Adresse"
                value={personalInfo.address}
                onChange={(e) => setPersonalInfo({...personalInfo, address: e.target.value})}
                required
              />
            </CardContent>
          </Card>

          {/* Motivation Letter */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle>Lettre de motivation</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Expliquez votre motivation pour cette formation..."
                value={motivation}
                onChange={(e) => setMotivation(e.target.value)}
                rows={6}
                required
              />
            </CardContent>
          </Card>

          {/* Documents */}
          <Card className="animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Documents requis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {requiredDocuments.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-input rounded-md">
                    <span className="text-sm">{doc}</span>
                    <div className="flex items-center gap-2">
                      {documents.includes(doc) ? (
                        <Badge variant="default" className="flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" />
                          Uploadé
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          En attente
                        </Badge>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          if (!documents.includes(doc)) {
                            setDocuments([...documents, doc]);
                          }
                        }}
                      >
                        <Upload className="w-3 h-3 mr-1" />
                        Upload
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              size="lg"
              className="odyssea-gradient hover-lift px-8"
              disabled={!selectedFormation || documents.length < requiredDocuments.length}
            >
              Soumettre ma candidature
            </Button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default CreateApplication;
