# Supabase Setup Instructions

## Step 1: Create a Supabase Project

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in project details:
   - Organization: Select or create one
   - Project name: `petfinder` (or your choice)
   - Database password: Create a strong password
   - Region: Choose closest to you
   - Pricing: Free tier is fine
4. Wait for project to be created (5-10 minutes)

## Step 2: Copy Project Credentials

1. Go to Project Settings → API
2. Copy:
   - **Project URL** - looks like `https://xxxxx.supabase.co`
   - **anon key** - starts with `eyJhbG...`

## Step 3: Create Environment File

1. Create `.env.local` in the project root:
```
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Setup Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Click "New Query"
3. Copy and paste the entire content from `DATABASE_SCHEMA.sql`
4. Click "Run"
5. You should see:
   - ✅ `pets` table created
   - ✅ Indexes created
   - ✅ Row Level Security (RLS) policies created
   - ✅ Storage bucket created

## Step 5: Verify Setup

1. In Supabase Dashboard, go to Table Editor
2. You should see the `pets` table listed
3. Go to Storage → pet-qr-codes bucket should exist

## Step 6: Update Home Page (Optional)

In the Index page, you can add a link to login:
```tsx
<Link to="/login" className="btn">Get Started</Link>
```

## You're Done!

Now you can:
- Run `npm run dev` to start the development server
- Visit `http://localhost:8081/signup` to create an account
- Visit `http://localhost:8081/login` to log in
- Go to `/dashboard` to manage pets
- Generate QR codes for your pets
