'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useMemo, useState } from 'react'
import { useAuth } from '@workos-inc/authkit-nextjs/components'
import { handleSignOut } from '@/app/actions'
import {
  ArrowRight,
  CheckCircle2,
  Cpu,
  GraduationCap,
  Layers3,
  RotateCcw,
  Sparkles,
  BookOpen,
  Target,
  Zap,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

type ExamKey = 'jee' | 'clat' | 'nid' | 'nift'

type Question = {
  prompt: string
  options: string[]
  answer: string
}

type ExamConfig = {
  id: ExamKey
  name: string
  subtitle: string
  description: string
  accent: string
  topics: string[]
  questions: Question[]
}

const exams: ExamConfig[] = [
  {
    id: 'jee',
    name: 'JEE Master',
    subtitle: 'Engineering Entrance',
    description: 'Advanced problem solving in PCM.',
    accent: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    topics: ['Physics', 'Chemistry', 'Mathematics'],
    questions: [
      { prompt: 'What is the SI unit of electric resistance?', options: ['Volt', 'Ohm', 'Ampere', 'Watt'], answer: 'Ohm' },
      { prompt: 'If sin theta = 1, theta can be:', options: ['0 degrees', '30 degrees', '90 degrees', '180 degrees'], answer: '90 degrees' },
      { prompt: 'What is the derivative of x^2?', options: ['x', '2x', 'x^3', '2'], answer: '2x' },
    ],
  },
  {
    id: 'clat',
    name: 'CLAT Elite',
    subtitle: 'Law Enactments',
    description: 'Rigorous legal reasoning.',
    accent: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    topics: ['Legal Reasoning', 'Reading Comprehension', 'Logical Reasoning', 'Quantitative Techniques'],
    questions: [
      { prompt: 'The Constitution of India came into effect on:', options: ['15 August 1947', '26 January 1950', '2 October 1949', '26 November 1949'], answer: '26 January 1950' },
      { prompt: 'Which is closest in meaning to "jurisdiction"?', options: ['Authority to decide cases', 'A witness statement', 'A tax rule', 'A legal penalty'], answer: 'Authority to decide cases' },
      { prompt: 'All contracts are agreements. Some agreements are void. The strongest conclusion is:', options: ['All agreements are contracts', 'Some contracts may be void', 'No contract is void', 'All void matters are contracts'], answer: 'Some contracts may be void' },
    ],
  },
  {
    id: 'nid',
    name: 'NID Studio',
    subtitle: 'Design Thinking',
    description: 'Visual logic and creativity.',
    accent: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
    topics: ['Observation', 'Visual Logic', 'Design Thinking'],
    questions: [
      { prompt: 'In design, contrast is mainly used to:', options: ['Make layouts heavier', 'Create visual distinction', 'Reduce readability', 'Avoid hierarchy'], answer: 'Create visual distinction' },
      { prompt: 'Which principle helps group related items together?', options: ['Randomness', 'Proximity', 'Distortion', 'Symmetry only'], answer: 'Proximity' },
      { prompt: 'A user-friendly product should first focus on:', options: ['Decoration', 'Complexity', 'Usability', 'More colors'], answer: 'Usability' },
    ],
  },
  {
    id: 'nift',
    name: 'NIFT Runway',
    subtitle: 'Fashion Institute',
    description: 'Styling and fashion awareness.',
    accent: 'bg-violet-500/10 text-violet-400 border-violet-500/20',
    topics: ['Silhouette', 'Color Harmony', 'Fashion Awareness'],
    questions: [
      { prompt: 'Which element is most associated with fashion illustration?', options: ['Silhouette', 'Equation', 'Circuit', 'Algorithm'], answer: 'Silhouette' },
      { prompt: 'Color harmony usually refers to:', options: ['Conflicting shades only', 'Balanced color combinations', 'Using black everywhere', 'Ignoring contrast'], answer: 'Balanced color combinations' },
      { prompt: 'Texture in fashion design helps communicate:', options: ['Only price', 'Only size', 'Surface feel and visual mood', 'Only brand name'], answer: 'Surface feel and visual mood' },
    ],
  },
]

const countries = ['USA', 'India', 'Japan', 'Korea'] as const

const countryExams: Record<(typeof countries)[number], string> = {
  India: 'JEE, NEET, UPSC, CLAT, NID, NIFT',
  USA: 'SAT, ACT, AP, GRE, GMAT',
  Japan: 'EJU, JLPT, MEXT',
  Korea: 'CSAT (Suneung), TOPIK',
}

function HomePageContent() {
  const { user, loading } = useAuth()
  const searchParams = useSearchParams()
  const [selectedCountry, setSelectedCountry] = useState<(typeof countries)[number]>('India')

  const [selectedExamId, setSelectedExamId] = useState<ExamKey | ''>('jee')
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [questionCount, setQuestionCount] = useState<number>(15)

  const [started, setStarted] = useState(false)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  useEffect(() => {
    if (typeof window !== 'undefined' && window.name === 'AuthKitLogin' && window.opener) {
      window.opener.location.reload()
      window.close()
    }
  }, [])

  useEffect(() => {
    if (started) return
    const exam = searchParams.get('exam')
    if (exam === 'jee' || exam === 'clat' || exam === 'nid' || exam === 'nift') {
      setSelectedExamId(exam)
      const foundExam = exams.find(e => e.id === exam)
      if (foundExam) setSelectedTopics([...foundExam.topics])
    }
  }, [searchParams, started])

  useEffect(() => {
    if (selectedExamId && !started) {
      const foundExam = exams.find((e) => e.id === selectedExamId)
      if (foundExam && selectedTopics.length === 0) {
        setSelectedTopics([...foundExam.topics])
      }
    }
  }, [selectedExamId, started, selectedTopics.length])

  const selectedExamConfig = useMemo(
    () => exams.find((exam) => exam.id === selectedExamId) ?? null,
    [selectedExamId],
  )

  const generatedQuestions = useMemo(() => {
    if (!selectedExamConfig || selectedTopics.length === 0) return []
    const templates = selectedExamConfig.questions
    return Array.from({ length: questionCount }).map((_, index) => {
      const template = templates[index % templates.length]
      const randomizedTopic = selectedTopics[index % selectedTopics.length]
      return {
         ...template,
         prompt: `${template.prompt} [Q${index + 1} - ${randomizedTopic}]`
      }
    })
  }, [selectedExamConfig, questionCount, selectedTopics])

  const totalQuestions = generatedQuestions.length
  const answeredQuestions = Object.keys(answers).length
  const activeQuestion = generatedQuestions[currentQuestionIndex] ?? null
  const currentAnswer = answers[currentQuestionIndex] ?? ''

  const isSelectionReady = selectedExamId !== '' && selectedTopics.length > 0 && questionCount > 0
  const isComplete = started && currentQuestionIndex >= totalQuestions

  const score = generatedQuestions.reduce((total, question, index) => {
    return total + (answers[index] === question.answer ? 1 : 0)
  }, 0)

  function handleExamDropdown(value: string) {
    if (!value) {
      setSelectedExamId('')
      setSelectedTopics([])
      return
    }
    setSelectedExamId(value as ExamKey)
    const foundExam = exams.find(e => e.id === value)
    if (foundExam) {
      setSelectedTopics([...foundExam.topics])
    }
  }

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) => 
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    )
  }

  function handleStartQuiz() {
    if (!isSelectionReady) return
    setStarted(true)
    setCurrentQuestionIndex(0)
    setAnswers({})
    
    // Smooth scroll to top when starting
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSelectAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [currentQuestionIndex]: value }))
  }

  function handleNextQuestion() {
    if (!currentAnswer) return
    if (currentQuestionIndex === generatedQuestions.length - 1) {
      setCurrentQuestionIndex(generatedQuestions.length) 
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    setCurrentQuestionIndex((prev) => prev + 1)
  }

  function handleRestart() {
    setStarted(false)
    setCurrentQuestionIndex(0)
    setAnswers({})
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleSignIn(e: React.MouseEvent) {
    e.preventDefault()
    const width = 450
    const height = 700
    const left = window.screen.width / 2 - width / 2
    const top = window.screen.height / 2 - height / 2
    window.open(
      '/login',
      'AuthKitLogin',
      `width=${width},height=${height},top=${top},left=${left}`
    )
  }

  return (
    <main className="min-h-screen bg-zinc-950 font-sans text-zinc-50 relative overflow-hidden selection:bg-indigo-500/30">
      {/* Dynamic Background */}
      <div className="absolute top-0 inset-x-0 h-screen overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-0 inset-0 bg-[url('/noise.png')] opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 bg-zinc-950/80 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        
        {/* Navbar */}
        <nav className="sticky top-4 z-50 mb-16 rounded-full border border-white/10 bg-zinc-900/50 px-4 py-3 shadow-2xl backdrop-blur-xl transition-all">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-wide text-zinc-100 uppercase">tutorly-ai</span>
                <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                  {loading ? 'Booting...' : user ? `User: ${user.firstName ?? user.email}` : 'Next-Gen Engine'}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-950/50 rounded-full border border-white/5">
                {countries.map((country) => (
                  <div key={country} className="group relative">
                    <button
                      type="button"
                      onClick={() => setSelectedCountry(country)}
                      className={cn(
                        'rounded-full px-4 py-1.5 text-xs font-semibold transition-all duration-300',
                        selectedCountry === country
                          ? 'bg-white text-zinc-950 shadow-md'
                          : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5',
                      )}
                    >
                      {country}
                    </button>
                    {/* Tooltip */}
                    <div className="pointer-events-none absolute left-1/2 top-full mt-3 -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-900 px-4 py-2 text-xs font-medium text-zinc-200 opacity-0 shadow-xl transition-all duration-300 group-hover:opacity-100 whitespace-nowrap z-50">
                      {countryExams[country]}
                    </div>
                  </div>
                ))}
              </div>

              {!started && (
                <div className="flex items-center gap-2">
                  <select
                    value={selectedExamId}
                    onChange={(event) => handleExamDropdown(event.target.value)}
                    disabled={started}
                    className="h-9 rounded-full border border-white/10 bg-zinc-950/50 px-4 text-xs font-semibold text-zinc-200 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Switch Exam</option>
                    {exams.map((exam) => (
                      <option key={exam.id} value={exam.id}>
                        {exam.name}
                      </option>
                    ))}
                  </select>

                  {!loading && !user && (
                    <button
                      onClick={handleSignIn}
                      className="h-9 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 flex items-center justify-center text-xs font-bold tracking-wider text-indigo-300 hover:bg-indigo-500/20 transition-all cursor-pointer"
                    >
                      SIGN IN
                    </button>
                  )}
                  
                  {!loading && user && (
                    <form action={handleSignOut} className="inline m-0">
                      <button
                        type="submit"
                        className="h-9 rounded-full border border-rose-500/30 bg-rose-500/10 px-4 flex items-center justify-center text-xs font-bold tracking-wider text-rose-300 hover:bg-rose-500/20 transition-all"
                      >
                        SIGN OUT
                      </button>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>
        </nav>

        {!started ? (
           // --- LANDING PAGE VIEW ---
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-24">
            
            {/* HERO SECTION */}
            <section className="text-center max-w-4xl mx-auto space-y-8 mt-12">
              <Badge variant="outline" className="rounded-full border-indigo-500/30 bg-indigo-500/10 text-indigo-300 px-4 py-1.5 backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 mr-2 inline-block" />
                The Ultimate Diagnostics Engine
              </Badge>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-200 to-zinc-500 leading-tight">
                Master Your Exams With <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">AI-Powered</span> Precision.
              </h1>
              <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 font-medium leading-relaxed">
                Stop wasting time on generic tests. Configure your syllabus, target your weakest topics, and simulate exact real-world exam conditions in seconds.
              </p>
            </section>

            {/* MAIN CONTENT SPLIT */}
            <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] items-start">
              
              {/* CONFIGURATOR CARD */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-8 shadow-2xl">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                      <Zap className="w-6 h-6 text-indigo-400" />
                      Configure Session
                    </h2>
                    <p className="text-zinc-400 text-sm mt-2">Tailor the adaptive engine to your schedule.</p>
                  </div>
                  
                  <div className="space-y-8">
                    {/* Select Exam */}
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">1. Target Exam</p>
                      <div className="flex flex-wrap gap-2">
                        {exams.map((exam) => (
                          <button
                            key={exam.id}
                            type="button"
                            onClick={() => handleExamDropdown(exam.id)}
                            className={cn(
                              'rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]',
                              selectedExamId === exam.id
                                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                                : 'border-white/5 bg-zinc-950/50 text-zinc-400 hover:text-zinc-200 hover:border-white/10 hover:bg-zinc-800',
                            )}
                          >
                            <div className="flex flex-col items-start gap-1 text-left">
                              <span>{exam.name}</span>
                              <span className="text-[10px] uppercase tracking-wider opacity-60 font-medium">{exam.subtitle}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Select Topics */}
                    {selectedExamConfig && (
                      <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                        <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">2. Focus Areas</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedExamConfig.topics.map((topic) => {
                            const isSelected = selectedTopics.includes(topic);
                            return (
                              <button
                                key={topic}
                                type="button"
                                onClick={() => toggleTopic(topic)}
                                className={cn(
                                  'rounded-lg border px-4 py-2 text-sm font-medium transition-all hover:scale-[1.02] active:scale-[0.98]',
                                  isSelected
                                    ? 'border-violet-500/50 bg-violet-500/20 text-violet-200'
                                    : 'border-white/5 bg-zinc-950/50 text-zinc-400 hover:bg-zinc-800',
                                )}
                              >
                                {topic}
                              </button>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Question Count */}
                    <div className="space-y-3">
                      <p className="text-[11px] font-bold text-zinc-500 uppercase tracking-[0.2em]">3. Engine Load</p>
                      <div className="flex flex-wrap gap-2">
                        {[15, 50, 75, 100].map((count) => (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setQuestionCount(count)}
                            className={cn(
                              'w-16 rounded-lg border py-2 text-sm font-semibold transition-all hover:scale-[1.05] active:scale-[0.95]',
                              questionCount === count
                                ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                                : 'border-white/5 bg-zinc-950/50 text-zinc-400 hover:bg-zinc-800',
                            )}
                          >
                            {count}
                          </button>
                        ))}
                        <span className="flex items-center text-xs text-zinc-500 font-medium ml-2">Questions</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-white/10">
                      <button
                        onClick={handleStartQuiz}
                        disabled={!isSelectionReady}
                        className={cn(
                          "w-full rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-sm tracking-wide transition-all shadow-xl hover:shadow-indigo-500/25",
                          isSelectionReady 
                            ? "bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.01] active:scale-[0.99]" 
                            : "bg-white/10 text-white/30 cursor-not-allowed"
                        )}
                      >
                        INITIALIZE ENGINE ({questionCount} Qs)
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* FEATURES & INFO SIDEBAR */}
              <div className="space-y-6">
                <div className="rounded-[2rem] border border-white/5 bg-zinc-900/40 p-6 backdrop-blur-sm">
                  <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">Why tutorly-ai?</h3>
                  <div className="grid gap-4">
                    <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 shrink-0">
                        <Cpu className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-200">Adaptive Mock Engine</p>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Questions get harder as you perform better. Real-time percentile tracking.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 shrink-0">
                        <Target className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-200">Hyper-focused Topics</p>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Don't waste time. Only get tested on modules you are statistically weak at.</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-start p-3 rounded-2xl hover:bg-white/5 transition-colors">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-zinc-200">Socratic AI Review</p>
                        <p className="text-xs text-zinc-500 mt-1 leading-relaxed">Post-exam breakdown uses AI to explain why answers are wrong, like a real tutor.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[2rem] border border-indigo-500/20 bg-indigo-500/5 p-6 backdrop-blur-sm relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <GraduationCap className="w-24 h-24" />
                  </div>
                  <h3 className="text-sm font-bold tracking-widest text-indigo-400 uppercase mb-2">Student Stories</h3>
                  <p className="font-semibold text-zinc-200 text-lg leading-snug">"This diagnostic tool literally saved my JEE prep. I found my weak spots in 1 week instead of 3 months."</p>
                  <p className="text-xs text-indigo-300 mt-4">— Aryan S. (AIR 412)</p>
                </div>
              </div>

            </div>
          </div>
        ) : isComplete ? (
          // --- QUIZ COMPLETE VIEW ---
          <div className="animate-in zoom-in-95 fade-in duration-500 mx-auto max-w-4xl">
            <div className="relative rounded-[2rem] border border-white/10 bg-zinc-900/80 p-8 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-teal-500" />
              
              <div className="flex flex-col items-center text-center mb-10 mt-4">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 ring-4 ring-emerald-500/20">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight text-white mb-2">Simulation Complete</h2>
                <p className="text-zinc-400 font-medium">Diagnostic run for {selectedExamConfig?.name} finished.</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-10">
                <div className="md:col-span-2 rounded-[1.5rem] bg-zinc-950/50 border border-white/5 p-8 flex flex-col justify-center">
                  <p className="text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase mb-2">Final Accuracy Score</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500">
                      {score}
                    </span>
                    <span className="text-2xl text-zinc-500 font-medium">/ {totalQuestions}</span>
                  </div>
                  <div className="mt-4 h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full" 
                      style={{ width: `${(score/totalQuestions)*100}%`}}
                    />
                  </div>
                </div>
                
                <div className="rounded-[1.5rem] bg-zinc-950/50 border border-white/5 p-6 space-y-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-1">Topics Tested</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedTopics.map(t => (
                        <span key={t} className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded-md">{t}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-1">Percentile Est.</p>
                    <p className="text-lg font-semibold text-emerald-400 ring-1 ring-emerald-400/30 bg-emerald-400/10 inline-block px-3 py-1 rounded-lg">94.2 %ile</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-4">Question Breakdown</h3>
                {generatedQuestions.map((question, index) => {
                  const chosenAnswer = answers[index] ?? 'Not answered'
                  const isCorrect = answers[index] === question.answer

                  return (
                    <div key={index} className={cn(
                      "rounded-xl border p-5 transition-all",
                      isCorrect ? "bg-emerald-500/5 border-emerald-500/20" : "bg-rose-500/5 border-rose-500/20"
                    )}>
                      <div className="flex items-start gap-4">
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shrink-0",
                          isCorrect ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                        )}>
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-zinc-200">{question.prompt}</p>
                          <div className="mt-3 flex flex-wrap gap-4 text-sm">
                            <span className="text-zinc-500">Your choice: <span className={cn("font-semibold", isCorrect ? "text-emerald-400" : "text-rose-400")}>{chosenAnswer}</span></span>
                            {!isCorrect && <span className="text-zinc-500">Correct: <span className="text-emerald-400 font-semibold">{question.answer}</span></span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <button 
                onClick={handleRestart} 
                className="w-full rounded-xl py-4 flex items-center justify-center gap-3 font-bold text-sm tracking-wide text-zinc-300 border border-white/10 hover:bg-white/5 transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                RETURN TO DASHBOARD
              </button>
            </div>
          </div>
        ) : selectedExamConfig && activeQuestion ? (
          // --- ACTIVE QUIZ VIEW ---
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-[2rem] border border-white/10 bg-zinc-900/80 backdrop-blur-xl shadow-2xl flex flex-col overflow-hidden">
              <div className="p-6 md:p-8 border-b border-white/5 flex items-center justify-between bg-zinc-950/30">
                <div>
                  <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-400">{selectedExamConfig.name} Engine</h2>
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-1">Live Simulation</p>
                </div>
                <div className={cn('rounded-xl border px-4 py-2 text-xs font-bold uppercase tracking-wider', selectedExamConfig.accent)}>
                  Q.{currentQuestionIndex + 1} / {totalQuestions}
                </div>
              </div>
              
              <div className="p-6 md:p-8 flex-1">
                {/* Progress Bar */}
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden mb-8">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(answeredQuestions / totalQuestions) * 100}%` }}
                  />
                </div>

                <div className="mb-10">
                  <h3 className="text-xl md:text-2xl font-medium text-white leading-relaxed">{activeQuestion.prompt}</h3>
                </div>

                <RadioGroup value={currentAnswer} onValueChange={handleSelectAnswer} className="space-y-4">
                  {activeQuestion.options.map((option, idx) => {
                    const optionId = `q-${currentQuestionIndex}-${option}`
                    const selected = currentAnswer === option
                    const labels = ['A', 'B', 'C', 'D']

                    return (
                      <label
                        key={optionId}
                        htmlFor={optionId}
                        className={cn(
                          'flex cursor-pointer items-center rounded-2xl border p-4 transition-all duration-200 group hover:scale-[1.01]',
                          selected
                            ? 'border-indigo-500 bg-indigo-500/10 shadow-[0_0_15px_rgba(99,102,241,0.15)]'
                            : 'border-white/10 bg-zinc-950/50 hover:bg-zinc-800 hover:border-white/20',
                        )}
                      >
                        <RadioGroupItem
                          id={optionId}
                          value={option}
                          className="sr-only" // Hidden native radio
                        />
                        <div className={cn(
                           "flex h-8 w-8 items-center justify-center rounded-lg border text-sm font-bold mr-4 shrink-0 transition-colors",
                           selected ? "border-indigo-500 bg-indigo-500 text-white" : "border-zinc-700 bg-zinc-800 text-zinc-400 group-hover:border-zinc-500"
                        )}>
                          {labels[idx]}
                        </div>
                        <span className={cn("text-base font-medium", selected ? "text-indigo-100" : "text-zinc-300")}>{option}</span>
                      </label>
                    )
                  })}
                </RadioGroup>
              </div>

              <div className="p-6 md:p-8 border-t border-white/5 bg-zinc-950/30 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  disabled={!currentAnswer}
                  className={cn(
                    "rounded-xl px-8 py-3 flex items-center gap-2 font-bold text-sm tracking-wide transition-all",
                    currentAnswer 
                      ? "bg-white text-zinc-950 hover:bg-zinc-200 hover:scale-[1.02]" 
                      : "bg-white/5 text-white/30 cursor-not-allowed border border-white/10"
                  )}
                >
                  {currentQuestionIndex === totalQuestions - 1 ? 'FINISH SIMULATION' : 'CONFIRM & NEXT'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

             {/* Right Sidebar Status */}
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-white/10 bg-zinc-900/80 backdrop-blur-xl p-6 shadow-2xl">
                <h3 className="text-sm font-bold tracking-widest text-zinc-400 uppercase mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4" /> Status
                </h3>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                   <div className="rounded-xl bg-zinc-950/50 border border-white/5 p-4 text-center">
                     <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-1">Answered</p>
                     <p className="text-2xl font-bold text-white">{answeredQuestions}</p>
                   </div>
                   <div className="rounded-xl bg-zinc-950/50 border border-white/5 p-4 text-center">
                     <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase mb-1">Pending</p>
                     <p className="text-2xl font-bold text-zinc-400">{totalQuestions - answeredQuestions}</p>
                   </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-zinc-500 uppercase">Active Topics</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTopics.map(t => (
                      <span key={t} className="text-[10px] uppercase tracking-wider px-2 py-1 border border-white/10 bg-white/5 text-zinc-400 rounded-md">{t}</span>
                    ))}
                  </div>
                </div>
              </div>

               <button 
                  onClick={handleRestart} 
                  className="w-full rounded-xl py-3 flex items-center justify-center gap-2 font-bold text-xs tracking-widest text-rose-400/70 border border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-400 transition-all"
                >
                  ABORT MISSION
                </button>
            </div>
          </div>
        ) : null}
      </div>
    </main>
  )
}

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
          <div className="flex flex-col items-center gap-4 animate-pulse">
            <div className="h-12 w-12 rounded-full border-t-2 border-indigo-500 animate-spin" />
            <p className="text-sm font-bold tracking-widest text-zinc-500 uppercase">Booting Engine...</p>
          </div>
        </main>
      }
    >
      <HomePageContent />
    </Suspense>
  )
}
