const STATS = [
  { label: "Messages analyzed", value: "1,284" },
  { label: "High risk flagged", value: "412" },
  { label: "Avg. risk score", value: "47" },
  { label: "Universities onboard", value: "4" },
];

const RECENT = [
  { text: "Exclusive internship — pay deposit to secure your position…", score: 90, level: "HIGH RISK" },
  { text: "We'd like to invite you to interview for our summer program…", score: 12, level: "LOW RISK" },
  { text: "Congratulations, you've been selected! Respond within 2 hours…", score: 76, level: "HIGH RISK" },
  { text: "Thanks for applying — our team will review and follow up…", score: 8, level: "LOW RISK" },
];

const levelColor: Record<string, string> = {
  "HIGH RISK": "text-risk-high border-risk-high/40 bg-risk-high/10",
  "MEDIUM RISK": "text-risk-medium border-risk-medium/40 bg-risk-medium/10",
  "LOW RISK": "text-risk-low border-risk-low/40 bg-risk-low/10",
};

export default function Dashboard() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-1">Dashboard</h1>
      <p className="text-muted text-sm mb-10">
        Overview of scam detection activity across connected platforms.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {STATS.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="text-2xl font-bold">{s.value}</div>
            <div className="text-xs text-muted mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <span className="text-xs tracking-widest text-muted font-medium">
          RECENT ANALYSES
        </span>
        <div className="mt-4 divide-y divide-border">
          {RECENT.map((r, i) => (
            <div
              key={i}
              className="py-4 flex items-center justify-between gap-4"
            >
              <p className="text-sm text-white/90 truncate">{r.text}</p>
              <span
                className={`shrink-0 pill border px-3 py-1 text-xs font-semibold ${levelColor[r.level]}`}
              >
                {r.score} · {r.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
