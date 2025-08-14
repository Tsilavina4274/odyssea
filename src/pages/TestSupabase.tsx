import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestSupabase() {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [tablesStatus, setTablesStatus] = useState<{ [key: string]: 'loading' | 'success' | 'error' | number }>({});
  const [error, setError] = useState<string>('');

  const tables = ['universities', 'formations', 'applications', 'profiles', 'notifications', 'messages'];

  useEffect(() => {
    testConnection();
  }, []);

  const testConnection = async () => {
    try {
      setConnectionStatus('loading');
      setTablesStatus({});
      setError('');

      // Test de connexion de base
      const { data: { session }, error: authError } = await supabase.auth.getSession();
      
      if (!authError) {
        setConnectionStatus('success');
      }

      // Test des tables
      const newTablesStatus: { [key: string]: 'loading' | 'success' | 'error' | number } = {};
      
      for (const table of tables) {
        newTablesStatus[table] = 'loading';
        setTablesStatus({ ...newTablesStatus });

        try {
          const { data, error, count } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          if (error) {
            newTablesStatus[table] = 'error';
            console.error(`Erreur table ${table}:`, error.message);
          } else {
            newTablesStatus[table] = count || 0;
          }
        } catch (err) {
          newTablesStatus[table] = 'error';
          console.error(`Erreur table ${table}:`, err);
        }
        
        setTablesStatus({ ...newTablesStatus });
      }

    } catch (error: any) {
      setConnectionStatus('error');
      setError(error.message);
      console.error('Erreur lors du test:', error);
    }
  };

  const getStatusIcon = (status: 'loading' | 'success' | 'error' | number) => {
    if (status === 'loading') return <Loader2 className="h-4 w-4 animate-spin" />;
    if (status === 'error') return <XCircle className="h-4 w-4 text-red-500" />;
    if (status === 'success' || typeof status === 'number') return <CheckCircle className="h-4 w-4 text-green-500" />;
  };

  const getStatusBadge = (status: 'loading' | 'success' | 'error' | number) => {
    if (status === 'loading') return <Badge variant="secondary">Chargement...</Badge>;
    if (status === 'error') return <Badge variant="destructive">Erreur</Badge>;
    if (status === 'success') return <Badge variant="default">Connecté</Badge>;
    if (typeof status === 'number') return <Badge variant="default">{status} enregistrements</Badge>;
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Test de Connexion Supabase</h1>
        <p className="text-muted-foreground">
          Vérification de la configuration et des migrations Supabase
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Statut de connexion */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getStatusIcon(connectionStatus)}
              Connexion Supabase
            </CardTitle>
            <CardDescription>
              Statut de la connexion au client Supabase
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>URL:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {import.meta.env.VITE_SUPABASE_URL || 'Non définie'}
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span>Anon Key:</span>
                <code className="text-sm bg-muted px-2 py-1 rounded">
                  {import.meta.env.VITE_SUPABASE_ANON_KEY ? 
                    `${import.meta.env.VITE_SUPABASE_ANON_KEY.substring(0, 20)}...` : 
                    'Non définie'
                  }
                </code>
              </div>
              <div className="flex justify-between items-center">
                <span>Statut:</span>
                {getStatusBadge(connectionStatus)}
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Statut des tables */}
        <Card>
          <CardHeader>
            <CardTitle>Tables de la Base de Données</CardTitle>
            <CardDescription>
              Vérification de l'existence et de l'accessibilité des tables
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tables.map((table) => (
                <div key={table} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(tablesStatus[table] || 'loading')}
                    <span className="font-mono text-sm">{table}</span>
                  </div>
                  {getStatusBadge(tablesStatus[table] || 'loading')}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button onClick={testConnection} disabled={connectionStatus === 'loading'}>
          {connectionStatus === 'loading' && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Retester la Connexion
        </Button>
      </div>
    </div>
  );
}
