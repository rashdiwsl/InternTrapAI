"use client";

import { useState } from "react";
import type { AnalysisResult } from "@/lib/analyzeScam";

const EXAMPLE =
  "You have been chosen for an exclusive internship opportunity. Please pay a deposit of LKR 5000 to secure your position. Respond ASAP as only 1 slot remaining.";

const levelStyles: Record<string, { text: string; bar: string; badge: string }> = {
  "LOW RISK": {
    text: "text-risk-low",
    bar: "bg-risk-low",
    badge: "text-risk-low border-risk-low/40 bg-risk-low/10",
  },
  "MEDIUM RISK": {
    text: "text-risk-medium",
    bar: "bg-risk-medium",
    badge: "text-risk-medium border-risk-medium/40 bg-risk-medium/10",
  },
  "HIGH RISK": {
    text: "text-risk-high",
    bar: "bg-risk-high",
    badge: "text-risk-high border-risk-high/40 bg-risk-high/10",
  },
};

export default function Analyzer() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  async function handleAnalyze() {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Something went wrong");
      setResult(data);
    } catch (e: any) {
      setError(e.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result) return;
    navigator.clipboard.writeText(result.safeReply);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  const styles = result ? levelStyles[result.level] : null;

  return (
    <div id="analyze" className="container-narrow px-6 pb-24">
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs tracking-widest text-muted font-medium">
            PASTE SUSPICIOUS MESSAGE
          </span>
          <button
            onClick={() => setMessage(EXAMPLE)}
            className="pill text-xs text-muted px-3 py-1.5 hover:text-white hover:border-white/30 transition-colors"
          >
            Try an example ↓
          </button>
        </div>

        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Paste the recruiter message, job offer, or chat here…"
          rows={5}
          className="w-full bg-transparent resize-none text-[15px] leading-relaxed placeholder:text-muted/60 focus:outline-none"
        />

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <span className="text-xs text-muted">{message.length} characters</span>
          <button
            onClick={handleAnalyze}
            disabled={loading || !message.trim()}
            className="bg-white text-black font-medium text-sm px-5 py-2.5 rounded-md hover:bg-white/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Analyzing…" : "Analyze Message →"}
          </button>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-risk-high">{error}</p>
      )}

      {result && styles && (
        <div className="mt-6 space-y-6">
          <div className="card p-6">
            <span className="text-xs tracking-widest text-muted font-medium">
              SCAM RISK SCORE
            </span>
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-baseline gap-2">
                <span className={`text-5xl font-bold ${styles.text}`}>
                  {result.score}
                </span>
                <span className="text-muted text-lg">/100</span>
              </div>
              <span
                className={`pill border px-3 py-1 text-xs font-semibold tracking-wide ${styles.badge}`}
              >
                {result.level}
              </span>
            </div>
            <div className="mt-4 h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${styles.bar} transition-all duration-500`}
                style={{ width: `${result.score}%` }}
              />
            </div>
          </div>

          <div className="card p-6">
            <span className="text-xs tracking-widest text-muted font-medium">
              WHY IT WAS FLAGGED
            </span>
            <ul className="mt-4 space-y-3">
              {result.flags.length === 0 && (
                <li className="text-sm text-muted">
                  No red flags detected by our agents — but always verify unfamiliar
                  recruiters independently.
                </li>
              )}
              {result.flags.map((flag) => (
                <li key={flag.id} className="flex items-start gap-3 text-sm">
                  <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-risk-high/20 text-risk-high text-[10px] font-bold">
                    !
                  </span>
                  <span>
                    <span className="text-white">{flag.label}</span>
                    <span className="text-muted"> — {flag.detail}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="card p-6">
            <span className="text-xs tracking-widest text-muted font-medium">
              SUGGESTED SAFE REPLY
            </span>
            <p className="mt-4 text-[15px] leading-relaxed text-white/90">
              {result.safeReply}
            </p>
            <button
              onClick={handleCopy}
              className="pill mt-4 text-xs px-4 py-2 text-muted hover:text-white hover:border-white/30 transition-colors"
            >
              {copied ? "Copied ✓" : "Copy reply"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
