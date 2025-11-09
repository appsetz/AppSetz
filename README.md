# Appsetz — Digital Product Agency Portfolio

🚀 **Transforming Ideas into Powerful Digital Products**

A modern, high-performance portfolio website built with Next.js 14, TypeScript, and Tailwind CSS. Featuring advanced 3D animations, comprehensive SEO optimization, and Firebase integration.

## ✨ Key Features

### 🎨 Design & UX
- **3D Animated Hero**: Interactive particle surface with Three.js
- **Smooth Animations**: Framer Motion for fluid user interactions
- **Modern UI**: Clean, professional design with dark theme
- **Fully Responsive**: Optimized for mobile, tablet, and desktop

### ⚡ Performance & Optimization
- **Lightning Fast**: Next.js 14 with App Router
- **SEO Optimized**: Comprehensive meta tags, Open Graph, structured data
- **PWA Ready**: Progressive Web App with manifest
- **Optimized Assets**: Automatic image optimization and code splitting

### 🔧 Technical Features
- **Firebase Integration**: Real-time data from Firestore
- **Contact Form**: Working contact form with validation
- **Dynamic Content**: Testimonials and project showcase
- **Analytics Ready**: Google Analytics & Search Console integration
- **Sitemap & Robots.txt**: Automatic SEO crawling optimization

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **3D Graphics**: Three.js + @react-three/fiber
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast
- **SEO**: Next.js Metadata API + JSON-LD Schema

## 📦 Quick Start

### Option 1: Automatic Setup (Recommended)

**Windows:**
```bash
setup.bat
```

**Linux/Mac:**
```bash
chmod +x setup.sh
./setup.sh
```

### Option 2: Manual Installation

1. **Navigate to the project directory**
   ```bash
   cd appsetz-portfolio-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your Firebase configuration in `.env.local`:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔥 Firebase Setup

1. **Create a Firebase project** at [Firebase Console](https://console.firebase.google.com/)

2. **Enable Firestore Database**
   - Go to Firestore Database in your Firebase console
   - Create database in production mode
   - Set up security rules (for development, you can use test mode)

3. **Create collections**:
   - `projects` - for project data
   - `testimonials` - for client testimonials
   - `contact_messages` - for contact form submissions

4. **Get Firebase config**
   - Go to Project Settings > General
   - Scroll down to "Your apps" section
   - Add a web app if you haven't already
   - Copy the config object values to your `.env.local`

## 📁 Project Structure

```
src/
├── app/
│   ├── api/                    # API routes
│   │   ├── contact/           # Contact form endpoint
│   │   ├── projects/          # Projects CRUD
│   │   ├── testimonials/      # Testimonials API
│   │   └── messages/          # Messages management
│   ├── admin/                 # Admin dashboard
│   ├── projects/              # Projects showcase page
│   ├── contact/               # Contact page
│   ├── layout.tsx            # Root layout with SEO
│   ├── page.tsx              # Home page
│   ├── sitemap.ts            # Dynamic sitemap
│   └── globals.css           # Global styles
├── components/
│   ├── DottedSurface.tsx     # 3D particle animation
│   ├── BackgroundAnimation.tsx # Site-wide background
│   ├── HeroSection.tsx        # Hero with animation
│   ├── Header.tsx
│   ├── ProjectsPreview.tsx
│   ├── ServicesSection.tsx
│   ├── ProcessSection.tsx
│   ├── AboutSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── PricingSection.tsx
│   └── CopyrightFooter.tsx
├── lib/
│   └── firebase.ts           # Firebase config
└── types/
    └── index.ts              # TypeScript definitions

public/
├── assets/                   # Images and logos
├── robots.txt               # SEO crawling rules
└── manifest.json            # PWA manifest
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

### Content
- **Hero Section**: Edit `src/components/HeroSection.tsx`
- **About Section**: Edit `src/components/AboutSection.tsx`
- **Tech Stack**: Edit the `techStacks` array in `src/components/TechStackSection.tsx`
- **Contact Info**: Edit `src/components/ContactSection.tsx`

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## 📱 Responsive Design

The portfolio is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## ⚡ Performance & SEO

### Performance Optimizations
- **Lighthouse Score**: 95+ across all metrics
- **Mobile-Responsive**: Adaptive particle counts for devices
- **Hardware Acceleration**: GPU-powered 3D animations
- **Optimized Rendering**: Debounced resize, capped pixel ratio
- **Code Splitting**: Automatic lazy loading
- **Image Optimization**: Next.js Image component

### SEO Features ✅
- **Comprehensive Meta Tags**: Title templates, descriptions, keywords
- **Open Graph**: Optimized social sharing (Facebook, LinkedIn)
- **Twitter Cards**: Large image cards for Twitter
- **Structured Data**: JSON-LD schema for Organization & Website
- **Sitemap.xml**: Dynamic sitemap generation
- **Robots.txt**: Configured for optimal crawling
- **PWA Manifest**: Mobile app-like experience
- **Semantic HTML**: Proper heading hierarchy
- **Alt Text**: All images have descriptive alt attributes

### Documentation
- 📖 **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Complete setup & troubleshooting
- 🔍 **[SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md)** - SEO implementation details
- 📱 **[SOCIAL_MEDIA_CONTENT.md](./SOCIAL_MEDIA_CONTENT.md)** - Ready-to-use social content

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - TypeScript type checking

### SEO Configuration

Before deploying, update these files with your actual domain:

1. **`src/app/layout.tsx`** (line 8)
   ```typescript
   const siteUrl = 'https://appsetz.com'; // Update this
   ```

2. **`src/app/sitemap.ts`** (line 4)
   ```typescript
   const baseUrl = 'https://appsetz.com'; // Update this
   ```

3. **`public/robots.txt`** (line 12)
   ```
   Sitemap: https://appsetz.com/sitemap.xml
   ```

4. **Google Search Console Verification** (`src/app/layout.tsx` line 96)
   ```typescript
   google: 'your-verification-code-here'
   ```

## 📄 License

This project is licensed under the MIT License.

## 📊 Testing Your SEO

Use these tools to verify SEO implementation:

1. **[Google PageSpeed Insights](https://pagespeed.web.dev/)** - Performance testing
2. **[Google Search Console](https://search.google.com/search-console)** - Index monitoring
3. **[Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)** - OG tags preview
4. **[Twitter Card Validator](https://cards-dev.twitter.com/validator)** - Twitter cards
5. **[Schema Markup Validator](https://validator.schema.org/)** - Structured data

## 🆘 Support

If you encounter any issues or have questions:

1. Check **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** for troubleshooting
2. Review **[SEO_OPTIMIZATION.md](./SEO_OPTIMIZATION.md)** for SEO help
3. Create an issue with detailed information
4. Contact: hello@appsetz.com

## 📈 Next Steps After Deployment

- [ ] Submit sitemap to Google Search Console
- [ ] Set up Google Analytics
- [ ] Create Google My Business listing
- [ ] Set up social media profiles
- [ ] Start content marketing (blog)
- [ ] Build backlinks from directories

---

**Made with ❤️ by Appsetz** | [Website](https://appsetz.com) | [LinkedIn](https://linkedin.com/company/appsetz) | [Twitter](https://twitter.com/appsetz)
