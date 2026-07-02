export type Flag = {
  id: string;
  agent: string;
  label: string;
  detail: string;
  weight: number;
};

export type AnalysisResult = {
  score: number;
  level: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK";
  flags: Flag[];
  agentsRun: number;
  safeReply: string;
  charCount: number;
};

type Agent = {
  name: string;
  run: (text: string) => Flag | null;
};

const lower = (s: string) => s.toLowerCase();

const URGENCY_PATTERNS = [
  /\basap\b/i,
  /\burgent(ly)?\b/i,
  /\bact now\b/i,
  /\brespond (immediately|now|asap)\b/i,
  /\bwithin (the next )?\d+\s?(hours?|minutes?|hrs?)\b/i,
  /\btoday only\b/i,
  /\bexpires? (today|soon|in)\b/i,
  /\bhurry\b/i,
  /\btime[- ]sensitive\b/i,
];

const PAYMENT_PATTERNS = [
  /\bpay(ment)?\b.{0,25}\b(deposit|fee|charge|registration|processing)\b/i,
  /\bdeposit of\b/i,
  /\bregistration fee\b/i,
  /\bprocessing fee\b/i,
  /\bsecurity fee\b/i,
  /\bsend (money|cash|funds)\b/i,
  /\b(bank transfer|western union|crypto|bitcoin|gift card)\b/i,
  /\b(lkr|usd|inr|rs\.?)\s?\d+/i,
  /\bto secure your (position|spot|internship|placement)\b/i,
];

const UNSOLICITED_PATTERNS = [
  /\byou have been (selected|chosen|shortlisted)\b/i,
  /\bcongratulations,? you\b/i,
  /\bexclusive (internship|opportunity)\b/i,
  /\bwe found your (resume|cv|profile)\b/i,
  /\byou did not apply\b/i,
];

const SCARCITY_PATTERNS = [
  /\bonly \d+\s?(slot|spot|seat|position)s?\s?(remaining|left)?\b/i,
  /\blimited (slots?|seats?|spots?|time)\b/i,
  /\bfirst come,? first served\b/i,
  /\blast chance\b/i,
  /\bfew (slots?|spots?) left\b/i,
];

const VERIFICATION_MISSING_SIGNS = [
  /\bno (company|official) (email|website|registration)\b/i,
];

const HAS_OFFICIAL_DOMAIN = /@[a-z0-9.-]+\.(com|org|net|edu|gov)\b/i;
const HAS_REGISTRATION_NUMBER = /\b(reg(istration)?\.?\s?no\.?|company registration)\b/i;
const HAS_LINKEDIN = /linkedin\.com/i;

function firstMatch(text: string, patterns: RegExp[]): RegExp | null {
  for (const p of patterns) {
    if (p.test(text)) return p;
  }
  return null;
}

const agents: Agent[] = [
  {
    name: "Urgency Agent",
    run: (text) => {
      const m = firstMatch(text, URGENCY_PATTERNS);
      if (!m) return null;
      return {
        id: "urgency",
        agent: "Urgency Agent",
        label: "Urgent language detected",
        detail: "Pressure tactic to rush your decision",
        weight: 22,
      };
    },
  },
  {
    name: "Payment Agent",
    run: (text) => {
      const m = firstMatch(text, PAYMENT_PATTERNS);
      if (!m) return null;
      return {
        id: "payment",
        agent: "Payment Agent",
        label: "Payment request detected",
        detail: "Legitimate companies never charge applicants",
        weight: 32,
      };
    },
  },
  {
    name: "Unsolicited Offer Agent",
    run: (text) => {
      const m = firstMatch(text, UNSOLICITED_PATTERNS);
      if (!m) return null;
      return {
        id: "unsolicited",
        agent: "Unsolicited Offer Agent",
        label: "Unsolicited job offer pattern",
        detail: "you did not apply for this role",
        weight: 18,
      };
    },
  },
  {
    name: "Scarcity Agent",
    run: (text) => {
      const m = firstMatch(text, SCARCITY_PATTERNS);
      if (!m) return null;
      return {
        id: "scarcity",
        agent: "Scarcity Agent",
        label: "False scarcity tactic",
        detail: "creating artificial pressure with limited slots",
        weight: 18,
      };
    },
  },
  {
    name: "Verification Agent",
    run: (text) => {
      const hasDomain = HAS_OFFICIAL_DOMAIN.test(text);
      const hasReg = HAS_REGISTRATION_NUMBER.test(text);
      const hasLinkedIn = HAS_LINKEDIN.test(text);
      if (hasDomain || hasReg || hasLinkedIn) return null;
      return {
        id: "verification",
        agent: "Verification Agent",
        label: "No verifiable company details",
        detail: "no official email domain, registration number, or LinkedIn profile mentioned",
        weight: 10,
      };
    },
  },
];

export function analyzeMessage(rawText: string): AnalysisResult {
  const text = rawText.trim();
  const flags: Flag[] = [];

  // Run the four active-signal agents first.
  for (const agent of agents.filter((a) => a.name !== "Verification Agent")) {
    const result = agent.run(text);
    if (result) flags.push(result);
  }

  // The Verification Agent is a fallback check: it only surfaces when none
  // of the other agents found an active red flag, so a quiet, generic
  // message without any way to verify the sender still gets flagged.
  const verificationAgent = agents.find((a) => a.name === "Verification Agent")!;
  if (flags.length === 0) {
    const result = verificationAgent.run(text);
    if (result) flags.push(result);
  }

  let score = flags.reduce((sum, f) => sum + f.weight, 0);
  score = Math.min(100, score);

  // A message with almost nothing suspicious and some length gets a small baseline reduction
  if (flags.length === 0 && text.length > 0) {
    score = Math.max(score, 5);
  }

  const level: AnalysisResult["level"] =
    score >= 70 ? "HIGH RISK" : score >= 35 ? "MEDIUM RISK" : "LOW RISK";

  const safeReply = buildSafeReply(flags);

  return {
    score,
    level,
    flags,
    agentsRun: agents.length,
    safeReply,
    charCount: text.length,
  };
}

function buildSafeReply(flags: Flag[]): string {
  const hasPayment = flags.some((f) => f.id === "payment");
  const hasVerification = flags.some((f) => f.id === "verification");

  if (flags.length === 0) {
    return "Thank you for reaching out. Could you share more details about the role, the team, and next steps so I can review the opportunity?";
  }

  if (hasPayment || hasVerification) {
    return "Thank you for reaching out. Before I proceed, could you please share your official company registration number, your LinkedIn profile, and a company email address I can verify this offer through?";
  }

  return "Thank you for reaching out. Could you confirm this offer through your official company email or LinkedIn page before I respond further?";
}
