import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('URL Supabase:', supabaseUrl);
console.log('Anon Key (premiers caractères):', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'Non définie');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Variables d\'environnement Supabase manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('\n🔍 Test de connexion à Supabase...');
    
    // Test de base - récupérer les informations de session
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    if (authError) {
      console.log('⚠️  Pas de session utilisateur (normal si pas connecté)');
    } else {
      console.log('✅ Client Supabase initialisé avec succès');
    }

    // Test des tables - vérifier si les tables existent
    console.log('\n🔍 Vérification des tables...');
    
    const tables = ['universities', 'formations', 'applications', 'profiles'];
    
    for (const table of tables) {
      try {
        const { data, error, count } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ Table ${table}: ${error.message}`);
        } else {
          console.log(`✅ Table ${table}: ${count || 0} enregistrements`);
        }
      } catch (err) {
        console.log(`❌ Table ${table}: ${err.message}`);
      }
    }

    console.log('\n✅ Test de connexion terminé');
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    process.exit(1);
  }
}

testConnection();
