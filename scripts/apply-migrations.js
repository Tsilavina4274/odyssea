import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration Supabase depuis les variables d'environnement
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY; // Clé service role nécessaire pour les migrations

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Variables d\'environnement manquantes:');
  console.error('- VITE_SUPABASE_URL:', supabaseUrl ? '✓' : '❌');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceKey ? '✓' : '❌');
  console.error('\nVeuillez ajouter SUPABASE_SERVICE_ROLE_KEY à votre fichier .env');
  process.exit(1);
}

// Créer un client Supabase avec la clé service role
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Ordre des migrations corrigé
const migrationOrder = [
  '20240115000000_create_profiles_table.sql',
  '20240115000001_create_universities_table.sql',
  '20240115000002_create_formations_table.sql',
  '20240115000003_create_applications_table.sql',
  '20240115000004_create_messages_table.sql',
  '20240115000005_create_notifications_table.sql',
  '20240115000006_create_events_table.sql',
  '20240115000007_create_resources_table.sql',
  '20240115000008_update_profiles_table.sql',
  '20240115000009_add_notification_triggers.sql',
  '20240115000010_add_complex_rls_policies.sql'
];

async function executeSQLFile(filePath) {
  try {
    const sql = fs.readFileSync(filePath, 'utf8');
    console.log(`📝 Exécution de ${path.basename(filePath)}...`);
    
    // Diviser le SQL en commandes individuelles
    const commands = sql
      .split(';')
      .map(cmd => cmd.trim())
      .filter(cmd => cmd.length > 0 && !cmd.startsWith('--'));

    for (const command of commands) {
      if (command.trim()) {
        const { error } = await supabase.rpc('exec_sql', { sql: command + ';' });
        if (error) {
          console.error(`❌ Erreur dans ${path.basename(filePath)}:`, error.message);
          throw error;
        }
      }
    }
    
    console.log(`✅ ${path.basename(filePath)} appliqué avec succès`);
    return true;
  } catch (error) {
    console.error(`❌ Erreur lors de l'exécution de ${filePath}:`, error.message);
    return false;
  }
}

async function applyMigrations() {
  console.log('🚀 Début de l\'application des migrations...\n');
  
  const migrationsDir = path.join(__dirname, '..', 'supabase', 'migrations');
  
  for (const migration of migrationOrder) {
    const migrationPath = path.join(migrationsDir, migration);
    
    if (!fs.existsSync(migrationPath)) {
      console.log(`⚠️  Migration ${migration} non trouvée, ignorée`);
      continue;
    }
    
    const success = await executeSQLFile(migrationPath);
    if (!success) {
      console.error(`❌ Échec de la migration ${migration}`);
      process.exit(1);
    }
    
    // Petite pause entre les migrations
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n🎉 Toutes les migrations ont été appliquées avec succ��s !');
  
  // Test final
  console.log('\n🔍 Test des tables créées...');
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

// Lancer les migrations
applyMigrations().catch(console.error);
