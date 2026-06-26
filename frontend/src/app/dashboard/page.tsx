'use client'
import { useState } from 'react'
const stats = [
  { label: 'Total Scams Detected', value: '1,284', change: '+12% this week' },
  { label: 'Students Protected', value: '3,921', change: '+8% this week' },
  { label: 'Avg Risk Score', value: '73', change: 'High risk average' },
  { label: 'Safe Replies Sent', value: '892', change: '+5% this week' },
]

const recentScams = [
  { platform: 'WhatsApp', company: 'Fake Google LLC', score: 94, time: '2 mins ago' },
  { platform: 'LinkedIn', company: 'XYZ Recruiters', score: 78, time: '15 mins ago' },
  { platform: 'Email', company: 'Amazon Internships', score: 88, time: '32 mins ago' },
  { platform: 'Telegram', company: 'Tech Startup SL', score: 61, time: '1 hour ago' },
  { platform: 'WhatsApp', company: 'Global HR Solutions', score: 91, time: '2 hours ago' },
]

const platformData = [
  { name: 'WhatsApp', percentage: 42, color: '#22c55e' },
  { name: 'LinkedIn', percentage: 28, color: '#3b82f6' },
  { name: 'Email', percentage: 18, color: '#f59e0b' },
  { name: 'Telegram', percentage: 12, color: '#8b5cf6' },
]

const weeklyData = [
  { day: 'Mon', scams: 45 },
  { day: 'Tue', scams: 72 },
  { day: 'Wed', scams: 58 },
  { day: 'Thu', scams: 91 },
  { day: 'Fri', scams: 84 },
  { day: 'Sat', scams: 38 },
  { day: 'Sun', scams: 29 },
]

const maxScams = Math.max(...weeklyData.map(d => d.scams))

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'recent'>('overview')

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-green-400'
  }

  const getScoreBg = (score: number) => {
    if (score >= 70) return 'bg-red-500/10 border-red-500/20'
    if (score >= 40) return 'bg-yellow-500/10 border-yellow-500/20'
    return 'bg-green-500/10 border-green-500/20'
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">

      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center text-sm">
              🛡️
            </div>
            <span className="font-semibold tracking-tight">InternTrap AI</span>
            <span className="text-white/20 text-sm">/</span>
            <span className="text-white/40 text-sm">Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
              Live monitoring
            </div>
            <a href="/" className="px-4 py-2 rounded-lg border border-white/10 text-sm text-white/50 hover:text-white hover:border-white/30 transition-all">
              ← Analyzer
            </a>
          </div>
        </div>
      </nav>
      <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight mb-2">University Dashboard</h1>
          <p className="text-white/40 text-sm">Real-time scam threat intelligence for KDU career services</p>
        </div>

        <div className="flex gap-1 mb-8 p-1 rounded-xl bg-white/5 w-fit">
          {(['overview', 'recent'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                activeTab === tab ? 'bg-white text-black' : 'text-white/40 hover:text-white'
              }`}
            >
              {tab === 'overview' ? 'Overview' : 'Recent Scams'}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <p className="text-xs text-white/30 uppercase tracking-widest mb-3">{stat.label}</p>
                  <p className="text-3xl font-bold tabular-nums mb-1">{stat.value}</p>
                  <p className="text-xs text-white/30">{stat.change}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Scams detected this week</p>
                <div className="flex items-end gap-3 h-32">
                  {weeklyData.map((d, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                      <div
                        className="w-full rounded-t-md bg-white/10 hover:bg-red-500/40 transition-colors"
                        style={{ height: `${(d.scams / maxScams) * 100}%` }}
                      />
                      <span className="text-xs text-white/30">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-xs text-white/30 uppercase tracking-widest mb-6">Scams by platform</p>
                <div className="space-y-4">
                  {platformData.map((p, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm text-white/60">{p.name}</span>
                        <span className="text-sm font-semibold">{p.percentage}%</span>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${p.percentage}%`, backgroundColor: p.color }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5 flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 flex-shrink-0">!</div>
              <div>
                <p className="text-sm font-semibold text-red-400 mb-0.5">Active threat alert</p>
                <p className="text-xs text-white/40">Spike in WhatsApp scams targeting KDU students detected in the last 24 hours. Fake Google and Amazon internship offers are circulating.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recent' && (
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden">
            <div className="p-6 border-b border-white/5">
              <p className="text-xs text-white/30 uppercase tracking-widest">Recent scam reports</p>
            </div>
            <div className="divide-y divide-white/5">
              {recentScams.map((scam, i) => (
                <div key={i} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs text-white/40">
                      {scam.platform[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{scam.company}</p>
                      <p className="text-xs text-white/30">{scam.platform} · {scam.time}</p>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded-lg border text-xs font-semibold ${getScoreBg(scam.score)} ${getScoreColor(scam.score)}`}>
                    {scam.score}/100
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-white/5 px-6 py-8 text-center text-xs text-white/20">
        InternTrap AI · General Sir John Kotelawala Defence University · Built to protect students
      </footer>

    </main>
  )
}