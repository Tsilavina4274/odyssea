import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Client pour les opérations admin
const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Client pour les opérations utilisateur normal
const supabase = createClient(supabaseUrl, process.env.VITE_SUPABASE_ANON_KEY);

async function testUniversityUserFlow() {
  console.log('🚀 Test du flux complet utilisateur université\n');
  
  // Données de test
  const testUniversity = {
    email: 'universite-test@sorbonne.fr',
    password: 'TestPassword123!',
    firstName: 'Sophie',
    lastName: 'Martin',
    institution: 'Université de la Sorbonne',
    userType: 'universite'
  };
  
  const universityData = {
    name: 'Université de la Sorbonne',
    description: 'Une université prestigieuse située au cœur de Paris, reconnue internationalement pour ses programmes d\'excellence.',
    city: 'Paris',
    address: '21 Rue de l\'École de Médecine, 75006 Paris',
    type: 'Public',
    website: 'https://www.sorbonne-universite.fr',
    email: 'contact@sorbonne.fr',
    phone: '+33 1 44 27 44 27',
    established_year: 1150,
    student_count: 55000,
    rating: 4.5
  };
  
  try {
    console.log('📝 Étape 1: Création du compte utilisateur université...');
    
    // 1. Inscription de l'utilisateur
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email: testUniversity.email,
      password: testUniversity.password,
      options: {
        data: {
          first_name: testUniversity.firstName,
          last_name: testUniversity.lastName,
          user_type: testUniversity.userType,
          institution: testUniversity.institution
        }
      }
    });
    
    if (signUpError) {
      if (signUpError.message.includes('User already registered')) {
        console.log('⚠️  Utilisateur déjà existant, tentative de connexion...');
        
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: testUniversity.email,
          password: testUniversity.password
        });
        
        if (signInError) {
          throw new Error(`Erreur de connexion: ${signInError.message}`);
        }
        
        console.log('✅ Connexion réussie');
        authData.user = signInData.user;
      } else {
        throw new Error(`Erreur d'inscription: ${signUpError.message}`);
      }
    } else {
      console.log('✅ Inscription réussie');
    }
    
    console.log(`👤 Utilisateur créé: ${authData.user?.email} (ID: ${authData.user?.id})`);
    
    // 2. Vérifier la création automatique du profil
    console.log('\n📝 Étape 2: Vérification du profil utilisateur...');

    const { data: profile, error: profileError } = await supabaseAdmin
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (profileError) {
      console.log('⚠️  Profil non trouvé, création manuelle...');

      const { data: newProfile, error: createProfileError } = await supabaseAdmin
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: testUniversity.firstName,
          last_name: testUniversity.lastName,
          institution: testUniversity.institution,
          user_type: testUniversity.userType
        })
        .select()
        .single();

      if (createProfileError) {
        throw new Error(`Erreur création profil: ${createProfileError.message}`);
      }

      console.log('✅ Profil créé manuellement');
      profile = newProfile;
    } else {
      console.log('�� Profil trouvé');
    }
    
    console.log(`👤 Profil: ${profile.first_name} ${profile.last_name} (${profile.user_type})`);
    
    // 3. Création de l'université
    console.log('\n📝 Étape 3: Création de l\'université...');
    
    console.log('📋 Données université à insérer:', universityData);

    const { data: university, error: universityError } = await supabaseAdmin
      .from('universities')
      .insert(universityData)
      .select()
      .single();

    console.log('🔍 Résultat insertion:', { data: university, error: universityError });
    
    if (universityError) {
      if (universityError.message && universityError.message.includes('duplicate key')) {
        console.log('⚠️  Université déjà existante, récupération...');

        const { data: existingUniversity, error: fetchError } = await supabaseAdmin
          .from('universities')
          .select('*')
          .eq('name', universityData.name)
          .single();

        if (fetchError) {
          throw new Error(`Erreur récupération université: ${fetchError.message}`);
        }

        university = existingUniversity;
        console.log('✅ Université existante récupérée');
      } else {
        console.log('🔍 Erreur université:', universityError);
        throw new Error(`Erreur création université: ${universityError.message || JSON.stringify(universityError)}`);
      }
    } else {
      console.log('✅ Université créée avec succès');
    }
    
    console.log(`🏛️  Université: ${university.name} (ID: ${university.id})`);
    
    // 4. Création d'une formation
    console.log('\n📝 Étape 4: Création d\'une formation...');
    
    const formationData = {
      university_id: university.id,
      name: 'Master en Informatique',
      description: 'Formation de haut niveau en informatique et technologies de l\'information',
      level: 'Master',
      domain: 'Informatique',
      duration_years: 2,
      total_places: 50,
      available_places: 45,
      requirements: 'Licence en informatique ou équivalent',
      admission_criteria: 'Dossier académique, entretien',
      tuition_fee: 2770.00,
      is_active: true
    };
    
    const { data: formation, error: formationError } = await supabaseAdmin
      .from('formations')
      .insert(formationData)
      .select()
      .single();
    
    if (formationError) {
      throw new Error(`Erreur création formation: ${formationError.message}`);
    }
    
    console.log('✅ Formation créée avec succès');
    console.log(`📚 Formation: ${formation.name} (ID: ${formation.id})`);
    
    // 5. Test de lecture avec l'utilisateur normal (anon key)
    console.log('\n📝 Étape 5: Test de lecture des données avec utilisateur normal...');
    
    const { data: publicUniversities, error: readError } = await supabase
      .from('universities')
      .select('*')
      .limit(5);
    
    if (readError) {
      console.log(`⚠️  Erreur lecture universités: ${readError.message}`);
    } else {
      console.log(`✅ ${publicUniversities.length} université(s) lisible(s) publiquement`);
    }
    
    const { data: publicFormations, error: formationReadError } = await supabase
      .from('formations')
      .select('*')
      .eq('is_active', true)
      .limit(5);
    
    if (formationReadError) {
      console.log(`⚠️  Erreur lecture formations: ${formationReadError.message}`);
    } else {
      console.log(`✅ ${publicFormations.length} formation(s) lisible(s) publiquement`);
    }
    
    // 6. Résumé
    console.log('\n🎉 Test complet réussi !');
    console.log('\n📊 Résumé:');
    console.log(`👤 Utilisateur: ${testUniversity.email}`);
    console.log(`👨‍💼 Profil: ${profile.first_name} ${profile.last_name} (${profile.user_type})`);
    console.log(`🏛️  Université: ${university.name}`);
    console.log(`📚 Formation: ${formation.name}`);
    console.log(`🔍 Visibilité: ${publicUniversities.length} universités et ${publicFormations.length} formations publiques`);
    
    return {
      user: authData.user,
      profile,
      university,
      formation,
      publicData: {
        universities: publicUniversities.length,
        formations: publicFormations.length
      }
    };
    
  } catch (error) {
    console.error('❌ Erreur dans le test:', error.message);
    return null;
  }
}

// Lancer le test
testUniversityUserFlow().then(result => {
  if (result) {
    console.log('\n✅ Flux université testé avec succès !');
  } else {
    console.log('\n❌ Échec du test du flux université');
    process.exit(1);
  }
}).catch(console.error);
