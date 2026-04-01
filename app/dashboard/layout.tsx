"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutGrid, Menu, X, Zap, Settings,
  HelpCircle, Search, Music, Megaphone, User,
  Headphones, Calendar, BarChart2, Play,
  Mail, BookOpen, Rocket,
} from "lucide-react";
import { DashboardContext } from "./context";
import { UserButton, useUser } from "@clerk/nextjs";

const CATEGORIES = [
  { key: "TikTok Affiliate Viral (Hooks & Scripts)", Icon: Music,       short: "TikTok Affiliate" },
  { key: "High-Converting Copywriting (FB/IG Ads)",  Icon: Megaphone,   short: "Copywriting" },
  { key: "Personal Branding Expert (LinkedIn/IG)",   Icon: User,        short: "Personal Branding" },
  { key: "Customer Service & Crisis Management",     Icon: Headphones,  short: "Customer Service" },
  { key: "Daily Content Ideas (30-Day Calendar)",    Icon: Calendar,    short: "Content Ideas" },
  { key: "Market Research & Competitor Analysis",    Icon: BarChart2,   short: "Market Research" },
  { key: "YouTube / Long Video Scripting",           Icon: Play,     short: "YouTube Scripts" },
  { key: "Email Marketing & FOMO Newsletters",       Icon: Mail,        short: "Email Marketing" },
  { key: "Storytelling & Emotional Selling",         Icon: BookOpen,    short: "Storytelling" },
  { key: "Product Launch Strategy (H-7 to Launch Day)", Icon: Rocket,  short: "Product Launch" },
];

function NavItem({
  icon, label, isActive, onClick,
}: {
  icon: ReactNode; label: string; isActive: boolean; onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "10px 14px",
        borderRadius: 8,
        fontSize: 15,
        fontFamily: "'Geist', system-ui, sans-serif",
        fontWeight: isActive ? 600 : 500,
        /* Glider style: Black strong text when active, no background */
        color: isActive ? "#111" : hovered ? "#111" : "#71717A",
        background: hovered && !isActive ? "#F5F5F5" : "transparent",
        border: "1px solid transparent",
        cursor: "pointer",
        textAlign: "left",
        transition: "all 0.12s ease",
        letterSpacing: "-0.01em",
      }}
    >
      <span style={{
        width: 18, height: 18,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        color: isActive ? "#111" : hovered ? "#52525B" : "#A1A1AA",
        transition: "color 0.12s ease",
      }}>
        {icon}
      </span>
      <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {label}
      </span>
      {/* {isActive && (
        <div style={{
          width: 5, height: 5, borderRadius: "50%",
          background: "#22C55E", flexShrink: 0,
        }} />
      )} */}
    </button>
  );
}

function SidebarContent({
  activeCategory,
  setActiveCategory,
  setSidebarOpen,
}: {
  activeCategory: string;
  setActiveCategory: (v: string) => void;
  setSidebarOpen: (v: boolean) => void;
}) {
  const { user } = useUser();
  const fallbackEmail = user?.primaryEmailAddress?.emailAddress || "user@example.com";
  const displayName = user?.fullName || fallbackEmail.split('@')[0];

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Nav */}
      <nav style={{
        flex: 1,
        overflowY: "auto",
        padding: "14px 8px 10px",
        scrollbarWidth: "thin",
        scrollbarColor: "#E5E7EB transparent",
      }}>
        <p style={{
          fontSize: 12, fontWeight: 600,
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#A1A1AA",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "4px 14px 10px",
        }}>
          Browse
        </p>

        <NavItem
          icon={<LayoutGrid style={{ width: 13, height: 13 }} />}
          label="All Prompts"
          isActive={activeCategory === "All"}
          onClick={() => { setActiveCategory("All"); setSidebarOpen(false); }}
        />

        <p style={{
          fontSize: 12, fontWeight: 600,
          fontFamily: "'Geist', system-ui, sans-serif",
          color: "#A1A1AA",
          textTransform: "uppercase", letterSpacing: "0.08em",
          padding: "20px 14px 10px",
        }}>
          Categories
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {CATEGORIES.map((cat) => (
            <NavItem
              key={cat.key}
              icon={<cat.Icon style={{ width: 13, height: 13 }} />}
              label={cat.short}
              isActive={activeCategory === cat.key}
              onClick={() => { setActiveCategory(cat.key); setSidebarOpen(false); }}
            />
          ))}
        </div>
      </nav>

      {/* Footer */}
      <div style={{
        padding: "8px",
        borderTop: "1px solid #EBEBEB",
        display: "flex", flexDirection: "column", gap: 1,
      }}>
        <NavItem icon={<Settings style={{ width: 13, height: 13 }} />} label="Settings" isActive={false} onClick={() => {}} />
        <NavItem icon={<HelpCircle style={{ width: 13, height: 13 }} />} label="Help" isActive={false} onClick={() => {}} />

        <div style={{
          display: "flex", alignItems: "center", gap: 9,
          padding: "10px 10px",
          marginTop: 4,
          borderRadius: 8,
          background: "#F7F7F8",
          border: "1px solid #EBEBEB",
        }}>
          <div style={{ flexShrink: 0 }}>
            <UserButton appearance={{
              elements: { userButtonAvatarBox: "w-7 h-7" }
            }} />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{
              fontSize: 12, fontWeight: 500,
              fontFamily: "'Geist', system-ui, sans-serif",
              color: "#111",
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
              letterSpacing: "-0.02em",
            }}>
              {displayName}
            </p>
            <p style={{
              fontSize: 10, color: "#A1A1AA",
              fontFamily: "'Geist', system-ui, sans-serif",
              fontWeight: 400,
              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
            }}>
              {fallbackEmail}
            </p>
          </div>
          <span style={{
            fontSize: 10, fontWeight: 600,
            fontFamily: "'Geist', system-ui, sans-serif",
            color: "#16A34A", background: "#F0FDF4",
            border: "1px solid #BBF7D0",
            padding: "2px 7px", borderRadius: 5,
            flexShrink: 0,
            letterSpacing: "-0.01em",
          }}>
            Pro
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalCount, setTotalCount] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/prompts?limit=1")
      .then((r) => r.json())
      .then((d) => setTotalCount(d.total ?? null));
  }, []);

  return (
    <DashboardContext.Provider value={{ activeCategory, searchQuery }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#fff",
        fontFamily: "'Geist', system-ui, sans-serif",
      }}>

        {/* ══════════════════════════════════════════════
            STICKY TOPBAR (full width, logo lives here)
        ══════════════════════════════════════════════ */}
        <header className="dashboard-header" style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "#fff",
          borderBottom: "1px solid #EBEBEB",
          height: 108,
          display: "flex",
          alignItems: "center",
          paddingLeft: 0,
          paddingRight: 20,
          flexShrink: 0,
        }}>

          {/* Logo zone — same width as sidebar so content aligns */}
          <div style={{
            width: 280,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: 9,
            padding: "0 16px",
            borderRight: "1px solid #EBEBEB",
            height: "100%",
          }}
            className="sidebar-logo-zone"
          >
            <img 
              src="/LOGO.png" 
              alt="Veloprome Logo" 
              style={{ height: 40, width: "auto", objectFit: "contain", borderRadius: 6, flexShrink: 0 }} 
            />
            <div>
              <p style={{
                fontSize: 16, fontWeight: 600,
                fontFamily: "'Geist', system-ui, sans-serif",
                color: "#111", lineHeight: 1.2,
                letterSpacing: "-0.03em",
              }}>
                Veloprome
              </p>
              <p style={{
                fontSize: 12, color: "#A1A1AA", marginTop: 2,
                fontFamily: "'Geist', system-ui, sans-serif",
                fontWeight: 400,
                letterSpacing: "-0.005em",
              }}>
                {totalCount ? `${totalCount.toLocaleString()} prompts` : "1,000+ prompts"}
              </p>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="mobile-menu-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              color: "#71717A", padding: "0 12px", lineHeight: 0, height: "100%",
            }}
          >
            <Menu style={{ width: 18, height: 18 }} />
          </button>

          {/* Search */}
          <div style={{ position: "relative", flex: 1, maxWidth: 400, marginLeft: 16 }}>
            <Search style={{
              position: "absolute", left: 10, top: "50%",
              transform: "translateY(-50%)",
              width: 13, height: 13, color: "#A1A1AA",
              pointerEvents: "none",
            }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts…"
              style={{
                width: "100%",
                background: "#F4F4F5",
                border: "1px solid transparent",
                borderRadius: 100,
                padding: "7px 30px 7px 30px",
                fontSize: 13,
                fontFamily: "'Geist', system-ui, sans-serif",
                fontWeight: 400,
                color: "#111",
                outline: "none",
                transition: "all 0.15s ease",
                letterSpacing: "-0.01em",
              }}
              onFocus={(e) => {
                e.target.style.background = "#fff";
                e.target.style.borderColor = "#D4D4D8";
                e.target.style.boxShadow = "0 0 0 3px rgba(0,0,0,0.05)";
              }}
              onBlur={(e) => {
                e.target.style.background = "#F4F4F5";
                e.target.style.borderColor = "transparent";
                e.target.style.boxShadow = "none";
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  position: "absolute", right: 9, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none", cursor: "pointer",
                  color: "#A1A1AA", padding: 0, lineHeight: 0,
                }}
              >
                <X style={{ width: 12, height: 12 }} />
              </button>
            )}
          </div>

          <div style={{ flex: 1 }} />

          {/* Prompt count */}
          <div style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 12, fontWeight: 400,
            fontFamily: "'Geist', system-ui, sans-serif",
            padding: "4px 10px", borderRadius: 6,
            color: "#52525B", background: "#F4F4F5",
            border: "1px solid #E4E4E7",
            whiteSpace: "nowrap",
            marginRight: 8,
          }}
            className="prompt-count-badge"
          >
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: "#22C55E", display: "inline-block",
            }} />
            {totalCount ? totalCount.toLocaleString() : "1,000+"} prompts
          </div>

          {/* Back */}
          <Link href="/" style={{ textDecoration: "none" }} className="back-home-link">
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              fontSize: 12, fontWeight: 400,
              fontFamily: "'Geist', system-ui, sans-serif",
              color: "#71717A",
              background: "transparent", border: "1px solid #E4E4E7",
              padding: "5px 11px", borderRadius: 7,
              cursor: "pointer", whiteSpace: "nowrap",
              transition: "all 0.12s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#F4F4F5";
              (e.currentTarget as HTMLButtonElement).style.color = "#111";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#71717A";
            }}
            >
              ← Home
            </button>
          </Link>
        </header>

        {/* ══════════════════════════════════════════════
            BODY: sidebar + main side by side
        ══════════════════════════════════════════════ */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

          {/* ── Desktop Sidebar ── */}
          <aside
            className="desktop-sidebar"
            style={{
              width: 280,
              flexShrink: 0,
              background: "#fff",
              borderRight: "1px solid #EBEBEB",
              height: "calc(100vh - 108px)",
              position: "sticky",
              top: 108,
              overflowY: "auto",
            }}
          >
            <SidebarContent
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              setSidebarOpen={setSidebarOpen}
            />
          </aside>

          {/* ── Mobile Overlay Sidebar ── */}
          {sidebarOpen && (
            <div
              style={{
                position: "fixed", inset: 0, zIndex: 50,
                background: "rgba(0,0,0,0.28)",
              }}
              onClick={() => setSidebarOpen(false)}
            >
              <aside
                style={{
                  position: "absolute", left: 0, top: 0,
                  height: "100%", width: 300,
                  background: "#fff",
                  borderRight: "1px solid #EBEBEB",
                  boxShadow: "8px 0 32px rgba(0,0,0,0.08)",
                  animation: "slideIn 0.18s ease",
                  overflow: "auto",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <SidebarContent
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  setSidebarOpen={setSidebarOpen}
                />
              </aside>
            </div>
          )}

          {/* ── Main content ── */}
          <main className="main-content" style={{
            flex: 1,
            background: "#FAFAFA",
            overflowY: "auto",
            height: "calc(100vh - 108px)",
            padding: "28px",
          }}>
            <div style={{ maxWidth: 1200, margin: "0 auto" }}>

              {/* Active filter pill */}
              {activeCategory !== "All" && (
                <div style={{
                  display: "flex", alignItems: "center", gap: 8,
                  marginBottom: 20,
                  animation: "fadeIn 0.18s ease",
                }}>
                  <span style={{
                    fontSize: 11, color: "#A1A1AA",
                    fontFamily: "'Geist', system-ui, sans-serif",
                    fontWeight: 400,
                  }}>
                    Filtered by
                  </span>
                  <button
                    onClick={() => setActiveCategory("All")}
                    style={{
                      display: "flex", alignItems: "center", gap: 6,
                      fontSize: 11, fontWeight: 500,
                      fontFamily: "'Geist', system-ui, sans-serif",
                      padding: "3px 10px 3px 9px", borderRadius: 5,
                      background: "#22C55E", color: "#fff",
                      border: "1px solid #16A34A",
                      cursor: "pointer",
                      transition: "background 0.12s ease",
                      boxShadow: "0 1px 4px rgba(34,197,94,0.3)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#16A34A";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.background = "#22C55E";
                    }}
                  >
                    {CATEGORIES.find((c) => c.key === activeCategory)?.short ?? activeCategory}
                    <X style={{ width: 10, height: 10, opacity: 0.7 }} />
                  </button>
                </div>
              )}

              {children}
            </div>
          </main>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@300;400;500;600;700&display=swap');
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateX(-100%) } to { transform: translateX(0) } }
        @keyframes fadein-up {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein-up { animation: fadein-up 0.22s ease both; }
        .skeleton {
          background: #ECECEC;
          animation: pulse 1.8s ease-in-out infinite;
          border-radius: 5px;
        }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.45; } }
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .prompt-count-badge { display: none !important; }
          .back-home-link { display: none !important; }
          .sidebar-logo-zone { display: none !important; }
          .dashboard-header { height: 72px !important; padding: 0 16px !important; }
          .main-content { height: calc(100vh - 72px) !important; padding: 20px !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </DashboardContext.Provider>
  );
}