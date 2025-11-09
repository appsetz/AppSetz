# Portfolio Website Setup Guide

## 🚀 Quick Start

### 1. Install Dependencies

**Stop any running dev server first** (Press `Ctrl+C` in the terminal where it's running)

Then run:

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

Your portfolio will be available at `http://localhost:3000`

## 📦 What's Included

### ✨ Hero Section with DottedSurface Animation
- **Location**: `src/components/DottedSurface.tsx`
- **Features**: 
  - 3D animated particle surface using Three.js
  - Wave-like motion with sine wave patterns
  - Optimized for both desktop and mobile
  - Responsive particle count (fewer particles on mobile)
  - Hardware-accelerated rendering

### 🎨 Background Animation
- **Location**: `src/components/BackgroundAnimation.tsx`
- **Features**: 
  - Animated gradient backgrounds
  - Floating particles
  - Geometric shapes with rotation
  - Animated grid patterns
  - Floating orbs with blur effects
  - Optimized for performance

### 🔧 Key Dependencies

- **@react-three/fiber** (^8.18.0) - React renderer for Three.js
- **three** (^0.181.0) - 3D graphics library
- **framer-motion** (^10.16.16) - Animation library
- **Next.js** (14.0.4) - React framework
- **TailwindCSS** (^3.3.0) - Utility-first CSS framework

## 🎯 Performance Optimizations

### DottedSurface Component
✅ **Mobile-responsive**: Reduces particles on smaller screens (25x40 vs 40x60)
✅ **Pixel ratio cap**: Limited to 2x for better performance
✅ **Disabled antialiasing**: Faster rendering
✅ **Debounced resize**: Prevents excessive recalculations
✅ **Power preference**: Uses high-performance GPU when available

### Background Animation
✅ **Reduced particle count**: 30 particles on mobile vs 50 on desktop
✅ **Optimized animations**: Using GPU-accelerated transforms
✅ **Efficient re-renders**: Only updates on dimension changes

## 🐛 Troubleshooting

### "Module not found" Errors

If you see errors like `Module not found: Can't resolve '@react-three/fiber'`:

1. **Stop the dev server** (`Ctrl+C`)
2. Delete `node_modules` folder:
   ```bash
   rm -rf node_modules
   # or on Windows:
   rmdir /s /q node_modules
   ```
3. Delete `package-lock.json`:
   ```bash
   rm package-lock.json
   # or on Windows:
   del package-lock.json
   ```
4. Reinstall everything:
   ```bash
   npm install
   ```
5. Start dev server:
   ```bash
   npm run dev
   ```

### Performance Issues

If the website feels sluggish:

1. **Check your device performance**: The 3D animations require decent GPU
2. **Reduce particle count**: Edit `AMOUNTX` and `AMOUNTY` in `DottedSurface.tsx`
3. **Disable animations**: Comment out `<DottedSurface />` in `HeroSection.tsx` temporarily

### Build Errors

To check for TypeScript errors:

```bash
npm run type-check
```

To check for linting errors:

```bash
npm run lint
```

## 📱 Mobile Optimization

The website is fully optimized for mobile devices:

- ✅ Responsive particle counts
- ✅ Touch-friendly buttons
- ✅ Optimized animations
- ✅ Reduced GPU load on mobile

## 🎨 Customization

### Change DottedSurface Colors

Edit `src/components/DottedSurface.tsx` line 65:

```typescript
// White dots for dark background
colors.push(200, 200, 200);

// Change to blue dots:
colors.push(100, 150, 255);

// Change to red dots:
colors.push(255, 100, 100);
```

### Adjust Animation Speed

Edit the `count` increment in the animate function (line 126):

```typescript
count += 0.1;  // Current speed

// Slower:
count += 0.05;

// Faster:
count += 0.2;
```

### Change Particle Density

Edit the `SEPARATION` value (line 24-25):

```typescript
const SEPARATION = isMobile ? 180 : 150;

// More dense (more particles):
const SEPARATION = isMobile ? 120 : 100;

// Less dense (fewer particles):
const SEPARATION = isMobile ? 240 : 200;
```

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Deploy to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import the repository on Vercel
3. Vercel will auto-detect Next.js and deploy

## 📂 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── DottedSurface.tsx # Hero background animation
│   ├── HeroSection.tsx   # Hero section with animation
│   ├── BackgroundAnimation.tsx # Site-wide background
│   └── ...               # Other components
└── lib/                  # Utility functions
```

## 💡 Tips for Smooth Performance

1. **Keep dev tools closed** when testing animations
2. **Use a modern browser** (Chrome, Firefox, Edge, Safari)
3. **Clear browser cache** if you see stale content
4. **Check GPU usage** - animations should use GPU acceleration
5. **Test on actual devices** for mobile performance

## 🎯 Next Steps

1. ✅ Install dependencies
2. ✅ Start dev server
3. ✅ Check animations in hero section
4. ✅ Test on mobile device
5. ✅ Customize colors/animations to your preference
6. ✅ Build for production
7. ✅ Deploy to Vercel

## 📞 Support

If you encounter any issues:

1. Check the troubleshooting section above
2. Make sure all dependencies are installed
3. Verify Node.js version (should be 18+)
4. Check browser console for errors

---

**Happy coding! 🎉**

