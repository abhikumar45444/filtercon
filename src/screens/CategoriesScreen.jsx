import { useState } from 'react'
import { Search, Star, Plus, ChevronRight } from 'lucide-react'
import { PRODUCTS } from '../data'

export default function CategoriesScreen({ onSelectProduct, onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('popular')

  const filterCategories = [
    { id: 'all', name: 'All Systems' },
    { id: 'whole-house', name: 'Whole House Filters' },
    { id: 'salt-free', name: 'Salt-Free Softeners' },
    { id: 'under-sink', name: 'Alkaline RO Drinking' },
    { id: 'shower-filters', name: 'Shower Filters' },
  ]

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      activeCategory === 'all' || product.category === activeCategory
    const matchesSearch =
      !searchQuery ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price
    if (sortBy === 'price-high') return b.price - a.price
    if (sortBy === 'rating') return b.rating - a.rating
    return (b.reviewsCount || 0) - (a.reviewsCount || 0) // default 'popular'
  })

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 font-sans select-none">
      {/* 1. Header: Bold title "Filtration Systems" & subtitle on left; "Sort: Popular v" on right */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] leading-tight">
            Filtration Systems
          </h2>
          <p className="text-[11px] text-[#64748B]">
            Filtercon Certified Catalogue
          </p>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200/60 text-[#0F172A] px-2.5 py-1 rounded-xl text-xs font-medium">
          <span className="text-[#64748B] text-[11px]">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent font-bold text-[#0088CC] text-xs outline-none cursor-pointer"
          >
            <option value="popular">Popular</option>
            <option value="rating">Top Rated</option>
            <option value="price-low">Price: Low-High</option>
            <option value="price-high">Price: High-Low</option>
          </select>
        </div>
      </div>

      {/* 2. Search Bar: Full-width rounded search input */}
      <div className="p-4 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 text-[#0088CC] absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search whole-house, RO, shower..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-[#F0F9FF]/80 border border-sky-100 text-xs text-[#0F172A] placeholder-slate-400 shadow-xs focus:outline-none focus:border-[#0088CC] focus:ring-1 focus:ring-[#0088CC] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-xs text-[#64748B] hover:text-[#0F172A] cursor-pointer"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* 3. Horizontal Filter Pills: Scrollable chip row */}
      <div className="px-4 py-2.5 overflow-x-auto no-scrollbar scrollbar-hide flex items-center gap-2">
        {filterCategories.map((cat) => {
          const isActive = activeCategory === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer flex-shrink-0 ${
                isActive
                  ? 'bg-[#0088CC] text-white shadow-sm shadow-sky-500/30'
                  : 'bg-white border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50'
              }`}
            >
              {cat.name}
            </button>
          )
        })}
      </div>

      {/* 4. Subheader Row: "Showing 6 Systems" on left, "Southern CA Certified" on right */}
      <div className="flex items-center justify-between text-[11px] text-[#64748B] px-5 mb-3 font-medium">
        <span>Showing {filteredProducts.length} Systems</span>
        <span>Southern CA Certified</span>
      </div>

      {/* 5. 2-Column Product Card Grid */}
      <div className="px-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-100 p-6">
            <p className="text-slate-400 text-xs font-medium">
              No filtration systems matching "{searchQuery}"
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onSelectProduct(product)}
                className="bg-white rounded-2xl border border-slate-100 p-2.5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group cursor-pointer"
              >
                <div>
                  {/* Product photo container */}
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Top-left star rating pill: ★ 4.99 */}
                    <span className="absolute top-1.5 left-1.5 bg-white/95 backdrop-blur-md px-1.5 py-0.5 rounded-md text-[9px] font-bold text-[#0F172A] flex items-center gap-0.5 shadow-xs border border-slate-100/60">
                      <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" />
                      <span>{product.rating}</span>
                    </span>

                    {/* Bottom-right circular solid blue "+" quick-add-to-cart button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onAddToCart(product, 1)
                      }}
                      className="absolute bottom-1.5 right-1.5 w-7 h-7 rounded-full bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white flex items-center justify-center shadow-md cursor-pointer transition-transform"
                      title="Quick Add to Cart"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bold product title and 1-line subtitle */}
                  <h4 className="text-[12px] font-bold text-[#0F172A] line-clamp-1 group-hover:text-[#0088CC] transition-colors leading-tight">
                    {product.name}
                  </h4>
                  <p className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5 leading-tight">
                    {product.tagline}
                  </p>
                </div>

                {/* Card footer: Light-blue category tag pill on left & blue "Details >" link on right */}
                <div className="flex items-center justify-between mt-2.5 pt-1.5 border-t border-slate-50">
                  <span className="text-[9px] font-bold text-[#0088CC] bg-sky-50 border border-sky-100 px-2 py-0.5 rounded-full uppercase tracking-tight truncate max-w-[85px]">
                    {product.badge || 'Certified'}
                  </span>
                  <span className="text-[10px] font-bold text-[#0088CC] flex items-center gap-0.5 group-hover:underline whitespace-nowrap ml-1">
                    Details
                    <ChevronRight className="w-3 h-3 text-[#0088CC]" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
