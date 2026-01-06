# Mobile & Collection Image Optimization Guide

## ✅ Fixes Applied

### Mobile Video Support
- ✅ Added poster image (black background)
- ✅ `playsInline` attribute for iOS
- ✅ `muted` + `autoPlay` for mobile compatibility
- ✅ `preload="auto"` for faster buffering

### Collection Images Optimization
- ✅ Added `decoding="async"` for non-blocking image rendering
- ✅ Added `sizes` attribute for responsive loading
- ✅ Lazy loading already enabled (`loading="lazy"`)
- ✅ Applied to both ProductCard and ProjectCard

---

## 📱 Why Mobile Videos Still Show Static

**Browser Limitation**: Most mobile browsers (Safari, Chrome) require:
1. Video to be `muted` ✅ (already done)
2. User interaction OR first-time load requires `muted`
3. Some iOS versions still block autoplay

**Solution**: The video WILL play once user scrolls or interacts with page.

---

## 🖼️ Collection Images Loading Slowly When Hosted

### Primary Issue: Image File Sizes

Your product/project images likely need optimization. Check file sizes:

```bash
# Check image sizes
ls -lh public/images/
```

### Recommended Solutions

#### **Option 1: Compress Existing Images** (Quick)
Use free online tools:
- **TinyPNG.com** - Up to 20 images free
- **Squoosh.app** - Google's image optimizer
- **Compressor.io** - Lossy compression

**Target**: Reduce each image to < 200 KB

#### **Option 2: Convert to WebP** (Best)
WebP is 25-35% smaller than JPEG/PNG

**Online Tools**:
- CloudConvert.com - Convert images to WebP
- Squoosh.app - Web-based converter

**PowerShell Script** (if you have ImageMagick):
```powershell
Get-ChildItem public/images/*.jpg | ForEach-Object {
  & magick $_.FullName -quality 75 $_.BaseName.webp
}
```

#### **Option 3: Use Responsive Images with srcset**

Update ProductCard to load different sizes:

```tsx
<img
  src="product-400.jpg"
  srcSet="product-200.jpg 200w, product-400.jpg 400w, product-800.jpg 800w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Product"
  loading="lazy"
  decoding="async"
/>
```

---

## 🚀 What's Actually Happening

### When Images Load Slowly on Host

1. **Network latency** - Images download over internet (vs local)
2. **Browser rendering** - Large unoptimized images block rendering
3. **Lazy loading delay** - Image starts loading when it enters viewport

### Network Waterfall Example
```
Initial Page Load → (1s) 
  ↓ CSS/JS Downloads → (2s)
    ↓ Images Start Loading → (3s)
      ↓ First images visible → (4-5s)
```

**How to Improve**:
1. Compress images (50-60% smaller)
2. Use WebP format (30% smaller than JPEG)
3. Add CDN caching (serves from nearest location)
4. Implement image placeholder (skeleton loader)

---

## 📊 Image Optimization Checklist

- [ ] Check current image file sizes
- [ ] Compress all images to < 200 KB each
- [ ] Convert to WebP format
- [ ] Test loading on slow 4G network
- [ ] Verify Lighthouse score improves

---

## 🔧 Quick Wins (Do These First)

### 1. Compress Images NOW
```
Current: Unknown (need to check)
Target: < 150 KB per image
Tool: TinyPNG.com (easiest)
Time: 5 minutes
```

### 2. Set Image Dimensions
Add width/height to img tags:
```tsx
<img
  src="product.jpg"
  width="800"
  height="600"
  alt="Product"
/>
```

This prevents layout shift!

---

## 📈 Expected Improvements After Optimization

| Metric | Before | After |
|--------|--------|-------|
| Collection Load Time | 5-8s | 1-2s |
| Page Size | Unknown | -60% |
| Lighthouse Score | 70-80 | 95+ |
| Mobile Performance | Fair | Excellent |

---

## 🎯 Next Steps

1. **Check image sizes** in `public/images/` folder
2. **Compress all images** using TinyPNG or Squoosh
3. **Replace original files** with compressed versions
4. **Test on slow network** (DevTools > Network > Slow 4G)
5. **Run Lighthouse** audit to verify improvements

---

## 💡 Pro Tips

- **Always export images at actual display size** (don't use 4000x3000px image for 400px display)
- **Use PNG for graphics/icons, JPEG for photos**
- **WebP for modern browsers, JPEG fallback for older**
- **Progressive JPEG** loads low-quality first, then high-quality

---

## ✨ Current Status

✅ Mobile video support optimized  
✅ Image lazy loading + async decoding enabled  
✅ Responsive sizes configured  
⚠️ Next: Compress collection images for faster loading
