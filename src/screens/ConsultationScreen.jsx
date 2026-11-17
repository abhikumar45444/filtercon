import { useState } from 'react'
import { ArrowLeft, Phone, MapPin, CheckCircle2, Calendar } from 'lucide-react'
import { SERVICE_ZONES } from '../data'

export default function ConsultationScreen({ onBack }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [selectedZone, setSelectedZone] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && phone) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center px-6 text-center max-w-md mx-auto">
        <div className="w-20 h-20 bg-[#16A34A] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-200">
          <Calendar className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-black text-[#0F172A] mb-2">Consultation Scheduled!</h2>
        <p className="text-slate-500 text-sm leading-relaxed mb-6">
          We'll call you to confirm your address and appointment. A Filtercon technician will test your tap water hardness and inspect your plumbing layout at zero cost.
        </p>
        <div className="w-full bg-white rounded-3xl border border-slate-100 p-5 mb-6 shadow-sm text-left space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            <span className="text-sm font-semibold text-[#0F172A]">Free in-home water quality test</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            <span className="text-sm font-semibold text-[#0F172A]">Plumbing inspection included</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A]" />
            <span className="text-sm font-semibold text-[#0F172A]">No obligation required</span>
          </div>
        </div>
        <button onClick={onBack} className="w-full bg-[#0284C7] text-white font-black py-4 rounded-2xl text-sm">
          Back to Home
        </button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] max-w-md mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#082f49] to-[#0F172A] px-5 pt-5 md:pt-14 pb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-sky-500/10 -translate-y-12 translate-x-12" />
        <button onClick={onBack} className="relative w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center mb-6">
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <div className="relative">
          <p className="text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-1">FREE HOME CONSULTATION</p>
          <h1 className="text-2xl font-black text-white mb-2">Test Your Water Hardness & Chlorine</h1>
          <p className="text-sky-200/70 text-sm">A Filtercon technician will evaluate your plumbing and tap water hardness on-site.</p>
        </div>
      </div>

      <div className="px-5 py-6">
        {/* What to expect */}
        <div className="bg-[#F0F9FF] rounded-3xl p-4 border border-sky-100 mb-6">
          <p className="text-xs font-black text-[#0F172A] mb-3 uppercase tracking-wide">What's Included</p>
          <div className="space-y-2">
            {[
              'Professional water hardness test kit',
              'Chlorine & contaminant ppm reading',
              'Plumbing system inspection',
              'Personalized system recommendation',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <span className="text-sm text-[#0F172A] font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Service zone selector */}
        <div className="mb-5">
          <p className="text-sm font-black text-[#0F172A] mb-1">Choose Delivery Locality</p>
          <p className="text-xs text-slate-400 mb-3">Showing service areas in Southern California (18 technicians ready)</p>
          <div className="grid grid-cols-2 gap-2">
            {SERVICE_ZONES.map((zone) => (
              <button
                key={zone.city}
                onClick={() => setSelectedZone(zone.city)}
                className={`rounded-2xl p-3 border text-left transition-all ${
                  selectedZone === zone.city
                    ? 'bg-[#0284C7] border-[#0284C7] text-white'
                    : 'bg-white border-slate-200 text-[#0F172A]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <MapPin className={`w-3 h-3 flex-shrink-0 ${selectedZone === zone.city ? 'text-sky-200' : 'text-[#0284C7]'}`} />
                  <span className="text-xs font-black">{zone.city}, {zone.state}</span>
                </div>
                <span className={`text-[10px] ${selectedZone === zone.city ? 'text-sky-200' : 'text-slate-400'}`}>
                  {zone.techs} techs active
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-[#0F172A] mb-1 block">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your name"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-[#0F172A] placeholder-slate-300 outline-none focus:border-sky-400 transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-[#0F172A] mb-1 block">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="(760) 000-0000"
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium text-[#0F172A] placeholder-slate-300 outline-none focus:border-sky-400 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0284C7] text-white font-black py-4 rounded-2xl text-sm active:bg-[#0369A1] transition-colors mt-2"
          >
            Book Free Consultation
          </button>
        </form>

        {/* Immediate call */}
        <div className="mt-4 text-center">
          <p className="text-xs text-slate-400 mb-2">Need Immediate Advice?</p>
          <a
            href="tel:8002445999"
            className="inline-flex items-center gap-2 text-[#0284C7] font-black text-base"
          >
            <Phone className="w-4 h-4" />
            (800) 244-5999
          </a>
        </div>
      </div>
    </div>
  )
}
