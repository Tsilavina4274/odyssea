# Ordre des Migrations Supabase - Corrigé

## Problèmes corrigés
- ✅ Dépendances circulaires résolues
- ✅ Table `profiles` créée en premier
- ✅ Politiques RLS complexes ajoutées à la fin
- ✅ Triggers de notifications ajoutés après création des tables

## Ordre d'exécution des migrations

### 1. `20240115000000_create_profiles_table.sql`
- Crée la table `profiles` avec tous les champs
- Établit les politiques RLS de base
- Crée le trigger de création automatique de profil

### 2. `20240115000001_create_universities_table.sql`
- Crée la table `universities`
- Politiques RLS complexes commentées (ajoutées plus tard)

### 3. `20240115000002_create_formations_table.sql`
- Crée la table `formations`
- Référence `universities` (dépendance résolue)
- Politiques RLS complexes commentées

### 4. `20240115000003_create_applications_table.sql`
- Crée la table `applications`
- Référence `formations` et `auth.users`
- Triggers de notifications supprimés (ajoutés plus tard)

### 5. `20240115000004_create_messages_table.sql`
- Crée la table `messages` et `conversations`

### 6. `20240115000005_create_notifications_table.sql`
- Crée la table `notifications`
- Prêt pour recevoir les triggers d'autres tables

### 7. `20240115000006_create_events_table.sql`
- Crée la table `events`

### 8. `20240115000007_create_resources_table.sql`
- Crée la table `study_resources` et tables liées

### 9. `20240115000008_update_profiles_table.sql`
- Migration vide (profils déjà créés)

### 10. `20240115000009_add_notification_triggers.sql`
- Ajoute les triggers de notifications
- Toutes les tables nécessaires existent maintenant

### 11. `20240115000010_add_complex_rls_policies.sql`
- Ajoute les politiques RLS complexes
- Toutes les dépendances entre tables sont maintenant résolues

## Commandes pour appliquer les migrations

```bash
# Connexion au projet Supabase (nécessite un access token)
npx supabase login

# Lier le projet local
npx supabase link --project-ref stsilkgjeathqtrbnrod

# Appliquer les migrations
npx supabase db push

# Ou alternativement, appliquer toutes les migrations :
npx supabase migration up
```

## Test de la configuration

Utilisez la page `/test-supabase` de l'application pour vérifier que toutes les tables sont accessibles et que la configuration fonctionne correctement.
