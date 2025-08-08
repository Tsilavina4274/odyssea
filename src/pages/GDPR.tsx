
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Lock, Eye, FileText } from 'lucide-react';

const GDPR = () => {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Protection des Données (RGPD)</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Odysséa s'engage à protéger vos données personnelles conformément au Règlement Général sur la Protection des Données
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Vos droits
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Droit d'accès</h3>
              <p className="text-sm text-muted-foreground">
                Vous pouvez demander l'accès à vos données personnelles
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Droit de rectification</h3>
              <p className="text-sm text-muted-foreground">
                Vous pouvez corriger vos données inexactes
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Droit à l'effacement</h3>
              <p className="text-sm text-muted-foreground">
                Vous pouvez demander la suppression de vos données
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Sécurité des données
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Chiffrement</h3>
              <p className="text-sm text-muted-foreground">
                Toutes vos données sont chiffrées en transit et au repos
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Accès contrôlé</h3>
              <p className="text-sm text-muted-foreground">
                Seules les personnes autorisées peuvent accéder à vos données
              </p>
            </div>
            <div>
              <h3 className="font-semibold">Audits réguliers</h3>
              <p className="text-sm text-muted-foreground">
                Nos systèmes font l'objet d'audits de sécurité réguliers
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Données collectées
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Nous collectons uniquement les données nécessaires au fonctionnement de la plateforme :</p>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>Informations d'identification (nom, prénom, email)</li>
            <li>Données académiques (relevés de notes, diplômes)</li>
            <li>Préférences d'orientation</li>
            <li>Données de navigation (cookies, logs)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default GDPR;
