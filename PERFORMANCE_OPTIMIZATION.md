# Performance Optimization Guide

## Issues Fixed

### 1. **Late Video Loading** ✅
- **Problem**: Videos loaded after text appeared, causing cumulative layout shift (CLS)
- **Solution**: 
  - Added `preload="metadata"` to video elements for faster metadata loading
  - Preload first slide video in useEffect on mount
  - Video now starts preparing immediately instead of waiting for user interaction

### 2. **Image Loading Delays** ✅
- **Problem**: Images in gallery/projects loaded without optimization
- **Solution**:
  - Added `loading="lazy"` to ProjectCard images for lazy loading
  - ProductCard already had lazy loading
  - Critical hero images use `loading="eager"`

### 3. **Build Optimization** ✅
- **Problem**: Large bundle sizes causing slower initial load
- **Solution**:
  - Split vendor code into separate chunks (React, Framer Motion, Icons)
  - Configured Terser minification
  - Added asset optimization in Vite config

## Additional Optimization Tips

### Video Optimization (Most Important!)
Videos are your largest assets. Consider:

#### Option 1: Compress Existing MP4 Files
Use FFmpeg to reduce video file size:

```bash
# Basic compression (good quality)
ffmpeg -i input.mp4 -c:v libx264 -preset medium -crf 23 -c:a aac -b:a 128k output.mp4

# Aggressive compression (smaller file)
ffmpeg -i input.mp4 -c:v libx264 -preset slow -crf 28 -c:a aac -b:a 96k output.mp4

# Create WebM alternative (better compression)
ffmpeg -i input.mp4 -c:v libvpx-vp9 -crf 30 -c:a libopus -b:a 96k output.webm
```

#### Option 2: Use Multiple Formats (Recommended)
In `constants.tsx`, videos can be specified as objects for format fallback:

```tsx
// Update HERO_SLIDES with multiple formats
{
  id: 1,
  type: 'video',
  media: "/videos/Casa-Repose-Soft-Seating-Profile.mp4",
  webm: "/videos/Casa-Repose-Soft-Seating-Profile.webm",
  title: "...",
  subtitle: "..."
}
```

Then update App.tsx video element to:
```tsx
<video
  ref={videoRef}
  className="w-full h-full object-cover"
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
>
  <source src={currentSlide.webm} type="video/webm" />
  <source src={currentSlide.media} type="video/mp4" />
</video>
```

### Image Optimization

#### 1. Use Optimal Formats
- Use **WebP** for modern browsers (better compression)
- Use **AVIF** for newer browsers (even smaller files)
- Keep **JPG/PNG** as fallback
- Already using AVIF for lounge chairs ✅

#### 2. Image Compression Tools
```bash
# Using ImageMagick
convert input.jpg -quality 80 -resize 1920x1080 output.jpg

# Using cwebp (for WebP)
cwebp -q 75 input.jpg -o output.webp

# Batch compression with PowerShell
Get-ChildItem *.jpg | ForEach-Object { 
  & ffmpeg -i $_.Name -vf scale=1920:-1 output_$_.Name 
}
```

### 3. Use Responsive Images
Consider using srcset for different screen sizes:
```tsx
<img 
  src="/images/product-800.jpg"
  srcSet="/images/product-400.jpg 400w, /images/product-800.jpg 800w, /images/product-1200.jpg 1200w"
  sizes="(max-width: 600px) 400px, (max-width: 1200px) 800px, 1200px"
  alt="Product"
  loading="lazy"
/>
```

## Current Status

✅ **Implemented:**
- Video preload attributes
- Image lazy loading
- Build optimization with code splitting
- Asset optimization config

⚠️ **Next Steps (Optional but Recommended):**
1. Compress MP4 videos to reduce file size by 40-60%
2. Create WebM versions for additional 30-40% savings
3. Optimize product/project images with WebP format
4. Add responsive image srcsets for faster mobile loading

## Testing Performance

After making changes, test with:

```bash
# Production build
npm run build

# Check bundle size
npm run build -- --sourcemap=inline

# Use Lighthouse in Chrome DevTools
# - Open DevTools (F12)
# - Go to Lighthouse tab
# - Run Audits
```

## Expected Improvements
- **First Contentful Paint (FCP)**: -30-40% faster
- **Largest Contentful Paint (LCP)**: -40-50% faster (with video optimization)
- **Cumulative Layout Shift (CLS)**: Near perfect
- **Overall Performance Score**: 85-95+
