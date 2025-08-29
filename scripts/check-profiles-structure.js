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

async function checkProfilesStructure() {
  console.log('🔍 Vérification de la structure de la table profiles...\n');
  
  try {
    // Essayer de lire la structure de la table
    const { data: profiles, error } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Erreur lecture profiles:', error.message);
      return;
    }
    
    console.log('✅ Table profiles accessible');
    console.log('📊 Nombre d\'enregistrements actuels:', profiles?.length || 0);
    
    if (profiles && profiles.length > 0) {
      console.log('\n📋 Structure d\'un enregistrement exemple:');
      console.log(JSON.stringify(profiles[0], null, 2));
    } else {
      console.log('\n📋 Table vide, tentative d\'insertion test...');
      
      // Créer un profil test simple
      const { data: testProfile, error: insertError } = await supabaseAdmin
        .from('profiles')
        .insert({
          first_name: 'Test',
          last_name: 'User',
          user_type: 'test'
        })
        .select()
        .single();
      
      if (insertError) {
        console.error('❌ Erreur insertion test:', insertError.message);
        console.log('\n🔧 Détails de l\'erreur:', insertError);
      } else {
        console.log('✅ Insertion test réussie');
        console.log('📋 Structure détectée:', Object.keys(testProfile));
        
        // Supprimer le profil test
        await supabaseAdmin
          .from('profiles')
          .delete()
          .eq('id', testProfile.id);
        console.log('🧹 Profil test supprimé');
      }
    }
    
  } catch (error) {
    console.error('❌ Erreur générale:', error.message);
  }
}

checkProfilesStructure();
