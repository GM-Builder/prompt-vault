"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDashboard } from "./context";
import { PromptCard } from "@/components/PromptCard";
import { CampaignBanner } from "@/components/CampaignBanner";
import { PromptSidePanel } from "@/components/PromptSidePanel";
import { PricingModal } from "@/components/PricingModal";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Loader2, SearchX, Layers } from "lucide-react";

interface Prompt {
  id: number;
  category: string;
  title: string;
  content: string;
  isPremium: boolean;
  tags?: string[];
}

interface ApiResponse {
  items: Prompt[];
  total: number;
  page: number;
  totalPages: number;
}

const PAGE_SIZE = 24;

export default function DashboardPage() {
  const { activeCategory, searchQuery } = useDashboard();
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { user, isLoaded } = useUser();
  const gridRef = useRef<HTMLDivElement>(null);

  const isPaid = user?.publicMetadata?.isPaid === true;

  const fetchPrompts = useCallback(async (pg: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(pg), limit: String(PAGE_SIZE) });
      if (activeCategory !== "All") params.set("category", activeCategory);
      if (searchQuery.trim()) params.set("q", searchQuery.trim());
      const res = await fetch(`/api/prompts?${params}`);
      const json: ApiResponse = await res.json();
      setData(json);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, searchQuery]);

  useEffect(() => { setPage(1); }, [activeCategory, searchQuery]);
  useEffect(() => { fetchPrompts(page); }, [fetchPrompts, page]);

  const goToPage = (n: number) => {
    setPage(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPages = (current: number, total: number) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages: (number | "…")[] = [];
    if (current <= 4) {
      pages.push(1, 2, 3, 4, 5, "…", total);
    } else if (current >= total - 3) {
      pages.push(1, "…", total - 4, total - 3, total - 2, total - 1, total);
    } else {
      pages.push(1, "…", current - 1, current, current + 1, "…", total);
    }
    return pages;
  };

  return (
    <div style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
      <CampaignBanner />

      {/* ── Page Header ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 40, // More spacing
        marginTop: 12,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ 
                width: 52, height: 52, borderRadius: 16, background: "#fff", 
                border: "1px solid rgba(0,0,0,0.05)", display: "flex", 
                alignItems: "center", justifyContent: "center",
                boxShadow: "0 10px 25px -10px rgba(0,0,0,0.05)"
            }}>
                <Layers style={{ width: 24, height: 24, color: "#10B981" }} />
            </div>
            <div>
            <h1 style={{
                fontSize: 38,
                fontWeight: 900,
                letterSpacing: "-0.06em",
                color: "#1E293B",
                lineHeight: 1,
                marginBottom: 10,
                margin: 0
            }}>
                {activeCategory === "All" ? "Featured Vault" : activeCategory}
            </h1>
            <p style={{
                fontSize: 15, color: "#94A3B8", fontWeight: 600,
                letterSpacing: "-0.01em", margin: 0, marginTop: 4
            }}>
                {loading
                ? "Synchronizing collection..."
                : data
                    ? `${data.total.toLocaleString()} unique prompts curated for you`
                    : ""}
            </p>
            </div>
        </div>

        {loading && (
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 13, fontWeight: 700,
            padding: "10px 20px", borderRadius: 100,
            color: "#059669", background: "#ECFDF5", border: "1px solid #D1FAE5",
          }}>
            <Loader2 style={{ width: 14, height: 14, animation: "spin 1s linear infinite" }} />
            Live Update
          </div>
        )}
      </div>

      {/* ── Empty State ── */}
      {!loading && data && data.items.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "120px 40px",
          borderRadius: 40,
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.04)",
          color: "#64748B",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 50px rgba(0,0,0,0.02)"
        }}>
          <div style={{ 
            width: 80, height: 80, borderRadius: 24, background: "#F8FAFC", 
            display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32 
          }}>
            <SearchX style={{ width: 40, height: 40, color: "#94A3B8" }} />
          </div>
          <h3 style={{
            fontWeight: 900, fontSize: 24,
            color: "#0F172A", marginBottom: 12,
            letterSpacing: "-0.04em"
          }}>
            Collection Not Found
          </h3>
          <p style={{
            fontSize: 16,
            maxWidth: 400,
            lineHeight: 1.7,
            margin: "0 auto",
            color: "#64748B",
            fontWeight: 500
          }}>
            Kami tidak dapat menemukan hasil untuk pencarian Anda. Coba hapus filter atau gunakan kata kunci yang berbeda.
          </p>
        </div>
      )}

      {/* ── Card Grid ── */}
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 32, // Increased gap for airy lux feel
        }}
        className="prompt-grid"
      >
        {loading &&
          Array.from({ length: 6 }).map((_, i) => (
            <div key={`sk-${i}`} style={{
              background: "#fff",
              border: "1px solid rgba(0,0,0,0.04)",
              borderRadius: 28,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 18,
              height: 420
            }}>
              <div className="skeleton" style={{ height: 180, borderRadius: 22, width: "100%" }} />
              <div style={{ padding: "0 8px" }}>
                <div className="skeleton" style={{ height: 28, width: "80%", marginBottom: 16 }} />
                <div className="skeleton" style={{ height: 16, width: "95%", marginBottom: 10 }} />
                <div className="skeleton" style={{ height: 16, width: "70%" }} />
              </div>
              <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", padding: "16px 8px" }}>
                <div className="skeleton" style={{ height: 14, width: 70 }} />
                <div className="skeleton" style={{ height: 38, width: 90, borderRadius: 100 }} />
              </div>
            </div>
          ))}

        {!loading &&
          data?.items.map((prompt, i) => (
            <div
              key={prompt.id}
              className="animate-fadein-up"
              style={{ animationDelay: `${(i % 12) * 40}ms` }}
            >
              <PromptCard 
                {...prompt} 
                isLocked={!isPaid}
                onSelect={() => {
                  if (!isPaid) {
                    setShowPricingModal(true);
                  } else {
                    setSelectedPrompt(prompt);
                  }
                }} 
              />
            </div>
          ))}
      </div>

      <PromptSidePanel prompt={selectedPrompt} onClose={() => setSelectedPrompt(null)} />
      
      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
      />

      {/* ── Pagination ── */}
      {!loading && data && data.totalPages > 1 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          marginTop: 80,
          paddingBottom: 60,
        }}>
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 14, fontWeight: 800,
              padding: "12px 24px", borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff", color: page <= 1 ? "#cbd5e1" : "#1e293b",
              cursor: page <= 1 ? "not-allowed" : "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="pg-btn"
          >
            <ChevronLeft style={{ width: 18, height: 18 }} /> Prev
          </button>

          <div style={{ display: "flex", gap: 8, background: "rgba(0,0,0,0.04)", padding: 8, borderRadius: 22 }}>
            {getPages(page, data.totalPages).map((n, i) =>
              n === "…" ? (
                <span key={`ellipsis-${i}`} style={{
                  width: 44, height: 44, display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 15, color: "#94A3B8", fontWeight: 800,
                }}>…</span>
              ) : (
                <button
                  key={n}
                  onClick={() => goToPage(Number(n))}
                  style={{
                    width: 44, height: 44,
                    borderRadius: 16,
                    fontSize: 14,
                    fontWeight: 900,
                    border: "none",
                    background: n === page ? "#0F172A" : "transparent",
                    color: n === page ? "#fff" : "#64748B",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                  className="pg-num"
                >
                  {n}
                </button>
              )
            )}
          </div>

          <button
            disabled={page >= data.totalPages}
            onClick={() => goToPage(page + 1)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              fontSize: 14, fontWeight: 800,
              padding: "12px 24px", borderRadius: 18,
              border: "1px solid rgba(0,0,0,0.08)",
              background: "#fff", color: page >= data.totalPages ? "#cbd5e1" : "#1e293b",
              cursor: page >= data.totalPages ? "not-allowed" : "pointer",
              transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
            className="pg-btn"
          >
            Next <ChevronRight style={{ width: 18, height: 18 }} />
          </button>
        </div>
      )}

      <style jsx global>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .skeleton { background: #f1f5f9; animation: skeleton-pulse 1.5s infinite linear; }
        @keyframes skeleton-pulse { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }
        .pg-btn:hover:not(:disabled) { background: #0F172A; color: #fff; border-color: #0F172A; transform: scale(1.05); }
        .pg-num:hover:not([style*="background: rgb(15, 23, 42)"]) { background: rgba(0,0,0,0.06); color: #0F172A; }
        
        @media (max-width: 1200px) {
          .prompt-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 20px !important; }
        }
        @media (max-width: 820px) {
          .prompt-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 620px) {
          .prompt-grid { grid-template-columns: 1fr !important; gap: 24px !important; }
        }
      `}</style>
    </div>
  );
}