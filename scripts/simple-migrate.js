import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Configuration:');
console.log('URL:', supabaseUrl);
console.log('Service Key:', supabaseServiceKey ? 'Configurée ✅' : 'Manquante ❌');

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testTables() {
  console.log('\n🔍 Test des tables existantes...');
  
  const tables = ['universities', 'formations', 'applications', 'profiles', 'notifications', 'messages'];
  
  for (const table of tables) {
    try {
      const { count, error } = await supabase
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
}

async function createBasicTables() {
  console.log('\n🚀 Création des tables de base...');
  
  try {
    // Test simple - essayer de créer la table profiles si elle n'existe pas
    const { error: profilesError } = await supabase
      .from('profiles')
      .select('id')
      .limit(1);
    
    if (profilesError && profilesError.code === 'PGRST116') {
      console.log('🔧 Les tables n\'existent pas encore, elles seront créées par les migrations SQL...');
    }
    
    console.log('✅ Test de connexion réussi');
    return true;
  } catch (error) {
    console.error('❌ Erreur lors du test:', error.message);
    return false;
  }
}

async function main() {
  console.log('🚀 Début du test de migration...\n');
  
  const success = await createBasicTables();
  if (success) {
    await testTables();
    console.log('\n🎉 Test terminé !');
    console.log('\n💡 Pour appliquer les migrations SQL complètes, utilisez :');
    console.log('   npx supabase db push');
    console.log('   ou connectez-vous au dashboard Supabase');
  }
}

main().catch(console.error);
