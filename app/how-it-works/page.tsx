const AGENTS = [
  {
    name: "Urgency Agent",
    detail:
      "Scans for pressure language like “ASAP”, countdowns, and artificial deadlines meant to rush your decision.",
  },
  {
    name: "Payment Agent",
    detail:
      "Flags any request for a deposit, registration fee, or money transfer — legitimate employers never charge applicants.",
  },
  {
    name: "Unsolicited Offer Agent",
    detail:
      "Detects offers sent to people who never applied, a common pattern in mass-messaged scam campaigns.",
  },
  {
    name: "Scarcity Agent",
    detail:
      "Looks for false-scarcity tactics — “only 1 slot left” — designed to short-circuit careful thinking.",
  },
  {
    name: "Verification Agent",
    detail:
      "Checks whether the message includes a verifiable company domain, registration number, or LinkedIn profile.",
  },
];

export default function HowItWorks() {
  return (
    <main className="container-narrow px-6 py-20">
      <h1 className="text-4xl font-bold tracking-tight mb-4">How it works</h1>
      <p className="text-muted max-w-xl mb-12 leading-relaxed">
        Every message you submit is run through five specialized detection
        agents. Each agent looks for one specific scam pattern, and their
        combined findings produce your scam risk score out of 100.
      </p>

      <div className="space-y-4">
        {AGENTS.map((agent, i) => (
          <div key={agent.name} className="card p-6 flex gap-4">
            <span className="text-muted text-sm font-mono mt-0.5">
              0{i + 1}
            </span>
            <div>
              <h2 className="font-semibold">{agent.name}</h2>
              <p className="text-sm text-muted mt-1 leading-relaxed">
                {agent.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
