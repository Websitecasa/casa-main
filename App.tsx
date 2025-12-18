
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Search, ArrowRight, LayoutGrid, Image as ImageIcon, Info, Phone, X, CheckCircle2, Download, FileText, ChevronRight, ChevronLeft, Home, Send, Mail, MapPin, Target, Flag, Coins, Users, Briefcase, Star } from 'lucide-react';
import { PRODUCTS_DATA, GALLERY_PROJECTS, CATEGORY_ICONS, CATEGORY_LABELS, HERO_SLIDES, assetPath } from './constants';
import { ProductCard } from './components/ProductCard';
import { ProjectCard } from './components/ProjectCard';
import { Orb } from './components/Orb';
import { Category } from './types';
import emailjs from '@emailjs/browser';
import { FloatingWhatsApp } from 'react-floating-whatsapp';

const EMAILJS_SERVICE_ID = 'service_oy3ew53';
const EMAILJS_TEMPLATE_ID = 'template_vq3welv';
const EMAILJS_PUBLIC_KEY = 'cTdQsSabgpwLAOJGK';

const App = () => {
  const [activeSection, setActiveSection] = useState<'home' | 'collection' | 'gallery' | 'about' | 'downloads' | 'privacy'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'all'>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef });

  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactStatus, setContactStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  // Preload first hero image to prevent jitter
  useEffect(() => {
    const firstSlide = HERO_SLIDES[0];
    if (firstSlide.type === 'image') {
      const img = new Image();
      img.src = firstSlide.media;
      img.onload = () => setIsLoaded(true);
    } else {
      setIsLoaded(true);
    }
  }, []);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Hero Slider Auto-play
  useEffect(() => {
    if (activeSection !== 'home') return;
    const interval = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [activeSection]);

  // Video autoplay on slide change
  useEffect(() => {
    const currentSlide = HERO_SLIDES[currentHeroSlide];
    if (currentSlide.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Video autoplay prevented:', e));
    }
  }, [currentHeroSlide]);

  const nextSlide = () => setCurrentHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentHeroSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setContactStatus('sending');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: contactForm.name,
          email: contactForm.email,
          phone: contactForm.phone,
          message: contactForm.message,
          time: new Date().toLocaleString(),
        },
        EMAILJS_PUBLIC_KEY
      );

      setContactStatus('sent');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        message: '',
      });
    } catch (error) {
      console.error('EmailJS error:', error);
      setContactStatus('error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };

  // Handle Category Change (Resets SubCategory)
  const handleCategoryChange = (cat: Category | 'all') => {
    setSelectedCategory(cat);
    setSelectedSubCategory('all');
  };

  // Filter Logic
  const filteredProducts = PRODUCTS_DATA.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSubCategory = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    return matchesCategory && matchesSubCategory;
  });

  // Get Sub-Categories for current selection (Dynamically derived from data)
  const currentSubCategories = selectedCategory === 'all' 
    ? [] 
    : Array.from(new Set(PRODUCTS_DATA.filter(p => p.category === selectedCategory).map(p => p.subCategory).filter(Boolean))) as string[];

  return (
    <div className="min-h-screen bg-background text-text font-sans selection:bg-primary/30 selection:text-white">
      
      {/* Background Visuals */}
      {activeSection !== 'home' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <Orb />
          <div className="absolute inset-0 bg-background/50 backdrop-blur-[100px]" />
        </div>
      )}

      {/* Navigation Header */}
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled || activeSection !== 'home' ? 'bg-background/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="rounded-lg p-1 bg-gradient-to-tr from-amber-700/10 to-transparent border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.6)]">
              <img
                src={assetPath('logo/final logo.png')}
                alt="Casa Repose"
                className="w-12 h-12 object-contain rounded-md block"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-lg leading-none">Casa Repose<span className="ml-1 align-super text-xs">®</span></span>
              <span className="text-[10px] text-textMuted uppercase tracking-[0.2em]">One Step Ahead</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-white/5 rounded-full border border-white/5 backdrop-blur-md">
            {[
              { id: 'home', label: 'Home', icon: Home },
              { id: 'collection', label: 'Collection', icon: LayoutGrid },
              { id: 'gallery', label: 'Projects', icon: ImageIcon },
              { id: 'downloads', label: 'Downloads', icon: Download },
              { id: 'about', label: 'Company', icon: Info },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeSection === item.id 
                    ? 'bg-white/10 text-white shadow-sm' 
                    : 'text-textMuted hover:text-white hover:bg-white/5'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Contact Button */}
          <button onClick={() => setActiveSection('about')} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10">
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">Contact Us</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className={`relative z-10 min-h-screen flex flex-col ${activeSection === 'home' ? '' : 'pt-32 pb-20 px-6 max-w-7xl mx-auto'}`}>
        
        {/* HOME SECTION */}
        {activeSection === 'home' && (
          <div className="flex flex-col w-full">
            {/* Hero Slider */}
            <div ref={heroRef} className="relative h-screen w-full overflow-hidden bg-black">
               {isLoaded && (
               <AnimatePresence mode="wait">
                 <motion.div
                   key={currentHeroSlide}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   transition={{ duration: 0.8, ease: "easeInOut" }}
                   className="absolute inset-0"
                 >
                   {/* Media (Image or Video) */}
                   <div className="absolute inset-0">
                     {HERO_SLIDES[currentHeroSlide].type === 'video' ? (
                       <video
                         ref={videoRef}
                         src={HERO_SLIDES[currentHeroSlide].media}
                         className="w-full h-full object-cover"
                         autoPlay
                         muted
                         loop
                         playsInline
                       />
                     ) : (
                       <motion.img 
                         src={HERO_SLIDES[currentHeroSlide].media} 
                         alt="Hero" 
                         className="w-full h-full object-cover will-change-transform"
                         initial={{ scale: 1 }}
                         animate={{ scale: 1.05 }}
                         transition={{ duration: 6, ease: "easeOut" }}
                       />
                     )}
                     {/* Overlay Gradient */}
                     <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                   </div>

                   {/* Content */}
                   <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
                     <motion.div 
                       initial={{ y: 30, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ delay: 0.3, duration: 0.8 }}
                       className="max-w-3xl space-y-6"
                     >
                        <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight">
                          {HERO_SLIDES[currentHeroSlide].title}
                        </h1>
                        <p className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl">
                          {HERO_SLIDES[currentHeroSlide].subtitle}
                        </p>
                        <div className="pt-8 flex gap-4">
                          <button 
                            onClick={() => setActiveSection('collection')}
                            className="px-8 py-4 bg-primary text-black font-semibold rounded-full hover:bg-white transition-colors flex items-center gap-2"
                          >
                            Explore Collection <ArrowRight className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => setActiveSection('gallery')}
                            className="px-8 py-4 bg-transparent border border-white text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors"
                          >
                            View Projects
                          </button>
                        </div>
                     </motion.div>
                   </div>
                 </motion.div>
               </AnimatePresence>
               )}

               {/* Slider Controls */}
               <div className="absolute bottom-10 right-10 flex gap-4 z-20">
                 <button onClick={prevSlide} className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all text-white">
                   <ChevronLeft className="w-6 h-6" />
                 </button>
                 <button onClick={nextSlide} className="p-4 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all text-white">
                   <ChevronRight className="w-6 h-6" />
                 </button>
               </div>
               
               {/* Indicators */}
               <div className="absolute bottom-10 left-6 md:left-20 flex gap-3 z-20">
                 {HERO_SLIDES.map((_, idx) => (
                   <div 
                     key={idx} 
                     className={`h-1 rounded-full transition-all duration-300 ${idx === currentHeroSlide ? 'w-12 bg-primary' : 'w-4 bg-white/30'}`} 
                   />
                 ))}
               </div>
            </div>
            
            {/* Quick About / Values Strip */}
            <div className="bg-[#111] py-20 px-6 border-y border-white/5">
              <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-12">
                 {[
                   { title: "Architectural Design", desc: "Furniture that complements modern spatial aesthetics." },
                   { title: "Ergonomic Mastery", desc: "Engineered for comfort during extended work sessions." },
                   { title: "Sustainable Materials", desc: "Eco-conscious sourcing for a better tomorrow." }
                 ].map((feature, i) => (
                   <div key={i} className="space-y-4">
                      <div className="w-12 h-1 bg-primary mb-6" />
                      <h3 className="text-2xl font-medium text-white">{feature.title}</h3>
                      <p className="text-textMuted leading-relaxed">{feature.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>
        )}

        {/* COLLECTION SECTION */}
        {activeSection === 'collection' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="flex flex-col gap-12"
          >
            {/* Header */}
            <div className="flex flex-col items-center text-center space-y-8 py-10">
              <h1
                className="text-4xl md:text-6xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60 pb-2"
                style={{
                  textShadow: '0 8px 40px rgba(0,0,0,0.7), 0 2px 12px rgba(245,158,11,0.08)'
                }}
              >
                The Collection
              </h1>
              
              {/* Main Category Filter Pills */}
              <div className="flex flex-wrap justify-center gap-2 max-w-5xl">
                <button
                  onClick={() => handleCategoryChange('all')}
                  className={`px-4 py-2 rounded-full border text-sm transition-all ${
                    selectedCategory === 'all' 
                      ? 'bg-white text-black border-white' 
                      : 'bg-transparent text-textMuted border-white/10 hover:border-white/30 hover:text-white'
                  }`}
                >
                  All Items
                </button>
                {(Object.keys(CATEGORY_LABELS) as Category[]).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm transition-all ${
                      selectedCategory === cat 
                        ? 'bg-white/10 text-white border-white/20' 
                        : 'bg-transparent text-textMuted border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    <span className={selectedCategory === cat ? 'text-primary' : 'text-textMuted'}>
                      {CATEGORY_ICONS[cat]}
                    </span>
                    {CATEGORY_LABELS[cat]}
                  </button>
                ))}
              </div>

              {/* Sub-Category Filter Pills (Dynamically shown) */}
              {selectedCategory !== 'all' && currentSubCategories.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }} 
                  animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-wrap justify-center gap-2 mt-4 max-w-4xl"
                >
                  <button
                    onClick={() => setSelectedSubCategory('all')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                      selectedSubCategory === 'all'
                        ? 'bg-primary text-black'
                        : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    All {CATEGORY_LABELS[selectedCategory]}
                  </button>
                  {currentSubCategories.map(sub => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSubCategory(sub)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        selectedSubCategory === sub
                          ? 'bg-primary text-black'
                          : 'bg-white/5 text-textMuted hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-20 text-textMuted">
                <p>No products found in this category.</p>
                <button onClick={() => handleCategoryChange('all')} className="mt-4 text-primary hover:underline">
                  View all items
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Gallery Section */}
        {activeSection === 'gallery' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
             <div className="text-center space-y-4 py-10">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight">Our Projects</h2>
              <p className="text-textMuted max-w-2xl mx-auto">
                Discover how we've transformed spaces across corporate, hospitality, and dining sectors.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GALLERY_PROJECTS.map((project, idx) => (
                <ProjectCard key={idx} project={project} />
              ))}
            </div>
          </motion.div>
        )}

        {/* Downloads Section */}
        {activeSection === 'downloads' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12 py-10"
          >
            <div className="text-center space-y-6">
              <h2 className="text-4xl md:text-6xl font-medium tracking-tight font-serif italic text-white">Official Documents</h2>
              <p className="text-textMuted max-w-lg mx-auto text-lg">
                Download our latest brochures, company profile, and specifications.
              </p>
            </div>

            <div className="max-w-md mx-auto">
               <div className="group relative bg-[#1A1A1A] rounded-2xl overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-300 shadow-2xl shadow-black/50">
                  {/* Decorative Gradient Line */}
                  <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-50" />
                  
                  {/* Preview Image */}
                  <div className="aspect-[4/3] w-full overflow-hidden relative">
                     <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent z-10 opacity-80" />
                     <img 
                       src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                       alt="Company Profile Cover" 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-60"
                     />
                     
                     <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center">
                        <div className="w-16 h-16 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                          <FileText className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-3xl font-medium text-white mb-2">Company Profile</h3>
                        <p className="text-primary font-medium tracking-widest uppercase text-sm">2025 Edition</p>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 bg-[#1A1A1A] relative z-20">
                     <div className="flex justify-between items-center mb-6 text-sm text-textMuted">
                        <span>PDF Format</span>
                        <span>12.4 MB</span>
                     </div>
                    <a href={assetPath('profile casa repose.pdf')} download className="w-full inline-flex items-center justify-center gap-2 py-4 bg-white text-black font-semibold rounded-xl hover:bg-primary hover:text-black transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                      <Download className="w-4 h-4" />
                      Download Profile
                    </a>
                  </div>
               </div>

               <div className="mt-8 text-center">
                 <p className="text-sm text-textMuted">
                   Need a custom quote? <button onClick={() => setActiveSection('about')} className="text-primary hover:underline">Contact Sales</button>
                 </p>
               </div>
            </div>
          </motion.div>
        )}

        {/* Privacy Policy Section */}
        {activeSection === 'privacy' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full space-y-8 py-16"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-medium">Privacy Policy</h2>
              <p className="text-textMuted max-w-2xl mx-auto">
                We respect your privacy. This page explains how Casa Repose collects, uses, and protects your personal
                information when you use our website or contact us. By using the site you consent to the practices described below.
              </p>
            </div>

            <div className="space-y-6 text-textMuted">
              <div>
                <h3 className="text-xl text-white font-semibold">Information We Collect</h3>
                <p>We collect the information you provide via the contact form (name, email, phone, message). We also use cookies and analytics to improve the website experience.</p>
              </div>

              <div>
                <h3 className="text-xl text-white font-semibold">How We Use Information</h3>
                <p>Submitted contact form data is used to respond to enquiries and provide requested services. We do not sell personal data.</p>
              </div>

              <div>
                <h3 className="text-xl text-white font-semibold">Data Security</h3>
                <p>We take reasonable measures to protect your data. If you have concerns, contact us at <span className="text-white">sales@casarepose.com</span>.</p>
              </div>

              <div>
                <h3 className="text-xl text-white font-semibold">Third-party Services</h3>
                <p>We may use third-party services (analytics, form providers) which have their own privacy policies. Please review those providers' terms.</p>
              </div>

              <div>
                <h3 className="text-xl text-white font-semibold">Your Rights</h3>
                <p>You may request access to or deletion of your personal data by contacting us at <span className="text-white">info@casarepose.com</span>.</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* About & Contact Section */}
        {activeSection === 'about' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto w-full space-y-20 py-10"
          >
            {/* Intro */}
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-medium">Crafting comfort for every space.</h2>
                <div className="h-1 w-20 bg-primary rounded-full" />
                <div className="space-y-4 text-textMuted">
                  <p className="leading-relaxed text-lg">
                    Placing product quality above everything else, Casa Repose only chooses the finest of materials and ensures that its workforce are carefully assessed to consistently deliver results that exceeds expectations. Our manufacturing facilities houses skilled craftsmen who produce some of the most elegant yet timeless sofa sets using various top quality materials. Casa Repose sofas are customised in-house and are in tune with the current demands of our diverse clientele.
                  </p>

                  <p className="leading-relaxed text-lg">
                    A range of shapes and colours are offered to suit various needs of our different clients. Each upholstered sofa set undergoes a sequence of stringent quality tests before it is certified as having achieved the quality and standards acceptable to Casa Repose, ensuring only the best for all customers. Our products are well known for their quality, comfort, contemporary designs and durability.
                  </p>

                  <p className="leading-relaxed text-lg">
                    At Casa Repose, we only use top quality high resilience cold-cure moulded foam, Neem wood frames, and a 1mm thread sofa-making process, all in the name of producing a premium-quality finish to our products. To top it all off, Casa Repose also offers a three-year warranty for its stitch-work, wood frames, and inner spring systems.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 pt-4">
                   {[
                     { num: '2000+', label: 'Projects Completed' },
                     { num: '10+', label: 'Years Excellence' },
                     { num: '500+', label: 'Happy Clients' },
                     { num: '100%', label: 'Quality Guarantee' }
                   ].map((stat, i) => (
                     <div key={i}>
                       <div className="text-3xl font-bold text-white">{stat.num}</div>
                       <div className="text-xs text-textMuted uppercase tracking-wider mt-1">{stat.label}</div>
                     </div>
                   ))}
                </div>
              </div>
                <div className="relative aspect-square rounded-2xl overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-amber-900/40 to-black/40 z-10 rounded-2xl" />
                   <motion.div
                     initial={{ y: 20, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.6, delay: 0.15 }}
                     whileHover={{ scale: 1.03 }}
                     className="absolute inset-4 z-20 rounded-xl p-2 bg-white/5 border border-white/10 shadow-2xl flex items-center justify-center"
                   >
                     <img src={assetPath('logo/final logo.png')} alt="About" className="w-full h-full object-contain rounded-md" />
                   </motion.div>
                </div>
            </div>

            {/* Values Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Quality First', desc: 'Diligent processes and continuous improvement.' },
                { title: 'Value for Money', desc: 'Functional furniture at accessible prices.' },
                { title: 'Customer Focus', desc: 'Attention to bespoke specifications.' }
              ].map((val, i) => (
                <div key={i} className="p-8 rounded-2xl bg-surface border border-white/5 hover:border-primary/30 transition-colors">
                  <CheckCircle2 className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-medium text-white mb-2">{val.title}</h3>
                  <p className="text-textMuted">{val.desc}</p>
                </div>
              ))}
            </div>

            {/* Vision / Mission / Focus Section */}
            <div className="pt-8">
              <h3 className="text-2xl font-semibold text-white mb-3">Vision</h3>
              <p className="text-textMuted mb-4">Our vision is to be a leading furniture manufacturer in India offering innovative and superior quality products.</p>

              <h3 className="text-2xl font-semibold text-white mb-3">Mission</h3>
              <p className="text-textMuted mb-4">Our mission is to create value for our customers through reliability and flexibility. We want our customers to experience warmth and comfort through respect and trust.</p>

              <h3 className="text-2xl font-semibold text-white mb-3">Focus</h3>
              <ul className="list-disc ml-6 text-textMuted space-y-2">
                <li><strong>Quality:</strong> We emphasise product quality which requires diligence and attention to detail.</li>
                <li><strong>Value For Money:</strong> We offer a wide range of well-designed, functional furniture products at prices many people can enjoy.</li>
                <li><strong>Satisfy Customers' Needs:</strong> We pay attention to our customers in meeting their preferences and specifications.</li>
                <li><strong>Professionalism:</strong> We are committed to being a truly professionally managed, process-driven organisation.</li>
              </ul>
            </div>

            {/* Contact Section */}
            <div className="rounded-3xl bg-surfaceHighlight border border-white/5 overflow-hidden">
               <div className="grid md:grid-cols-2">
                 
                 {/* Contact Info */}
                 <div className="p-8 md:p-12 space-y-8 bg-white/5">
                    <div>
                      <h3 className="text-2xl font-medium text-white mb-2">Get in touch</h3>
                      <p className="text-textMuted">Fill out the form and our team will get back to you within 24 hours.</p>
                    </div>
                    
                    <div className="space-y-6">
                       <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-surface border border-white/10">
                             <MapPin className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                             <h4 className="text-white font-medium">Manufacturing Unit</h4>
                             <p className="text-textMuted text-sm mt-1">#8, 5th Cross, Muninagappa Layout,<br/>Kaval Bayasandara, RT Nagar,<br/>Bangalore 560032</p>
                          </div>
                       </div>
                       
                       <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-surface border border-white/10">
                             <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                             <h4 className="text-white font-medium">Phone</h4>
                             <p className="text-textMuted text-sm mt-1"></p>
                             <div className="flex flex-col gap-1">
                               <span>+91 9886877178</span>
                               <span>+91 9632406013</span>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-surface border border-white/10">
                             <Mail className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                             <h4 className="text-white font-medium">Email</h4>
                             <p className="text-textMuted text-sm mt-1">info.casarepose@gmail.com</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Contact Form */}
                 <div className="p-8 md:p-12">
                   <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-textMuted mb-1.5">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-textMuted mb-1.5">Email</label>
                          <input 
                            type="email" 
                            name="email"
                            value={contactForm.email}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="john@example.com"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-textMuted mb-1.5">Phone</label>
                          <input 
                            type="tel" 
                            name="phone"
                            value={contactForm.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors"
                            placeholder="+91..."
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-textMuted mb-1.5">Message / Enquiry</label>
                        <textarea 
                          name="message"
                          value={contactForm.message}
                          onChange={handleInputChange}
                          required
                          rows={4}
                          className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition-colors resize-none"
                          placeholder="I'm interested in the Executive Chair collection..."
                        />
                      </div>

                      <button 
                        type="submit"
                        disabled={contactStatus === 'sending' || contactStatus === 'sent'}
                        className="w-full py-4 bg-primary text-black font-semibold rounded-xl hover:bg-amber-400 transition-colors flex items-center justify-center gap-2 group disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {contactStatus === 'sending' ? 'Sending...' : contactStatus === 'sent' ? 'Sent' : 'Send Enquiry'}
                        <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                      {contactStatus === 'sent' && (
                        <p className="text-sm text-primary mt-3">Thank you — your enquiry was submitted.</p>
                      )}
                      {contactStatus === 'error' && (
                        <p className="text-sm text-red-400 mt-3">Could not send enquiry. Please try again or contact praveenjb24@gmail.com directly.</p>
                      )}
                   </form>
                 </div>

               </div>
            </div>

          </motion.div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#080808] border-t border-white/5 pt-20 pb-10 relative z-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 lg:gap-20 mb-16">
          
          {/* Column 1: About */}
          <div className="space-y-6">
              <div className="flex items-center gap-3">
              <div className="rounded-lg p-1 bg-gradient-to-tr from-amber-700/10 to-transparent border border-white/10 shadow-[0_8px_24px_rgba(0,0,0,0.6)]">
                <img
                  src={assetPath('logo/final logo.png')}
                  alt="Casa Repose"
                  className="w-10 h-10 object-contain opacity-90 rounded-sm block"
                />
              </div>
              <span className="text-xl font-serif text-white tracking-tight">Casa Repose<span className="ml-1 align-super text-xs">®</span></span>
            </div>
            <p className="text-textMuted leading-relaxed text-sm">
              Casa Repose is a leading manufacturer of bespoke furniture, crafting high-end pieces for discerning architects and corporate clients worldwide. Excellence in design, sustainability, and unparalleled craftsmanship are our hallmarks.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:pl-10">
            <h3 className="text-primary font-serif text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm text-textMuted">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Collection', id: 'collection' },
                { label: 'Projects', id: 'gallery' },
                { label: 'Downloads', id: 'downloads' },
                { label: 'Contact', id: 'about' },
              ].map((link) => (
                <li key={link.id}>
                  <button 
                    onClick={() => { setActiveSection(link.id as any); window.scrollTo(0,0); }}
                    className="hover:text-white transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-primary font-serif text-lg mb-6">Contact Us</h3>
            <div className="space-y-6 text-sm text-textMuted">
              <div className="space-y-1">
                <p className="font-medium text-white">Casa Repose<span className="ml-1 align-super text-xs">®</span></p>
                <p>#8, 5th Cross, Muninagappa Layout,</p>
                <p>Kaval Bayasandara, RT Nagar,</p>
                <p>Bangalore – 560032</p>
              </div>
              
              <div className="space-y-2">
                <div>
                  <p className="mb-1">Phone:</p>
                  <div className="flex flex-col gap-1 pl-4">
                    <span className="text-white">+91 9886877178</span>
                    <span className="text-white">+91 9632406013</span>
                  </div>
                </div>
                <div>
                  <p className="mb-1">Email:</p>
                  <div className="flex flex-col gap-1 pl-4">
                    <span className="text-white">info@casarepose.com</span>
                    <span className="text-white">sales@casarepose.com</span>
                  </div>
                </div>
              </div>

              {/* Social Icons */}
              <div className="flex gap-4 pt-2">
                 <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                   <span className="sr-only">Instagram</span>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                 </button>
                 <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                   <span className="sr-only">Facebook</span>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                 </button>
                 <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 hover:text-white transition-colors">
                   <span className="sr-only">LinkedIn</span>
                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                 </button>
              </div>
            </div>
          </div>

        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-textMuted/60">
          <p>© 2025 Casa Repose<span className="ml-1 align-super text-xs">®</span> Furniture Pvt Ltd. All rights reserved.</p>     <p>Iso 9001-2015 Certified</p>
          <div className="flex gap-6">
            <button onClick={() => { setActiveSection('privacy'); window.scrollTo(0,0); }} className="hover:text-textMuted transition-colors">Privacy Policy</button>
            <button className="hover:text-textMuted transition-colors">Terms of Service</button>
          </div>
        </div>
      </footer>
      <FloatingWhatsApp
        phoneNumber="919886877178"
        accountName="Casa Repose"
        avatar={assetPath('logo/final logo.png')}
        statusMessage="online"
        chatMessage="Hello! Welcome to Casa Repose. How can we help you with your furniture requirements?"
        placeholder="Type a message..."
        darkMode={true}
        allowEsc
        allowClickAway
        notification
        notificationSound
        buttonStyle={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
      />
    </div>
  );
};

export default App;
