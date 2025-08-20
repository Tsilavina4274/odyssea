# 🚀 Instructions pour Exécuter les Migrations Supabase

## 📋 Étapes à suivre :

### 1. 🌐 Ouvrir le Dashboard Supabase
👉 **Cliquez ici :** https://app.supabase.com/project/stsilkgjeathqtrbnrod/sql

### 2. 📝 Exécuter les Migrations SQL

Copiez et collez **chaque bloc SQL** ci-dessous dans l'éditeur SQL et cliquez sur "RUN" :

---

#### **Migration 1 : Table Universities**
```sql
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
```

---

#### **Migration 2 : Table Formations**
```sql
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
```

---

#### **Migration 3 : Table Applications**
```sql
DO $$ BEGIN
  CREATE TYPE application_status AS ENUM (
    'draft', 'submitted', 'under_review', 'accepted', 'rejected', 'waitlisted'
  );
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

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

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Students can view their own applications" 
ON public.applications FOR SELECT 
USING (student_id = auth.uid());

CREATE POLICY "Students can manage their own applications" 
ON public.applications FOR ALL 
USING (student_id = auth.uid());
```

---

### 3. ✅ Vérification

Après avoir exécuté les 3 migrations, lancez le test :
```bash
npm run test-universities
```

**Si le test affiche "0 enregistrements" pour chaque table ✅, c'est parfait !**

---

## 🎯 Résultat Attendu

Après les migrations, vous devriez avoir :
- ✅ Table `universities` 
- ✅ Table `formations`
- ✅ Table `applications`
- ✅ Politiques RLS configurées
- ✅ Relations entre tables établies

**Puis vous pourrez relancer :** `npm run test-university`
