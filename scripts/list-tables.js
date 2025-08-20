import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function listAllTables() {
  console.log('🔍 Listing all tables in the database...\n');
  
  try {
    // Requête directe pour lister toutes les tables dans le schéma public
    const { data, error } = await supabase
      .rpc('exec_sql', { 
        sql: `
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public' 
          AND table_type = 'BASE TABLE'
          ORDER BY table_name;
        `
      });

    if (error) {
      console.log('❌ Erreur avec exec_sql, essai avec une approche alternative...');
      
      // Méthode alternative - tester l'existence de chaque table
      const expectedTables = [
        'profiles', 'universities', 'formations', 'applications', 
        'notifications', 'messages', 'events', 'study_resources',
        'conversations', 'conversation_participants', 'event_registrations',
        'resource_favorites', 'resource_ratings'
      ];

      console.log('📋 Vérification des tables attendues:\n');
      
      for (const table of expectedTables) {
        try {
          const { count, error: tableError } = await supabase
            .from(table)
            .select('*', { count: 'exact', head: true });
          
          if (tableError) {
            if (tableError.code === 'PGRST116' || tableError.message.includes('does not exist')) {
              console.log(`❌ Table ${table}: N'existe pas`);
            } else {
              console.log(`⚠️  Table ${table}: ${tableError.message}`);
            }
          } else {
            console.log(`✅ Table ${table}: ${count || 0} enregistrements`);
          }
        } catch (err) {
          console.log(`❌ Table ${table}: ${err.message}`);
        }
      }
    } else {
      console.log('✅ Tables trouvées:', data);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

async function createMissingTables() {
  console.log('\n🔧 Tentative de création des tables manquantes...\n');
  
  // Ordre des migrations
  const migrations = [
    {
      name: 'profiles',
      sql: `
        CREATE TABLE IF NOT EXISTS public.profiles (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          first_name VARCHAR(100),
          last_name VARCHAR(100),
          institution VARCHAR(255),
          user_type VARCHAR(50) DEFAULT 'lyceen',
          phone VARCHAR(20),
          date_of_birth DATE,
          address TEXT,
          city VARCHAR(100),
          postal_code VARCHAR(10),
          country VARCHAR(100) DEFAULT 'France',
          avatar_url TEXT,
          bio TEXT,
          current_level VARCHAR(50),
          specialization VARCHAR(100),
          grade_average DECIMAL(4,2),
          is_active BOOLEAN DEFAULT true,
          email_notifications BOOLEAN DEFAULT true,
          push_notifications BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
        
        ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Users can view their own profile" 
        ON public.profiles FOR SELECT 
        USING (user_id = auth.uid());
      `
    },
    {
      name: 'universities',
      sql: `
        CREATE TABLE IF NOT EXISTS public.universities (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          city VARCHAR(100) NOT NULL,
          address TEXT,
          type VARCHAR(50) DEFAULT 'Public',
          website VARCHAR(255),
          email VARCHAR(255),
          phone VARCHAR(50),
          established_year INTEGER,
          student_count INTEGER DEFAULT 0,
          rating DECIMAL(2,1) DEFAULT 0.0,
          image_url TEXT,
          logo_url TEXT,
          latitude DECIMAL(10, 8),
          longitude DECIMAL(11, 8),
          accreditations TEXT[],
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
        
        ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Universities are viewable by everyone" 
        ON public.universities FOR SELECT 
        USING (true);
      `
    },
    {
      name: 'formations',
      sql: `
        CREATE TABLE IF NOT EXISTS public.formations (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          university_id UUID REFERENCES public.universities(id) ON DELETE CASCADE,
          name VARCHAR(255) NOT NULL,
          description TEXT,
          level VARCHAR(50) NOT NULL,
          domain VARCHAR(100) NOT NULL,
          duration_years INTEGER NOT NULL,
          total_places INTEGER DEFAULT 0,
          available_places INTEGER DEFAULT 0,
          requirements TEXT,
          admission_criteria TEXT,
          application_deadline DATE,
          tuition_fee DECIMAL(10,2),
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
        );
        
        ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;
        
        CREATE POLICY "Formations are viewable by everyone" 
        ON public.formations FOR SELECT 
        USING (is_active = true);
      `
    }
  ];
  
  for (const migration of migrations) {
    try {
      console.log(`🔧 Création de la table ${migration.name}...`);
      
      // Essayer d'exécuter le SQL directement via une requête
      const { error } = await supabase.rpc('exec_sql', { sql: migration.sql });
      
      if (error) {
        console.log(`⚠️  Impossible d'utiliser exec_sql pour ${migration.name}: ${error.message}`);
      } else {
        console.log(`✅ Table ${migration.name} créée/vérifiée`);
      }
    } catch (err) {
      console.log(`❌ Erreur création ${migration.name}: ${err.message}`);
    }
  }
}

// Exécuter les fonctions
async function main() {
  await listAllTables();
  await createMissingTables();
  
  console.log('\n🔍 Nouvelle vérification après création...');
  await listAllTables();
}

main().catch(console.error);
