import { useState } from 'react'
import {
  ChevronLeft, MapPin, Navigation, Search,
  Check, Shield, ChevronRight
} from 'lucide-react'
import { DELIVERY_ZONES } from '../data'

export default function LocalityModal({ isOpen, onClose, selectedLocality, onSelectLocality }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [isDetecting, setIsDetecting] = useState(false)

  if (!isOpen) return null

  const filteredZones = DELIVERY_ZONES.filter(zone =>
    zone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.county.toLowerCase().includes(searchQuery.toLowerCase()) ||
    zone.pincode.includes(searchQuery)
  )

  const handleAutoDetect = () => {
    setIsDetecting(true)
    setTimeout(() => {
      setIsDetecting(false)
      onSelectLocality('San Diego (Downtown & Gaslamp)')
      onClose()
    }, 700)
  }

  const handleSelectZone = (zoneName) => {
    onSelectLocality(zoneName)
    onClose()
  }

  return (
    <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end overflow-hidden animate-fade-in">
      {/* Backdrop click to close */}
      <div className="flex-1" onClick={onClose} />

      {/* Slide-up sheet */}
      <div className="bg-white rounded-t-[36px] max-h-[92%] h-[92%] flex flex-col overflow-hidden shadow-2xl border-t border-slate-100 z-10 transition-transform duration-300">
        {/* Top drag handle indicator */}
        <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto my-3 flex-shrink-0" />

        {/* Top header */}
        <div className="px-5 pb-3 flex items-center justify-between border-b border-slate-100 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 hover:bg-slate-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h3 className="text-base font-bold text-[#0F172A] leading-tight">Choose Delivery Locality</h3>
              <p className="text-[11px] text-[#64748B]">Showing service areas in Southern California (18 technicians ready)</p>
            </div>
          </div>
          <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-[#0284C7] flex-shrink-0">
            <MapPin className="w-4 h-4" />
          </div>
        </div>

        {/* Scrollable body content */}
        <div className="flex-1 overflow-y-auto no-scrollbar scrollbar-hide px-5 py-4 space-y-4">
          {/* Full-width bright blue (#0088CC) Auto Detect Button */}
          <button
            onClick={handleAutoDetect}
            disabled={isDetecting}
            className="w-full p-3.5 rounded-2xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-[0.98] transition-all flex items-center justify-between text-white shadow-md shadow-sky-900/20 cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white flex-shrink-0 backdrop-blur-xs">
                <Navigation className={`w-5 h-5 ${isDetecting ? 'animate-spin' : ''}`} />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight flex items-center gap-1.5 text-white">
                  {isDetecting ? 'Detecting GPS Precision Pinpoint...' : 'Auto Detect My Current Location'}
                </h4>
                <p className="text-[10px] text-white/80 mt-0.5">
                  GPS precision pinpoint to nearest California service hub
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-white/70 flex-shrink-0" />
          </button>

          {/* Search input bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#0284C7] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search locality, zip code, or county..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-[#F8FAFC] border border-slate-200 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#0284C7] transition-colors"
            />
          </div>

          {/* Subheading & Service zones list */}
          <div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider block px-1 mb-2">
              AVAILABLE SERVICE ZONES
            </span>

            <div className="space-y-2.5">
              {filteredZones.length === 0 ? (
                <div className="text-center py-8 bg-[#F8FAFC] rounded-2xl border border-slate-100">
                  <p className="text-xs text-slate-400 font-medium">No service areas matching "{searchQuery}"</p>
                </div>
              ) : (
                filteredZones.map((zone) => {
                  const isSelected = selectedLocality === zone.name || (selectedLocality.includes('San Diego') && zone.id === 'sd-central')
                  return (
                    <div
                      key={zone.id}
                      onClick={() => handleSelectZone(zone.name)}
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-sky-50/70 border-[#0284C7] shadow-xs'
                          : 'bg-white border-slate-200 hover:border-sky-300'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                            isSelected ? 'bg-[#0284C7] text-white shadow-xs' : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <h4 className="text-xs font-bold text-[#0F172A] truncate">{zone.name}</h4>
                            <span className="text-[9px] font-bold text-[#16A34A] bg-green-50 border border-green-200/60 px-1.5 py-0.5 rounded-full flex-shrink-0">
                              {zone.eta}
                            </span>
                          </div>
                          <p className="text-[10px] text-[#64748B] truncate">
                            Zip: {zone.pincode} • {zone.county}
                          </p>
                        </div>
                      </div>

                      {isSelected ? (
                        <div className="w-6 h-6 rounded-full bg-[#0284C7] text-white flex items-center justify-center shadow-xs flex-shrink-0">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <ChevronRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <div className="h-12 border-t border-slate-100 bg-[#F8FAFC] flex items-center justify-between text-[11px] text-[#64748B] px-5 flex-shrink-0">
          <span className="flex items-center gap-1.5 truncate mr-2">
            <Shield className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
            <span className="truncate">100% Filtercon Factory Installation Guarantee</span>
          </span>
          <span className="font-bold text-[#16A34A] whitespace-nowrap flex-shrink-0">
            18 Techs Active
          </span>
        </div>
      </div>
    </div>
  )
}
