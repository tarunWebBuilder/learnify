import type { Metadata } from 'next'
import Link from 'next/link'
import { Cormorant_Garamond, IBM_Plex_Sans } from 'next/font/google'

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-find-skills-display',
})

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-find-skills-body',
})

export const metadata: Metadata = {
  title: 'Find Skills — tutorly-ai Hub',
  description:
    'A quiet place to name what you are building: measurable skill, not noise. Map gaps, practice under time, and prove progress with free mocks.',
}

const pillars = [
  {
    title: 'Observe',
    line: 'Name the gap before you decorate effort.',
    detail:
      'Skill shows up where attention meets repetition. Start by listing what the exam actually rewards—not what feels comfortable to study.',
  },
  {
    title: 'Synthesize',
    line: 'Turn reading into a system you can repeat.',
    detail:
      'Notes are not the outcome. A weekly loop—learn, drill, review errors—is. If your plan cannot survive a bad day, it is still fragile.',
  },
  {
    title: 'Prove',
    line: 'Let timed tests be the honest mirror.',
    detail:
      'Mocks are not morale events. They are diagnostics. One clean review after a timed set often beats three passive rereads.',
  },
] as const

export default function FindSkillsPage() {
  return (
    <main
      className={`${display.variable} ${body.variable} min-h-screen bg-[#f3efe6] text-[#1a1814] antialiased`}
    >
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `
            linear-gradient(90deg, rgba(26,24,20,0.06) 1px, transparent 1px),
            linear-gradient(rgba(26,24,20,0.06) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-5 pb-24 pt-16 sm:px-8 sm:pt-24">
        <header className="mb-20 flex flex-col gap-8 border-b border-[#1a1814]/15 pb-12 sm:mb-28 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl space-y-6">
            <p
              className="font-[family-name:var(--font-find-skills-body)] text-xs font-semibold uppercase tracking-[0.35em] text-[#5c574c]"
            >
              tutorly-ai · Atelier
            </p>
            <h1
              className="font-[family-name:var(--font-find-skills-display)] text-[clamp(2.75rem,6vw,4.5rem)] font-semibold leading-[0.95] tracking-tight text-balance"
            >
              Find skills the exam can see.
            </h1>
            <p className="font-[family-name:var(--font-find-skills-body)] max-w-xl text-lg leading-relaxed text-[#3d3a33]">
              Not another dashboard. A single frame for serious learners: map what matters, practice
              under pressure, and let evidence—not enthusiasm—guide the next hour.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <Link
              href="/#start-exam"
              className="font-[family-name:var(--font-find-skills-body)] inline-flex items-center justify-center rounded-full bg-[#1a1814] px-7 py-3 text-sm font-semibold text-[#f3efe6] transition hover:bg-[#2f2a22]"
            >
              Start free test
            </Link>
            <Link
              href="/asia/india"
              className="font-[family-name:var(--font-find-skills-body)] text-sm font-medium text-[#5c574c] underline-offset-4 hover:text-[#1a1814] hover:underline"
            >
              India exam guides
            </Link>
          </div>
        </header>

        <div className="mb-16 sm:mb-24">
          <div className="relative mx-auto max-w-3xl">
            <div
              className="absolute -left-4 top-0 hidden h-full w-px bg-gradient-to-b from-[#c4a574] via-[#1a1814]/20 to-transparent sm:block"
              aria-hidden
            />
            <p className="font-[family-name:var(--font-find-skills-display)] text-2xl italic leading-snug text-[#2f2a22] sm:pl-8 sm:text-3xl">
              “Study without measurement is hope. Measurement without kindness is burnout. Hold
              both.”
            </p>
          </div>
        </div>

        <ol className="grid gap-12 sm:gap-16">
          {pillars.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-6 border-t border-[#1a1814]/10 pt-10 sm:grid-cols-[minmax(0,7rem)_1fr] sm:gap-10 sm:pt-12"
            >
              <div className="font-[family-name:var(--font-find-skills-body)] text-xs font-semibold uppercase tracking-[0.3em] text-[#8a8476]">
                <span className="text-[#c4a574]">{String(index + 1).padStart(2, '0')}</span>
                <span className="mt-3 block text-[#1a1814]">{item.title}</span>
              </div>
              <div className="space-y-4">
                <p className="font-[family-name:var(--font-find-skills-display)] text-2xl font-semibold leading-tight sm:text-3xl">
                  {item.line}
                </p>
                <p className="font-[family-name:var(--font-find-skills-body)] max-w-2xl text-base leading-7 text-[#3d3a33]">
                  {item.detail}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <footer className="mt-24 border-t border-[#1a1814]/15 pt-12">
          <div className="flex flex-col gap-6 rounded-2xl border border-[#1a1814]/10 bg-[#faf8f3]/80 p-8 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-[family-name:var(--font-find-skills-body)] text-sm font-semibold text-[#1a1814]">
                Ready when you are.
              </p>
              <p className="font-[family-name:var(--font-find-skills-body)] mt-1 max-w-md text-sm leading-6 text-[#5c574c]">
                Open the free mock flow, pick JEE, CLAT, NID, or NIFT, and finish with a clear score
                breakdown.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#start-exam"
                className="font-[family-name:var(--font-find-skills-body)] inline-flex rounded-full border border-[#1a1814] bg-transparent px-6 py-2.5 text-sm font-semibold text-[#1a1814] transition hover:bg-[#1a1814] hover:text-[#f3efe6]"
              >
                Begin practice
              </Link>
              <Link
                href="/"
                className="font-[family-name:var(--font-find-skills-body)] inline-flex rounded-full px-6 py-2.5 text-sm font-medium text-[#5c574c] hover:text-[#1a1814]"
              >
                Hub home →
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </main>
  )
}
