import Link from "next/link";
import { Sparkles, Copy, ArrowRight, Check, Zap, Shield, Layers } from "lucide-react";
import { PromptCard } from "@/components/PromptCard";

export const metadata = {
  title: "THE PROMPT VAULT | 1,000+ Premium AI Prompts",
  description: "Unlock 1,000+ premium AI prompts for ChatGPT, Claude, and Gemini. One-time payment of IDR 8,000.",
};

const SNEAK_PEEK = [
  {
    category: "TikTok Affiliate",
    title: "Viral TikTok Hook Generator",
    content:
      "Write a 15-second TikTok hook script for an affiliate product about [product name] that starts with a shocking statistic and ends with a strong curiosity gap to make viewers stop scrolling.",
  },
  {
    category: "Copywriting",
    title: "High-Converting FB Ad Framework",
    content:
      "Write a Facebook ad headline and primary text for [product/service] targeting [audience] that uses the 'Problem → Solution → Result' framework, with a CTA button label that drives immediate clicks.",
  },
  {
    category: "Product Launch",
    title: "H-7 Launch Day Checklist",
    content:
      "Create a detailed 7-day pre-launch countdown plan for [product name] targeting [audience]. Include daily tasks, content schedule, email sequences, and urgency triggers for each day.",
  },
];

const FEATURES = [
  {
    icon: <Zap className="w-5 h-5" />,
    label: "Instant Access",
    desc: "Unlock immediately after payment — no waiting.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    label: "Secure QRIS",
    desc: "Powered by Midtrans — 100% safe & encrypted.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    label: "10 Categories",
    desc: "1,000+ curated prompts across every use case.",
  },
];

const STATS = [
  { value: "1,000+", label: "Premium Prompts" },
  { value: "10", label: "Categories" },
  { value: "3", label: "AI Platforms" },
  { value: "IDR 8K", label: "One-time Price" },
];

export default function LandingPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#fff", fontFamily: "'Geist', system-ui, sans-serif" }}>

      {/* ────── NAV ────── */}
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #EBEBEB",
      }}>
        <div style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 32px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 34, height: 34,
              borderRadius: 10,
              background: "linear-gradient(135deg, #22C55E, #16A34A)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 12px rgba(34,197,94,0.30)",
            }}>
              <Sparkles style={{ width: 16, height: 16, color: "#fff" }} />
            </div>
            <span style={{ fontWeight: 600, fontSize: 15, color: "#111", letterSpacing: "-0.02em" }}>
              Prompt Vault
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <button className="preview-btn" style={{
                fontSize: 13, fontWeight: 500, color: "#71717A",
                background: "none", border: "none", cursor: "pointer", padding: "6px 12px",
              }}>
                Preview Dashboard
              </button>
            </Link>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <button style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                background: "#111", color: "#fff",
                fontSize: 13, fontWeight: 600,
                padding: "10px 20px", borderRadius: 100, border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
                transition: "all 0.18s ease",
              }}>
                Get Access <ArrowRight style={{ width: 14, height: 14 }} />
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ────── HERO ────── */}
      <section className="hero-section" style={{
        maxWidth: 860,
        margin: "0 auto",
        padding: "96px 32px 80px",
        textAlign: "center",
      }}>
        {/* Availability pill */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: 12, fontWeight: 600,
          padding: "6px 16px", borderRadius: 100,
          background: "#F0FDF4", color: "#15803D",
          border: "1px solid #BBF7D0",
          marginBottom: 32,
          letterSpacing: "0.01em",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22C55E",
            animation: "pulse 2s infinite",
          }} />
          Now Available — IDR 8.000 Lifetime Access
        </div>

        <h1 style={{
          fontSize: "clamp(46px, 6vw, 76px)",
          fontWeight: 800,
          fontFamily: "'Geist', system-ui, sans-serif",
          lineHeight: 1.1,
          letterSpacing: "-0.05em",
          color: "#111",
          marginBottom: 24,
        }}>
          The Ultimate{" "}
          <span style={{
            color: "#22C55E",
            background: "linear-gradient(135deg, #22C55E, #16A34A)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            AI Prompt
          </span>
          <br />
          Bank for Creators
        </h1>

        <p style={{
          fontSize: 18,
          lineHeight: 1.7,
          color: "#71717A",
          maxWidth: 560,
          margin: "0 auto 40px",
        }}>
          Over 1,000 battle-tested prompts across 10 categories — ready to paste into ChatGPT,
          Claude, and Gemini. Stop guessing. Start getting results.
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "#111", color: "#fff",
              fontSize: 15, fontWeight: 600,
              padding: "16px 32px", borderRadius: 100, border: "none", cursor: "pointer",
              boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
            }}>
              Access the Vault <ArrowRight style={{ width: 16, height: 16 }} />
            </button>
          </Link>
          <div style={{ fontSize: 14, color: "#A1A1AA" }}>
            One-time payment ·{" "}
            <span style={{ fontWeight: 600, fontSize: 16, color: "#111" }}>IDR 8.000</span>
          </div>
        </div>
      </section>

      {/* ────── STATS ROW ────── */}
      <section style={{
        maxWidth: 960,
        margin: "0 auto 80px",
        padding: "0 32px",
      }}>
        <div className="stats-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "#EBEBEB",
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #EBEBEB",
        }}>
          {STATS.map((s) => (
            <div key={s.label} style={{
              background: "#fff",
              padding: "28px 24px",
              textAlign: "center",
            }}>
              <div style={{
                fontSize: 32, fontWeight: 700,
                fontFamily: "'Geist', system-ui, sans-serif",
                color: "#111", letterSpacing: "-0.04em",
                lineHeight: 1.1, marginBottom: 6,
              }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#A1A1AA", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── FEATURES ────── */}
      <section style={{
        maxWidth: 960,
        margin: "0 auto 80px",
        padding: "0 32px",
      }}>
        <div className="features-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
        }}>
          {FEATURES.map((f) => (
            <div key={f.label} style={{
              background: "#fff",
              border: "1px solid #EBEBEB",
              borderRadius: 16,
              padding: "28px 24px",
              display: "flex", gap: 16, alignItems: "flex-start",
              boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: "#F0FDF4", color: "#16A34A",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                {f.icon}
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: "#111", marginBottom: 4 }}>{f.label}</p>
                <p style={{ fontSize: 13, color: "#71717A", lineHeight: 1.5 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ────── SAMPLE PROMPTS ────── */}
      <section style={{
        maxWidth: 1100,
        margin: "0 auto 80px",
        padding: "0 32px",
      }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p style={{
            fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
            textTransform: "uppercase", color: "#22C55E", marginBottom: 12,
          }}>
            Sample Prompts
          </p>
          <h2 style={{
            fontSize: 36, fontWeight: 700, color: "#111",
            fontFamily: "'Geist', system-ui, sans-serif",
            letterSpacing: "-0.04em", marginBottom: 12,
          }}>
            A glimpse of what&apos;s inside
          </h2>
          <p style={{ fontSize: 15, color: "#71717A" }}>
            1,000+ more prompts await after access.
          </p>
        </div>

        <div className="prompts-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 24,
        }}>
          {SNEAK_PEEK.map((p, i) => (
            <div key={i} style={{ height: "100%" }}>
              <PromptCard 
                id={i} 
                title={p.title} 
                category={p.category} 
                content={p.content} 
              />
            </div>
          ))}
        </div>
      </section>

      {/* ────── CTA BANNER ────── */}
      <section style={{ maxWidth: 1100, margin: "0 auto 48px", padding: "0 32px" }}>
        <div style={{
          background: "linear-gradient(135deg, #22C55E 0%, #16A34A 100%)",
          borderRadius: 24,
          padding: "56px 48px",
          textAlign: "center",
          boxShadow: "0 12px 40px rgba(34,197,94,0.28)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Decorative circles */}
          <div style={{
            position: "absolute", top: -40, right: -40,
            width: 200, height: 200, borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
          }} />
          <div style={{
            position: "absolute", bottom: -60, left: -20,
            width: 260, height: 260, borderRadius: "50%",
            background: "rgba(255,255,255,0.05)",
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              fontWeight: 700, color: "#fff",
              fontFamily: "'Geist', system-ui, sans-serif",
              letterSpacing: "-0.04em", marginBottom: 12,
            }}>
              Ready to unlock 1,000+ prompts?
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,0.80)", marginBottom: 32 }}>
              One-time payment. Instant access. No subscription.
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <Link href="/dashboard" style={{ textDecoration: "none" }}>
                <button style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#fff", color: "#111",
                  fontSize: 15, fontWeight: 600,
                  padding: "16px 32px", borderRadius: 100, border: "none", cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                }}>
                  Get Access — IDR 8.000 <ArrowRight style={{ width: 16, height: 16 }} />
                </button>
              </Link>

              <div style={{
                display: "flex", alignItems: "center", gap: 20,
                fontSize: 13, color: "rgba(255,255,255,0.85)", fontWeight: 500,
              }}>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Check style={{ width: 14, height: 14 }} /> No subscription
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <Check style={{ width: 14, height: 14 }} /> Lifetime access
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ────── FOOTER ────── */}
      <footer style={{
        textAlign: "center",
        padding: "24px 32px 40px",
        fontSize: 12, color: "#A1A1AA",
        borderTop: "1px solid #EBEBEB",
      }}>
        © 2026 Prompt Vault · Built for ChatGPT, Claude &amp; Gemini
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @media (max-width: 768px) {
          .hero-section { padding: 64px 20px 40px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .prompts-grid { grid-template-columns: 1fr !important; }
          .preview-btn { display: none !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}