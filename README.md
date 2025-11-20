# 🐾 Pet-Finder

**Pet-Finder** is a modern, lightweight web application that helps reunite lost pets with their owners using QR code technology. Built with vanilla JavaScript and Supabase, it provides a simple yet powerful solution for pet safety.

![Pet-Finder Demo](https://img.shields.io/badge/Demo-Live-green?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-Vanilla%20JS%20%2B%20Supabase-blue?style=for-the-badge)
![No Build Required](https://img.shields.io/badge/Build-Not%20Required-orange?style=for-the-badge)

## ✨ Features

### Core Functionality
- 🏠 **Instant Pet Recovery**: QR codes provide immediate access to owner contact information
- 📱 **Mobile-First Design**: Fully responsive interface that works on all devices
- 🔐 **Secure Authentication**: Email verification with branded confirmation emails
- 📊 **Pet Dashboard**: Manage multiple pets with detailed profiles
- 🎯 **QR Code Generation**: High-quality, downloadable QR codes for pet tags
- 🌙 **Dark Mode Support**: Email templates adapt to user preferences

### User Experience
- ⚡ **No App Required**: Works directly in any web browser
- 🚀 **Lightning Fast**: Pure vanilla JS - no heavy frameworks
- 🎨 **Beautiful UI**: Clean, modern interface with smooth animations
- 📧 **Branded Emails**: Professional email confirmations with Pet-Finder branding
- 🔄 **Real-time Updates**: Instant synchronization across devices

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic, accessible markup
- **CSS3**: Custom styling with flexbox/grid, animations, and responsive design
- **Vanilla JavaScript**: Pure ES6+ with async/await, no frameworks or dependencies
- **Web APIs**: File download, QR generation, local storage

### Backend & Services
- **Supabase**: 
  - PostgreSQL database with Row Level Security (RLS)
  - Built-in authentication with JWT tokens
  - Real-time subscriptions
  - Email service with custom templates
- **QR Server API**: External service for QR code generation
- **Email Templates**: Custom HTML templates with dark mode support

### Development
- **No Build Process**: Direct file serving, no compilation needed
- **Git**: Version control with conventional commits
- **Environment Variables**: Secure credential management
- **Static Hosting**: Deploy anywhere (Netlify, Vercel, GitHub Pages)

## 🚀 Quick Start

### Option 1: Instant Deploy (Recommended)

1. **Clone the repository**:
   ```bash
   git clone https://github.com/bigshabs13/pet-finder.git
   cd pet-finder
   ```

2. **Start local server**:
   ```bash
   python3 -m http.server 3000
   ```

3. **Open your browser**: Navigate to `http://localhost:3000`

4. **Follow setup prompts**: The app will guide you through Supabase configuration

### Option 2: Full Setup

1. **Create Supabase Project**:
   - Go to [Supabase Dashboard](https://supabase.com/dashboard)
   - Click "New Project"
   - Choose a name and region
   - Wait for setup to complete

2. **Configure Database**:
   - Go to SQL Editor in Supabase
   - Copy contents of `DATABASE_SCHEMA.sql`
   - Run the SQL to create tables and security policies

3. **Get API Credentials**:
   - Go to Settings → API in Supabase
   - Copy Project URL and anon/public key

4. **Update Configuration**:
   ```javascript
   // In app.js, replace these values:
   const SUPABASE_URL = 'https://your-project-id.supabase.co';
   const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';
   ```

5. **Setup Email Template** (Optional but Recommended):
   - Go to Authentication → Email Templates in Supabase
   - Select "Confirm signup" template
   - Replace with contents from `email-templates/minimal-branded.html`

## 📁 Project Structure

```
pet-finder/
├── 📄 index.html                 # Main application (HTML + CSS)
├── ⚙️ app.js                     # Application logic (Vanilla JS)
├── 🗃️ DATABASE_SCHEMA.sql        # Supabase database setup
├── 🖼️ images/                    # Background slider images
│   ├── 1.jpg
│   ├── 2.webp
│   └── ...
├── 📧 email-templates/           # Email customization
│   ├── confirmation.html         # Full branded template
│   ├── minimal-branded.html      # Simplified template
│   └── simple-confirmation.html  # Basic template
├── 📚 docs/                      # Documentation
│   ├── QUICK_SETUP.md            # 5-minute setup guide
│   ├── UPDATE_EMAIL_TEMPLATE.md  # Email customization guide
│   ├── SUPABASE_SETUP.md         # Detailed Supabase instructions
│   └── VANILLA_SETUP.md          # Vanilla JS specific notes
├── 🔧 .env.example              # Environment variables template
└── 📖 README.md                 # This file
```

## 💻 Development

### Local Development
```bash
# Start development server
python3 -m http.server 3000

# Or use any static file server
npx serve .
# OR
php -S localhost:3000
```

### Environment Variables
Create a `.env` file (not required for vanilla JS, but helpful for documentation):
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

### Database Schema
The `DATABASE_SCHEMA.sql` file includes:
- `pets` table with owner relationships
- Row Level Security (RLS) policies
- Indexes for performance
- Storage bucket for future file uploads

## 🎯 Usage Guide

### For Pet Owners
1. **Register**: Create account with email verification
2. **Add Pet**: Enter pet details (name, breed, description, microchip)
3. **Generate QR**: Create unique QR code for your pet
4. **Download**: Save QR code image to print on pet tag
5. **Attach**: Put QR code tag on your pet's collar

### For Pet Finders
1. **Scan QR Code**: Use any smartphone camera
2. **View Info**: See pet details and owner contact
3. **Contact Owner**: Call or message directly
4. **Reunite**: Help bring the pet home safely

## 🔧 Configuration Options

### Email Customization
Three email templates are provided:
- `confirmation.html`: Full-featured with dark mode
- `minimal-branded.html`: Clean and simple
- `simple-confirmation.html`: Basic fallback

### Supabase Settings
- **Authentication**: Email confirmation enabled
- **Security**: Row Level Security policies enforced
- **Storage**: Optional file upload bucket
- **Real-time**: Database subscriptions for live updates

## 🚀 Deployment

### Static Hosting (Recommended)
```bash
# Deploy to Netlify
npm i -g netlify-cli
netlify deploy --prod --dir .

# Deploy to Vercel
npm i -g vercel
vercel --prod

# Deploy to GitHub Pages
# Just push to main branch with GitHub Pages enabled
```

### Server Requirements
- **Minimum**: Any static file server
- **Recommended**: HTTPS enabled for security
- **Performance**: CDN for global availability

## 🔒 Security Features

- **Row Level Security**: Database access controlled per user
- **JWT Authentication**: Secure token-based auth
- **Email Verification**: Prevents fake accounts
- **Input Validation**: XSS and injection protection
- **HTTPS Ready**: Secure communication

## 🐛 Troubleshooting

### Common Issues

**"Supabase not configured" error**:
- Update `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `app.js`
- Verify credentials in Supabase dashboard

**Email not received**:
- Check spam/junk folder
- Try different email provider
- Verify email template is saved in Supabase

**QR code not generating**:
- Check internet connection
- Verify QR Server API is accessible
- Try refreshing the page

**Login/signup issues**:
- Clear browser cache
- Check browser console for errors
- Verify database schema is properly set up

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

### Development Guidelines
- Use vanilla JavaScript (no frameworks)
- Follow existing code style
- Test on multiple browsers
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Supabase**: For providing excellent backend services
- **QR Server**: For free QR code generation API
- **Contributors**: Everyone who has helped improve this project

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/bigshabs13/pet-finder/issues)
- **Documentation**: Check the `/docs` folder for detailed guides
- **Community**: Join discussions in GitHub Discussions

---

**Made with ❤️ for pet safety**

*Helping reunite pets with their families, one QR code at a time.*