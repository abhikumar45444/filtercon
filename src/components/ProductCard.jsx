import { Star, CheckCircle2 } from 'lucide-react'
import { PRODUCTS } from '../data'

export default function ProductCard({ product, onSelect, onAddToCart }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div
      className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 active:scale-[0.98] transition-transform cursor-pointer"
      onClick={() => onSelect(product)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="bg-[#0284C7] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
          {product.isBestSeller && (
            <span className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">
              Best Seller
            </span>
          )}
        </div>

        {/* Discount badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-[#16A34A] text-white text-[10px] font-black px-2 py-0.5 rounded-full">
            -{discount}%
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <p className="text-[10px] text-[#0284C7] font-bold uppercase tracking-wider mb-0.5">{product.tagline}</p>
        <h3 className="font-black text-[#0F172A] text-base leading-tight mb-2">{product.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-amber-400 text-amber-400' : 'text-slate-200'}`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-[#0F172A]">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviewsCount})</span>
        </div>

        {/* Top feature */}
        <div className="flex items-start gap-1.5 mb-3">
          <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] mt-0.5 flex-shrink-0" />
          <span className="text-xs text-slate-500 leading-snug">{product.features[0]}</span>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-black text-[#0F172A]">${product.price.toLocaleString()}</span>
            <span className="text-sm text-slate-400 line-through ml-2">${product.originalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product) }}
            className="bg-[#0284C7] text-white text-sm font-bold px-4 py-2 rounded-xl active:bg-[#0369A1] transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
