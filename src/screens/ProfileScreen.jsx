import { useState } from 'react'
import {
  Bell, CheckCircle2, ChevronRight, MapPin, Wrench,
  Shield, Globe, Phone, Star, Droplets, Check
} from 'lucide-react'

export default function ProfileScreen({ onOpenConsultation }) {
  const [language, setLanguage] = useState('en')
  const [testKitRequested, setTestKitRequested] = useState(false)
  const [notificationBellCount, setNotificationBellCount] = useState(1)

  const handleFreeTestKit = () => {
    setTestKitRequested(true)
    setTimeout(() => setTestKitRequested(false), 3500)
  }

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-24 font-sans select-none overflow-y-auto no-scrollbar scrollbar-hide">
      {/* 1. Header: Bold title "Filtercon Customer Profile", bell and solid blue "FC" avatar */}
      <div className="px-5 pt-12 pb-3.5 flex items-center justify-between bg-white border-b border-slate-100">
        <h2 className="text-base font-extrabold text-[#0F172A] tracking-tight">
          Filtercon Customer Profile
        </h2>

        <div className="flex items-center gap-2.5">
          {/* Circular notification bell */}
          <button
            onClick={() => setNotificationBellCount(0)}
            className="w-9 h-9 rounded-full bg-slate-50 border border-slate-200/80 shadow-xs flex items-center justify-center text-slate-700 relative hover:bg-slate-100 active:scale-95 transition-all cursor-pointer"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-slate-600" />
            {notificationBellCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-[#0088CC] absolute top-2 right-2 ring-2 ring-white" />
            )}
          </button>

          {/* Solid blue "FC" avatar */}
          <div className="w-9 h-9 rounded-full bg-[#0088CC] text-white flex items-center justify-center font-black text-xs shadow-xs">
            FC
          </div>
        </div>
      </div>

      <div className="px-5 space-y-4 mt-4">
        {/* Toast alert if test kit requested */}
        {testKitRequested && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-2xl flex items-center gap-2.5 shadow-xs animate-scale-in">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
            <p className="text-xs text-[#0F172A] font-semibold">
              Free Water Test Kit requested! Our local team will contact you.
            </p>
          </div>
        )}

        {/* 2. Customer Summary Card */}
        <div className="bg-white rounded-[28px] p-4 border border-slate-100 shadow-xs">
          {/* Top row */}
          <div className="flex items-start justify-between mb-3.5">
            <div className="flex items-center gap-3">
              {/* Large dark navy circular "FC" badge */}
              <div className="relative">
                <div className="w-13 h-13 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-black text-lg shadow-sm border-2 border-slate-100">
                  FC
                </div>
                <div className="w-4.5 h-4.5 rounded-full bg-[#0088CC] text-white flex items-center justify-center absolute -bottom-0.5 -right-0.5 shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-[#0F172A] leading-tight">
                  San Diego Homeowner
                </h3>
                <p className="text-[11px] text-[#64748B] font-medium mt-0.5">
                  +1 (800) 244-5999
                </p>
                <p className="text-[10px] text-[#64748B] font-normal truncate mt-0.5">
                  homeowner@sandiego.filtercon.com
                </p>
              </div>
            </div>

            {/* Small green "VERIFIED" pill badge on the top right */}
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-[#16A34A] border border-emerald-200 text-[9px] font-black uppercase tracking-tight flex items-center gap-1 shadow-2xs">
              <CheckCircle2 className="w-3 h-3 text-[#16A34A]" />
              VERIFIED
            </span>
          </div>

          {/* Bottom 3-column stats divider: "01 SYSTEM" | "4.95 PURITY" | "5-Yr WARRANTY" */}
          <div className="grid grid-cols-3 gap-1 p-2.5 bg-slate-50/90 rounded-2xl text-center border border-slate-100">
            <div>
              <span className="text-sm font-black text-[#0F172A] block leading-none mb-1">
                01
              </span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                SYSTEM
              </span>
            </div>

            <div className="border-x border-slate-200">
              <span className="text-sm font-black text-[#0F172A] flex items-center justify-center gap-0.5 leading-none mb-1">
                4.95 <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              </span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                PURITY
              </span>
            </div>

            <div>
              <span className="text-sm font-black text-[#0F172A] block leading-none mb-1">
                5-Yr
              </span>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">
                WARRANTY
              </span>
            </div>
          </div>
        </div>

        {/* 3. System Status Banner */}
        <div className="bg-[#F0F9FF] rounded-2xl p-3.5 border border-sky-100 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-sky-100 text-[#0088CC] flex items-center justify-center flex-shrink-0 shadow-2xs">
              <Droplets className="w-5 h-5 text-[#0088CC]" />
            </div>
            <div>
              <span className="text-[9px] font-black text-[#0088CC] uppercase tracking-wider block leading-tight">
                FILTERCON HOME PURITY
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-xs font-black text-[#16A34A]">
                  88% Optimal
                </span>
                <span className="text-[10px] text-[#64748B] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] inline-block" />
                  Auto-Backrinse OK
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={handleFreeTestKit}
            className="px-3.5 py-2 rounded-xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white font-bold text-xs shadow-xs cursor-pointer transition-all flex-shrink-0"
          >
            Free Test Kit
          </button>
        </div>

        {/* 4. Settings Section ("SYSTEM & CONSULTATION SETTINGS") */}
        <div>
          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider block px-1 mb-2">
            SYSTEM & CONSULTATION SETTINGS
          </span>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-xs overflow-hidden divide-y divide-slate-100">
            {/* 1. Installation Residence */}
            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                    Installation Residence
                  </h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    San Diego, California
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* 2. Technician Service History */}
            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                    Technician Service History
                  </h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    Routine checkups & media inspection
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* 3. Lifetime Tank Certificate with green ACTIVE badge */}
            <div className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                      Lifetime Tank Certificate
                    </h4>
                    <span className="text-[8px] font-black bg-emerald-50 text-[#16A34A] border border-emerald-200 px-1.5 py-0.5 rounded shadow-2xs">
                      ACTIVE
                    </span>
                  </div>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    NSF Certified Stainless Steel
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </div>

            {/* 4. Language with interactive toggle pills */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                    Language
                  </h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    App interface dialect
                  </p>
                </div>
              </div>

              {/* Interactive English | Español toggle pills */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    language === 'en'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-md transition-all cursor-pointer ${
                    language === 'es'
                      ? 'bg-white text-[#0F172A] shadow-xs'
                      : 'text-[#64748B] hover:text-[#0F172A]'
                  }`}
                >
                  Español
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Support Section ("FILTERCON SUPPORT & TRUST") */}
        <div>
          <span className="text-[10px] font-extrabold text-[#64748B] uppercase tracking-wider block px-1 mb-2">
            FILTERCON SUPPORT & TRUST
          </span>

          <div className="bg-white rounded-[24px] border border-slate-100 shadow-xs overflow-hidden">
            <a
              href="tel:8002445999"
              className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A] leading-tight">
                    Call Factory Support
                  </h4>
                  <p className="text-[10px] text-[#64748B] mt-0.5">
                    Direct Line: (800) 244-5999
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300" />
            </a>
          </div>
        </div>

        {/* Book Free In-Home Consultation Option */}
        {onOpenConsultation && (
          <button
            onClick={onOpenConsultation}
            className="w-full py-3.5 px-4 rounded-2xl bg-white border border-slate-200 hover:border-sky-300 active:scale-98 text-[#0088CC] font-bold text-xs flex items-center justify-center gap-2 shadow-xs cursor-pointer transition-all"
          >
            <Shield className="w-4 h-4 text-[#0088CC]" />
            <span>Book Free In-Home Consultation</span>
          </button>
        )}
      </div>
    </div>
  )
}
