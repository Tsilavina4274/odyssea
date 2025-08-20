import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function testUniversitiesTable() {
  console.log('🔍 Test de la table universities...\n');
  
  try {
    // Test de lecture
    console.log('📖 Test de lecture...');
    const { data: universities, error: readError } = await supabaseAdmin
      .from('universities')
      .select('*')
      .limit(5);
    
    console.log('Résultat lecture:', { data: universities, error: readError });
    
    if (readError) {
      console.error('❌ Erreur lecture:', readError);
      return;
    }
    
    console.log(`✅ Lecture réussie: ${universities.length} universités`);
    
    // Test d'insertion simple
    console.log('\n📝 Test d\'insertion...');
    const simpleData = {
      name: 'Test Université Simple',
      city: 'Paris'
    };
    
    const { data: inserted, error: insertError } = await supabaseAdmin
      .from('universities')
      .insert(simpleData)
      .select()
      .single();
    
    console.log('Résultat insertion:', { data: inserted, error: insertError });
    
    if (insertError) {
      console.error('❌ Erreur insertion:', insertError);
      
      // Test avec encore moins de données
      console.log('\n📝 Test d\'insertion ultra-simple...');
      const ultraSimple = {
        name: 'Test Ultra Simple',
        city: 'Lyon'
      };
      
      const { data: ultraInserted, error: ultraError } = await supabaseAdmin
        .from('universities')
        .insert(ultraSimple)
        .select();
      
      console.log('Résultat ultra-simple:', { data: ultraInserted, error: ultraError });
      
    } else {
      console.log('✅ Insertion réussie');
      
      // Nettoyer
      await supabaseAdmin
        .from('universities')
        .delete()
        .eq('id', inserted.id);
      console.log('🧹 Test data supprimée');
    }
    
  } catch (error) {
    console.error('❌ Exception:', error);
  }
}

testUniversitiesTable();
