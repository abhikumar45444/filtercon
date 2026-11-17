import { useState, useEffect } from 'react'
import {
  Heart, X, Star, Sparkles, Wrench, ShieldCheck, Leaf,
  CheckCircle2, Phone, Calendar
} from 'lucide-react'

export default function ProductDetailModal({
  product,
  isOpen,
  onClose,
  onOpenConsultation,
  onAddToCart
}) {
  const [activeImage, setActiveImage] = useState(product?.image || '/whole-house.jpg')
  const [isWishlist, setIsWishlist] = useState(false)
  const [activeTab, setActiveTab] = useState('stages')

  // Lock background body/html scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalBodyOverflow = document.body.style.overflow
      const originalHtmlOverflow = document.documentElement.style.overflow
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = originalBodyOverflow
        document.documentElement.style.overflow = originalHtmlOverflow
      }
    }
  }, [isOpen])

  useEffect(() => {
    if (product) {
      setActiveImage(product.image)
    }
  }, [product])

  if (!isOpen || !product) return null

  // Ensure 3 selectable thumbnails aligned left below the photo
  const gallery = product.gallery && product.gallery.length >= 3
    ? product.gallery.slice(0, 3)
    : [
        product.image,
        product.gallery?.[1] || '/hero-water.jpg',
        product.gallery?.[2] || '/sd-install-1.jpg'
      ]

  // Default 5-stages if not fully provided
  const stagesList = product.stages && product.stages.length >= 5
    ? product.stages
    : [
        { num: 1, title: 'Quartz Filtration Bed', desc: 'Even water flow and sediment removal.' },
        { num: 2, title: 'K.D.F. 55 Media', desc: 'Bacteriostatic redox reaction targeting heavy metals and chlorine.' },
        { num: 3, title: 'High-Grade Activated Carbon', desc: 'Adsorbs VOCs, chloramines, pesticides, bad taste and odor.' },
        { num: 4, title: 'Hydromagnetic Module', desc: 'Patented magnetic flux breaks surface tension & suspends calcium ions.' },
        { num: 5, title: 'Computerized Backrinse Valve', desc: 'Automatic scheduled self-cleaning backflush.' },
      ]

  const handleScheduleClick = () => {
    onClose()
    if (onOpenConsultation) {
      onOpenConsultation()
    }
  }

  const categoryDisplay = product.category
    ? product.category.replace('-', ' ')
    : 'Whole House'

  return (
    <div
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-fade-in select-none"
      style={{ touchAction: 'none' }}
    >
      {/* 1. Lock Background Scroll: Backdrop with touch-action: none */}
      <div
        className="flex-1 w-full"
        onClick={onClose}
        style={{ touchAction: 'none' }}
      />

      {/* 3. Anchor Modal Sheet: Pinned flush to bottom (bottom-0, max-height: 92vh) with flex-column layout */}
      <div
        className="w-full bg-white rounded-t-[36px] max-h-[92vh] md:max-h-[92%] h-[92vh] md:h-[92%] flex flex-col overflow-hidden shadow-2xl relative font-sans z-10 bottom-0 transition-transform duration-300"
        style={{ touchAction: 'auto' }}
      >
        {/* Top drag handle indicator (shrink-0) */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 shrink-0" />

        {/* Fixed Top Header Bar (shrink-0) */}
        <div className="px-5 flex items-center justify-between pb-3 shrink-0 border-b border-slate-100 bg-white z-10">
          {/* Light-blue pill badge next to gray text */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-[#0284C7] bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-100">
              {product.badge || 'Flagship'}
            </span>
            <span className="text-xs text-slate-400 font-medium capitalize">
              {categoryDisplay}
            </span>
          </div>

          {/* Circular Wishlist Heart icon button and Close (X) button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsWishlist(!isWishlist)}
              className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-2xs"
              aria-label="Wishlist"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  isWishlist ? 'fill-rose-500 text-rose-500' : 'text-slate-600'
                }`}
              />
            </button>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full border border-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition-all cursor-pointer shadow-2xs"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Prevent Scroll Chaining & Anchor Middle Body: flex-1 overflow-y-auto overscroll-contain min-h-0 with no-scrollbar */}
        <div className="flex-1 overflow-y-auto overscroll-contain no-scrollbar scrollbar-hide min-h-0 px-5 py-3 space-y-4">
          {/* Main Image Container */}
          <div className="relative rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 aspect-[4/3] group shadow-inner">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Top-left dark pill rating badge: ★ 4.95 (112) */}
            <div className="absolute top-3 left-3 bg-[#0F172A]/85 backdrop-blur-md px-2.5 py-1 rounded-xl text-[11px] font-bold text-white flex items-center gap-1 shadow-xs border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{product.rating || '4.95'}</span>
              <span className="text-slate-300 font-normal">
                ({product.reviewsCount || '112'})
              </span>
            </div>

            {/* Bottom-right dark pill badge: Filtercon Certified */}
            <div className="absolute bottom-3 right-3 bg-[#0F172A]/85 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-semibold text-white flex items-center gap-1.5 shadow-sm border border-white/10">
              <Sparkles className="w-3 h-3 text-sky-400" />
              <span>Filtercon Certified</span>
            </div>
          </div>

          {/* Thumbnail Strip: 3 small square selectable thumbnail images aligned left below photo */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scrollbar-hide pb-1">
            {gallery.map((imgSrc, idx) => {
              const isSelected = activeImage === imgSrc
              return (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`w-14 h-14 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                    isSelected
                      ? 'border-[#0088CC] scale-105 shadow-sm'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img
                    src={imgSrc}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            })}
          </div>

          {/* Title & Subtitle */}
          <div>
            <h2 className="text-lg font-black text-slate-900 leading-snug mb-1">
              {product.name}
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* 3-Column Feature Strip */}
          <div className="grid grid-cols-3 gap-2 p-2.5 bg-slate-50 rounded-2xl border border-slate-100 text-center text-[11px]">
            <div className="flex flex-col items-center">
              <Wrench className="w-4 h-4 text-[#0088CC] mb-1" />
              <span className="font-bold text-slate-800 text-[10px] leading-tight">
                Free In-Home Install
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5">California Techs</span>
            </div>
            <div className="flex flex-col items-center border-x border-slate-200">
              <ShieldCheck className="w-4 h-4 text-[#0088CC] mb-1" />
              <span className="font-bold text-slate-800 text-[10px] leading-tight">
                Lifetime Tank
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5">NSF Certified</span>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="w-4 h-4 text-[#0088CC] mb-1" />
              <span className="font-bold text-slate-800 text-[10px] leading-tight">
                100% Salt-Free
              </span>
              <span className="text-[9px] text-slate-400 mt-0.5">Eco-Friendly</span>
            </div>
          </div>

          {/* Segmented Tab Control: Full-width light-gray pill bar with 3 tabs */}
          <div>
            <div className="grid grid-cols-3 bg-slate-100 p-1 rounded-2xl mb-3 text-xs font-bold">
              <button
                onClick={() => setActiveTab('stages')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'stages'
                    ? 'bg-white text-[#0088CC] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                5-Stages
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'specs'
                    ? 'bg-white text-[#0088CC] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Specs
              </button>
              <button
                onClick={() => setActiveTab('benefits')}
                className={`py-2 rounded-xl transition-all cursor-pointer ${
                  activeTab === 'benefits'
                    ? 'bg-white text-[#0088CC] shadow-xs'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Benefits
              </button>
            </div>

            {/* Tab 1: 5-Stages */}
            {activeTab === 'stages' && (
              <div className="space-y-2">
                {stagesList.map((stage) => (
                  <div
                    key={stage.num}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#0088CC] text-white flex items-center justify-center font-bold text-[10px] flex-shrink-0 mt-0.5">
                      {stage.num}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-800 text-[11px] leading-tight">
                        {stage.title}
                      </h4>
                      <p className="text-slate-500 text-[10px] mt-0.5 leading-snug">
                        {stage.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 2: Specs */}
            {activeTab === 'specs' && (
              <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-[11px]">
                {product.specs &&
                  Object.entries(product.specs).map(([key, val]) => (
                    <div
                      key={key}
                      className="flex justify-between py-1.5 border-b border-slate-200/60 last:border-b-0 text-[11px]"
                    >
                      <span className="text-slate-500 capitalize">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                      <span className="font-semibold text-slate-800 text-right ml-2">
                        {val}
                      </span>
                    </div>
                  ))}
              </div>
            )}

            {/* Tab 3: Benefits */}
            {activeTab === 'benefits' && (
              <ul className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                {product.features?.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-slate-700 text-[11px] leading-snug"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* 3. Sticky Bottom CTA Bar (shrink-0): Pinned flush to bottom so it never lifts up */}
        <div className="p-3.5 bg-white border-t border-slate-100 flex items-center gap-2 shrink-0 z-20">
          <a
            href="tel:8002445999"
            className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 cursor-pointer flex-shrink-0 transition-colors"
            aria-label="Call for Free Consultation"
          >
            <Phone className="w-4 h-4 text-[#0088CC]" />
          </a>
          <button
            onClick={handleScheduleClick}
            className="flex-1 py-3 px-4 rounded-xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-sky-900/20 cursor-pointer transition-all truncate"
          >
            <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
            <span className="truncate">Schedule Free Estimate</span>
          </button>
        </div>
      </div>
    </div>
  )
}
