'use client'
import { useState } from 'react'

export default function Home() {
  const [message, setMessage] = useState('')
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [displayScore, setDisplayScore] = useState(0)
  const [result, setResult] = useState<null | {
    score: number
    verdict: string
    reasons: string[]
    safeReply: string
  }>(null)

  const exampleMessages = [
    "Congratulations! You have been selected for a Software Engineer internship at Google. Please respond within 2 hours to confirm your slot. A registration fee of $50 is required for background verification.",
    "Hi! I am the Head of HR at Amazon. We found your profile and want to offer you a remote internship paying $500/week. Limited slots remaining. Contact us on WhatsApp immediately.",
    "You have been chosen for an exclusive internship opportunity. Please pay a deposit of LKR 5000 to secure your position. Respond ASAP as only 1 slot remaining.",
  ]

  const fillExample = () => {
    const random = exampleMessages[Math.floor(Math.random() * exampleMessages.length)]
    setMessage(random)
    setResult(null)
  }

  const animateScore = (targetScore: number) => {
    setDisplayScore(0)
    let current = 0
    const increment = targetScore / 40
    const timer = setInterval(() => {
      current += increment
      if (current >= targetScore) {
        setDisplayScore(targetScore)
        clearInterval(timer)
      } else {
        setDisplayScore(Math.floor(current))
      }
    }, 30)
  }

  const analyzeMessage = async () => {
    if (!message.trim()) return
    setIsAnalyzing(true)
    setResult(null)

   await new Promise(r => setTimeout(r, 2000))

    const msg = message.toLowerCase()
    const reasons: string[] = []
    let score = 0

    // Detection logic
    if (msg.includes('urgent') || msg.includes('respond within') || msg.includes('immediately') || msg.includes('asap')) {
      reasons.push('Urgent language detected — pressure tactic to rush your decision')
      score += 25
    }
    if (msg.includes('fee') || msg.includes('deposit') || msg.includes('payment') || msg.includes('pay')) {
      reasons.push('Payment request detected — legitimate companies never charge applicants')
      score += 35
    }
    if (msg.includes('whatsapp') || msg.includes('telegram') || msg.includes('personal number')) {
      reasons.push('Redirecting to unofficial platform — real recruiters use company email')
      score += 20
    }
    if (msg.includes('congratulations') || msg.includes('selected') || msg.includes('chosen')) {
      reasons.push('Unsolicited job offer pattern — you did not apply for this role')
      score += 15
    }
    if (msg.includes('salary') && (msg.includes('lkr 500') || msg.includes('$500') || msg.includes('high salary'))) {
      reasons.push('Unrealistic salary offer identified for entry-level position')
      score += 20
    }
    if (msg.includes('google') || msg.includes('microsoft') || msg.includes('apple') || msg.includes('amazon')) {
      reasons.push('Claims affiliation with major tech company — verify through official careers page')
      score += 15
    }
    if (msg.includes('limited') || msg.includes('only') || msg.includes('last slot') || msg.includes('few spots')) {
      reasons.push('False scarcity tactic — creating artificial pressure with limited slots')
      score += 15
    }
    if (msg.includes('work from home') || msg.includes('remote') || msg.includes('part time') || msg.includes('easy money')) {
      reasons.push('Vague remote work promise — common pattern in fraudulent job offers')
      score += 10
    }

    // Cap score at 100
    score = Math.min(score, 100)

    // If nothing detected, low risk
    if (reasons.length === 0) {
      reasons.push('No major scam indicators detected in this message')
      score = 12
    }

    const verdict =
      score >= 70 ? 'HIGH RISK' :
      score >= 35 ? 'MEDIUM RISK' :
      'LOW RISK'

    const safeReply =
      score >= 70
        ? 'Thank you for reaching out. Before I proceed, could you please share your official company registration number, your LinkedIn profile, and a company email address I can verify this offer through?'
        : score >= 35
        ? 'Thank you for the opportunity. Could you provide more details about the company and share an official email or website so I can learn more?'
        : 'Thank you for reaching out! Could you share more details about the role and the company so I can consider this opportunity?'

    setResult({ score, verdict, reasons, safeReply })
    animateScore(score)
    setIsAnalyzing(false)
  }

  const getScoreColor = (score: number) => {
    if (score >= 70) return '#ef4444'
    if (score >= 40) return '#f59e0b'
    return '#22c55e'
  }

  const getVerdictBg = (verdict: string) => {
    if (verdict === 'HIGH RISK') return 'bg-red-500/10 border-red-500/30 text-red-400'
    if (verdict === 'MEDIUM RISK') return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
    return 'bg-green-500/10 border-green-500/30 text-green-400'
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sm">
              🛡️
            </div>
            <span className="font-semibold tracking-tight">InternTrap AI</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-white/50">
            <a href="#how" className="hover:text-white transition-colors">How it works</a>
            <a href="#analyze" className="hover:text-white transition-colors">Analyze</a>
      <a href="/dashboard" className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors">
  Dashboard
</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs text-white/60 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
          AI-powered scam detection — active
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">
          Don't fall for
          <br />
          <span className="text-white/30">fake internships.</span>
        </h1>

        <p className="text-lg text-white/50 max-w-xl mx-auto mb-10 leading-relaxed">
          Paste any suspicious job offer or recruiter message. Our AI analyzes it across
          5 specialized agents and gives you an instant scam risk score.
        </p>

        <div className="flex items-center justify-center gap-8 text-sm text-white/30">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">5</span> AI Agents
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">60–80%</span> Scam reduction
          </div>
          <div className="w-px h-4 bg-white/10"></div>
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold">4</span> Platforms
          </div>
        </div>
      </section>

      {/* Analyzer */}
      <section id="analyze" className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">

          {/* Input area */}
          <div className="p-6 border-b border-white/5">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs text-white/40 uppercase tracking-widest">
                Paste suspicious message
              </label>
              <button
                onClick={fillExample}
                className="text-xs text-white/30 hover:text-white/60 border border-white/10 hover:border-white/20 px-3 py-1 rounded-lg transition-all"
              >
                Try an example ↓
              </button>
            </div>
            <textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={6}
              placeholder="e.g. Congratulations! You have been selected for a Software Engineer internship at Google. Please respond within 2 hours to confirm your slot. A registration fee of $50 is required..."
              className="w-full bg-transparent text-white/80 text-sm placeholder:text-white/20 resize-none outline-none leading-relaxed"
            />
          </div>

          {/* Analyze button */}
          <div className="px-6 py-4 flex items-center justify-between">
            <span className="text-xs text-white/30">
              {message.length} characters
            </span>
            <button
              onClick={analyzeMessage}
              disabled={isAnalyzing || !message.trim()}
              className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-semibold hover:bg-white/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              {isAnalyzing ? (
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full border-2 border-black/30 border-t-black animate-spin"></span>
                  Analyzing...
                </span>
              ) : (
                'Analyze Message →'
              )}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="mt-6 space-y-4 animate-fade-in">

            {/* Score card */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Scam Risk Score</p>
                  <div className="flex items-baseline gap-3">
                    <span
                      className="text-6xl font-bold tabular-nums"
                      style={{ color: getScoreColor(result.score) }}
                    >
                      {displayScore}
                    </span>
                    <span className="text-white/30 text-lg">/100</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl border text-sm font-semibold ${getVerdictBg(result.verdict)}`}>
                  {result.verdict}
                </div>
              </div>

              {/* Score bar */}
              <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000"
                  style={{
                    width: `${result.score}%`,
                    backgroundColor: getScoreColor(result.score),
                  }}
                />
              </div>
            </div>

            {/* Reasons */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Why it was flagged</p>
              <div className="space-y-3">
                {result.reasons.map((r, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 w-5 h-5 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 text-xs flex-shrink-0">
                      !
                    </span>
                    <span className="text-sm text-white/70">{r}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safe reply */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-xs text-white/40 uppercase tracking-widest mb-4">Suggested safe reply</p>
              <p className="text-sm text-white/60 leading-relaxed mb-4">{result.safeReply}</p>
              <button
                onClick={() => navigator.clipboard.writeText(result.safeReply)}
                className="px-4 py-2 rounded-lg border border-white/10 text-xs text-white/50 hover:text-white hover:border-white/30 transition-all"
              >
                Copy reply
              </button>
            </div>

          </div>
        )}
      </section>

      {/* How it works */}
      <section id="how" className="px-6 pb-24 max-w-4xl mx-auto">
        <p className="text-xs text-white/30 uppercase tracking-widest text-center mb-12">How it works</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { step: '01', title: 'Paste the message', desc: 'Copy any suspicious recruiter message from WhatsApp, LinkedIn, email, or Telegram.' },
            { step: '02', title: 'AI analyzes it', desc: '5 specialized agents scan for scam keywords, fake companies, urgency tactics, and manipulation patterns.' },
            { step: '03', title: 'Get your verdict', desc: 'Receive a 0–100 risk score, a plain-language explanation, and a safe reply to send back.' },
          ].map(item => (
            <div key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
              <span className="text-4xl font-bold text-white/10">{item.step}</span>
              <h3 className="text-base font-semibold mt-3 mb-2">{item.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-white/20">
        InternTrap AI · General Sir John Kotelawala Defence University · Built to protect students
      </footer>

    </main>
  )
}