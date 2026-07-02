import Analyzer from "@/components/Analyzer";

export default function Home() {
  return (
    <main>
      <section className="container-narrow px-6 pt-24 pb-16 text-center">
        <span className="pill inline-flex items-center gap-2 px-4 py-1.5 text-xs text-muted mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-risk-low" />
          AI-powered scam detection — active
        </span>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
          Don&apos;t fall for
          <br />
          <span className="text-white/30">fake internships.</span>
        </h1>

        <p className="mt-6 text-muted text-base md:text-lg max-w-xl mx-auto leading-relaxed">
          Paste any suspicious job offer or recruiter message. Our AI analyzes
          it across 5 specialized agents and gives you an instant scam risk
          score.
        </p>

        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted">
          <span>
            <span className="text-white font-semibold">5</span> AI Agents
          </span>
          <span className="h-4 w-px bg-border" />
          <span>
            <span className="text-white font-semibold">60–80%</span> Scam
            reduction
          </span>
          <span className="h-4 w-px bg-border" />
          <span>
            <span className="text-white font-semibold">4</span> Platforms
          </span>
        </div>
      </section>

      <Analyzer />
    </main>
  );
}
