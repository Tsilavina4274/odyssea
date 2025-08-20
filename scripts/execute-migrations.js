import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function executeSQLDirectly(sql, description) {
  console.log(`🔧 ${description}...`);
  
  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/rpc/exec`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey
      },
      body: JSON.stringify({
        query: sql
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`❌ ${description} - Erreur HTTP:`, response.status, errorText);
      return false;
    }

    const result = await response.json();
    console.log(`✅ ${description} - Succès`);
    return true;
  } catch (error) {
    console.log(`❌ ${description} - Erreur:`, error.message);
    return false;
  }
}

async function runMigrations() {
  console.log('🚀 Exécution des migrations Supabase...\n');

  const migrations = [
    {
      name: 'Création table universities',
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
      `
    },
    {
      name: 'Activation RLS pour universities',
      sql: `ALTER TABLE public.universities ENABLE ROW LEVEL SECURITY;`
    },
    {
      name: 'Politique RLS pour universities',
      sql: `
        CREATE POLICY "Universities are viewable by everyone" 
        ON public.universities FOR SELECT 
        USING (true);
      `
    },
    {
      name: 'Création table formations',
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
      `
    },
    {
      name: 'Activation RLS pour formations',
      sql: `ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;`
    },
    {
      name: 'Politique RLS pour formations',
      sql: `
        CREATE POLICY "Formations are viewable by everyone" 
        ON public.formations FOR SELECT 
        USING (is_active = true);
      `
    },
    {
      name: 'Création enum application_status',
      sql: `
        DO $$ BEGIN
          CREATE TYPE application_status AS ENUM (
            'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'
          );
        EXCEPTION
          WHEN duplicate_object THEN null;
        END $$;
      `
    },
    {
      name: 'Création table applications',
      sql: `
        CREATE TABLE IF NOT EXISTS public.applications (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          student_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
          formation_id UUID REFERENCES public.formations(id) ON DELETE CASCADE,
          status application_status DEFAULT 'draft',
          priority INTEGER DEFAULT 1,
          motivation_letter TEXT,
          additional_documents TEXT[],
          grade_average DECIMAL(4,2),
          submitted_at TIMESTAMP WITH TIME ZONE,
          reviewed_at TIMESTAMP WITH TIME ZONE,
          reviewer_id UUID REFERENCES auth.users(id),
          review_notes TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
          UNIQUE(student_id, formation_id)
        );
      `
    },
    {
      name: 'Activation RLS pour applications',
      sql: `ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;`
    },
    {
      name: 'Politiques RLS pour applications',
      sql: `
        CREATE POLICY "Students can view their own applications" 
        ON public.applications FOR SELECT 
        USING (student_id = auth.uid());

        CREATE POLICY "Students can manage their own applications" 
        ON public.applications FOR ALL 
        USING (student_id = auth.uid());
      `
    }
  ];

  let successCount = 0;
  
  for (const migration of migrations) {
    const success = await executeSQLDirectly(migration.sql, migration.name);
    if (success) successCount++;
    
    // Petite pause entre les migrations
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  console.log(`\n📊 Résultat: ${successCount}/${migrations.length} migrations exécutées avec succès`);
  
  if (successCount === migrations.length) {
    console.log('🎉 Toutes les migrations ont été appliquées !');
  } else {
    console.log('⚠️  Certaines migrations ont échoué.');
  }

  return successCount === migrations.length;
}

// Fonction alternative utilisant PostgREST directement
async function tryPostgRESTMethod() {
  console.log('\n🔄 Tentative via PostgREST...');
  
  try {
    const simpleSQL = `
      CREATE TABLE IF NOT EXISTS public.test_universities (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        city VARCHAR(100) NOT NULL
      );
    `;

    const response = await fetch(`${supabaseUrl}/rest/v1/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/vnd.pgrst.object+json',
        'Authorization': `Bearer ${supabaseServiceKey}`,
        'apikey': supabaseServiceKey,
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        query: simpleSQL
      })
    });

    console.log('Statut PostgREST:', response.status);
    const responseText = await response.text();
    console.log('Réponse PostgREST:', responseText);

  } catch (error) {
    console.log('❌ Erreur PostgREST:', error.message);
  }
}

async function main() {
  const success = await runMigrations();
  
  if (!success) {
    await tryPostgRESTMethod();
  }
  
  // Test final
  console.log('\n🔍 Test des tables après migration...');
  
  const testScript = `
    import { createClient } from '@supabase/supabase-js';
    
    const supabase = createClient('${supabaseUrl}', '${supabaseServiceKey}');
    
    const tables = ['universities', 'formations', 'applications'];
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log('❌ Table ' + table + ':', error.message);
        } else {
          console.log('✅ Table ' + table + ':', count || 0, 'enregistrements');
        }
      } catch (err) {
        console.log('❌ Table ' + table + ':', err.message);
      }
    }
  `;
  
  console.log('\nPour vérifier, exécutez:');
  console.log('npm run test-universities');
}

main().catch(console.error);
