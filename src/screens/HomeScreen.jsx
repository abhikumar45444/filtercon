import { useState, useEffect, useRef } from 'react'
import {
  MapPin, Search, ShoppingCart, Phone, ChevronRight, Star,
  CheckCircle2, Heart, Sparkles, Clock, Award, ShieldCheck, Leaf,
  ArrowRight, Droplets, ClipboardList
} from 'lucide-react'
import { PRODUCTS, DOCTORS, INSTALLATIONS } from '../data'
import { getAssetUrl } from '../utils/assets'

export default function HomeScreen({
  onOpenShop,
  onOpenDiagnostic,
  onOpenConsultation,
  onOpenProfile,
  onSelectProduct,
  selectedLocation = 'San Diego (Downtown)',
  onOpenLocation,
  onOpenCart,
  cartCount = 0
}) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const touchStartX = useRef(0)

  const slides = [
    {
      id: 1,
      image: getAssetUrl('/hero-water.jpg'),
      title: 'Filtercon Pure Home',
      tagline: '5-Stage whole home water conditioning',
      badge: '100% Salt-Free Purity',
      cta: 'Explore →',
      productId: 'fc-wh-5stage',
    },
    {
      id: 2,
      image: getAssetUrl('/hero-shower.jpg'),
      title: 'Spa Stream Purity',
      tagline: 'De-chlorinated spa showers for skin & hair',
      badge: 'Zero Chlorine Vapor',
      cta: 'View Shower →',
      productId: 'fc-shower-luxe-gold',
    },
    {
      id: 3,
      image: getAssetUrl('/hero-install.jpg'),
      title: 'Whole House Towers',
      tagline: 'Dual stainless steel non-chemical filtration',
      badge: 'Lifetime Tank Quality',
      cta: 'View System →',
      productId: 'fc-hybrid-combo',
    },
  ]

  // Auto-rotate every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length, currentSlide])

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const handleTouchEnd = (e) => {
    const touchEndX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const diffX = touchStartX.current - touchEndX
    if (diffX > 40) {
      // Swiped left -> next slide
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    } else if (diffX < -40) {
      // Swiped right -> prev slide
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    }
  }

  const handleCta = (slide) => {
    const targetProduct = PRODUCTS.find((p) => p.id === slide.productId)
    if (targetProduct) {
      onSelectProduct(targetProduct)
    } else {
      onOpenShop()
    }
  }

  const activeSlide = slides[currentSlide]

  return (
    <div className="bg-[#F8FAFC]">
      {/* Auto-Rotating Hero Banner */}
      <div
        className="relative w-full h-[336px] rounded-b-[40px] overflow-hidden shadow-md flex-shrink-0 select-none bg-slate-900"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Background Images with smooth fade */}
        {slides.map((slide, i) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.title}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-700 ease-in-out ${currentSlide === i ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
          />
        ))}

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/85 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="absolute top-3.5 md:top-12 left-0 right-0 px-4 flex items-center justify-between z-20">
          {/* Top-left location header button */}
          <div
            onClick={onOpenLocation}
            className="flex items-center gap-2 cursor-pointer flex-1 min-w-0 mr-2 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 text-white flex-shrink-0 group-hover:bg-white/30 transition-colors">
              <MapPin className="w-5 h-5 text-sky-300" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 leading-none mb-1">
                <span className="text-[10px] font-black text-white bg-[#0284C7] px-2 py-0.5 rounded-full shadow-xs uppercase tracking-tight flex-shrink-0">
                  10-15 MINS
                </span>
                <span className="text-xs text-white/90 font-bold truncate">California</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-black text-white drop-shadow-sm leading-none">
                <span className="truncate">{selectedLocation}</span>
                <span className="text-[10px] text-sky-300 flex-shrink-0">▾</span>
              </div>
            </div>
          </div>

          {/* Top Right Quick Actions */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={onOpenShop}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors cursor-pointer border border-white/10"
              aria-label="Search Catalog"
            >
              <Search className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenCart}
              className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/30 transition-colors relative cursor-pointer border border-white/10"
              aria-label="Cart"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-[#0284C7] absolute top-2 right-2 ring-1.5 ring-black" />
              )}
            </button>
            <button
              onClick={onOpenProfile}
              className="w-9 h-9 rounded-full bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 transition-all flex items-center justify-center text-white font-black text-xs shadow-md border border-white/30 cursor-pointer"
              aria-label="Customer Profile"
              title="Customer Profile"
            >
              FC
            </button>
          </div>
        </div>

        {/* Bottom Slide Content */}
        <div className="absolute bottom-6 left-5 right-5 z-20">
          <div className="transition-all duration-300">
            <h1 className="text-2xl font-black text-white tracking-tight leading-tight mb-1 drop-shadow-md">
              {activeSlide.title}
            </h1>
            <p className="text-xs text-white/90 font-normal mb-3 drop-shadow-sm">
              {activeSlide.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white drop-shadow-sm">
              {activeSlide.badge}
            </span>
            <button
              onClick={() => handleCta(activeSlide)}
              className="px-4 py-2.5 rounded-2xl bg-[#0284C7] hover:bg-[#0369A1] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-sky-950/40 cursor-pointer transition-all"
            >
              <span>{activeSlide.cta}</span>
            </button>
          </div>

          {/* Pagination Pill Indicator & Dot Clicks */}
          <div className="flex items-center gap-1.5 mt-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${currentSlide === i ? 'w-5 h-1.5 bg-[#0284C7]' : 'w-1.5 h-1.5 bg-white/40'
                  }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 6-Card Filtercon Water Solutions Product Grid */}
      <div className="px-5 mt-6 mb-3 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm">🚰</span>
            <h3 className="text-sm font-bold text-[#0F172A]">Filtercon Water Solutions</h3>
          </div>
          <p className="text-[10px] text-[#64748B]">Certified chemical & salt-free whole house systems</p>
        </div>
        <div className="flex items-center gap-1 bg-[#F0F9FF] text-[#0284C7] px-2.5 py-1 rounded-full text-[10px] font-bold border border-sky-100">
          <Clock className="w-3 h-3" />
          <span>24-48h ETA</span>
        </div>
      </div>

      <div className="px-5 grid grid-cols-3 gap-2.5 mb-6">
        {PRODUCTS.slice(0, 6).map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectProduct(item)}
            className="bg-white rounded-2xl border border-slate-100 p-2 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 mb-1.5">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute top-1 right-1 bg-black/60 backdrop-blur-xs text-white px-1 py-0.5 rounded text-[8px] font-bold flex items-center gap-0.5">
                <Star className="w-2 h-2 fill-amber-400 text-amber-400" />
                {item.rating}
              </span>
            </div>
            <div className="mb-1">
              <h4 className="text-[11px] font-bold text-[#0F172A] line-clamp-1 leading-tight group-hover:text-[#0284C7] transition-colors">
                {item.name}
              </h4>
              <p className="text-[9px] text-[#64748B] line-clamp-1">{item.tagline}</p>
            </div>
            <div className="flex items-center justify-between pt-1 border-t border-slate-50">
              <span className="text-[9px] font-bold text-[#0284C7] uppercase tracking-tight">{item.badge}</span>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProduct(item);
                }}
                className="w-6 h-6 rounded-full bg-[#0284C7] hover:bg-[#0369A1] active:scale-90 text-white flex items-center justify-center shadow-xs cursor-pointer transition-transform"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 1. San Diego Installations Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-extrabold text-[#0F172A] tracking-tight">San Diego Installations</h3>
          <span className="text-[10px] text-[#0284C7] font-bold bg-[#F0F9FF] border border-sky-100 px-2.5 py-0.5 rounded-full">
            25,000+ Homes
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {INSTALLATIONS.map((item, idx) => (
            <div
              key={idx}
              className="group rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-xs hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={item.image}
                  alt={item.neighborhood}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                  {item.badge}
                </span>
              </div>
              <div className="p-2.5 flex-1 flex flex-col justify-center">
                <h4 className="text-xs font-bold text-[#0F172A] leading-tight mb-0.5">{item.neighborhood}</h4>
                <p className="text-[10px] text-slate-500 font-medium leading-snug">{item.system}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Medical Endorsements & Trust Badges Section */}
      <div className="px-5 mb-6">
        <p className="text-[#0284C7] text-[10px] font-extrabold tracking-wider uppercase mb-1">
          OUR REPUTATION & MEDICAL ENDORSEMENTS
        </p>
        <h3 className="text-sm font-black text-[#0F172A] mb-3 leading-snug">
          Used & Recommended by Doctors and Health Professionals Worldwide
        </h3>

        {/* 3 stacked horizontal white cards */}
        <div className="space-y-3 mb-3">
          {DOCTORS.map((doc, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-slate-100 p-3 shadow-xs flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-sky-100 flex-shrink-0 shadow-xs bg-sky-50">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5 gap-1">
                  <h4 className="text-xs font-bold text-[#0F172A] leading-tight truncate">{doc.name}</h4>
                  <span className="text-[9px] text-[#0284C7] font-bold bg-[#F0F9FF] border border-sky-100 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    {doc.location}
                  </span>
                </div>
                <p className="text-[10px] text-[#0284C7] font-semibold mb-1">{doc.title}</p>
                <p className="text-[10px] text-slate-500 italic leading-snug">"{doc.quote}"</p>
              </div>
            </div>
          ))}
        </div>

        {/* 3-column row of white square trust cards with circular icons */}
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] text-[#0F172A] font-bold">
          <div className="p-2.5 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mb-1.5 shadow-xs">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <span className="leading-tight">100% Chemical-Free</span>
          </div>
          <div className="p-2.5 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0284C7] flex items-center justify-center mb-1.5 shadow-xs">
              <Award className="w-4 h-4" />
            </div>
            <span className="leading-tight">NSF Certified</span>
          </div>
          <div className="p-2.5 bg-white rounded-2xl border border-slate-100 flex flex-col items-center justify-center shadow-xs">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center mb-1.5 shadow-xs">
              <Heart className="w-4 h-4" />
            </div>
            <span className="leading-tight">Eczema Relief</span>
          </div>
        </div>
      </div>

      {/* 3. Everyday Living & Free Consultation CTA Section */}
      <div className="px-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[#0284C7] text-[10px] font-extrabold tracking-wider uppercase mb-0.5">
              EVERYDAY LIVING
            </p>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Whole House Family Benefits</h3>
          </div>
          <div className="w-8 h-8 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center text-[#0284C7] shadow-xs">
            <Award className="w-4 h-4" />
          </div>
        </div>

        {/* 4 stacked horizontal white benefit cards with blue rounded square icons */}
        <div className="space-y-2.5 mb-4">
          {[
            {
              icon: Sparkles,
              title: 'Silky Hair & Soft Skin',
              desc: 'Eliminates 99% free chlorine in shower steam that causes dry itchy skin, eczema & brittle hair.',
            },
            {
              icon: ShieldCheck,
              title: 'Protects Plumbing & Water Heaters',
              desc: 'Prevents damaging mineral scale buildup inside tankless heaters, dishwashers, and copper pipes.',
            },
            {
              icon: Droplets,
              title: 'Drinking Water at Every Tap',
              desc: 'Enjoy crisp, pure, chemical-free mountain spring water from every faucet in your house.',
            },
            {
              icon: Leaf,
              title: '100% Eco-Friendly & Garden Safe',
              desc: 'No salt discharge. Backwash water is completely safe for your lawn, trees, and California plants.',
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-100 p-3 shadow-xs flex items-start gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-[#F0F9FF] border border-sky-100 text-[#0284C7] flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0F172A] mb-0.5">{item.title}</h4>
                  <p className="text-[10px] text-slate-500 leading-snug">{item.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Consultation Card: Dark Navy Theme (#0B192C) */}
        <div className="bg-[#0B192C] rounded-[20px] p-5 shadow-xl shadow-slate-900/20 text-left border border-slate-800/80">
          <div className="flex items-center justify-between mb-2.5">
            <span className="text-[10px] font-extrabold tracking-wider text-white bg-[#0088CC] px-2.5 py-0.5 rounded-full uppercase shadow-xs">
              FREE HOME CONSULTATION
            </span>
            <span className="text-xs text-slate-400 font-medium">Zero Charge</span>
          </div>

          <h3 className="text-base font-bold text-white leading-snug mb-1.5">
            Test Your Water Hardness & Chlorine
          </h3>

          <p className="text-xs text-[#94A3B8] mb-4 leading-relaxed">
            A Filtercon technician will evaluate your plumbing and tap water hardness on-site.
          </p>

          <div className="flex items-center gap-2.5">
            <a
              href="tel:8002445999"
              className="flex-1 py-3 px-3.5 rounded-xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-950/40 transition-all cursor-pointer"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Call (800) 244-5999</span>
            </a>

            <button
              onClick={onOpenDiagnostic}
              className="py-3 px-4 rounded-xl bg-[#1E293B] hover:bg-[#334155] active:scale-95 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer border border-slate-700/80 shadow-xs"
            >
              <ClipboardList className="w-3.5 h-3.5 text-white" />
              <span>Quiz</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
