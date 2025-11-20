# Updating the Pet-Finder Email Confirmation Template

## Instructions

To replace the default Supabase email template with our custom branded template, follow these steps:

### Method 1: Using the Supabase Dashboard (Recommended)

1. Log in to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your Pet-Finder project
3. Navigate to **Authentication** → **Email Templates**
4. Scroll down to the **Confirmation** email template
5. Click on the template to edit it
6. Replace the entire HTML content with the contents of `/home/serah/pet-finder/email-templates/confirmation.html`
7. Update the following template variables if needed:
   - `{{ .ConfirmationURL }}` (必需 - This is where the confirmation link is inserted)
   - `{{ .SiteURL }}` (可选 - Your site URL)

8. Click **Save**

### Method 2: Using the Supabase API

If you want to programmatically update the email template, you can use the Supabase Management API:

```bash
# First, get your project's reference ID and key
# Go to Project Settings → API → service_role (secret)

# Then run this command to update the confirmation email template
curl -X PATCH 'https://api.supabase.com/v1/projects/your-project-ref-id/auth/templates' \
  -H 'Authorization: Bearer YOUR_SERVICE_ROLE_KEY' \
  -H 'Content-Type: application/json' \
  -d '{
    "confirm.signup": {
      "content": "<!DOCTYPE html>...</html>",
      "subject": "Confirm your Pet-Finder signup"
    }
  }'
```

> **Note**: Replace the content with the full HTML from `email-templates/confirmation.html` and update the service key and project ref ID.

### Method 3: Using Supabase CLI

If you have the Supabase CLI installed and configured:

1. Save the template to your local config:
   ```bash
   mkdir -p supabase/config/auth
   cp email-templates/confirmation.html supabase/config/auth/confirmation.html
   ```

2. Add this to your `supabase/config/config.toml`:
   ```toml
   [auth]
   [auth.email]
   [auth.email.templates]
   [auth.email.templates.confirmation]
   subject = "Confirm your Pet-Finder signup"
   content_path = "./supabase/config/auth/confirmation.html"
   ```

3. Push to your Supabase project:
   ```bash
   supabase db push
   ```

## What the New Template Does

- Professional branding with "Pet-Finder" in the header
- Clear messaging about the confirmation process
- **Orange confirmation button** (#f97316) matching your brand
- Fallback link for accessibility
- Responsive design that works on all devices
- Support for dark mode
- Clean, modern design

## Testing the Template

1. Sign up for a new account or logout and try to create a new one
2. Check your email for the new branded template

If you have any issues, verify that:
- The HTML content was copied completely without missing any characters
- The template variables weren't accidentally removed
- You've saved/published your changes in the dashboard