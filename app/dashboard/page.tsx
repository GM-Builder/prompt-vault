"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDashboard } from "./context";
import { PromptCard } from "@/components/PromptCard";
import { 
  DashboardBanner, 
  CampaignPopup, 
  ReferralWidget,
  CampaignChallengeSection,
  CampaignFloatingBadge,
  CampaignRulesDetail,
  LeaderboardView
} from "@/components/VideoCampaignBanner";
import { PromptSidePanel } from "@/components/PromptSidePanel";
import { PricingModal } from "@/components/PricingModal";
import { DashboardPreviewBanner } from "@/components/DashboardPreviewBanner";
import { SettingsView } from "@/components/SettingsView";
import { WithdrawalPanel } from "@/components/WithdrawalPanel";
import { useUser } from "@clerk/nextjs";
import { ChevronLeft, ChevronRight, Loader2, SearchX, Layers } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

interface Prompt {
  id: number;
  category: string;
  title: string;
  content: string;
  isPremium: boolean;
  isLocked: boolean;
  tags?: string[];
  detail?: string;
  contentId?: string;
}

interface ApiResponse {
  items: Prompt[];
  total: number;
  page: number;
  totalPages: number;
}

const PAGE_SIZE = 24;

export default function DashboardPage() {
  return (
    <Suspense fallback={<div style={{ padding: 40, color: "#94A3B8" }}>Loading dashboard...</div>}>
      <DashboardContent />
    </Suspense>
  );
}

function DashboardContent() {
  const { activeCategory, setActiveCategory, searchQuery } = useDashboard();
  const searchParams = useSearchParams();

  // Handle category deep-link
  useEffect(() => {
    const cat = searchParams.get("category");
    if (cat && ["All", "Campaign", "Referral", "Leaderboard", "Settings"].includes(cat)) {
      setActiveCategory(cat);
    }
  }, [searchParams, setActiveCategory]);
  const [data, setData] = useState<ApiResponse | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showPricingModal, setShowPricingModal] = useState(false);
  const { user } = useUser();
  const gridRef = useRef<HTMLDivElement>(null);
  const [hasAgreedToSnK, setHasAgreedToSnK] = useState(false);

  // Load S&K agreement from localStorage
  useEffect(() => {
    const agreed = localStorage.getItem("veloprome_snk_agreed") === "true";
    setHasAgreedToSnK(agreed);
  }, []);

  const handleAgreeSnK = (val: boolean) => {
    setHasAgreedToSnK(val);
    localStorage.setItem("veloprome_snk_agreed", String(val));
  };

  const isPaid = user?.publicMetadata?.isPaid === true;

  // Strict Guard: Prevent non-paid users from manually staying in Referral Hub
  useEffect(() => {
    if (activeCategory === "Referral" && !isPaid) {
      setActiveCategory("All");
      setShowPricingModal(true);
    }
  }, [activeCategory, isPaid, setActiveCategory]);

  useEffect(() => {
    if (activeCategory === "Settings" && !isPaid) {
      setActiveCategory("All");
    }
  }, [activeCategory, isPaid, setActiveCategory]);

  const fetchPrompts = useCallback(async (pg: number) => {
    if (["Campaign", "Leaderboard", "Referral", "Settings"].includes(activeCategory)) return;
    
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

  // --- View Rendering Logic ---
  let mainContent = null;

  if (activeCategory === "Campaign") {
    mainContent = (
      <div style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
         <CampaignPopup 
            isPaid={isPaid} 
            onUpgrade={() => setShowPricingModal(true)} 
            onJoin={() => setActiveCategory("Campaign")} 
         />
         <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.06em", color: "#1E293B", marginBottom: 12 }}>Veloprome Creator Challenge</h1>
            <p style={{ fontSize: 18, color: "#64748B", fontWeight: 500 }}>Pelajari cara memenangkan total hadiah Rp 25.000.000 dengan membuat video testimoni.</p>
         </div>
         <DashboardBanner 
            isPaid={isPaid}
            onUpgrade={() => setShowPricingModal(true)}
            variant="leaderboard" 
            onJoin={() => setActiveCategory("Leaderboard")} 
         />
         
         <CampaignRulesDetail 
            isPaid={isPaid}
            onUpgrade={() => setShowPricingModal(true)}
            hasAgreed={hasAgreedToSnK}
            onAgree={handleAgreeSnK}
         />
      </div>
    );
  } else if (activeCategory === "Referral" && isPaid) {
    mainContent = (
      <div style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
         <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.06em", color: "#1E293B", marginBottom: 12 }}>Referral Hub</h1>
            <p style={{ fontSize: 18, color: "#64748B", fontWeight: 500 }}>Kelola link referral Anda dan pantau komisi yang Anda dapatkan secara real-time.</p>
         </div>
         <ReferralWidget isPaid={isPaid} onUpgrade={() => setShowPricingModal(true)} />
         <WithdrawalPanel />
      </div>
    );
  } else if (activeCategory === "Settings") {
    mainContent = <SettingsView />;
  } else if (activeCategory === "Leaderboard") {
    mainContent = (
      <div style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
         <div style={{ marginBottom: 48 }}>
            <h1 style={{ fontSize: 48, fontWeight: 900, letterSpacing: "-0.06em", color: "#1E293B", marginBottom: 12 }}>Live Ranking</h1>
            <p style={{ fontSize: 18, color: "#64748B", fontWeight: 500 }}>Lihat 100 kreator teratas dan pacu semangat Anda untuk memenangkan challenge ini!</p>
         </div>
         <LeaderboardView />
      </div>
    );
  } else {
    mainContent = (
      <div style={{ fontFamily: "'Geist', system-ui, sans-serif" }}>
        {activeCategory === "All" && (
          <DashboardBanner 
              isPaid={isPaid} 
              onUpgrade={() => setShowPricingModal(true)}
              onJoin={() => setActiveCategory("Campaign")} 
          />
        )}
        <CampaignPopup 
          isPaid={isPaid}
          onUpgrade={() => setShowPricingModal(true)}
          onJoin={() => setActiveCategory("Campaign")} 
        />
        <DashboardPreviewBanner />
        <CampaignFloatingBadge onClick={() => setActiveCategory("Campaign")} />

        <div style={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 40,
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
              <div style={{ display: "flex", flexDirection: "column" }}>
                  <h2 style={{ fontSize: 24, fontWeight: 900, color: "#1e293b", margin: 0, letterSpacing: "-0.03em" }}>{activeCategory} Prompts</h2>
                  <span style={{ fontSize: 13, color: "#64748b", fontWeight: 600 }}>{data?.total || 0} Premium Vaults</span>
              </div>
          </div>
        </div>

        <div 
          ref={gridRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
            gap: 24,
            marginBottom: 60,
          }}
        >
          {loading &&
            Array.from({ length: 12 }).map((_, i) => (
              <div key={i} style={{ background: "#fff", height: 200, borderRadius: 32, padding: 24, border: "1px solid rgba(0,0,0,0.05)", display: "flex", flexDirection: "column" }}>
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
                  isLocked={prompt.isLocked}
                  isPaid={isPaid}
                  onSelect={() => {
                    if (prompt.isLocked) {
                      setShowPricingModal(true);
                    } else {
                      setSelectedPrompt(prompt);
                    }
                  }} 
                />
              </div>
            ))}
        </div>

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
            >
              <ChevronLeft size={18} /> Prev
            </button>
            
            <div style={{ display: "flex", gap: 6 }}>
              {getPages(page, data.totalPages).map((p, i) => (
                <button
                  key={i}
                  disabled={p === "…"}
                  onClick={() => typeof p === "number" && goToPage(p)}
                  style={{
                    width: 44, height: 44, borderRadius: 12, border: "none",
                    background: p === page ? "#1e293b" : "transparent",
                    color: p === page ? "#fff" : (p === "…" ? "#cbd5e1" : "#64748b"),
                    fontSize: 14, fontWeight: 700, cursor: p === "…" ? "default" : "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  {p}
                </button>
              ))}
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
            >
              Next <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <>
      {mainContent}

      <PromptSidePanel prompt={selectedPrompt} isPaid={isPaid} onClose={() => setSelectedPrompt(null)} />
      <PricingModal 
        isOpen={showPricingModal} 
        onClose={() => setShowPricingModal(false)} 
      />

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
      </>
    );
}