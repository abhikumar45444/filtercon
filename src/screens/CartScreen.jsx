import { useState } from 'react'
import {
  Sparkles, Lock, CreditCard, Trash2, CheckCircle2,
  ArrowRight, ShoppingBag, Truck
} from 'lucide-react'

export default function CartScreen({
  cart,
  onClearAll,
  onRemove,
  onUpdateQty,
  onExplore
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const installationFee = cart.length > 0 ? 99 : 0
  const total = subtotal + installationFee

  const handleCompleteOrder = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setOrderConfirmed(true)
    }, 1000)
  }

  // Order Confirmed Success Screen
  if (orderConfirmed) {
    return (
      <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 font-sans select-none">
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center my-auto">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4 text-[#16A34A] shadow-sm animate-scale-in">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h3 className="text-2xl font-black text-[#0F172A] mb-1.5">Order Confirmed!</h3>
          <p className="text-xs text-[#64748B] max-w-xs mb-5 leading-relaxed">
            Thank you! A Filtercon certified hydration specialist will contact you to coordinate delivery & installation.
          </p>

          <div className="bg-white border border-slate-200 rounded-2xl p-4 w-full max-w-xs text-left text-xs mb-6 space-y-2 shadow-xs">
            <div className="flex justify-between">
              <span className="text-[#64748B]">Order ID:</span>
              <span className="font-mono font-bold text-[#0F172A]">#FC-849201</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Delivery Status:</span>
              <span className="text-[#16A34A] font-bold">Priority Dispatched</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#64748B]">Estimated Arrival:</span>
              <span className="text-[#0F172A] font-semibold">2-3 Business Days</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-slate-100">
              <span className="text-[#64748B]">Paid Total:</span>
              <span className="font-black text-[#0088CC]">${total}</span>
            </div>
          </div>

          <button
            onClick={() => {
              setOrderConfirmed(false)
              if (onExplore) onExplore()
            }}
            className="w-full max-w-xs py-3.5 px-6 rounded-2xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white font-bold text-xs shadow-md shadow-sky-900/20 cursor-pointer transition-all"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-6 font-sans select-none">
      {/* 1. Header: Bold title "Your Selection", subtitle, blue "Clear all" button */}
      <div className="px-5 pt-3.5 md:pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] leading-tight">
            Your Selection
          </h2>
          <p className="text-[11px] text-[#64748B]">
            Filtercon Verified Consultation Request
          </p>
        </div>
        {cart.length > 0 && (
          <button
            onClick={onClearAll}
            className="text-xs text-[#0088CC] hover:text-[#0077b3] font-bold cursor-pointer transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {cart.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center my-auto">
          <div className="w-20 h-20 rounded-3xl bg-[#F0F9FF] border border-sky-100 flex items-center justify-center mb-4 text-[#0088CC] shadow-xs">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-[#0F172A] mb-1">Your Cart is Empty</h3>
          <p className="text-xs text-[#64748B] max-w-xs mb-6 leading-relaxed">
            Discover Filtercon's patented 5-stage whole house systems and alkaline RO drinking taps.
          </p>
          <button
            onClick={onExplore}
            className="py-3 px-6 rounded-2xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white font-bold text-xs shadow-md shadow-sky-900/20 cursor-pointer transition-all"
          >
            Explore Systems
          </button>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto no-scrollbar scrollbar-hide p-5 space-y-4">
          {/* 2. Promo Banner: Light-blue tinted rounded banner */}
          <div className="p-3.5 rounded-2xl bg-[#F0F9FF] border border-sky-100 flex items-center gap-3 shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#0088CC] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-bold text-[#0F172A] text-xs block leading-tight">
                Complimentary Filter Tester Kit
              </span>
              <span className="text-[#0088CC] text-[11px] font-semibold mt-0.5 block leading-tight">
                Free electronic water purity meter included
              </span>
            </div>
          </div>

          {/* 3. Cart Items List */}
          <div className="space-y-3">
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 bg-white rounded-2xl border border-slate-100 shadow-xs flex items-center gap-3"
              >
                {/* Square product thumbnail on the left */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded-xl object-cover border border-slate-100 flex-shrink-0 bg-slate-50"
                />

                {/* Bold title, gray subtitle, bold blue price */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-[#0F172A] truncate leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-[11px] text-[#64748B] capitalize mt-0.5 leading-tight">
                    {item.category?.replace('-', ' ') || 'Under-Sink'}
                  </p>
                  <p className="text-xs font-black text-[#0088CC] mt-1.5">
                    ${item.price}
                  </p>
                </div>

                {/* Right-aligned quantity stepper pill: "- 1 +" */}
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-1 shadow-2xs">
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty - 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-90 text-xs font-bold cursor-pointer transition-all"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="text-xs font-bold text-[#0F172A] w-4 text-center">
                      {item.qty}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.qty + 1)}
                      className="w-5 h-5 rounded flex items-center justify-center text-slate-600 hover:bg-slate-200 active:scale-90 text-xs font-bold cursor-pointer transition-all"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Order Summary Card */}
          <div className="p-4 bg-white rounded-2xl border border-slate-100 space-y-2.5 text-xs shadow-xs">
            {/* Row 1: "Subtotal" on left, "$499" on right */}
            <div className="flex justify-between items-center text-[#64748B]">
              <span>Subtotal</span>
              <span className="font-semibold text-[#0F172A]">${subtotal}</span>
            </div>

            {/* Row 2: "Professional Home Installation" on left, "$99" on right */}
            <div className="flex justify-between items-center text-[#64748B]">
              <span>Professional Home Installation</span>
              <span className="font-semibold text-[#0F172A]">${installationFee}</span>
            </div>

            {/* Horizontal divider line */}
            <div className="border-t border-slate-100 my-1" />

            {/* Row 3: Bold "Total" on left, large bold "$598" on right */}
            <div className="flex justify-between items-center pt-0.5">
              <span className="font-bold text-[#0F172A] text-sm">Total</span>
              <span className="font-black text-[#0F172A] text-base">${total}</span>
            </div>
          </div>

          {/* 5. Security Note: Centered small gray text with lock icon */}
          <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#64748B] pt-1">
            <Lock className="w-3.5 h-3.5 text-[#0088CC] flex-shrink-0" />
            <span>256-bit Encrypted • 30-Day Money Back Guarantee</span>
          </div>

          {/* 6. Bottom Action Button: Full-width solid bright blue (#0088CC) rounded button */}
          <button
            onClick={handleCompleteOrder}
            disabled={isSubmitting || cart.length === 0}
            className="w-full py-3.5 px-4 rounded-2xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-[0.98] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-sky-900/20 cursor-pointer transition-all"
          >
            <CreditCard className="w-4 h-4 flex-shrink-0" />
            <span>
              {isSubmitting ? 'Securing Order...' : `Complete Order • $${total} →`}
            </span>
          </button>
        </div>
      )}
    </div>
  )
}
