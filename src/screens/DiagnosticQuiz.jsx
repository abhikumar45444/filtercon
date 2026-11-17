import { useState } from 'react'
import { CheckCircle2, Sparkles, Phone, Calendar, ArrowRight, RotateCcw, Check } from 'lucide-react'
import { PRODUCTS } from '../data'

const QUIZ_QUESTIONS = [
  {
    id: 'source',
    question: 'Where does your home water come from?',
    options: [
      {
        id: 'city',
        label: 'City / Municipal Water',
        desc: 'Chlorinated, hard water, chemical taste'
      },
      {
        id: 'well',
        label: 'Private Well Water',
        desc: 'Iron, sulfur, sediment, variable hardness'
      },
      {
        id: 'unsure',
        label: 'Not Sure',
        desc: 'We will inspect your meter & test for you'
      }
    ]
  },
  {
    id: 'problems',
    question: 'What water issues do you notice most?',
    options: [
      {
        id: 'scale',
        label: 'White lime scale & spots on glasses / faucets',
        desc: 'Hard mineral buildup ruining fixtures and appliances'
      },
      {
        id: 'chlorine',
        label: 'Chemical / bleach odor and bad tap taste',
        desc: 'High chlorine and volatile organic chemicals'
      },
      {
        id: 'skin',
        label: 'Dry itchy skin & brittle hair after shower',
        desc: 'Chlorine absorption during hot steamy showers'
      },
      {
        id: 'all',
        label: 'All of the above (Need complete home protection)',
        desc: 'Comprehensive whole house conditioning needed'
      }
    ]
  },
  {
    id: 'home_size',
    question: 'What is the size of your residence?',
    options: [
      {
        id: 'small',
        label: '1 - 2 Bathrooms (1-3 People)',
        desc: 'Standard compact home or townhome'
      },
      {
        id: 'medium',
        label: '3 - 4 Bathrooms (4-6 People)',
        desc: 'Medium to large single family residence'
      },
      {
        id: 'large',
        label: '5+ Bathrooms or Estate',
        desc: 'High GPM demand & luxury property'
      }
    ]
  }
]

export default function DiagnosticQuiz({ onSelectProduct, onBack }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selectedOption, setSelectedOption] = useState(null)
  const [isFinished, setIsFinished] = useState(false)
  const [consultDate, setConsultDate] = useState('')
  const [consultScheduled, setConsultScheduled] = useState(false)

  const totalQuestions = QUIZ_QUESTIONS.length
  const currentQuestion = QUIZ_QUESTIONS[currentStep]
  const progressPercent = Math.round(((currentStep + 1) / totalQuestions) * 100)

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setSelectedOption(null)
    setIsFinished(false)
    setConsultScheduled(false)
  }

  const handleSelectOption = (optionId) => {
    setSelectedOption(optionId)
    const updatedAnswers = { ...answers, [currentQuestion.id]: optionId }
    setAnswers(updatedAnswers)

    setTimeout(() => {
      if (currentStep < totalQuestions - 1) {
        setCurrentStep((prev) => prev + 1)
        setSelectedOption(null)
      } else {
        setIsFinished(true)
      }
    }, 220)
  }

  // Determine prescribed product recommendation
  const getRecommendedProduct = () => {
    if (answers.problems === 'all' || answers.home_size === 'large' || answers.source === 'well') {
      return PRODUCTS.find((p) => p.id === 'fc-hybrid-combo') || PRODUCTS[0]
    }
    if (answers.problems === 'skin') {
      return PRODUCTS.find((p) => p.id === 'fc-wh-5stage') || PRODUCTS[1]
    }
    if (answers.problems === 'scale') {
      return PRODUCTS.find((p) => p.id === 'fc-tac-saltfree') || PRODUCTS[2]
    }
    return PRODUCTS.find((p) => p.id === 'fc-hybrid-combo') || PRODUCTS[0]
  }

  const recommended = getRecommendedProduct()

  return (
    <div className="flex-1 flex flex-col bg-[#F8FAFC] pb-16 font-sans select-none min-h-full">
      {/* 1. Header: Bold title "Water Diagnostics", subtitle, light-gray "Restart" pill button */}
      <div className="px-5 pt-12 pb-3 bg-white border-b border-slate-100 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-black text-[#0F172A] leading-tight">
            Water Diagnostics
          </h2>
          <p className="text-[11px] text-[#64748B]">
            Filtercon Smart Advisor
          </p>
        </div>

        <button
          onClick={handleRestart}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-600 rounded-full text-xs font-semibold cursor-pointer transition-all shadow-2xs"
          title="Restart Quiz"
        >
          <RotateCcw className="w-3 h-3 text-slate-500" />
          <span>Restart</span>
        </button>
      </div>

      {isFinished ? (
        /* Results / Prescription Screen */
        <div className="flex-1 overflow-y-auto no-scrollbar scrollbar-hide p-5 space-y-4">
          {/* Recommended Product Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0088CC] via-[#0284C7] to-[#0F172A] text-white shadow-xl shadow-sky-950/20">
            <div className="flex items-center gap-2 text-sky-200 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-sky-300" />
              <span>Prescribed Filtration System</span>
            </div>

            <h3 className="text-xl font-black mb-1.5 leading-tight text-white">
              {recommended.name}
            </h3>

            <p className="text-xs text-sky-100/90 mb-4 leading-relaxed">
              Based on your water hardness profile, this patented system eliminates 99% chlorine, prevents scale buildup, and preserves essential minerals without salt.
            </p>

            <div className="flex items-center justify-between border-t border-sky-400/30 pt-3.5 text-xs">
              <div>
                <span className="text-[10px] text-sky-200 block uppercase font-bold tracking-wider">
                  Recommended System
                </span>
                <span className="text-xl font-black text-white">
                  ${recommended.price?.toLocaleString()}
                </span>
              </div>

              <button
                onClick={() => onSelectProduct && onSelectProduct(recommended)}
                className="bg-white text-[#0088CC] hover:bg-sky-50 active:scale-95 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>View System Specs</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Free In-Home Water Test Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <Calendar className="w-4 h-4 text-[#0088CC]" />
              <h4 className="text-xs font-bold text-[#0F172A]">
                Free In-Home Water Test
              </h4>
            </div>

            <p className="text-[11px] text-[#64748B] mb-3 leading-relaxed">
              A Filtercon certified technician will test your tap water hardness and inspect your plumbing layout at zero cost.
            </p>

            {consultScheduled ? (
              <div className="p-3 bg-green-50 rounded-xl border border-green-100 text-center space-y-0.5">
                <CheckCircle2 className="w-5 h-5 text-[#16A34A] mx-auto mb-1" />
                <span className="text-xs font-bold text-[#0F172A] block">
                  Consultation Scheduled!
                </span>
                <span className="text-[11px] text-[#16A34A] block">
                  We'll call you to confirm your address and appointment.
                </span>
              </div>
            ) : (
              <div className="space-y-2">
                <input
                  type="date"
                  value={consultDate}
                  onChange={(e) => setConsultDate(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-[#0F172A] focus:outline-none focus:border-[#0088CC]"
                />
                <button
                  onClick={() => setConsultScheduled(true)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#0088CC] hover:bg-[#0077b3] active:scale-95 text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                >
                  Book Free Consultation
                </button>
              </div>
            )}
          </div>

          {/* Immediate Advice Call Strip */}
          <div className="p-3.5 bg-white rounded-2xl border border-slate-200 flex items-center justify-between text-xs shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-sky-50 text-[#0088CC] flex items-center justify-center flex-shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <span className="font-bold text-[#0F172A] block leading-tight">
                  Need Immediate Advice?
                </span>
                <span className="text-[11px] text-[#64748B]">
                  Call (800) 244-5999
                </span>
              </div>
            </div>

            <a
              href="tel:8002445999"
              className="py-1.5 px-3 rounded-lg bg-[#F0F9FF] border border-sky-200 font-bold text-[#0088CC] text-[11px] hover:bg-sky-100 cursor-pointer transition-colors"
            >
              Call Us
            </a>
          </div>

          {/* Footer Trust Note */}
          <div className="pt-2 text-center pb-4">
            <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
              <span>Over 30 years of Southern California water treatment expertise</span>
            </p>
          </div>
        </div>
      ) : (
        /* Questions Screen */
        <div className="flex-1 p-5 flex flex-col justify-between overflow-y-auto no-scrollbar scrollbar-hide">
          <div>
            {/* 2. Progress Indicator: QUESTION 1 OF 3 and 33% */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold text-[#0088CC] uppercase tracking-wider">
                QUESTION {currentStep + 1} OF {totalQuestions}
              </span>
              <span className="text-xs text-[#64748B] font-semibold">
                {progressPercent}%
              </span>
            </div>

            {/* Thin horizontal progress bar (33% filled in bright blue #0088CC) */}
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-[#0088CC] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* 3. Question Card: Large white rounded card */}
            <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-xs mb-4">
              {/* Bold dark question headline */}
              <h3 className="text-base font-bold text-[#0F172A] mb-4 leading-snug">
                {currentQuestion.question}
              </h3>

              {/* 3 vertical selectable option cards with right-aligned radio circles */}
              <div className="space-y-3">
                {currentQuestion.options.map((opt) => {
                  const isSelected = selectedOption === opt.id || answers[currentQuestion.id] === opt.id

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(opt.id)}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between group cursor-pointer active:scale-[0.99] ${
                        isSelected
                          ? 'border-[#0088CC] bg-[#F0F9FF] shadow-xs'
                          : 'border-slate-200/80 bg-white hover:border-[#0088CC] hover:bg-slate-50/60'
                      }`}
                    >
                      <div className="pr-3">
                        <h4
                          className={`text-xs font-bold leading-tight transition-colors ${
                            isSelected ? 'text-[#0088CC]' : 'text-[#0F172A] group-hover:text-[#0088CC]'
                          }`}
                        >
                          {opt.label}
                        </h4>
                        {opt.desc && (
                          <p className="text-[11px] text-[#64748B] mt-0.5 leading-snug">
                            {opt.desc}
                          </p>
                        )}
                      </div>

                      {/* Right-aligned radio circle */}
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected
                            ? 'border-[#0088CC] bg-[#0088CC] text-white shadow-2xs'
                            : 'border-slate-300 group-hover:border-[#0088CC]'
                        }`}
                      >
                        {isSelected && (
                          <Check className="w-3 h-3 text-white stroke-[2.5]" />
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* 4. Footer Trust Note: Centered green checkmark icon with text */}
          <div className="pt-4 text-center pb-2">
            <p className="text-[11px] text-[#64748B] flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0" />
              <span>Over 30 years of Southern California water treatment expertise</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
