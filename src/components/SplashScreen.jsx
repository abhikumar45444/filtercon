import { useEffect, useState } from 'react'
import { Droplets } from 'lucide-react'

export default function SplashScreen({ onDone }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 400)
    const t2 = setTimeout(() => setStep(2), 1200)
    const t3 = setTimeout(() => onDone(), 2600)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [onDone])

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#082f49] to-[#0F172A] flex flex-col items-center justify-center z-50">
      {/* Animated rings */}
      <div className="relative flex items-center justify-center mb-8">
        <div className={`absolute w-32 h-32 rounded-full border border-sky-400/20 transition-all duration-700 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
        <div className={`absolute w-24 h-24 rounded-full border border-sky-400/30 transition-all duration-700 delay-100 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`} />
        <div className={`w-16 h-16 rounded-2xl bg-[#0284C7] flex items-center justify-center shadow-2xl shadow-sky-500/40 transition-all duration-500 ${step >= 1 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <Droplets className="w-8 h-8 text-white" />
        </div>
      </div>

      <div className={`transition-all duration-700 delay-300 text-center ${step >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h1 className="text-3xl font-black text-white mb-1" style={{ fontFamily: 'Outfit' }}>Filtercon</h1>
        <p className="text-sky-300 text-sm font-medium">Pure Water Systems</p>
      </div>

      <div className={`mt-8 transition-all duration-500 delay-700 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <p className="text-sky-400/70 text-xs font-medium tracking-widest uppercase">
          Initializing Southern CA service...
        </p>
        <div className="mt-3 mx-auto w-32 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className={`h-full bg-sky-400 rounded-full transition-all duration-1000 ${step >= 2 ? 'w-full' : 'w-0'}`} />
        </div>
      </div>

      {/* Trust badges */}
      <div className={`absolute bottom-12 flex gap-4 text-xs text-sky-400/60 font-medium transition-all duration-500 delay-1000 ${step >= 2 ? 'opacity-100' : 'opacity-0'}`}>
        <span>NSF Certified</span>
        <span>•</span>
        <span>San Diego</span>
        <span>•</span>
        <span>Since 1997</span>
      </div>
    </div>
  )
}
