"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useDashboard } from "./context";
import { PromptCard } from "@/components/PromptCard";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";

interface Prompt {
  id: number;
  category: string;
  title: string;
  content: string;
  isPremium: boolean;
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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const gridRef = useRef<HTMLDivElement>(null);

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

      {/* ── Page Header ── */}
      <div style={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingBottom: 0,
        borderBottom: "none",
      }}>
        <div>
          <h1 style={{
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#111",
            lineHeight: 1.1,
            marginBottom: 5,
            fontFamily: "'Geist', system-ui, sans-serif",
          }}>
            {activeCategory === "All" ? "All Prompts" : activeCategory}
          </h1>
          <p style={{
            fontSize: 13, color: "#A1A1AA", fontWeight: 400,
            fontFamily: "'Geist', system-ui, sans-serif",
            letterSpacing: "-0.01em",
          }}>
            {loading
              ? "Loading…"
              : data
              ? `${data.total.toLocaleString()} prompts${searchQuery ? ` matching "${searchQuery}"` : ""}`
              : ""}
          </p>
        </div>

        {loading && (
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, fontWeight: 400,
            fontFamily: "'Geist', system-ui, sans-serif",
            padding: "6px 12px", borderRadius: 7,
            color: "#71717A", background: "#F4F4F5", border: "1px solid #E4E4E7",
          }}>
            <Loader2 style={{ width: 12, height: 12, animation: "spin 1s linear infinite" }} />
            Loading
          </div>
        )}
      </div>

      {/* ── Empty State ── */}
      {!loading && data && data.items.length === 0 && (
        <div style={{
          textAlign: "center",
          padding: "80px 32px",
          borderRadius: 12,
          border: "1px dashed #D4D4D8",
          color: "#A1A1AA",
        }}>
          <p style={{
            fontWeight: 500, fontSize: 15,
            fontFamily: "'Instrument Serif', Georgia, serif",
            color: "#374151", marginBottom: 6,
          }}>
            No prompts found
          </p>
          <p style={{
            fontSize: 13,
            fontFamily: "'Geist', system-ui, sans-serif",
            fontWeight: 400,
          }}>
            Try different keywords or select another category.
          </p>
        </div>
      )}

      {/* ── Card Grid ── */}
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 14,
        }}
        className="prompt-grid"
      >
        {loading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div key={`sk-${i}`} style={{
              background: "linear-gradient(145deg, #F5F5F5 0%, #EFEFEF 100%)",
              border: "1px solid #E2E2E6",
              borderRadius: 12,
              padding: 18,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}>
              <div className="skeleton" style={{ height: 11, width: "40%", borderRadius: 4 }} />
              <div className="skeleton" style={{ height: 14, width: "90%" }} />
              <div className="skeleton" style={{ height: 14, width: "65%" }} />
              <div style={{ height: 4 }} />
              <div className="skeleton" style={{ height: 12, width: "100%" }} />
              <div className="skeleton" style={{ height: 12, width: "75%" }} />
              <div className="skeleton" style={{ height: 12, width: "50%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }}>
                <div className="skeleton" style={{ height: 11, width: 55 }} />
                <div className="skeleton" style={{ height: 28, width: 65, borderRadius: 7 }} />
              </div>
            </div>
          ))}

        {!loading &&
          data?.items.map((prompt, i) => (
            <div
              key={prompt.id}
              className="animate-fadein-up"
              style={{ animationDelay: `${(i % 12) * 20}ms` }}
            >
              <PromptCard {...prompt} />
            </div>
          ))}
      </div>

      {/* ── Pagination ── */}
      {!loading && data && data.totalPages > 1 && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          marginTop: 48,
          flexWrap: "wrap",
        }}>
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, fontWeight: 400,
              fontFamily: "'Geist', system-ui, sans-serif",
              padding: "7px 13px", borderRadius: 8,
              border: "1px solid #E4E4E7",
              background: "#fff", color: "#71717A",
              cursor: page <= 1 ? "not-allowed" : "pointer",
              opacity: page <= 1 ? 0.35 : 1,
              transition: "all 0.12s ease",
            }}
          >
            <ChevronLeft style={{ width: 13, height: 13 }} /> Prev
          </button>

          {getPages(page, data.totalPages).map((n, i) =>
            n === "…" ? (
              <span key={`ellipsis-${i}`} style={{
                padding: "0 5px", fontSize: 13, color: "#A1A1AA",
                fontFamily: "'Geist', system-ui, sans-serif",
              }}>…</span>
            ) : (
              <button
                key={n}
                onClick={() => goToPage(Number(n))}
                style={{
                  width: 34, height: 34,
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: n === page ? 600 : 400,
                  fontFamily: "'Geist', system-ui, sans-serif",
                  border: n === page ? "1px solid #16A34A" : "1px solid #E4E4E7",
                  background: n === page ? "#22C55E" : "#fff",
                  color: n === page ? "#fff" : "#71717A",
                  cursor: "pointer",
                  transition: "all 0.12s ease",
                  boxShadow: n === page ? "0 2px 8px rgba(34,197,94,0.35)" : "none",
                }}
              >
                {n}
              </button>
            )
          )}

          <button
            disabled={page >= data.totalPages}
            onClick={() => goToPage(page + 1)}
            style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, fontWeight: 400,
              fontFamily: "'Geist', system-ui, sans-serif",
              padding: "7px 13px", borderRadius: 8,
              border: "1px solid #E4E4E7",
              background: "#fff", color: "#71717A",
              cursor: page >= data.totalPages ? "not-allowed" : "pointer",
              opacity: page >= data.totalPages ? 0.35 : 1,
              transition: "all 0.12s ease",
            }}
          >
            Next <ChevronRight style={{ width: 13, height: 13 }} />
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 1024px) {
          .prompt-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .prompt-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}