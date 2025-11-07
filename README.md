# AppSetz Portfolio - Next.js

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS. This is a conversion of the original Flutter portfolio app to a web-based solution.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Fast Performance**: Optimized with Next.js 14 and modern web technologies
- **Firebase Integration**: Real-time data from Firebase Firestore
- **Contact Form**: Working contact form with email notifications
- **Testimonials**: Dynamic testimonials system
- **Project Showcase**: Beautiful project gallery with tech stack display
- **SEO Optimized**: Built-in SEO optimization for better search visibility

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Firebase Firestore
- **Icons**: Lucide React
- **Forms**: React Hook Form
- **Notifications**: React Hot Toast

## 📦 Installation

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
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── contact/       # Contact form API
│   │   ├── projects/      # Projects API
│   │   └── testimonials/  # Testimonials API
│   ├── projects/          # Projects page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsPreview.tsx
│   ├── AboutSection.tsx
│   ├── TechStackSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── ContactSection.tsx
│   ├── CopyrightFooter.tsx
│   └── BackgroundAnimation.tsx
├── lib/                   # Utility libraries
│   └── firebase.ts        # Firebase configuration
└── types/                 # TypeScript types
    └── index.ts           # Type definitions
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

## ⚡ Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic code splitting for faster loading

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the Issues page
2. Create a new issue with detailed information
3. Contact: pavan@appsetz.com

---

**Made with ❤️ by AppSetz**
