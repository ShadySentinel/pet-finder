# 🚀 Quick Setup - Pet-Finder

## The Problem
You're getting JavaScript errors because Supabase isn't configured yet. Here's the 5-minute fix:

## Step 1: Create Supabase Project
1. Go to https://supabase.com/dashboard
2. Click "New project"
3. Choose any name (e.g., "pet-finder")
4. Use a strong password
5. Select a region close to you
6. Click "Create new project" (wait 2-3 minutes)

## Step 2: Get Your Credentials
1. In your new project, go to **Settings → API**
2. Copy these two values:
   - **Project URL** (looks like `https://abc123.supabase.co`)
   - **anon public** key (long string starting with `eyJ...`)

## Step 3: Update app.js
Open `app.js` and replace these lines (around line 28-29):
```javascript
const SUPABASE_URL = 'YOUR_SUPABASE_URL_HERE';
const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY_HERE';
```

With your actual credentials:
```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
```

## Step 4: Setup Database
1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy and paste the entire contents of `DATABASE_SCHEMA.sql`
4. Click "Run" (should show checkmarks ✅)

## Step 5: Setup Email Template (Optional)
1. Go to **Authentication → Email Templates**
2. Find "Confirm signup" template
3. Replace the HTML with contents of `email-templates/confirmation.html`
4. Save

## Step 6: Test
```bash
python3 -m http.server 8080
```
Open http://localhost:8080 and try signing up!

---

## Troubleshooting

**"User already registered" error:**
- The user exists but isn't confirmed
- Check your email (and spam folder)
- Or use a different email

**No email received:**
- Check spam/junk folder
- Supabase free tier has email limits
- Try with Gmail/Outlook (more reliable)

**JavaScript errors:**
- Make sure you pasted the credentials correctly
- No extra quotes or spaces
- Check browser console for specific errors

**Database errors:**
- Make sure you ran the `DATABASE_SCHEMA.sql`
- Check Supabase dashboard → Database → Tables
- Should see a `pets` table

---

**Total setup time: ~5 minutes**